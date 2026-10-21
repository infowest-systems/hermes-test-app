import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Home from '../app/page.js';

test('static Brazil page shows the requested slogan and Bolsonaro 2026', () => {
  const html = renderToStaticMarkup(createElement(Home));
  assert.match(html, /<main[\s>]/);
  assert.match(html, /<h1[^>]*aria-label="Deus, Pátria e Família"/);
  assert.match(html, /Bolsonaro 2026/);
  assert.match(html, /class="brazil-flag" aria-hidden="true"/);
  assert.doesNotMatch(html, /Artes Angel|class="halo"|Hello World|<button|<input/);
});
