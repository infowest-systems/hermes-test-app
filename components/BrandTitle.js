import { createElement as h } from 'react';

export default function BrandTitle({ id, compact = false } = {}) {
  return h('h1', { id, className: `brand-title${compact ? ' brand-title--compact' : ''}`, 'aria-label': 'Artis Angel' },
    h('span', { className: 'brand-first' }, 'Artis'),
    h('span', { className: 'brand-angel' },
      h('span', { className: 'angel-initial' }, h('span', { className: 'halo', 'aria-hidden': 'true' }), 'A'), 'ngel'
    )
  );
}
