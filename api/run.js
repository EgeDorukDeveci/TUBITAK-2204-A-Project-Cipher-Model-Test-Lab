const { readJson, runDecryptAndEvaluate, sendJson } = require("./_shared");

module.exports = async function handler(request, response) {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed." });
    return;
  }
  try {
    const payload = await readJson(request);
    if (!payload.cipherText || !payload.method || !payload.key || !payload.model || !payload.expectedText) {
      sendJson(response, 400, { error: "Missing cipherText, method, key, model, or expectedText." });
      return;
    }
    const result = await runDecryptAndEvaluate(payload);
    sendJson(response, 200, result);
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
};
