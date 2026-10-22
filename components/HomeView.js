import { createElement as h } from 'react';
import BrandTitle from './BrandTitle.js';

export default function HomeView({ onLogout, error = '' } = {}) {
  return h('main', { className: 'canvas' },
    h('header', { className: 'masthead' },
      h('span', { className: 'signature' }, 'Artis Angel'),
      h('div', { className: 'session-actions' },
        h('span', { className: 'session-user' }, 'Olá, Hermes'),
        h('button', { type: 'button', className: 'logout-button', onClick: onLogout, 'aria-label': 'Sair (logoff)' }, 'Sair')
      )
    ),
    error ? h('p', { role: 'alert', className: 'form-error' }, error) : null,
    h('section', { className: 'hero', 'aria-labelledby': 'page-title' },
      h('div', { className: 'ornament', 'aria-hidden': 'true' }, h('span'), h('i'), h('span')),
      h('p', { className: 'eyebrow' }, 'ARTE QUE ENCANTA'),
      h(BrandTitle, { id: 'page-title' }),
      h('p', { className: 'tagline' }, 'A beleza mora nos detalhes.'),
      h('span', { className: 'finishing-line', 'aria-hidden': 'true' })
    ),
    h('footer', { className: 'footer' }, h('span', null, 'Arte · delicadeza · inspiração'), h('span', { className: 'footer-note' }, 'Feito para encantar.'))
  );
}
