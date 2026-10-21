import { createElement as h } from 'react';
import './globals.css';

export const metadata = {
  title: 'Hermes Test APP | Hello World',
  description: 'Todo projeto começa com um olá. Uma aplicação simples feita com Next.js e React.'
};

export default function RootLayout({ children }) {
  return h('html', { lang: 'pt-BR' }, h('body', null, children));
}
