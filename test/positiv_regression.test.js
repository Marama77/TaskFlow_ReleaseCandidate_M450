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

// --- POSITIV-REGRESSIONSTEST ---

test('POST auf /api/tasks setzt Standard-Priorität auf MEDIUM, wenn das Feld fehlt [T-13]', async () => {
    await withServer(async ({ baseUrl }) => {
      // GIVEN: Benutzer ist erfolgreich eingeloggt
      const token = 'Bearer token-alice';
      // 'priority' wird in den Testdaten absichtlich komplett weggelassen
      const payloadOhnePriority = { title: 'Task ohne Priorität' }; 
  
      // WHEN: Der Datensatz an den Server gesendet wird
      const response = await fetch(`${baseUrl}/api/tasks`, {
        method: 'POST',
        headers: { 
          'authorization': token,
          'content-type': 'application/json'
        },
        body: JSON.stringify(payloadOhnePriority)
      });
      
      const body = await response.json();
  
      // THEN: Erfolgreich erstellt (201) und Fallback greift auf MEDIUM (Auslöser D-03)
      assert.equal(response.status, 201); 
      assert.equal(body.priority, 'MEDIUM'); 
    });
  });