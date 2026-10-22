import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import LoginView from '../components/LoginView.js';

test('login has labeled username/password fields, submit button and demo notice', () => {
  const html = renderToStaticMarkup(createElement(LoginView));
  assert.match(html, /<form/);
  assert.match(html, /<label[^>]*for="username"/);
  assert.match(html, /name="username"/);
  assert.match(html, /type="password"/);
  assert.match(html, /<label[^>]*for="password"/);
  assert.match(html, /type="submit"/);
  assert.match(html, /demonstrativo/);
});

test('Exclusive Media login features photography with correct root and Pages image paths', () => {
  const old = process.env.NEXT_PUBLIC_BASE_PATH;
  try {
    for (const base of ['', '/hermes-test-app']) {
      process.env.NEXT_PUBLIC_BASE_PATH = base;
      const html = renderToStaticMarkup(createElement(LoginView));
      assert.match(html, /aria-label="Exclusive Media"/);
      assert.ok(html.includes(`src="${base}/images/camera.webp"`));
      assert.match(html, /Fotografia/);
      assert.doesNotMatch(html, /Artis|Artes|Angel|halo|Hermes|Bolsonaro|Pátria|Louro/);
    }
  } finally {
    if (old === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = old;
  }
});
