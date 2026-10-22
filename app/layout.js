import { createElement as h } from 'react';
import './globals.css';

export const metadata = {
  title: 'Exclusive Media | Fotografia em primeiro plano',
  description: 'Um espaço de inspiração, composição e expressão para profissionais de fotografia. Exclusive Media.'
};

export default function RootLayout({ children }) {
  return h('html', { lang: 'pt-BR' }, h('body', null, children));
}
