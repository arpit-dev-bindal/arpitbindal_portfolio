import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser=await chromium.launch({channel:'chrome',headless:true});
const report={checks:[],errors:[],accessibility:[]};
await mkdir('design/option-a/review',{recursive:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 page.on('pageerror',e=>report.errors.push(e.message));
 for(const path of ['/','/work']) {
  await page.goto('http://127.0.0.1:4175'+path);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.project-visual').count(),3);
  await page.locator('[data-source="DynamoDB"]').focus();await page.keyboard.press('Enter');
  await page.waitForFunction(()=>document.querySelector('[data-backup-visual] .visual-caption').textContent.startsWith('DynamoDB:'));
  await page.locator('[data-source="S3"]').click();
  assert.match(await page.locator('[data-backup-visual] .visual-caption').textContent(),/object storage/);
  for(const width of [320,390,768,1024,1440]) {await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${path} ${width}`);}
  await page.addScriptTag({path:'/tmp/portfolio-review-tools/node_modules/axe-core/axe.min.js'});
  const violations=await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
  report.accessibility.push({path,violations});assert.equal(violations.length,0);
 }
 report.checks.push('Home and Work source controls support keyboard input; both layouts fit five widths and pass axe');
 await page.goto('http://127.0.0.1:4175/');await page.locator('.visitor-scene').waitFor();
 assert.equal(await page.getByRole('button',{name:'Interface',exact:true}).count(),0);
 assert.equal(await page.getByText('Motion is off. Layer buttons still show each description.').count(),0);
 await page.locator('.scene-display summary').click();await page.getByRole('button',{name:'Systems',exact:true}).click();
 assert.match(await page.locator('.scene-callout').textContent(),/Systems/);
 await page.locator('.scene-display summary').click();
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.locator('.scene-widget[data-ready="true"]').waitFor();
 await page.mouse.wheel(0,180);await page.waitForFunction(()=>document.querySelector('.scene-widget').dataset.owner==='scroll');
 report.checks.push('Layer controls stay inside the disclosure; the caption updates; scroll resumes the model story');
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:4175/');await page.locator('.visitor-scene').waitFor();
 await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:'design/option-a/review/desktop-hero.png'});
 await page.locator('#work').scrollIntoViewIfNeeded();await page.screenshot({path:'design/option-a/review/desktop-project.png'});
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4175/');await page.locator('.visitor-scene').waitFor();await page.screenshot({path:'design/option-a/review/mobile-hero.png'});
 const plain=await browser.newPage({javaScriptEnabled:false,viewport:{width:320,height:900},reducedMotion:'reduce'});await plain.goto('http://127.0.0.1:4175/');assert.equal(await plain.locator('.project-visual').count(),3);assert.equal(await plain.locator('#scene-root img').isVisible(),true);
 report.checks.push('Reduced motion and no-JavaScript views preserve project visuals and the scene poster');
 assert.deepEqual(report.errors,[]);
} finally {await writeFile('design/option-a/review/browser-checks.json',JSON.stringify(report,null,2)+'\n');await browser.close();}
console.log(report);
