import { createElement as h } from 'react';
import BrandTitle from './BrandTitle.js';

export default function HomeView({ onLogout, error = '' } = {}) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return h('main', { className: 'site-shell' },
    h('header', { className: 'masthead page-width' },
      h(BrandTitle),
      h('nav', { className: 'main-nav', 'aria-label': 'Navegação principal' },
        h('a', { href: '#inspiracao' }, 'Inspiração'),
        h('a', { href: '#sobre' }, 'Nosso olhar')
      ),
      h('div', { className: 'session-actions' },
        h('span', { className: 'session-user' }, 'Olá, Renato'),
        h('button', { type: 'button', className: 'logout-button', onClick: onLogout, 'aria-label': 'Sair (logoff)' }, 'Sair')
      )
    ),
    error ? h('p', { role: 'alert', className: 'form-error page-width' }, error) : null,
    h('section', { className: 'home-hero page-width', 'aria-labelledby': 'page-title' },
      h('div', { className: 'hero-copy' },
        h('p', { className: 'eyebrow' }, 'PARA QUEM VIVE A FOTOGRAFIA'),
        h('h1', { id: 'page-title', 'aria-label': 'O seu olhar em primeiro plano.' }, 'O seu olhar', h('em', null, 'em primeiro plano.')),
        h('p', { className: 'hero-description' }, 'Luz, intenção e uma perspectiva só sua. Um espaço de inspiração para profissionais que enxergam além do óbvio.'),
        h('a', { className: 'primary-link', href: '#inspiracao' }, 'Explorar inspiração', h('span', { 'aria-hidden': 'true' }, '↗')),
        h('p', { className: 'hero-footnote' }, 'FOTOGRAFIA · COMPOSIÇÃO · EXPRESSÃO')
      ),
      h('figure', { className: 'featured-photo' },
        h('img', { src: `${base}/images/landscape.webp`, alt: 'Montanhas verdes envolvidas em neblina sob a luz do entardecer', width: 1400, height: 834, decoding: 'async', fetchPriority: 'high' }),
        h('figcaption', null, h('span', null, 'PAISAGEM / LUZ NATURAL'), h('span', null, 'Imagem de referência'))
      )
    ),
    h('section', { id: 'inspiracao', className: 'inspiration', 'aria-labelledby': 'inspiration-title' },
      h('div', { className: 'page-width' },
        h('div', { className: 'section-heading' },
          h('div', null, h('p', { className: 'eyebrow' }, 'GALERIA DE INSPIRAÇÃO'), h('h2', { id: 'inspiration-title' }, 'Cada enquadramento,', h('em', null, 'uma possibilidade.'))),
          h('p', { className: 'section-description' }, 'Explore diferentes linguagens visuais. Fotografias de referência para despertar novas ideias, não um portfólio autoral da Exclusive Media.')
        ),
        h('div', { className: 'photo-grid' },
          h('figure', { className: 'photo-item architecture-item' },
            h('a', { href: `${base}/images/architecture.webp`, target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Ampliar fotografia de arquitetura' },
              h('img', { src: `${base}/images/architecture.webp`, alt: 'Edifício de arquitetura contemporânea com planos brancos e fachada de vidro', width: 1000, height: 667, loading: 'lazy', decoding: 'async' })),
            h('figcaption', null, h('span', { className: 'photo-category' }, 'ARQUITETURA'), h('h3', null, 'A linguagem dos espaços'), h('p', null, 'Linhas, formas e o diálogo entre luz e estrutura.'))
          ),
          h('figure', { className: 'photo-item camera-item' },
            h('a', { href: `${base}/images/camera.webp`, target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Ampliar fotografia de câmera analógica' },
              h('img', { src: `${base}/images/camera.webp`, alt: 'Câmera analógica sobre um mapa, ao lado de fotografias impressas', width: 1000, height: 750, loading: 'lazy', decoding: 'async' })),
            h('figcaption', null, h('span', { className: 'photo-category' }, 'PROCESSO CRIATIVO'), h('h3', null, 'Antes do primeiro clique'), h('p', null, 'O equipamento registra. A intenção transforma.'))
          )
        )
      )
    ),
    h('section', { id: 'sobre', className: 'editorial-about page-width', 'aria-labelledby': 'about-title' },
      h('p', { className: 'eyebrow' }, 'O OLHAR EXCLUSIVE MEDIA'),
      h('div', { className: 'about-copy' },
        h('h2', { id: 'about-title' }, 'Técnica encontra', h('em', null, 'sensibilidade.')),
        h('p', null, 'Fotografar é fazer escolhas. O instante, a distância, a luz que entra e aquilo que fica de fora. Aqui, a fotografia ganha espaço para ser observada com calma — e pensada com intenção.')
      )
    ),
    h('footer', { className: 'footer page-width' },
      h(BrandTitle),
      h('span', null, 'Fotografia, com intenção.'),
      h('a', { href: 'https://unsplash.com/license', target: '_blank', rel: 'noopener noreferrer' }, 'Imagens de referência: Unsplash')
    )
  );
}
