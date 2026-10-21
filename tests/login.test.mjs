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

test('login includes Louro José photo with alt text and correct root/Pages asset paths', async () => {
  const { default: LoginView } = await import('../components/LoginView.js');
  const previous = process.env.NEXT_PUBLIC_BASE_PATH;
  try {
    for (const basePath of ['', '/hermes-test-app']) {
      process.env.NEXT_PUBLIC_BASE_PATH = basePath;
      const html = renderToStaticMarkup(createElement(LoginView));
      assert.ok(html.includes(`src="${basePath}/images/louro-jose.jpg"`));
      assert.match(html, /alt="Louro José, o papagaio, de smoking"/);
      assert.match(html, /Fonte: gshow/);
    }
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = previous;
  }
});
