import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const output = 'design/phase-5/review';
await mkdir(output, { recursive: true });
const report = { checks: [], errors: [] };
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', error => report.errors.push(error.message));
  const requests = []; page.on('request', request => requests.push(request.url()));
  assert.equal((await page.goto('http://127.0.0.1:4175/work/backupdata')).status(), 200);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(requests.some(url => /SceneCanvas|home-.*\.js|\.mp4/.test(url)), false);
  for (const detail of await page.locator('.scope-explorer details').all()) {
    await detail.locator('summary').focus(); await page.keyboard.press('Enter');
    assert.notEqual(await detail.getAttribute('open'), null);
    assert.equal(await detail.locator('.scope-detail').isVisible(), true);
    await page.keyboard.press('Space');
    assert.equal(await detail.getAttribute('open'), null);
  }
  report.checks.push('All four contribution controls support keyboard open and close; the study requests no Home media');
  for (const link of await page.getByRole('navigation', { name: 'Study contents' }).locator('a').all()) {
    const href = await link.getAttribute('href');
    await link.click();
    assert.equal(new URL(page.url()).hash, href);
    assert.equal(await page.evaluate(() => document.activeElement.id), href.slice(1));
  }
  report.checks.push('Contents links move URL and keyboard focus to each study section');
  assert.equal(await page.getByText('About this account', { exact: true }).count(), 0);
  assert.equal(await page.locator('.study-hero-visual .project-visual').count(), 1);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: `${output}/desktop-study.png`, fullPage: true });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}`);
  }
  report.checks.push('The open study fits five viewport widths from 320 to 1440 pixels');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('.scope-plus').first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  await page.goto('http://127.0.0.1:4175/work/backupdata#system');
  await page.waitForTimeout(100);
  assert.equal(await page.locator('#system').evaluate(el => Math.abs(el.getBoundingClientRect().top) < 150), true);
  report.checks.push('Reduced motion removes control animation; direct section URLs retain the target');
  const plain = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await plain.goto('http://127.0.0.1:4175/work/backupdata');
  await plain.locator('#scope-sdks summary').click();
  assert.equal(await plain.getByText('I built the Node.js, Go, and Python SDKs.', { exact: true }).isVisible(), true);
  assert.equal(await plain.locator('canvas, video').count(), 0);
  await plain.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await plain.screenshot({ path: `${output}/mobile-study.png`, fullPage: true });
  await plain.getByRole('link', { name: 'Explore AI Systems' }).click();
  await plain.waitForURL('**/ai-systems');
  report.checks.push('Study content, contribution controls, and onward links work without JavaScript');
  assert.deepEqual(report.errors, []);
  console.log(`Passed ${report.checks.length} study check groups.`);
} finally { await writeFile(`${output}/browser-checks.json`, JSON.stringify(report, null, 2)); await browser.close(); }
