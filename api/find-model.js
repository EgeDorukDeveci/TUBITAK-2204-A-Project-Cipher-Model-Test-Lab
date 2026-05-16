const { findModel, readJson, sendJson } = require("./_shared");

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
    if (!payload.query || !payload.provider) {
      sendJson(response, 400, { error: "Missing provider or model name." });
      return;
    }
    const result = await findModel(payload);
    sendJson(response, 200, result);
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
};
