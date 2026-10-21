import { createElement as h } from 'react';
import './globals.css';

export const metadata = {
  title: 'Artes Angel',
  description: 'Artes Angel. A beleza mora nos detalhes.'
};

export default function RootLayout({ children }) {
  return h('html', { lang: 'pt-BR' }, h('body', null, children));
}
