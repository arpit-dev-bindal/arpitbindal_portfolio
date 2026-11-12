import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser=await chromium.launch({channel:'chrome',headless:true});
const report={checks:[],errors:[]};
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto('http://127.0.0.1:4176/');
 for(const video of await page.locator('video').all()) {
  await video.evaluate(el=>new Promise((resolve,reject)=>{el.onloadeddata=resolve;el.onerror=reject;el.preload='auto';el.load();}));
  for(const target of [1,4,2,5]) await video.evaluate((el,t)=>new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Seek timeout')),3000);el.onseeked=()=>{clearTimeout(timer);resolve();};el.currentTime=t;}),target);
  await video.evaluate(async el=>{el.muted=true;await el.play();});
  await page.waitForTimeout(250);
  assert.equal(await video.evaluate(el=>el.paused),false);
  await video.evaluate(el=>el.pause());
 }
 report.checks.push('Both films decode, seek in both directions, and support native playback');
 for(const width of [320,390,768,1440]) {await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}
 report.checks.push('Media review fits four screen widths');
 assert.deepEqual(report.errors,[]);
} finally {await writeFile('design/phase-13/review/browser-checks.json',JSON.stringify(report,null,2)+'\n');await browser.close();}
console.log(report);
