import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { routes } from '../src/site/routes.ts';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const base = 'http://127.0.0.1:4175';
const output = 'design/phase-4/review';
await mkdir(output, { recursive: true });
const report = { checks: [], errors: [] };
try {
  const page = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', error => report.errors.push(error.message));
  const links = new Set();
  for (const route of routes) {
    const response = await page.goto(base + route.path);
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('main').count(), 1);
    assert.equal(await page.title(), `${route.title} | Arpit Bindal`);
    const urls = await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => node.href));
    urls.filter(url => url.startsWith(base)).forEach(url => links.add(url));
    if (route.path !== '/' && !route.path.startsWith('/work/')) assert.equal(await page.locator('.site-nav [aria-current="page"]').getAttribute('href'), route.path);
    if (route.path.startsWith('/work/')) assert.equal(await page.locator('.site-nav [aria-current="location"]').getAttribute('href'), '/work');
  }
  for (const href of links) {
    const url = new URL(href);
    const response = await page.request.get(href);
    assert.equal(response.status(), 200, href);
    if (url.pathname.endsWith('.pdf')) { assert.equal((await response.body()).subarray(0,5).toString(), '%PDF-'); continue; }
    await page.goto(href);
    if (url.hash) assert.equal(await page.evaluate(id => Boolean(document.getElementById(id)), decodeURIComponent(url.hash.slice(1))), true, href);
  }
  report.checks.push(`Ten direct routes and ${links.size} local links resolve, including fragments and current-page labels`);
  assert.equal((await page.goto(base + '/work/backupdata/')).status(), 200);
  assert.equal((await page.goto(base + '/missing-page')).status(), 404);
  assert.equal(await page.locator('h1').textContent(), 'Page not found.');
  report.checks.push('Trailing slash routes work; unknown routes return a useful HTTP 404 page');
  await page.goto(base + '/work');
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
  await page.getByRole('link', { name: 'BackupData ↗', exact: true }).click();
  await page.waitForURL('**/work/backupdata');
  await page.goBack(); assert.equal(new URL(page.url()).pathname, '/work');
  await page.goForward(); assert.equal(new URL(page.url()).pathname, '/work/backupdata');
  await page.reload(); assert.equal(await page.locator('h1').count(), 1);
  report.checks.push('Skip link moves focus; browser back, forward, and reload retain correct routes');
  await page.goto(base + '/work');
  await page.screenshot({ path: `${output}/desktop-work.png`, fullPage: true });
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(base + route.path);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${route.path} at ${width}`);
    }
  }
  report.checks.push('All ten routes fit 320, 768, 1024, and 1440 pixel widths');
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on('pageerror', error => report.errors.push(error.message));
  await mobile.goto(base + '/work');
  const summary = mobile.locator('.mobile-navigation summary');
  await summary.focus(); await mobile.keyboard.press('Enter');
  await mobile.waitForFunction(() => document.querySelector('.mobile-navigation').open);
  await mobile.keyboard.press('Tab');
  assert.equal(await mobile.evaluate(() => document.activeElement.getAttribute('href')), '/work');
  await mobile.keyboard.press('Escape');
  assert.equal(await mobile.evaluate(() => document.activeElement.tagName), 'SUMMARY');
  assert.equal(await summary.getAttribute('aria-expanded'), 'false');
  await summary.click();
  await mobile.screenshot({ path: `${output}/mobile-menu.png` });
  await mobile.getByRole('navigation', { name: 'Mobile', exact: true }).getByRole('link', { name: 'Journey' }).click();
  await mobile.waitForURL('**/journey');
  assert.equal(await mobile.locator('.mobile-navigation').getAttribute('open'), null);
  await summary.click(); await mobile.setViewportSize({ width: 1024, height: 900 });
  await mobile.waitForFunction(() => !document.querySelector('.mobile-navigation').open);
  report.checks.push('Mobile menu supports Enter, Tab, Escape, focus return, navigation, and desktop resize');
  await mobile.getByRole('button', { name: 'Motion: on' }).click();
  await mobile.goto(base);
  await mobile.locator('.visitor-scene').waitFor();
  assert.equal(await mobile.locator('canvas').count(), 0);
  await mobile.getByRole('button', { name: 'Motion: off' }).click();
  await mobile.locator('.scene-widget[data-ready="true"]').waitFor();
  await mobile.locator('.scene-display summary').click();
  await mobile.getByRole('button', { name: 'Systems', exact: true }).click();
  await mobile.getByText('Backend, SDKs, and infrastructure.', { exact: true }).first().waitFor();
  await mobile.locator('.scene-display summary').click();
  await mobile.getByRole('link', { name: 'View my work', exact: false }).click();
  await mobile.locator('#film-root').scrollIntoViewIfNeeded();
  await mobile.locator('.scroll-film[data-ready="true"]').waitFor();
  assert.equal(await mobile.evaluate(() => 'portfolioPrototype' in window), false);
  report.checks.push('Motion preference survives routes; Home scene and film load without the prototype test interface');
  const plain = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await plain.goto(base + '/about');
  await plain.locator('.mobile-navigation summary').click();
  await plain.getByRole('navigation', { name: 'Mobile', exact: true }).getByRole('link', { name: 'Contact' }).click();
  await plain.waitForURL('**/contact');
  assert.equal(await plain.locator('main a[href^="mailto:"]').count(), 1);
  report.checks.push('Mobile navigation and contact links work without JavaScript');
  assert.deepEqual(report.errors, []);
  console.log(`Passed ${report.checks.length} route and navigation check groups.`);
} finally {
  await writeFile(`${output}/browser-checks.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
