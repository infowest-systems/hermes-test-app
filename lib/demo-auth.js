// Public demonstration only: client-side checks cannot protect private content.
const SESSION_KEY = 'hermes-test-app:demo-session';

export function isAuthenticated(storage) {
  return storage.getItem(SESSION_KEY) === 'Hermes';
}

export function signIn(storage, username, password) {
  if (username !== 'Hermes' || password !== '1234') return false;
  storage.setItem(SESSION_KEY, 'Hermes');
  return true;
}

export function signOut(storage) {
  storage.removeItem(SESSION_KEY);
}
