import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const output = 'design/phase-7/review';
await mkdir(output, { recursive: true });
const report = { checks: [], errors: [] };
try {
 for (const slug of ['lighthouse', '1mb']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', error => report.errors.push(error.message));
  const requests = []; page.on('request', req => requests.push(req.url()));
  assert.equal((await page.goto(`http://127.0.0.1:4175/work/${slug}`)).status(), 200);
  await page.evaluate(() => document.fonts.ready);
  for (const detail of await page.locator('.scope-explorer details').all()) {
    await detail.locator('summary').focus(); await page.keyboard.press('Enter');
    assert.equal(await detail.locator('.scope-detail').isVisible(), true);
    await page.keyboard.press('Space'); assert.equal(await detail.getAttribute('open'), null);
  }
  for (const link of await page.getByRole('navigation', { name: 'Study contents' }).locator('a').all()) {
    await link.click();
    assert.equal(await page.evaluate(() => document.activeElement.id), (await link.getAttribute('href')).slice(1));
  }
  assert.equal(requests.some(url => /SceneCanvas|\.mp4|home-.*\.js/.test(url)), false);
  report.checks.push(`${slug}: keyboard disclosures and section focus work; no Home media loads`);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${slug}: ${width}`);
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: `${output}/${slug}-desktop.png`, fullPage: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('.scope-plus').first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  report.checks.push(`${slug}: five widths fit; reduced motion removes the control transition`);
  const plain = await browser.newPage({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  await plain.goto(`http://127.0.0.1:4175/work/${slug}#contribution`);
  await plain.locator('.scope-explorer summary').first().click();
  assert.equal(await plain.locator('.scope-detail').first().isVisible(), true);
  await plain.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await plain.screenshot({ path: `${output}/${slug}-mobile.png`, fullPage: true });
  await plain.getByRole('navigation', { name: 'Related work' }).locator('a').first().click();
  await plain.waitForURL(slug === 'lighthouse' ? '**/work/1mb' : '**/work/turby');
  report.checks.push(`${slug}: direct fragments, disclosures, and next-study links work without JavaScript`);
  await page.close(); await plain.close();
 }
 assert.deepEqual(report.errors, []);
 console.log(`Passed ${report.checks.length} product study check groups.`);
} finally { await writeFile(`${output}/browser-checks.json`, JSON.stringify(report, null, 2)); await browser.close(); }
