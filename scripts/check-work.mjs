import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch({ channel:'chrome',headless:true });
const output='design/phase-10/review'; await mkdir(output,{recursive:true});
const report={checks:[],errors:[]};
const ids=['netbookflix','adzumby','alrabeh-packs','xhuma','dinners-inn','quid'];
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 page.on('pageerror',error=>report.errors.push(error.message));
 await page.goto('http://127.0.0.1:4175/work');
 assert.equal(await page.locator('.work-feature').count(),4);
 assert.equal(await page.locator('[data-archive-entry]').count(),6);
 for(const id of ids){
  const entry=page.locator(`#${id}`); await entry.locator('summary').focus(); await page.keyboard.press('Enter');
  assert.equal(await entry.locator('.archive-body').isVisible(),true);
  assert.match(await entry.locator('.archive-body').textContent(),/SMDEVOPS LLP/);
  await page.keyboard.press('Space'); assert.equal(await entry.getAttribute('open'),null);
 }
 report.checks.push('Four selected studies and six SMDEVOPS entries retain attribution and keyboard controls');
 for(const id of ids){
  await page.goto(`http://127.0.0.1:4175/work#${id}`);
  await page.waitForFunction(id=>document.getElementById(id).open,id);
  assert.equal(await page.locator(`#${id} .archive-body`).isVisible(),true);
 }
 await page.locator('.archive-index a[href="#netbookflix"]').click();
 await page.waitForFunction(()=>document.activeElement.parentElement.id==='netbookflix');
 await page.locator('.archive-index a[href="#quid"]').click();
 await page.goBack(); await page.waitForFunction(()=>location.hash==='#netbookflix' && document.querySelector('#netbookflix').open);
 await page.locator('#netbookflix summary').click();
 await page.locator('.archive-index a[href="#netbookflix"]').click();
 assert.equal(await page.locator('#netbookflix').evaluate(el=>el.open),true);
 await page.reload(); await page.waitForFunction(()=>document.querySelector('#netbookflix').open);
 report.checks.push('All six direct entry links open content; same-fragment links, back, and reload preserve access');
 for(const width of [320,390,768,1024,1440]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}
 await page.goto('http://127.0.0.1:4175/work'); await page.evaluate(()=>document.fonts.ready);
 await page.locator('.work-feature img').scrollIntoViewIfNeeded(); await page.locator('.work-feature img').evaluate(el=>el.decode());
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await page.screenshot({path:`${output}/desktop-work.png`,fullPage:true});
 report.checks.push('Five viewport widths fit; original Turby artwork loads');
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 await mobile.goto('http://127.0.0.1:4175/work#earlier');
 for(const id of ids){await mobile.locator(`#${id} summary`).tap();assert.equal(await mobile.locator(`#${id} .archive-body`).isVisible(),true);}
 await mobile.locator('#xhuma').scrollIntoViewIfNeeded();
 await mobile.screenshot({path:`${output}/mobile-archive.png`});
 const plain=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844},reducedMotion:'reduce'});
 await plain.goto('http://127.0.0.1:4175/work');
 for(const id of ids){await plain.locator(`#${id} summary`).click();assert.equal(await plain.locator(`#${id} .archive-body`).isVisible(),true);}
 report.checks.push('All six entries open through touch and without JavaScript');
 assert.deepEqual(report.errors,[]);console.log(`Passed ${report.checks.length} Work check groups.`);
} finally{await writeFile(`${output}/browser-checks.json`,JSON.stringify(report,null,2));await browser.close();}
