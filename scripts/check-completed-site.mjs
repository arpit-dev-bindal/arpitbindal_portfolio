import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {routes} from '../src/site/routes.ts';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser=await chromium.launch({channel:'chrome',headless:true});
const output='design/completion/review';await mkdir(output,{recursive:true});
const report={pages:[],errors:[],checks:[]};
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});page.on('pageerror',e=>report.errors.push(e.message));
 for(const route of routes){
  await page.goto('http://127.0.0.1:4175'+route.path);await page.evaluate(()=>document.fonts.ready);
  await page.addScriptTag({path:process.env.AXE_PATH??'/tmp/portfolio-review-tools/node_modules/axe-core/axe.min.js'});
  const violations=await page.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
  const overflow=[];for(const width of [320,390,768,1024,1440]){await page.setViewportSize({width,height:1000});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))overflow.push(width);}
  const editorial=/still need confirmation|not yet confirmed|remain unconfirmed|results pending|supplied draft|Private preview/i.test(await page.locator('main').innerText());
  report.pages.push({path:route.path,violations,overflow,editorial});
  if(['/','/work','/ai-systems','/journey','/about','/work/lighthouse','/contact'].includes(route.path)){
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await page.screenshot({path:`${output}/${route.path==='/'?'home':route.path.slice(1).replaceAll('/','-')}-desktop.png`});
   await page.setViewportSize({width:390,height:844});await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await page.screenshot({path:`${output}/${route.path==='/'?'home':route.path.slice(1).replaceAll('/','-')}-mobile.png`});
  }
 }
 const pdf=await page.request.get('http://127.0.0.1:4175/resume/arpit-bindal.pdf');assert.equal(pdf.status(),200);assert.match(pdf.headers()['content-type'],/application\/pdf/);assert.equal((await pdf.body()).subarray(0,5).toString(),'%PDF-');
 report.checks.push('Resume download returns a PDF with the correct content type');
 const plain=await browser.newPage({javaScriptEnabled:false,viewport:{width:320,height:900},reducedMotion:'reduce'});
 for(const route of routes){await plain.goto('http://127.0.0.1:4175'+route.path);assert.equal(await plain.locator('h1').count(),1);assert.equal(await plain.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route.path);}
 report.checks.push('All ten pages retain content and narrow reflow without JavaScript');
 await page.goto('http://127.0.0.1:4175/ai-systems');await page.locator('#automation > .ai-example-reveal > summary').click();await page.locator('#automation .ai-steps').waitFor({state:'visible'});
 report.checks.push('AI examples open through native visitor disclosures');
 await page.goto('http://127.0.0.1:4175/journey');await page.locator('#ai-practice').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('.career-rail a[href="#ai-practice"]').hasAttribute('aria-current'));
 report.checks.push('The career rail identifies the visible chapter');
 assert.equal(report.pages.flatMap(p=>p.violations).length,0);assert.equal(report.pages.flatMap(p=>p.overflow).length,0);assert.equal(report.pages.some(p=>p.editorial),false);assert.deepEqual(report.errors,[]);
}finally{await writeFile(`${output}/completed-site-checks.json`,JSON.stringify(report,null,2)+'\n');await browser.close();}
console.log(report);
