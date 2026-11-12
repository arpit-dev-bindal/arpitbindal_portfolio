import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {routes} from '../src/site/routes.ts';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser=await chromium.launch({channel:'chrome',headless:true});
const report={accessibility:[],checks:[],failures:[],lab:[]};
await mkdir('design/phase-16/review',{recursive:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 for(const route of routes){
  await page.goto('http://127.0.0.1:4175'+route.path);await page.evaluate(()=>document.fonts.ready);
  await page.addScriptTag({path:process.env.AXE_PATH ?? '/tmp/portfolio-review-tools/node_modules/axe-core/axe.min.js'});
  const result=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
  report.accessibility.push({path:route.path,violations:result.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:result.incomplete.map(v=>v.id)});
  await page.setViewportSize({width:640,height:900});
  await page.addStyleTag({content:'html { zoom: 2; }'});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))report.failures.push(`Zoom overflow: ${route.path}`);
  await page.setViewportSize({width:1440,height:1000});
 }
 report.checks.push('Ten routes checked with axe and 200% CSS zoom at 640px');
 const blocked=await browser.newPage({viewport:{width:390,height:844}});
 await blocked.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(String(type).includes('webgl'))return null;return original.call(this,type,...args);};});
 await blocked.goto('http://127.0.0.1:4175/');await blocked.getByRole('button',{name:'Enable 3D',exact:true}).click();
 await blocked.getByText('3D is unavailable. The still image remains available.').waitFor();
 assert.equal(await blocked.locator('#scene-root img').isVisible(),true);
 report.checks.push('WebGL failure retains the scene poster and recovery control');
 const failedVideo=await browser.newPage({viewport:{width:390,height:844}});
 await failedVideo.route('**/media/material-film.mp4',route=>route.abort());
 await failedVideo.goto('http://127.0.0.1:4175/');await failedVideo.getByRole('button',{name:'Play film',exact:true}).click();
 await failedVideo.locator('.film-state').filter({hasText:/unavailable|did not start/}).waitFor();
 assert.ok(await failedVideo.locator('video').getAttribute('poster'));
 report.checks.push('Failed film request retains a poster and visible failure message');
 for(const path of ['/','/work/backupdata']) {
  const lab=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const cdp=await lab.context().newCDPSession(lab);
  await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  await lab.addInitScript(()=>{window.lab={lcp:0,cls:0};new PerformanceObserver(list=>{for(const e of list.getEntries())window.lab.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.lab.cls+=e.value;}).observe({type:'layout-shift',buffered:true});});
  await lab.goto('http://127.0.0.1:4175'+path);await lab.waitForTimeout(4000);
  report.lab.push({path,...await lab.evaluate(()=>({...window.lab,transferBytes:performance.getEntriesByType('resource').reduce((sum,r)=>sum+r.transferSize,0)}))});
  await lab.close();
 }
 report.checks.push('Two cold-load mobile lab samples use 4× CPU slowdown, 150ms latency, and 1.6Mbps download');
 assert.deepEqual(report.failures,[]);
 assert.equal(report.accessibility.reduce((sum,page)=>sum+page.violations.length,0),0);
} finally {await writeFile('design/phase-16/review/release-checks.json',JSON.stringify(report,null,2)+'\n');await browser.close();}
console.log(JSON.stringify(report,null,2));
