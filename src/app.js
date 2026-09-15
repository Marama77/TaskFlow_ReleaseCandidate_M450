const { login, authenticate } = require('./auth');
const { listTasks, createTask, patchTask } = require('./taskService');

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body)
  });
  res.end(body);
}

async function readJson(req) {
  let data = '';
  for await (const chunk of req) {
    data += chunk;
    if (data.length > 1_000_000) {
      throw new Error('Request body zu gross');
    }
  }
  if (!data) return {};
  return JSON.parse(data);
}

function createHandler(store) {
  return async function handler(req, res) {
    try {
      const url = new URL(req.url, 'http://localhost');

      if (req.method === 'GET' && url.pathname === '/api/health') {
        return sendJson(res, 200, { status: 'ok', version: '1.4.0-rc1' });
      }

      if (req.method === 'POST' && url.pathname === '/api/login') {
        const input = await readJson(req);
        const result = login(store, input.email, input.password);
        return sendJson(res, result.status, result.ok ? { token: result.token, user: result.user } : { error: result.error });
      }

      const user = authenticate(store, req.headers.authorization);
      if (!user) {
        return sendJson(res, 401, { error: 'Nicht authentifiziert' });
      }

      if (req.method === 'GET' && url.pathname === '/api/tasks') {
        return sendJson(res, 200, { items: listTasks(store, user) });
      }

      if (req.method === 'POST' && url.pathname === '/api/tasks') {
        const input = await readJson(req);
        const result = createTask(store, user, input);
        return sendJson(res, result.status, result.ok ? result.task : { error: result.error, details: result.details });
      }

      const patchMatch = url.pathname.match(/^\/api\/tasks\/([^/]+)$/);
      if (req.method === 'PATCH' && patchMatch) {
        const input = await readJson(req);
        const result = patchTask(store, user, patchMatch[1], input);
        return sendJson(res, result.status, result.ok ? result.task : { error: result.error, details: result.details });
      }

      return sendJson(res, 404, { error: 'Endpoint nicht gefunden' });
    } catch (error) {
      return sendJson(res, 500, {
        error: 'Interner Fehler',
        details: error.stack
      });
    }
  };
}

module.exports = { createHandler, readJson, sendJson };
