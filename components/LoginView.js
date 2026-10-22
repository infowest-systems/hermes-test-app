import { createElement as h } from 'react';
import BrandTitle from './BrandTitle.js';

export default function LoginView({ onSubmit, error = '' } = {}) {
  return h('main', { className: 'canvas login-canvas' },
    h('header', { className: 'masthead' },
      h('span', { className: 'signature' }, 'Artis Angel'),
      h('span', { className: 'masthead-note' }, 'Um toque de delicadeza')
    ),
    h('section', { className: 'login-layout', 'aria-labelledby': 'login-title' },
      h('div', { className: 'login-intro' },
        h('div', { className: 'ornament', 'aria-hidden': 'true' }, h('span'), h('i'), h('span')),
        h('p', { className: 'eyebrow' }, 'BEM-VINDO À ARTIS ANGEL'),
        h(BrandTitle, { compact: true }),
        h('p', { className: 'login-caption' }, 'Um cantinho de arte e inspiração.')
      ),
      h('div', { className: 'login-panel' },
        h('p', { className: 'panel-eyebrow' }, 'SEU ACESSO'),
        h('h2', { id: 'login-title' }, 'Que bom ter você aqui.'),
        h('p', { className: 'login-subtitle' }, 'Entre para conhecer nosso cantinho.'),
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
    h('footer', { className: 'footer' }, h('span', null, 'Arte · delicadeza · inspiração'), h('span', { className: 'footer-note' }, 'Artis Angel'))
  );
}
