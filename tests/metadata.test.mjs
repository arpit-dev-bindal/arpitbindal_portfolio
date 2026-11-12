import test from 'node:test';
import assert from 'node:assert/strict';
import { legacyDestination, legacyRoutes } from '../src/site/legacy-routes.ts';
import { metadata, descriptions } from '../src/site/metadata.ts';
import { routes } from '../src/site/routes.ts';
test('legacy migration accepts known root hashes only',()=>{
 for(const [hash,target] of Object.entries(legacyRoutes))assert.equal(legacyDestination('/',hash),target);
 for(const hash of ['#work','#journey','#/unknown','#/contact?next=https://example.com','#//example.com'])assert.equal(legacyDestination('/',hash),null);
 assert.equal(legacyDestination('/work','#/contact'),null);
 assert.equal(legacyDestination('/index.html','#/education'),'/about#education');
});
test('metadata covers every page and keeps the preview outside search',()=>{
 assert.equal(new Set(Object.values(descriptions)).size,routes.length);
 for(const r of routes){const html=metadata(r.path,r.title,{github:'https://github.com/arpitbindal',linkedin:'https://linkedin.com/in/arpitbindal/'});assert.match(html,/noindex,nofollow/);assert.ok(html.includes(`https://arpitbindal.com${r.path}`));assert.match(html,/application\/ld\+json/);}
 assert.doesNotMatch(metadata('/404','Missing',{github:'',linkedin:''}),/canonical|og:image/);
 assert.doesNotMatch(metadata('/','<script>',{github:'',linkedin:''}),/content="<script>/);
});
