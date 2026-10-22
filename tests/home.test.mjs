import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Home from '../components/HomeView.js';

test('home shows Artis Angel, halo on the A in Angel, and logoff without old theme', () => {
  const html = renderToStaticMarkup(createElement(Home));
  assert.match(html, /<main[\s>]/);
  assert.match(html, /<h1[^>]*aria-label="Artis Angel"/);
  assert.match(html, /class="angel-initial"><span class="halo" aria-hidden="true"><\/span>A<\/span>ngel/);
  assert.match(html, /<button[^>]*aria-label="Sair \(logoff\)"[^>]*>Sair<\/button>/);
  assert.doesNotMatch(html, /Bolsonaro|Pátria|BRASIL|Louro|louro-jose|brazil-flag/);
});
