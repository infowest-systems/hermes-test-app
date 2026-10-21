import { createElement as h } from 'react';

export default function LoginView({ onSubmit, error = '' } = {}) {
  return h('main', { className: 'canvas login-canvas' },
    h('header', { className: 'masthead' },
      h('span', { className: 'brand' }, h('span', { className: 'brand-mark', 'aria-hidden': 'true' }), 'BRASIL'),
      h('span', { className: 'masthead-note' }, 'VERDE & AMARELO')
    ),
    h('section', { className: 'login-layout', 'aria-labelledby': 'login-title' },
      h('div', { className: 'login-intro' },
        h('p', { className: 'eyebrow' }, 'BEM-VINDO'),
        h('h1', { className: 'login-heading' }, 'Deus,', h('br'), 'Pátria e', h('br'), h('span', { className: 'highlight' }, 'Família')),
        h('p', { className: 'login-caption' }, 'Entre para acessar a página principal.')
      ),
      h('div', { className: 'login-panel' },
        h('h2', { id: 'login-title' }, 'Acesse sua conta'),
        h('p', { className: 'login-subtitle' }, 'Informe seu usuário e sua senha.'),
        h('form', { onSubmit, 'aria-describedby': 'demo-notice' },
          h('label', { htmlFor: 'username' }, 'Usuário'),
          h('input', { id: 'username', name: 'username', type: 'text', autoComplete: 'username', autoCapitalize: 'none', spellCheck: false, required: true }),
          h('label', { htmlFor: 'password' }, 'Senha'),
          h('input', { id: 'password', name: 'password', type: 'password', autoComplete: 'current-password', required: true }),
          error ? h('p', { className: 'form-error', role: 'alert' }, error) : null,
          h('button', { type: 'submit', className: 'primary-button' }, 'Entrar')
        ),
        h('p', { id: 'demo-notice', className: 'demo-notice' }, 'Acesso demonstrativo no navegador. Não utilize uma senha pessoal.')
      )
    ),
    h('footer', { className: 'footer' }, h('span', null, 'Brasil · Verde e amarelo'), h('span', null, 'Página pessoal · sem vínculo oficial'))
  );
}
