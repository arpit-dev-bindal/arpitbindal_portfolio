import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { portfolio } from '../src/content/portfolio.ts';
import { getPublicRecords } from '../src/content/validate.ts';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const output = 'design/phase-11/review';
await mkdir(output, { recursive: true });
const report = { checks: [], errors: [] };
try {
 const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
 page.on('pageerror', error => report.errors.push(error.message));
 await page.goto('http://127.0.0.1:4175/journey');
 const expected = getPublicRecords(portfolio).filter(r => ['career', 'education', 'event', 'plan'].includes(r.kind));
 assert.equal(await page.locator('.journey-entry').count(), expected.length);
 for (const record of expected) {
  const text = await page.locator(`#${record.id}`).textContent();
  assert.ok(text.includes(record.summary), record.id);
  assert.ok(text.includes(record.periodLabel), record.id);
 }
 assert.equal(await page.locator('#school p').first().evaluate(el => getComputedStyle(el).color), await page.locator('.career-heading').evaluate(el => getComputedStyle(el).color));
 assert.match(await page.locator('#smdevops').textContent(), /approximately December 2021/);
 assert.match(await page.locator('#ai-november').textContent(), /Planned continuation/);
 report.checks.push('All ten career, education, event, and plan records retain their source text and dates');
 for (const id of ['school', 'smdevops', 'lighthouse-frontend', 'ai-practice']) {
  await page.locator(`.career-jumps a[href="#${id}"]`).focus(); await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement.id), id);
 }
 await page.goto('http://127.0.0.1:4175/about');
 await page.locator('a[href="/journey#ethglobal-2025"]').click();
 assert.equal(new URL(page.url()).hash, '#ethglobal-2025');
 await page.reload(); assert.equal(await page.locator('#ethglobal-2025').isVisible(), true);
 await page.goBack(); assert.equal(new URL(page.url()).pathname, '/about');
 report.checks.push('Keyboard chapter links move focus; event links, reload, and browser history work');
 for (const route of ['journey', 'about']) {
  await page.goto(`http://127.0.0.1:4175/${route}`);
  assert.equal(await page.locator('h1').count(), 1);
  assert.ok(await page.locator('a[href$=".pdf"]').count() > 0);
  assert.doesNotMatch(await page.locator('main').textContent(), /certifications/i);
  for (const width of [320, 390, 768, 1024, 1440]) {
   await page.setViewportSize({ width, height: 1000 });
   assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${route} ${width}`);
  }
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.setViewportSize({ width: 1440, height: await page.evaluate(() => document.documentElement.scrollHeight) });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await page.screenshot({ path: `${output}/desktop-${route}.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.setViewportSize({ width: 390, height: await page.evaluate(() => document.documentElement.scrollHeight) });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await page.screenshot({ path: `${output}/mobile-${route}.png` });
 }
 report.checks.push('Both pages fit five widths, exclude certifications, and provide resume downloads');
 const plain = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
 await plain.goto('http://127.0.0.1:4175/journey');
 await plain.locator('.career-jumps a[href="#ai-practice"]').click();
 assert.equal(new URL(plain.url()).hash, '#ai-practice');
 assert.equal(await plain.locator('.journey-entry').count(), 10);
 await plain.goto('http://127.0.0.1:4175/about');
 assert.equal(await plain.locator('.about-events li').count(), 3);
 assert.equal(await plain.locator('.about-education article').count(), 2);
 report.checks.push('Career links, event content, and education remain available without JavaScript');
 assert.deepEqual(report.errors, []);
 console.log(`Passed ${report.checks.length} career check groups.`);
} finally { await writeFile(`${output}/browser-checks.json`, JSON.stringify(report, null, 2)); await browser.close(); }
