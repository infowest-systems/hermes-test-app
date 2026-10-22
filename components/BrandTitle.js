import { createElement as h } from 'react';

export default function BrandTitle() {
  return h('span', { className: 'wordmark', 'aria-label': 'Exclusive Media' },
    h('span', { className: 'wordmark-symbol', 'aria-hidden': 'true' }, 'EM'),
    h('span', { className: 'wordmark-type' }, h('span', null, 'EXCLUSIVE'), h('span', { className: 'wordmark-media' }, 'MEDIA'))
  );
}
