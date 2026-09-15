function createStore() {
  return {
    users: [
      { id: 'u1', name: 'Alice Meier', email: 'alice@example.test', password: 'Start123!', role: 'employee', failedAttempts: 0, locked: false },
      { id: 'u2', name: 'Bob Keller', email: 'bob@example.test', password: 'Start123!', role: 'employee', failedAttempts: 0, locked: false },
      { id: 'u3', name: 'Admin User', email: 'admin@example.test', password: 'Admin123!', role: 'admin', failedAttempts: 0, locked: false }
    ],
    tasks: [
      { id: 't1', title: 'Release Notes pruefen', description: 'RC1 vorbereiten', priority: 'HIGH', status: 'OPEN', dueDate: '2026-09-20', ownerId: 'u1' },
      { id: 't2', title: 'API Dokumentation aktualisieren', description: 'Endpoints kontrollieren', priority: 'MEDIUM', status: 'IN_PROGRESS', dueDate: '2026-09-22', ownerId: 'u2' }
    ],
    tokens: new Map([
      ['token-alice', 'u1'],
      ['token-bob', 'u2'],
      ['token-admin', 'u3']
    ]),
    nextTaskId: 3
  };
}

module.exports = { createStore };
