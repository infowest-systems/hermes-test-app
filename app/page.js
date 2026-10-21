import { createElement as h } from 'react';

export default function Home() {
  return h('main', { className: 'canvas' },
    h('header', { className: 'masthead' },
      h('span', { className: 'brand' }, h('span', { className: 'brand-mark', 'aria-hidden': 'true' }), 'BRASIL'),
      h('span', { className: 'masthead-note' }, 'VERDE & AMARELO')
    ),
    h('section', { className: 'hero', 'aria-labelledby': 'page-title' },
      h('div', { className: 'message' },
        h('p', { className: 'eyebrow' }, 'DE VERDE E AMARELO'),
        h('h1', { id: 'page-title', 'aria-label': 'Deus, Pátria e Família' },
          h('span', null, 'Deus,'),
          h('span', null, 'Pátria e'),
          h('span', { className: 'highlight' }, 'Família')
        ),
        h('p', { className: 'campaign' }, 'Bolsonaro 2026')
      ),
      h('div', { className: 'flag-composition', 'aria-hidden': 'true' },
        h('div', { className: 'brazil-flag', 'aria-hidden': 'true' },
          h('div', { className: 'flag-diamond' }, h('div', { className: 'flag-globe' }, h('span', { className: 'flag-band' })))
        ),
        h('span', { className: 'flag-caption' }, 'BRASIL · 2026')
      )
    ),
    h('footer', { className: 'footer' },
      h('span', null, 'Deus, Pátria e Família'),
      h('span', { className: 'footer-note' }, 'Página pessoal · sem vínculo oficial')
    )
  );
}
