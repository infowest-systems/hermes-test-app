import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const root = path.resolve('out');
const prefix = '/hermes-test-app';
let server;
let baseURL = process.env.TEST_BASE_URL;
if (!baseURL) {
  server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (!pathname.startsWith(prefix + '/')) { response.writeHead(404).end(); return; }
      let file = path.resolve(root, '.' + pathname.slice(prefix.length));
      if (file !== root && !file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
      if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
      const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.txt': 'text/plain', '.json': 'application/json', '.jpg': 'image/jpeg' };
      response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
      response.end(await readFile(file));
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  baseURL = `http://127.0.0.1:${server.address().port}${prefix}/`;
}
baseURL = baseURL.replace(/\/?$/, '/');
let browser;
try {
  browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(baseURL);
  await page.getByRole('img', { name: 'Louro José, o papagaio, de smoking', exact: true }).waitFor();
  await page.waitForFunction(() => { const image = document.querySelector('.login-mascot img'); return image && image.complete && image.naturalWidth > 0; });
  console.log('PASS: Louro José photo loads on login');
  await page.getByLabel('Usuário', { exact: true }).fill('Hermes');
  await page.getByLabel('Senha', { exact: true }).fill('wrong');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.getByRole('alert').filter({ hasText: 'Usuário ou senha incorretos.' }).waitFor();
  console.log('PASS: wrong credentials show an error');

  if (process.env.SCREENSHOT_DIR) {
    await mkdir(process.env.SCREENSHOT_DIR, { recursive: true });
    await page.screenshot({ path: path.join(process.env.SCREENSHOT_DIR, 'login-desktop.png'), fullPage: true });
  }
  await page.getByLabel('Senha', { exact: true }).fill('123');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.waitForURL(baseURL + 'home/');
  await page.getByRole('heading', { name: 'Deus, Pátria e Família', exact: true }).waitFor();
  await page.getByRole('button', { name: 'Sair (logoff)', exact: true }).waitFor();
  console.log('PASS: Hermes / 123 opens home with logoff');
  await page.reload();
  await page.getByText('Olá, Hermes', { exact: true }).waitFor();
  console.log('PASS: refresh preserves the tab session');
  if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: path.join(process.env.SCREENSHOT_DIR, 'home-desktop.png'), fullPage: true });

  await page.getByRole('button', { name: 'Sair (logoff)', exact: true }).click();
  await page.waitForURL(baseURL);
  await page.getByLabel('Usuário', { exact: true }).waitFor();
  assert.equal(await page.evaluate(() => sessionStorage.getItem('hermes-test-app:demo-session')), null);
  await page.goto(baseURL + 'home/');
  await page.waitForURL(baseURL);
  await page.getByRole('button', { name: 'Entrar', exact: true }).waitFor();
  console.log('PASS: logoff clears the session and direct home access returns to login');

  const freshContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobile = await freshContext.newPage();
  mobile.on('pageerror', error => errors.push(error.message));
  await mobile.goto(baseURL + 'home/');
  await mobile.waitForURL(baseURL);
  await mobile.getByLabel('Usuário', { exact: true }).waitFor();
  assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  if (process.env.SCREENSHOT_DIR) await mobile.screenshot({ path: path.join(process.env.SCREENSHOT_DIR, 'login-mobile.png'), fullPage: true });
  await mobile.getByLabel('Usuário', { exact: true }).fill('Hermes');
  await mobile.getByLabel('Senha', { exact: true }).fill('123');
  await mobile.getByRole('button', { name: 'Entrar', exact: true }).click();
  await mobile.waitForURL(baseURL + 'home/');
  await mobile.getByRole('button', { name: 'Sair (logoff)', exact: true }).waitFor();
  assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await mobile.getByRole('button', { name: 'Sair (logoff)', exact: true }).click();
  await mobile.waitForURL(baseURL);
  console.log('PASS: fresh tab requires login; mobile login and logout work without horizontal overflow');
  assert.deepEqual(errors, []);
  console.log('PASS: no browser JavaScript errors');
} finally {
  if (browser) await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
}
