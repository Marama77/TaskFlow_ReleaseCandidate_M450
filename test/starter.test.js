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

test('health endpoint liefert Status ok', async () => {
  await withServer(async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/api/health`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.status, 'ok');
  });
});

test('gueltiger Login liefert Token', async () => {
  await withServer(async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'alice@example.test', password: 'Start123!' })
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.token, 'token-alice');
    assert.equal(body.user.role, 'employee');
  });
});

test('admin sieht die vorhandenen Tasks', async () => {
  await withServer(async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/api/tasks`, {
      headers: { authorization: 'Bearer token-admin' }
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.items.length, 2);
  });
});

test('gueltiger Task kann erstellt werden', async () => {
  await withServer(async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/api/tasks`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer token-alice',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Regression vorbereiten',
        priority: 'HIGH',
        dueDate: '2026-09-30'
      })
    });
    assert.equal(response.status, 201);
    const body = await response.json();
    assert.equal(body.ownerId, 'u1');
    assert.equal(body.priority, 'HIGH');
  });
});
