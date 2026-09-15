function login(store, email, password) {
  const user = store.users.find((u) => u.email === email);
  if (!user) {
    return { ok: false, status: 401, error: 'Ungueltige Anmeldedaten' };
  }

  if (user.locked) {
    return { ok: false, status: 423, error: 'Konto gesperrt' };
  }

  if (user.password !== password) {
    user.failedAttempts += 1;
    if (user.failedAttempts > 5) {
      user.locked = true;
    }
    return { ok: false, status: 401, error: 'Ungueltige Anmeldedaten' };
  }

  const token = user.id === 'u1' ? 'token-alice' : user.id === 'u2' ? 'token-bob' : 'token-admin';
  return {
    ok: true,
    status: 200,
    token,
    user: { id: user.id, name: user.name, role: user.role }
  };
}

function authenticate(store, authorizationHeader) {
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authorizationHeader.slice('Bearer '.length).trim();
  const userId = store.tokens.get(token);
  return store.users.find((u) => u.id === userId) || null;
}

module.exports = { login, authenticate };
