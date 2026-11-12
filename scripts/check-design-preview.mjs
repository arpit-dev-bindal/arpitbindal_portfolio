import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Supply PLAYWRIGHT_MODULE when a shared runtime provides Playwright.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const base = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173';
const output = new URL('../design/phase-2/review/', import.meta.url);
await mkdir(output, { recursive: true });
const report = { pages: [], interactions: [], contrast: [], errors: [] };
const capture = (page, name, fullPage = false) => page.screenshot({ path: fileURLToPath(new URL(`${name}.png`, output)), fullPage });
try {
  for (const name of ['home', 'backupdata', 'ai-systems']) {
    for (const width of [360, 390, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 1000 }, reducedMotion: 'reduce' });
      page.on('pageerror', error => report.errors.push(`${name}/${width}: ${error.message}`));
      page.on('response', response => { if (response.status() >= 400) report.errors.push(`${response.status()}: ${response.url()}`); });
      await page.goto(`${base}/frames/${name}.html`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const state = await page.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        headingCount: document.querySelectorAll('h1').length,
        missingImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).length,
        fontReady: document.fonts.check('500 48px "Space Grotesk"'),
        motionOff: document.documentElement.classList.contains('motion-off'),
        animationCount: document.getAnimations().length,
      }));
      assert.ok(state.documentWidth <= width, `${name}/${width}: horizontal overflow ${state.documentWidth}`);
      assert.equal(state.headingCount, 1);
      assert.equal(state.missingImages, 0);
      assert.equal(state.fontReady, true);
      assert.equal(state.motionOff, true);
      assert.equal(state.animationCount, 0);
      if (name === 'home') {
        const hero = await page.locator('.hero').boundingBox();
        assert.ok(hero.height < 800, `Home/${width}: hero exceeds the frame height`);
        const art = await page.locator('.hero-art img').boundingBox();
        assert.ok(art.height <= art.width, `Home/${width}: object frame has the wrong aspect ratio`);
      }
      report.pages.push({ name, ...state });
      if (width === 1440 || width === 390) {
        const device = width === 1440 ? 'desktop' : 'mobile';
        await capture(page, `${name}-${device}-top`);
        await capture(page, `${name}-${device}-full`, true);
        if (name === 'home') {
          await page.locator('#work').scrollIntoViewIfNeeded();
          await capture(page, `home-${device}-work`);
        }
      }
      if (width === 390) {
        const opener = page.getByRole('button', { name: 'Menu', exact: true });
        await opener.click();
        assert.equal(await page.locator('dialog').evaluate(dialog => dialog.open), true);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('dialog').evaluate(dialog => dialog.open), false);
        assert.equal(await opener.evaluate(button => button === document.activeElement), true);
        await opener.click();
        await page.getByRole('navigation', { name: 'Mobile', exact: true }).getByRole('link', { name: 'Contact', exact: true }).click();
        await page.waitForURL('**/home.html#contact');
        assert.equal(await page.locator('dialog').evaluate(dialog => dialog.open), false);
        report.interactions.push(`${name}: mobile menu, Escape, focus return, and Contact link pass`);
      }
      await page.close();
    }
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', error => report.errors.push(error.message));
  await page.goto(base);
  await page.getByRole('button', { name: 'BackupData', exact: true }).click();
  await page.frameLocator('iframe').getByRole('heading', { name: 'BackupData. From service to SDK.' }).waitFor();
  await page.getByRole('button', { name: 'Mobile', exact: true }).click();
  assert.match(await page.locator('#frame-label').textContent(), /BackupData · 390/);
  await page.frameLocator('iframe').getByRole('link', { name: 'Continue to AI Systems' }).click();
  await page.frameLocator('iframe').getByRole('heading', { name: 'AI systems for real tasks.' }).waitFor();
  assert.equal(await page.getByRole('button', { name: 'AI Systems', exact: true }).getAttribute('aria-pressed'), 'true');
  await page.frameLocator('iframe').getByText('RAG agents', { exact: true }).click();
  assert.equal(await page.frameLocator('iframe').locator('details').nth(1).evaluate(detail => detail.open), true);
  report.interactions.push('Review page selection, size control, frame navigation, and AI disclosure pass');
  await page.goto(`${base}/frames/home.html`);
  await page.getByRole('button', { name: 'Motion: on' }).click();
  assert.equal(await page.getByRole('button', { name: 'Motion: off' }).getAttribute('aria-pressed'), 'true');
  await page.reload();
  assert.equal(await page.locator('html').evaluate(element => element.classList.contains('motion-off')), true);
  report.interactions.push('Motion control and session preference pass');
  const links = await page.locator('a[href]').evaluateAll(elements => elements.map(a => a.href));
  for (const href of [...new Set(links)].filter(href => href.startsWith(base))) {
    const url = new URL(href);
    const response = await page.request.get(url.href);
    assert.equal(response.status(), 200, `Broken local link: ${href}`);
  }
  report.interactions.push('Home local navigation links return 200');
  const luminance = hex => {
    const channels = hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  for (const [foreground, background] of [['#f4f5f7', '#101216'], ['#afb6c2', '#101216'], ['#161a20', '#f2f3f5'], ['#535d6b', '#f2f3f5'], ['#101216', '#e75b7f'], ['#aa294e', '#f2f3f5']]) {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    const ratio = (values[0] + .05) / (values[1] + .05);
    assert.ok(ratio >= 4.5, `Contrast below 4.5: ${foreground}/${background}`);
    report.contrast.push({ foreground, background, ratio: Number(ratio.toFixed(2)) });
  }
  await page.goto(base);
  await page.getByRole('button', { name: 'Desktop', exact: true }).click();
  await page.frameLocator('iframe').getByRole('heading', { name: 'I build complete digital products.' }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  await capture(page, 'review-board', true);
  await page.close();
  assert.deepEqual(report.errors, []);
  console.log(`Passed ${report.pages.length} page layouts, ${report.interactions.length} interaction groups, and ${report.contrast.length} contrast pairs.`);
} finally {
  await writeFile(new URL('browser-checks.json', output), JSON.stringify(report, null, 2));
  await browser.close();
}
