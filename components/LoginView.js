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
        h('div', { className: 'login-welcome' },
          h('figure', { className: 'login-mascot' },
            h('img', {
              src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/louro-jose.jpg`,
              alt: 'Louro José, o papagaio, de smoking',
              width: 231,
              height: 414,
              decoding: 'async'
            }),
            h('figcaption', null,
              h('a', { href: 'https://gshow.globo.com/programas/mais-voce/stories/2020/11/02/tom-veiga-o-inesquecivel-louro-jose-confira-imagens-marcantes-do-ator-e-seu-personagem-que-encantou-o-brasil.ghtml', target: '_blank', rel: 'noopener noreferrer' }, 'Fonte: gshow')
            )
          ),
          h('div', null,
            h('h2', { id: 'login-title' }, 'Acesse sua conta'),
            h('p', { className: 'login-subtitle' }, 'Informe seu usuário e sua senha.'),
            h('p', { className: 'photo-notice' }, 'Imagem decorativa, sem vínculo oficial.')
          )
        ),
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
