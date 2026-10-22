import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Home from '../components/HomeView.js';

test('Exclusive Media home presents photography inspiration, real section links and Renato logoff', () => {
  const html = renderToStaticMarkup(createElement(Home));
  assert.match(html, /<main[\s>]/);
  assert.match(html, /aria-label="Exclusive Media"/);
  assert.match(html, /<h1[^>]*aria-label="O seu olhar em primeiro plano\."/);
  assert.match(html, /Olá, Renato/);
  assert.match(html, /<button[^>]*aria-label="Sair \(logoff\)"[^>]*>Sair<\/button>/);
  assert.match(html, /href="#inspiracao"/);
  assert.match(html, /id="inspiracao"/);
  assert.match(html, /id="sobre"/);
  assert.match(html, /landscape\.webp/);
  assert.match(html, /architecture\.webp/);
  assert.match(html, /camera\.webp/);
  assert.doesNotMatch(html, /Artis|Artes|Angel|halo|Hermes|Bolsonaro|Pátria|Louro/);
});
