import { createElement as h } from 'react';
import './globals.css';

export const metadata = {
  title: 'Brasil | Deus, Pátria e Família',
  description: 'Página pessoal em verde e amarelo. Deus, Pátria e Família. Bolsonaro 2026.'
};

export default function RootLayout({ children }) {
  return h('html', { lang: 'pt-BR' }, h('body', null, children));
}
