import test from 'node:test';
import assert from 'node:assert/strict';

function storage() {
  const values = new Map();
  return { values, getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key) };
}

test('demo session accepts Hermes / 1234, rejects old password, and logs out', async () => {
  const auth = await import('../lib/demo-auth.js');
  const session = storage();
  assert.equal(auth.isAuthenticated(session), false);
  assert.equal(auth.signIn(session, 'Hermes', '123'), false, 'Old password must stop working');
  assert.equal(auth.signIn(session, 'Hermes', 'wrong'), false);
  assert.equal(auth.signIn(session, 'hermes', '1234'), false);
  assert.equal(auth.isAuthenticated(session), false);
  assert.equal(auth.signIn(session, 'Hermes', '1234'), true);
  assert.equal(auth.isAuthenticated(session), true);
  assert.ok(!JSON.stringify([...session.values.entries()]).includes('1234'));
  auth.signOut(session);
  assert.equal(auth.isAuthenticated(session), false);
  auth.signOut(session);
  assert.equal(auth.isAuthenticated(session), false);
});
