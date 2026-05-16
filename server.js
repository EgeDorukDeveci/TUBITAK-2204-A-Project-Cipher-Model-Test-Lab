const http = require("http");
const fs = require("fs");
const path = require("path");
const { generateText } = require("ai");
const { createGateway } = require("@ai-sdk/gateway");

const root = __dirname;
const port = Number(process.env.PORT || 8080);

function loadLocalEnv() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (!process.env[key]) process.env[key] = rest.join("=").replace(/^["']|["']$/g, "");
  }
}

loadLocalEnv();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const EVALUATION_MODEL = "openai/gpt-5.4-nano";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
const COMPARISON_EXPLANATION_MODEL = "google/gemma-4-26b-a4b-it:free";

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body too large."));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  response.end(JSON.stringify(payload));
}

function safeModel(model) {
  const allowed = new Set([
    "openai/gpt-5.5",
    "openai/gpt-5.3-codex",
    "google/gemini-3-pro-preview",
    "google/gemini-3-flash",
    "openai/gpt-5.1-thinking",
    "xai/grok-4-fast-reasoning",
    "xai/grok-4.1-fast-reasoning",
    "anthropic/claude-opus-4.5",
    "anthropic/claude-sonnet-4.5",
    "deepseek/deepseek-v3.1",
    "google/gemini-3.1-pro-preview",
    "google/gemini-3.1-flash-lite",
    "anthropic/claude-opus-4.7",
    "anthropic/claude-sonnet-4.6",
    "deepseek/deepseek-v4-flash",
    "deepseek/deepseek-v4-pro",
    "xai/grok-4.3",
    "xai/grok-4.20-reasoning",
  ]);
  return allowed.has(model) ? model : "xai/grok-4.3";
}

function safeOpenRouterModel(model) {
  const allowed = new Set([
    "google/gemma-4-26b-a4b-it:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "openai/gpt-oss-120b:free",
    "openai/gpt-oss-20b:free",
    "qwen/qwen3-coder:free",
    "deepseek/deepseek-v4-flash:free",
    "google/gemma-4-31b-it:free",
    "arcee-ai/trinity-large-thinking:free",
    "minimax/minimax-m2.5:free",
    "meta-llama/llama-3.3-70b-instruct:free",
  ]);
  return allowed.has(model) ? model : "google/gemma-4-26b-a4b-it:free";
}

function resolveVercelApiKey(payload) {
  const envKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_AI_GATEWAY_API_KEY;
  if (envKey) return envKey;
  const browserKey = String(payload.vercelApiKey || payload.apiKey || "").trim();
  if (browserKey) return browserKey;
  return "";
}

function resolveOpenRouterApiKey(payload) {
  const envKey = process.env.OPENROUTER_API_KEY;
  if (envKey) return envKey;
  const browserKey = String(payload.openRouterApiKey || "").trim();
  if (browserKey) return browserKey;
  return "";
}

function createGatewayClient(payload) {
  const apiKey = resolveVercelApiKey(payload);
  if (!apiKey) {
    throw new Error("Vercel API key is not set. Add it in the website API Key tab or environment.");
  }
  return createGateway({ apiKey });
}

function resolveScenario(payload) {
  return payload.scenario === "blind" ? "blind" : "guided";
}

function buildDecryptPrompt(payload) {
  if (resolveScenario(payload) === "blind") {
    return [
      "This is a classical cipher decryption test.",
      "The cipher type and key are intentionally hidden. Infer the most likely cipher type and key, then decrypt the message.",
      `Ciphertext: ${payload.cipherText}`,
      "Return only the most likely plaintext.",
      "Do not include explanations, Markdown, JSON, the cipher type, the key, or any extra text.",
      "The expected plaintext is Turkish written with ASCII characters only, for example: guvenlik, sifreleme, yapay zeka.",
    ].join("\n");
  }
  return [
    "This is a classical cipher decryption test.",
    `Known cipher type: ${payload.method}`,
    `Known key: ${payload.key}`,
    `Ciphertext: ${payload.cipherText}`,
    "Decrypt the ciphertext using the given cipher type and key.",
    "Return only the plaintext.",
    "Do not include explanations, Markdown, JSON, or any extra text.",
    "The expected plaintext is Turkish written with ASCII characters only, for example: guvenlik, sifreleme, yapay zeka.",
  ].join("\n");
}

function buildDecryptSystemPrompt(payload) {
  return "You are a careful cryptology assistant.Your task is to solve classical ciphers";
}

async function callVercelGateway(payload) {
  const client = createGatewayClient(payload);
  const prompt = buildDecryptPrompt(payload);

  const started = Date.now();
  const result = await generateText({
    model: client(safeModel(payload.model)),
    system: buildDecryptSystemPrompt(payload),
    prompt,
    temperature: 0,
    maxOutputTokens: 1200,
  });
  return {
    output: result.text.trim(),
    latencyMs: Date.now() - started,
    model: safeModel(payload.model),
  };
}

async function callOpenRouter(payload) {
  const apiKey = resolveOpenRouterApiKey(payload);
  if (!apiKey) {
    throw new Error("OpenRouter API key is not set. Add it in the website API Key tab or OPENROUTER_API_KEY.");
  }
  const model = safeOpenRouterModel(payload.model);
  const started = Date.now();
  const response = await fetch(OPENROUTER_BASE_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://127.0.0.1:8080/website/",
      "X-Title": "Cipher Model Test Lab",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: buildDecryptSystemPrompt(payload),
        },
        { role: "user", content: buildDecryptPrompt(payload) },
      ],
      temperature: 0,
      max_tokens: 1200,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || data.message || `OpenRouter request failed with HTTP ${response.status}.`);
  }
  return {
    output: String(data.choices?.[0]?.message?.content || "").trim(),
    latencyMs: Date.now() - started,
    model: data.model || model,
  };
}

async function callOpenRouterMessages(payload, model, messages, maxTokens = 450) {
  const apiKey = resolveOpenRouterApiKey(payload);
  if (!apiKey) {
    throw new Error("OpenRouter API key is not set. Add it in the website API Key tab or OPENROUTER_API_KEY.");
  }
  const safeModel = safeOpenRouterModel(model);
  const started = Date.now();
  const response = await fetch(OPENROUTER_BASE_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://127.0.0.1:8080/website/",
      "X-Title": "Cipher Model Test Lab",
    },
    body: JSON.stringify({
      model: safeModel,
      messages,
      temperature: 0.2,
      max_tokens: maxTokens,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || data.message || `OpenRouter request failed with HTTP ${response.status}.`);
  }
  return {
    output: String(data.choices?.[0]?.message?.content || "").trim(),
    latencyMs: Date.now() - started,
    model: data.model || safeModel,
  };
}

async function callModelProvider(payload) {
  return payload.provider === "openrouter" ? callOpenRouter(payload) : callVercelGateway(payload);
}

async function evaluateWithGpt54Nano(payload, decryptedText) {
  const client = createGatewayClient(payload);

  const prompt = [
    "Evaluate a model answer for a classical cipher decryption benchmark.",
    "Compare the expected plaintext with the model output.",
    "Score from 0 to 100 using both character-level accuracy and semantic similarity.",
    "Give 100 only when the plaintext is essentially exact after ignoring harmless whitespace and punctuation.",
    "Give a low score when the output contains explanations instead of plaintext, the wrong language, or a wrong decryption.",
    "Return only valid JSON in this exact shape:",
    "{\"similarity_score\": number, \"reasoning\": string}",
    `Expected plaintext: ${payload.expectedText}`,
    `Model output: ${decryptedText}`,
  ].join("\n");

  const started = Date.now();
  const result = await generateText({
    model: client(EVALUATION_MODEL),
    system: "You are a strict benchmark evaluator. Output only valid JSON and no surrounding text.",
    prompt,
    temperature: 0,
    maxOutputTokens: 500,
  });
  const raw = result.text.trim() || "{}";
  const match = raw.match(/\{[\s\S]*\}/);
  const parsed = JSON.parse(match ? match[0] : raw);
  return {
    score: Math.max(0, Math.min(100, Number(parsed.similarity_score) || 0)),
    reasoning: String(parsed.reasoning || ""),
    latencyMs: Date.now() - started,
    model: EVALUATION_MODEL,
  };
}

async function handleRun(request, response) {
  try {
    const body = await readBody(request);
    const payload = JSON.parse(body || "{}");
    if (!payload.cipherText || !payload.method || !payload.key || !payload.model || !payload.expectedText) {
      sendJson(response, 400, { error: "Missing cipherText, method, key, model, or expectedText." });
      return;
    }
    const result = await callModelProvider(payload);
    let evaluation;
    try {
      evaluation = await evaluateWithGpt54Nano(payload, result.output);
    } catch (error) {
      evaluation = {
        score: null,
        reasoning: `Model output returned, but GPT-5.4 Nano evaluation failed: ${error.message}`,
        latencyMs: 0,
        model: EVALUATION_MODEL,
      };
    }
    sendJson(response, 200, { ...result, evaluation });
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
}

async function handleCompareExplanation(request, response) {
  try {
    const body = await readBody(request);
    const payload = JSON.parse(body || "{}");
    if (!payload.summary) {
      sendJson(response, 400, { error: "Missing comparison summary." });
      return;
    }
    const languageName = payload.language === "tr" ? "Turkish" : payload.language === "de" ? "German" : "English";
    const result = await callOpenRouterMessages(payload, COMPARISON_EXPLANATION_MODEL, [
      {
        role: "system",
        content: "You explain benchmark results clearly and cautiously. Keep the explanation short, practical, and based only on the provided data.",
      },
      {
        role: "user",
        content: [
          `Write the explanation in ${languageName}.`,
          "Explain this cipher-model benchmark comparison in 3 to 5 short bullets.",
          "Mention whether the new API-tested models are above or below the old known-result baseline.",
          "Mention coverage limits if only a few tests were run.",
          "Do not invent results and do not recommend models that are not in the data.",
          `Data: ${JSON.stringify(payload.summary)}`,
        ].join("\n"),
      },
    ]);
    sendJson(response, 200, {
      explanation: result.output,
      model: result.model,
      latencyMs: result.latencyMs,
    });
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
}

function serveStatic(request, response) {
  const url = new URL(request.url, "http://localhost");
  const pathname = url.pathname === "/" || url.pathname === "/website/" ? "/index.html" : url.pathname.replace(/^\/website/, "");
  const filePath = path.normalize(path.join(root, pathname));
  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store, max-age=0",
    });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  if (request.method === "OPTIONS" && request.url.startsWith("/api/")) {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    });
    response.end();
    return;
  }
  if (request.method === "POST" && request.url === "/api/run") {
    handleRun(request, response);
    return;
  }
  if (request.method === "POST" && request.url === "/api/explain-comparison") {
    handleCompareExplanation(request, response);
    return;
  }
  if (request.method === "GET" && request.url === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      evaluator: EVALUATION_MODEL,
      keyLoaded: Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_AI_GATEWAY_API_KEY),
      openRouterKeyLoaded: Boolean(process.env.OPENROUTER_API_KEY),
    });
    return;
  }
  serveStatic(request, response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Cipher benchmark server running at http://127.0.0.1:${port}/website/`);
  console.log(`Gateway key loaded: ${Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_AI_GATEWAY_API_KEY)}`);
});
