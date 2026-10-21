"use client";

import { createElement as h, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeView from '../../components/HomeView.js';
import { isAuthenticated, signOut } from '../../lib/demo-auth.js';

export default function HomePage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    function checkSession() {
      let valid = false;
      try { valid = isAuthenticated(window.sessionStorage); } catch { /* No usable demo session. */ }
      setAuthorized(valid);
      if (!valid) router.replace('/');
    }
    checkSession();
    window.addEventListener('pageshow', checkSession);
    return () => window.removeEventListener('pageshow', checkSession);
  }, [router]);

  function handleLogout() {
    try {
      signOut(window.sessionStorage);
      setAuthorized(false);
      router.replace('/');
    } catch {
      setError('Não foi possível encerrar a sessão. Tente novamente.');
    }
  }

  if (!authorized) return h('main', { className: 'session-loading', role: 'status' }, 'Verificando sessão…');
  return h(HomeView, { onLogout: handleLogout, error });
}
