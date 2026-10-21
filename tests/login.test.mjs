import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

test('login view has labeled username/password fields, submit button and demo notice', async () => {
  const mod = await import('../components/LoginView.js').catch(() => ({}));
  assert.equal(typeof mod.default, 'function', 'Login screen must exist');
  const html = renderToStaticMarkup(createElement(mod.default));
  assert.match(html, /<form/);
  assert.match(html, /<label[^>]*for="username"/);
  assert.match(html, /name="username"/);
  assert.match(html, /type="password"/);
  assert.match(html, /<label[^>]*for="password"/);
  assert.match(html, /type="submit"/);
  assert.match(html, /demonstrativo/);
});
