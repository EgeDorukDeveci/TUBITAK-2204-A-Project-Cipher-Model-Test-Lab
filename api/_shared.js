const { generateText } = require("ai");
const { createGateway } = require("@ai-sdk/gateway");

const EVALUATION_MODEL = "openai/gpt-5.4-nano";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";
const VERCEL_MODELS_URL = "https://ai-gateway.vercel.sh/v1/models";
const COMPARISON_EXPLANATION_MODEL = "google/gemma-4-26b-a4b-it:free";

function isModelIdFormat(value) {
  return /^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._:-]*$/i.test(String(value || "").trim());
}

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
  if (allowed.has(model) || isModelIdFormat(model)) return model;
  throw new Error(`Invalid Vercel AI Gateway model id format: ${model}. Use provider/model-name, for example openai/gpt-5.5.`);
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
  if (allowed.has(model) || isModelIdFormat(model)) return model;
  throw new Error(`Invalid OpenRouter model id format: ${model}. Use provider/model-name or provider/model-name:free.`);
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

async function fetchModelList(provider, payload = {}) {
  if (provider === "openrouter") {
    const apiKey = resolveOpenRouterApiKey(payload);
    const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {};
    const response = await fetch(OPENROUTER_MODELS_URL, { headers });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error?.message || data.message || `OpenRouter model list failed with HTTP ${response.status}.`);
    }
    return Array.isArray(data.data) ? data.data : [];
  }

  const apiKey = resolveVercelApiKey(payload);
  const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {};
  const response = await fetch(VERCEL_MODELS_URL, { headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || data.message || `Vercel AI Gateway model list failed with HTTP ${response.status}.`);
  }
  return Array.isArray(data.data) ? data.data : [];
}

function modelPriceIsFree(model) {
  const pricing = model.pricing || {};
  const prompt = pricing.prompt ?? pricing.input ?? model.prompt_price;
  const completion = pricing.completion ?? pricing.output ?? model.completion_price;
  return String(prompt ?? "") === "0" && String(completion ?? "") === "0";
}

function modelDisplayName(model) {
  return model.name || model.id || model.canonical_slug || "Custom model";
}

async function normalizeModelQuery(payload) {
  const provider = payload.provider === "openrouter" ? "openrouter" : "vercel";
  const query = String(payload.query || "").trim();
  if (!query) throw new Error("Write a model name first.");

  const result = await callOpenRouterMessages(payload, COMPARISON_EXPLANATION_MODEL, [
    {
      role: "system",
      content: "You normalize AI model names into API model ids. Return only compact JSON.",
    },
    {
      role: "user",
      content: [
        `Provider list target: ${provider === "openrouter" ? "OpenRouter" : "Vercel AI Gateway"}.`,
        `User input: ${query}`,
        "The correct model id format is provider/model-name.",
        "For OpenRouter free variants, provider/model-name:free is also valid.",
        "Return JSON only in this shape:",
        "{\"candidates\":[\"provider/model-name\"],\"format_example\":\"provider/model-name\",\"note\":\"short note\"}",
        "Include the raw input as the first candidate if it already looks like a model id.",
        "Do not invent more than 5 candidates.",
      ].join("\n"),
    },
  ], 260);

  const raw = result.output.trim();
  const match = raw.match(/\{[\s\S]*\}/);
  const parsed = JSON.parse(match ? match[0] : raw);
  const candidates = Array.isArray(parsed.candidates) ? parsed.candidates : [];
  const normalized = [query, ...candidates]
    .map((item) => String(item || "").trim())
    .filter(Boolean);
  return {
    candidates: [...new Set(normalized)],
    formatExample: String(parsed.format_example || (provider === "openrouter" ? "google/gemma-4-26b-a4b-it:free" : "openai/gpt-5.5")),
    note: String(parsed.note || ""),
    helperModel: result.model,
  };
}

function findModelMatch(models, candidates, query) {
  const lowerCandidates = candidates.map((item) => item.toLowerCase());
  const byId = models.find((model) => lowerCandidates.includes(String(model.id || "").toLowerCase()));
  if (byId) return byId;

  const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return models.find((model) => {
    const id = String(model.id || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
    const name = String(model.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
    return normalizedQuery && (id.includes(normalizedQuery) || name.includes(normalizedQuery));
  });
}

async function findModel(payload) {
  const provider = payload.provider === "openrouter" ? "openrouter" : "vercel";
  const query = String(payload.query || "").trim();
  const normalized = await normalizeModelQuery({ ...payload, provider });
  const formatCandidates = normalized.candidates.filter(isModelIdFormat);
  if (!formatCandidates.length) {
    throw new Error(`No valid model id format found. True format example: ${provider === "openrouter" ? "google/gemma-4-26b-a4b-it:free" : "openai/gpt-5.5"}.`);
  }
  const models = await fetchModelList(provider, payload);
  const match = findModelMatch(models, formatCandidates, query);
  if (!match) {
    throw new Error(`No ${provider === "openrouter" ? "OpenRouter" : "Vercel"} model found for "${query}". True format example: ${normalized.formatExample}.`);
  }
  const modelId = String(match.id || match.canonical_slug || "").trim();
  if (!isModelIdFormat(modelId)) {
    throw new Error(`The matched model does not expose a usable model id. True format example: ${normalized.formatExample}.`);
  }
  return {
    id: modelId,
    label: modelDisplayName(match),
    provider,
    free: provider === "openrouter" ? (modelId.endsWith(":free") || modelPriceIsFree(match)) : false,
    freeCredit: provider === "vercel" ? modelPriceIsFree(match) : undefined,
    formatExample: provider === "openrouter" ? "google/gemma-4-26b-a4b-it:free" : "openai/gpt-5.5",
    checkedAgainst: provider === "openrouter" ? OPENROUTER_MODELS_URL : VERCEL_MODELS_URL,
    helperModel: normalized.helperModel,
    note: normalized.note,
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
  findModel,
  healthPayload,
};
