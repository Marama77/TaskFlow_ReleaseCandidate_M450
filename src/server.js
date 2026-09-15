const http = require('node:http');
const { createStore } = require('./store');
const { createHandler } = require('./app');

const PORT = Number(process.env.PORT || 3000);
const store = createStore();
const server = http.createServer(createHandler(store));

server.listen(PORT, () => {
  console.log(`TaskFlow Release Candidate laeuft auf http://localhost:${PORT}`);
});
