import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const output = 'design/phase-9/review'; await mkdir(output, { recursive: true });
const report = { checks: [], errors: [] };
try {
 const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
 page.on('pageerror', error => report.errors.push(error.message));
 const requests = []; page.on('request', req => requests.push(req.url()));
 await page.goto('http://127.0.0.1:4175/ai-systems');
 await page.locator('.ai-example-reveal').evaluateAll(items=>items.forEach(item=>item.open=true));
 assert.equal(await page.locator('form').count(), 0);
 assert.equal(requests.some(url => !url.startsWith('http://127.0.0.1:4175/')), false);
 assert.match(await page.locator('#automation .ai-stats').textContent(), /500K\+/);
 report.checks.push('AI sections are static, show the SEO result, and make no external requests');
 for (const link of await page.getByRole('navigation', { name: 'AI contents' }).locator('a').all()) {
  await link.click(); assert.equal(await page.evaluate(() => document.activeElement.id), (await link.getAttribute('href')).slice(1));
 }
 report.checks.push('Section links move focus');
 for (const width of [320,390,768,1024,1440]) { await page.setViewportSize({ width, height: 900 }); assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}`); }
 await page.evaluate(() => scrollTo({top:0,behavior:'instant'})); await page.screenshot({path:`${output}/desktop-ai.png`,fullPage:true});
 await page.setViewportSize({width:390,height:844}); await page.screenshot({path:`${output}/mobile-ai.png`,fullPage:true});
 report.checks.push('Five viewport widths fit without horizontal overflow');
 const plain = await browser.newPage({ javaScriptEnabled:false,viewport:{width:390,height:844},reducedMotion:'reduce' });
 await plain.goto('http://127.0.0.1:4175/ai-systems');
 for (const summary of await plain.locator('.ai-example-reveal > summary').all()) await summary.click();
 assert.equal(await plain.locator('#rag-agents .ai-steps li').count(),4); assert.match(await plain.locator('#mcp-services').textContent(),/API key/);
 assert.match(await plain.locator('.ai-periods').textContent(),/November continuation remains planned/);
 report.checks.push('Without JavaScript, pipelines and access boundaries remain readable; November retains its planned label');
 assert.deepEqual(report.errors,[]); console.log(`Passed ${report.checks.length} AI check groups.`);
} finally {await writeFile(`${output}/browser-checks.json`,JSON.stringify(report,null,2));await browser.close();}
