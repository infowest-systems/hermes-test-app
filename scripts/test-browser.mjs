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
      const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.txt': 'text/plain', '.json': 'application/json', '.webp': 'image/webp' };
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
  await page.getByRole('heading', { name: 'Fotografia é sobre ver além.', exact: true }).waitFor();
  assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(20, 21, 19)');
  await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
  assert.doesNotMatch(await page.locator('body').innerText(), /Artis|Artes|Angel|Hermes|Bolsonaro|Pátria|Louro/);
  console.log('PASS: Exclusive Media photography login and local photograph load');
  await page.getByLabel('Usuário', { exact: true }).fill('Renato');
  await page.getByLabel('Senha', { exact: true }).fill('wrong');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.getByRole('alert').filter({ hasText: 'Usuário ou senha incorretos.' }).waitFor();
  console.log('PASS: wrong credentials show an error');
  if (process.env.SCREENSHOT_DIR) {
    await mkdir(process.env.SCREENSHOT_DIR, { recursive: true });
    await page.screenshot({ path: path.join(process.env.SCREENSHOT_DIR, 'login-desktop.png'), fullPage: true });
  }

  await page.getByLabel('Usuário', { exact: true }).fill('Hermes');
  await page.getByLabel('Senha', { exact: true }).fill('1234');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.getByRole('alert').filter({ hasText: 'Usuário ou senha incorretos.' }).waitFor();
  console.log('PASS: previous account Hermes / 1234 is rejected');
  await page.getByLabel('Usuário', { exact: true }).fill('Renato');
  await page.getByLabel('Senha', { exact: true }).fill('321');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.waitForURL(baseURL + 'home/');
  await page.getByRole('heading', { name: 'O seu olhar em primeiro plano.', exact: true }).waitFor();
  await page.getByRole('button', { name: 'Sair (logoff)', exact: true }).waitFor();
  console.log('PASS: Renato / 321 opens photography home with logoff');

  await page.getByRole('link', { name: 'Explorar inspiração', exact: true }).click();
  await page.waitForURL(baseURL + 'home/#inspiracao');
  await page.waitForFunction(() => [...document.images].length === 3 && [...document.images].every(image => image.complete && image.naturalWidth > 0));
  await page.getByRole('link', { name: 'Nosso olhar', exact: true }).click();
  await page.waitForURL(baseURL + 'home/#sobre');
  console.log('PASS: gallery and about navigation work, all three photographs load');
  await page.reload();
  await page.getByText('Olá, Renato', { exact: true }).waitFor();
  await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
  console.log('PASS: refresh preserves the tab session');
  if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: path.join(process.env.SCREENSHOT_DIR, 'home-desktop.png'), fullPage: true });

  await page.getByRole('button', { name: 'Sair (logoff)', exact: true }).click();
  await page.waitForURL(baseURL);
  await page.getByLabel('Usuário', { exact: true }).waitFor();
  assert.equal(await page.evaluate(() => sessionStorage.getItem('hermes-test-app:demo-session')), null);
  await page.goto(baseURL + 'home/');
  await page.waitForURL(baseURL);
  await page.getByRole('button', { name: 'Entrar', exact: true }).waitFor();
  console.log('PASS: logoff clears session; direct home access returns to login');

  const freshContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobile = await freshContext.newPage();
  mobile.on('pageerror', error => errors.push(error.message));
  await mobile.goto(baseURL + 'home/');
  await mobile.waitForURL(baseURL);
  await mobile.getByLabel('Usuário', { exact: true }).waitFor();
  await mobile.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
  assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  if (process.env.SCREENSHOT_DIR) await mobile.screenshot({ path: path.join(process.env.SCREENSHOT_DIR, 'login-mobile.png'), fullPage: true });
  await mobile.getByLabel('Usuário', { exact: true }).fill('Renato');
  await mobile.getByLabel('Senha', { exact: true }).fill('321');
  await mobile.getByRole('button', { name: 'Entrar', exact: true }).click();
  await mobile.waitForURL(baseURL + 'home/');
  await mobile.getByRole('button', { name: 'Sair (logoff)', exact: true }).waitFor();
  await mobile.getByRole('link', { name: 'Explorar inspiração', exact: true }).click();
  await mobile.waitForURL(baseURL + 'home/#inspiracao');
  await mobile.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
  assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  if (process.env.SCREENSHOT_DIR) await mobile.screenshot({ path: path.join(process.env.SCREENSHOT_DIR, 'home-mobile.png'), fullPage: true });
  await mobile.getByRole('button', { name: 'Sair (logoff)', exact: true }).click();
  await mobile.waitForURL(baseURL);
  console.log('PASS: fresh tab requires login; mobile login/gallery/logout work without overflow');
  assert.deepEqual(errors, []);
  console.log('PASS: no browser JavaScript errors');
} finally {
  if (browser) await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
}
