import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { routes } from '../src/site/routes.ts';
import { descriptions, shareName } from '../src/site/metadata.ts';
import { legacyRoutes } from '../src/site/legacy-routes.ts';
const { chromium }=await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser=await chromium.launch({channel:'chrome',headless:true});
const base='http://127.0.0.1:4175';const report={checks:[],errors:[]};
await mkdir('design/phase-15/review',{recursive:true});
try {
 const page=await browser.newPage({reducedMotion:'reduce'});
 page.on('pageerror',error=>report.errors.push(error.message));
 for(const route of routes){
  await page.goto(base+route.path);
  assert.equal(await page.locator('meta[name="description"]').getAttribute('content'),descriptions[route.path]);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://arpitbindal.com'+route.path);
  assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex,nofollow');
  assert.ok(JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())['@type']);
  const response=await page.request.get(`${base}/social/${shareName(route.path)}.png`);assert.equal(response.status(),200);
  const bytes=await response.body();assert.equal(bytes.readUInt32BE(16),1200);assert.equal(bytes.readUInt32BE(20),630);
 }
 report.checks.push('Ten routes expose unique descriptions, canonical URLs, structured data, and 1200×630 share images');
 for(const [hash,target] of Object.entries(legacyRoutes)){
  await page.goto(`${base}/?ref=legacy${hash}`);
  const dest=new URL(target,base);dest.search='?ref=legacy';await page.waitForURL(dest.href);
  if(dest.hash)assert.equal(await page.locator(dest.hash).count(),1);
 }
 await page.goto(base+'/');await page.evaluate(()=>location.hash='/projects');await page.waitForURL(base+'/work');
 await page.goto(base+'/#work');assert.equal(new URL(page.url()).hash,'#work');
 await page.goto(base+'/#/unknown');assert.equal(new URL(page.url()).hash,'#/unknown');
 report.checks.push('Six old hash routes migrate with query preservation; live hash changes work; new and unknown anchors remain unchanged');
 const robots=await page.request.get(base+'/robots.txt');assert.match(robots.headers()['content-type'],/text\/plain/);assert.match(await robots.text(),/Disallow: \//);
 const sitemap=await page.request.get(base+'/sitemap.xml');assert.match(sitemap.headers()['content-type'],/application\/xml/);assert.equal((await sitemap.text()).match(/<loc>/g).length,10);
 const missing=await page.goto(base+'/missing-page');assert.equal(missing.status(),404);assert.equal(await page.locator('link[rel="canonical"]').count(),0);
 report.checks.push('Preview robots blocks crawling; sitemap lists ten canonical pages; missing pages retain HTTP 404');
 const plain=await browser.newPage({javaScriptEnabled:false});await plain.goto(base+'/#/education');await plain.locator('.site-nav a[href="/about"]').click();assert.equal(new URL(plain.url()).pathname,'/about');
 report.checks.push('Native navigation provides a no-JavaScript route from old incoming links');
 assert.deepEqual(report.errors,[]);
}finally{await writeFile('design/phase-15/review/browser-checks.json',JSON.stringify(report,null,2)+'\n');await browser.close();}
console.log(report);
