import test from 'node:test';
import assert from 'node:assert/strict';

function storage() {
  const values = new Map();
  return { values, getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key) };
}

test('demo session accepts Renato / 321, rejects previous account and logs out', async () => {
  const auth = await import('../lib/demo-auth.js');
  const session = storage();
  assert.equal(auth.isAuthenticated(session), false);
  assert.equal(auth.signIn(session, 'Hermes', '1234'), false, 'Previous credentials must stop working');
  assert.equal(auth.signIn(session, 'Renato', 'wrong'), false);
  assert.equal(auth.signIn(session, 'renato', '321'), false);
  session.setItem('hermes-test-app:demo-session', 'Hermes');
  assert.equal(auth.isAuthenticated(session), false, 'Previous account sessions must expire');
  assert.equal(auth.signIn(session, 'Renato', '321'), true);
  assert.equal(auth.isAuthenticated(session), true);
  assert.ok(!JSON.stringify([...session.values.entries()]).includes('321'));
  auth.signOut(session);
  assert.equal(auth.isAuthenticated(session), false);
  auth.signOut(session);
  assert.equal(auth.isAuthenticated(session), false);
});
