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

test('login displays Artis Angel with halo over the initial A of Angel, without old theme', () => {
  const html = renderToStaticMarkup(createElement(LoginView));
  assert.match(html, /<h1[^>]*aria-label="Artis Angel"/);
  assert.match(html, /class="angel-initial"><span class="halo" aria-hidden="true"><\/span>A<\/span>ngel/);
  assert.doesNotMatch(html, /Bolsonaro|Pátria|BRASIL|Louro|louro-jose|brazil-flag/);
});
