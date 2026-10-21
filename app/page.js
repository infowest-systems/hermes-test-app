import { createElement as h } from 'react';

export default function Home() {
  return h('main', { className: 'welcome' },
    h('header', { className: 'brand' }, 'Hermes Test APP'),
    h('section', { className: 'message', 'aria-labelledby': 'hello' },
      h('p', { className: 'eyebrow' }, 'UMA IDEIA. UM PRIMEIRO PASSO.'),
      h('h1', { id: 'hello' }, 'Hello World'),
      h('p', { className: 'intro' }, 'Todo projeto começa com um olá. Este é o nosso.'),
      h('a', { className: 'repo', href: 'https://github.com/infowest-systems/hermes-test-app' }, 'Ver código no GitHub ↗')
    ),
    h('footer', null, h('span', null, 'Feito com Next.js + React'), h('span', null, 'Olá, mundo.'))
  );
}
