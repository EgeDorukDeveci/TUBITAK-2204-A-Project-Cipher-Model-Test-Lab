const { generateText } = require("ai");
const { createGateway } = require("@ai-sdk/gateway");

const EVALUATION_MODEL = "openai/gpt-5.4-nano";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
const COMPARISON_EXPLANATION_MODEL = "google/gemma-4-26b-a4b-it:free";

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    if (request.body && typeof request.body === "object") {
      resolve(JSON.stringify(request.body));
      return;
    }
    if (typeof request.body === "string") {
      resolve(request.body);
      return;
    }
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

async function readJson(request) {
  const body = await readBody(request);
  return JSON.parse(body || "{}");
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
  return process.env.AI_GATEWAY_API_KEY
    || process.env.VERCEL_AI_GATEWAY_API_KEY
    || String(payload.vercelApiKey || payload.apiKey || "").trim();
}

function resolveOpenRouterApiKey(payload) {
  return process.env.OPENROUTER_API_KEY || String(payload.openRouterApiKey || "").trim();
}

function createGatewayClient(payload) {
  const apiKey = resolveVercelApiKey(payload);
  if (!apiKey) {
    throw new Error("Vercel API key is not set. Add it in Vercel Environment Variables or the website API Key tab.");
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

function buildDecryptSystemPrompt() {
  return "You are a careful cryptology assistant.Your task is to solve classical ciphers";
}

async function callVercelGateway(payload) {
  const client = createGatewayClient(payload);
  const started = Date.now();
  const result = await generateText({
    model: client(safeModel(payload.model)),
    system: buildDecryptSystemPrompt(),
    prompt: buildDecryptPrompt(payload),
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
    throw new Error("OpenRouter API key is not set. Add it in Vercel Environment Variables or the website API Key tab.");
  }
  const model = safeOpenRouterModel(payload.model);
  const started = Date.now();
  const response = await fetch(OPENROUTER_BASE_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://vercel.app",
      "X-Title": "Cipher Model Test Lab",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: buildDecryptSystemPrompt() },
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
    throw new Error("OpenRouter API key is not set. Add it in Vercel Environment Variables or the website API Key tab.");
  }
  const safeModel = safeOpenRouterModel(model);
  const started = Date.now();
  const response = await fetch(OPENROUTER_BASE_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://vercel.app",
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

async function runDecryptAndEvaluate(payload) {
  const result = payload.provider === "openrouter" ? await callOpenRouter(payload) : await callVercelGateway(payload);
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
  return { ...result, evaluation };
}

async function explainComparison(payload) {
  if (!payload.summary) throw new Error("Missing comparison summary.");
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
  return {
    explanation: result.output,
    model: result.model,
    latencyMs: result.latencyMs,
  };
}

function healthPayload() {
  return {
    ok: true,
    evaluator: EVALUATION_MODEL,
    keyLoaded: Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_AI_GATEWAY_API_KEY),
    openRouterKeyLoaded: Boolean(process.env.OPENROUTER_API_KEY),
  };
}

module.exports = {
  sendJson,
  readJson,
  runDecryptAndEvaluate,
  explainComparison,
  healthPayload,
};
