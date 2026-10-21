"use client";

import { createElement as h, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginView from '../components/LoginView.js';
import { isAuthenticated, signIn } from '../lib/demo-auth.js';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      if (isAuthenticated(window.sessionStorage)) router.replace('/home/');
    } catch {
      setError('Habilite o armazenamento de sessão do navegador para entrar.');
    }
  }, [router]);

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      if (!signIn(window.sessionStorage, data.get('username'), data.get('password'))) {
        setError('Usuário ou senha incorretos.');
        return;
      }
      form.reset();
      router.replace('/home/');
    } catch {
      setError('Não foi possível iniciar a sessão. Habilite o armazenamento do navegador.');
    }
  }

  return h(LoginView, { onSubmit: handleSubmit, error });
}
