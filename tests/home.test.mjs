import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

test('home renders Hello World in an accessible main heading', async () => {
  const page = await import('../app/page.js').catch(() => ({}));
  assert.equal(typeof page.default, 'function', 'Home page must exist');
  const html = renderToStaticMarkup(createElement(page.default));
  assert.match(html, /<main[\s>]/);
  assert.match(html, /<h1[^>]*>Hello World[.!]?<\/h1>/);
  assert.match(html, /Hermes Test APP/);
});
