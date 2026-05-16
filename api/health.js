const { healthPayload, sendJson } = require("./_shared");

module.exports = async function handler(request, response) {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }
  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed." });
    return;
  }
  sendJson(response, 200, healthPayload());
};
