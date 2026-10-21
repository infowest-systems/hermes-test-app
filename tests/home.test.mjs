import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Home from '../app/page.js';

test('home shows Artes Angel with a decorative halo attached to the A in Angel', () => {
  const html = renderToStaticMarkup(createElement(Home));
  assert.match(html, /<main[\s>]/);
  assert.match(html, /<h1[^>]*aria-label="Artes Angel"/);
  assert.match(html, /class="artes"[^>]*>Artes<\/span>/);
  assert.match(html, /class="angel-initial"><span class="halo" aria-hidden="true"><\/span>A<\/span>ngel/);
  assert.doesNotMatch(html, /Hello World|Hermes Test APP|<button|<input/);
});
