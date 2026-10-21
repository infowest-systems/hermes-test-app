import { createElement as h } from 'react';

export default function Home() {
  return h('main', { className: 'canvas' },
    h('header', { className: 'masthead' },
      h('span', { className: 'signature' }, 'Artes Angel'),
      h('span', { className: 'masthead-note' }, 'Um toque de delicadeza')
    ),
    h('section', { className: 'hero', 'aria-labelledby': 'brand-title' },
      h('div', { className: 'ornament', 'aria-hidden': 'true' }, h('span'), h('i'), h('span')),
      h('p', { className: 'eyebrow' }, 'ARTE QUE ENCANTA'),
      h('h1', { id: 'brand-title', 'aria-label': 'Artes Angel' },
        h('span', { className: 'artes' }, 'Artes'),
        h('span', { className: 'angel' },
          h('span', { className: 'angel-initial' }, h('span', { className: 'halo', 'aria-hidden': 'true' }), 'A'), 'ngel')
      ),
      h('p', { className: 'tagline' }, 'A beleza mora nos detalhes.'),
      h('span', { className: 'finishing-line', 'aria-hidden': 'true' })
    ),
    h('footer', { className: 'footer' },
      h('span', null, 'Arte · delicadeza · inspiração'),
      h('span', { className: 'footer-note' }, 'Feito para encantar.')
    )
  );
}
