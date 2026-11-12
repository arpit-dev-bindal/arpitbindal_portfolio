import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const output = 'design/phase-8/review'; await mkdir(output, { recursive: true });
const report = { checks: [], errors: [] };
try {
 const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
 page.on('pageerror', error => report.errors.push(error.message));
 await page.goto('http://127.0.0.1:4175/work/turby');
 await page.waitForFunction(() => document.querySelector('.turby-dialog').dataset.ready === 'true');
 for (const img of await page.locator('.turby-gallery img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(el => el.decode()); assert.equal(await img.evaluate(el => el.naturalWidth), 640); }
 await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
 await page.screenshot({ path: `${output}/desktop-study.png`, fullPage: true });
 const links = page.locator('.turby-art-link'); await links.first().focus(); await page.keyboard.press('Enter');
 await page.locator('.turby-dialog[open]').waitFor();
 assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Close');
 await page.keyboard.press('ArrowLeft'); assert.equal(await page.locator('[data-gallery-position]').textContent(), '6 of 6');
 await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('[data-gallery-position]').textContent(), '1 of 6');
 await page.keyboard.press('Shift+Tab'); assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Next');
 await page.keyboard.press('Tab'); assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Close');
 await page.keyboard.press('Escape');
 await page.waitForFunction(() => document.body.style.overflow === '');
 assert.equal(await page.evaluate(() => document.activeElement.dataset.turbyIndex), '0');
 assert.equal(await page.evaluate(() => document.body.style.overflow), '');
 report.checks.push('Six original images load; keyboard open, wraparound, focus trap, Escape, and focus return work');
 for (let index = 0; index < 6; index++) { await links.nth(index).click(); assert.equal(await page.locator('[data-gallery-position]').textContent(), `${index + 1} of 6`); await page.getByRole('button', { name: 'Close', exact: true }).click(); await page.waitForFunction(() => document.body.style.overflow === ''); }
 assert.equal(await page.locator('dialog').count(), 1);
 report.checks.push('Every thumbnail selects its image; repeated use retains one dialog');
 const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
 await mobile.goto('http://127.0.0.1:4175/work/turby');
 await mobile.waitForFunction(() => document.querySelector('.turby-dialog').dataset.ready === 'true');
 await mobile.locator('.turby-art-link').nth(2).tap(); await mobile.getByRole('button', { name: 'Next', exact: true }).tap();
 assert.equal(await mobile.locator('[data-gallery-position]').textContent(), '4 of 6');
 await mobile.screenshot({ path: `${output}/mobile-gallery.png` });
 await mobile.getByRole('button', { name: 'Close', exact: true }).tap();
 for (const width of [320, 768, 1024, 1440]) { await page.setViewportSize({ width, height: 900 }); assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false); }
 report.checks.push('Touch selection and navigation work; four viewport widths have no page overflow');
 const plain = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
 await plain.goto('http://127.0.0.1:4175/work/turby'); await plain.locator('.turby-art-link').first().click(); await plain.waitForURL('**/turby/turby_1.jpeg');
 report.checks.push('Without JavaScript, artwork links open the original images');
 assert.deepEqual(report.errors, []); console.log(`Passed ${report.checks.length} Turby check groups.`);
} finally { await writeFile(`${output}/browser-checks.json`, JSON.stringify(report, null, 2)); await browser.close(); }
