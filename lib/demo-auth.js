// Public demonstration only: client-side checks cannot protect private content.
const SESSION_KEY = 'hermes-test-app:demo-session';

export function isAuthenticated(storage) {
  return storage.getItem(SESSION_KEY) === 'Renato';
}

export function signIn(storage, username, password) {
  if (username !== 'Renato' || password !== '321') return false;
  storage.setItem(SESSION_KEY, 'Renato');
  return true;
}

export function signOut(storage) {
  storage.removeItem(SESSION_KEY);
}
