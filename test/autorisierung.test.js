const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { createStore } = require('../src/store');
const { createHandler } = require('../src/app');

async function withServer(fn) {
  const store = createStore();
  const server = http.createServer(createHandler(store));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;
  try {
    await fn({ baseUrl, store });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

// 1.Probe- und Autorisierungstest:
test('normaler Mitarbeiter darf nicht alle Tasks sehen (403 Forbidden)', async () => {
    await withServer(async ({ baseUrl }) => {
      const response = await fetch(`${baseUrl}/api/tasks`, {
        headers: { authorization: 'Bearer token-alice' }
      });
      assert.equal(response.status, 403);
    });
  });