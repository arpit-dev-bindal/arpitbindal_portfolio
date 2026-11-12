import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { profile } from '../src/content/portfolio.ts';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const output = 'design/phase-12/review';
await mkdir(output, { recursive: true });
const report = { checks: [], errors: [] };
try {
 const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
 page.on('pageerror', error => report.errors.push(error.message));
 await page.addInitScript(() => {
  window.copiedValues = [];
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.copiedValues.push(value); } } });
 });
 await page.goto('http://127.0.0.1:4175/contact');
 assert.equal(await page.locator('#contact-email').getAttribute('href'), `mailto:${profile.contact.email}`);
 for (const name of ['linkedin', 'github']) assert.equal(await page.locator(`.contact-profiles a[href="${profile.contact[name]}"]`).count(), 1);
 const copy = page.locator('[data-copy-email]');
 await copy.waitFor({ state: 'visible' }); await copy.focus(); await page.keyboard.press('Enter');
 await page.waitForFunction(() => document.querySelector('#copy-status').textContent === 'Email address copied.');
 assert.deepEqual(await page.evaluate(() => window.copiedValues), [profile.contact.email]);
 assert.equal(await page.evaluate(() => document.activeElement.hasAttribute('data-copy-email')), true);
 report.checks.push('Contact links use source data; keyboard copy passes the exact address and retains focus');
 await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error('Denied'); }; });
 await copy.click();
 await page.waitForFunction(() => document.querySelector('#copy-status').textContent.startsWith('Copy failed.'));
 assert.equal(await copy.getAttribute('aria-disabled'), null);
 await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: undefined }));
 await copy.click();
 await page.waitForFunction(() => document.querySelector('#copy-status').textContent.startsWith('Copy failed.'));
 assert.equal(await page.locator('#contact-email').textContent(), profile.contact.email);
 assert.equal(await page.locator('#copy-status').getAttribute('role'), 'status');
 report.checks.push('Denied and unavailable clipboard paths preserve the email and announce manual-copy instructions');
 for (const width of [320, 390, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, String(width));
 }
 for (const [name, width] of [['desktop',1440], ['mobile',390]]) {
  await page.goto('http://127.0.0.1:4175/contact');
  await page.setViewportSize({ width, height: 900 });
  await page.evaluate(() => document.fonts.ready);
  await page.setViewportSize({ width, height: await page.evaluate(() => document.documentElement.scrollHeight) });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await page.screenshot({ path: `${output}/${name}-contact.png` });
 }
 report.checks.push('Contact fits five viewport widths with selectable email and visible controls');
 const plain = await browser.newPage({ javaScriptEnabled: false, viewport: { width:390, height:844 }, reducedMotion:'reduce' });
 await plain.goto('http://127.0.0.1:4175/contact');
 assert.equal(await plain.locator('[data-copy-email]').isVisible(), false);
 assert.equal(await plain.locator('#contact-email').isVisible(), true);
 assert.equal(await plain.locator('.contact-profiles a').count(), 3);
 assert.ok(await plain.locator('a[href$=".pdf"]').count() > 0);
 await plain.locator('.contact-context a[href="/journey"]').click();
 assert.equal(new URL(plain.url()).pathname, '/journey');
 report.checks.push('Email, profiles, and portfolio links work without JavaScript; the resume link remains available');
 assert.deepEqual(report.errors, []);
 console.log(`Passed ${report.checks.length} Contact check groups.`);
} finally { await writeFile(`${output}/browser-checks.json`, JSON.stringify(report, null, 2)); await browser.close(); }
