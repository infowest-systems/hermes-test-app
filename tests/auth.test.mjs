import test from 'node:test';
import assert from 'node:assert/strict';

function storage() {
  const values = new Map();
  return {
    values,
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key)
  };
}

test('demo session rejects wrong credentials, logs in Hermes / 123, and logs out', async () => {
  const auth = await import('../lib/demo-auth.js').catch(() => ({}));
  assert.equal(typeof auth.signIn, 'function', 'Demo login must be implemented');
  const session = storage();
  assert.equal(auth.isAuthenticated(session), false);
  assert.equal(auth.signIn(session, 'Hermes', 'wrong'), false);
  assert.equal(auth.signIn(session, 'hermes', '123'), false);
  assert.equal(auth.isAuthenticated(session), false);
  assert.equal(auth.signIn(session, 'Hermes', '123'), true);
  assert.equal(auth.isAuthenticated(session), true);
  assert.ok(!JSON.stringify([...session.values.entries()]).includes('123'));
  auth.signOut(session);
  assert.equal(auth.isAuthenticated(session), false);
  auth.signOut(session);
  assert.equal(auth.isAuthenticated(session), false);
});
