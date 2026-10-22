import { createElement as h } from 'react';
import BrandTitle from './BrandTitle.js';

export default function LoginView({ onSubmit, error = '' } = {}) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return h('main', { className: 'site-shell login-shell' },
    h('header', { className: 'masthead page-width' }, h(BrandTitle), h('span', { className: 'masthead-note' }, 'ESPAÇO DO FOTÓGRAFO')),
    h('section', { className: 'login-layout page-width', 'aria-labelledby': 'login-title' },
      h('figure', { className: 'login-story' },
        h('img', { src: `${base}/images/camera.webp`, alt: 'Câmera analógica sobre um mapa com fotografias impressas', width: 1000, height: 750, decoding: 'async', fetchPriority: 'high' }),
        h('figcaption', { className: 'story-caption' },
          h('p', { className: 'eyebrow' }, 'LUZ. INTENÇÃO. PERSPECTIVA.'),
          h('h1', null, 'Fotografia é sobre ', h('em', null, 'ver além.')),
          h('p', null, 'Seu próximo enquadramento começa com um novo olhar.')
        )
      ),
      h('div', { className: 'login-panel' },
        h('p', { className: 'eyebrow' }, 'EXCLUSIVE MEDIA / ACESSO'),
        h('h2', { id: 'login-title' }, 'Bem-vindo', h('em', null, 'de volta.')),
        h('p', { className: 'login-subtitle' }, 'Entre no seu espaço de inspiração e fotografia.'),
        h('form', { onSubmit, 'aria-describedby': 'demo-notice' },
          h('label', { htmlFor: 'username' }, 'Usuário'),
          h('input', { id: 'username', name: 'username', type: 'text', autoComplete: 'username', autoCapitalize: 'none', spellCheck: false, required: true }),
          h('label', { htmlFor: 'password' }, 'Senha'),
          h('input', { id: 'password', name: 'password', type: 'password', autoComplete: 'current-password', required: true }),
          error ? h('p', { className: 'form-error', role: 'alert' }, error) : null,
          h('button', { type: 'submit', className: 'primary-button' }, 'Entrar', h('span', { 'aria-hidden': 'true' }, '↗'))
        ),
        h('p', { id: 'demo-notice', className: 'demo-notice' }, 'Acesso demonstrativo no navegador. Não utilize uma senha pessoal.')
      )
    ),
    h('footer', { className: 'footer page-width' }, h('span', null, 'Exclusive Media — Fotografia, com intenção.'), h('a', { href: 'https://unsplash.com/license', target: '_blank', rel: 'noopener noreferrer' }, 'Imagem de referência: Unsplash'))
  );
}
