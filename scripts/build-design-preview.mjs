import { mkdir, writeFile } from 'node:fs/promises';
import { portfolio, profile } from '../src/content/portfolio.ts';
import { getPublicRecords } from '../src/content/validate.ts';

const records = getPublicRecords(portfolio);
const record = id => {
  const result = records.find(item => item.id === id);
  if (!result) throw new Error(`Missing public record: ${id}`);
  return result;
};
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const text = id => escape(record(id).summary);
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
const link = (href, label, className = 'text-link') => `<a class="${className}" href="${href}">${label}${arrow}</a>`;
const image = (className = '') => `<img class="${className}" src="../assets/layers-concept.png" width="1536" height="1024" alt="Four silver metal layers with a rose edge on a dark surface.">`;
const nav = active => `<a href="home.html#work">Work</a><a href="ai-systems.html"${active === 'ai' ? ' aria-current="page"' : ''}>AI Systems</a><a href="home.html#journey">Journey</a><a href="home.html#about">About</a><a class="contact-nav" href="home.html#contact">Contact</a>`;
const header = active => `<a class="skip" href="#main">Skip to content</a><header class="wrap site-header"><a class="wordmark" href="home.html">Arpit Bindal</a><nav class="site-nav" aria-label="Main">${nav(active)}</nav><button class="menu-open" aria-haspopup="dialog" aria-controls="mobile-menu">Menu</button></header><dialog id="mobile-menu" class="menu-dialog" aria-label="Main menu"><div class="menu-top"><span class="wordmark">Arpit Bindal</span><button class="menu-close" autofocus>Close</button></div><nav class="menu-links" aria-label="Mobile">${nav(active)}</nav><a class="menu-email" href="mailto:${profile.contact.email}">${profile.contact.email}</a></dialog>`;
const footer = () => `<footer id="contact" class="wrap contact"><div class="contact-top"><div><h2>Let’s build what’s next.</h2><a class="email" href="mailto:${profile.contact.email}">${profile.contact.email}</a></div><p class="muted">Arpit Bindal<br>Product engineering &amp; applied AI</p></div><div class="footer-line"><span>Interfaces. Systems. Responsibility.</span><div class="footer-links"><a href="${profile.contact.linkedin}">LinkedIn ${arrow}</a><a href="${profile.contact.github}">GitHub ${arrow}</a><button class="motion-toggle" aria-pressed="false">Motion: on</button></div></div></footer>`;
const scope = () => `<figure><div class="scope-art" role="img" aria-label="Scope concept: database and S3 backup, with Go SDK, Node.js SDK, and CLI."><div class="scope-origin"><div class="scope-node">Database</div><div class="scope-node">S3 data</div></div><div class="scope-line"></div><div class="scope-center">BackupData</div><div class="scope-tools"><span>Go SDK</span><span>Node.js SDK</span><span>CLI</span></div></div><figcaption>Scope concept. The final study will use real product images.</figcaption></figure>`;
const memory = () => `<figure><div class="memory-art" role="img" aria-label="Concept: two agents exchange context through shared memory."><div class="agent">Agent A</div><div class="connector"></div><div class="memory-core">Shared<br>context</div><div class="connector"></div><div class="agent">Agent B</div></div><figcaption>Concept diagram. The system structure still needs confirmation.</figcaption></figure>`;
const page = (title, active, main) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title} | Arpit Bindal · Design preview</title><link rel="stylesheet" href="../frame.css"><script src="../frame.js" defer></script></head><body>${header(active)}<main id="main">${main}</main>${footer()}<aside class="review-notice" aria-label="Design preview notice"><div class="wrap"><span>Phase 2 design preview. Concept art and diagrams do not show historical product screens.</span><a href="../index.html" target="_top">Open design review</a></div></aside></body></html>`;

const home = page('Home', 'home', `
<section class="wrap hero"><div class="hero-copy"><h1><span>I build complete</span><span>digital products.</span></h1><p class="muted">${escape(profile.introduction)}</p>${link('#work', 'View my work', 'button')}</div><figure class="hero-art" data-reveal>${image()}</figure></section>
<section class="wrap story" aria-labelledby="story-title"><div class="story-intro"><p id="story-title">From interface to infrastructure.</p><span class="mono muted">One connected practice</span></div><div class="story-steps"><div class="story-step"><h3>Interface</h3><p>Products and internal tools.</p></div><div class="story-step"><h3>Systems</h3><p>Backend, SDKs, and infrastructure.</p></div><div class="story-step"><h3>Integration</h3><p>Wallets and connected services.</p></div><div class="story-step"><h3>Intelligence</h3><p>AI tools for business tasks.</p></div></div></section>
<section id="work" class="light section"><div class="wrap"><div class="work-heading"><h2>Work with a wider scope.</h2><p class="muted">Products, systems, and developer tools from my work at Lighthouse.</p></div><article class="project-feature"><div class="project-copy"><p class="mono">Lighthouse · Infrastructure &amp; developer tools</p><h3>BackupData</h3><p>${text('backupdata')}</p>${link('backupdata.html', 'Explore the study')}</div><div data-reveal>${scope()}</div></article><div class="other-work"><details><summary>Lighthouse</summary><p>${text('lighthouse')}</p><p>${escape(record('lighthouse').claims[0])}</p></details><details><summary>1MB</summary><p>${text('1mb')}</p><p>${escape(record('1mb').claims[0])}</p></details></div></div></section>
<section class="wrap film"><div class="film-heading"><h2>Separate layers.<br>One complete system.</h2></div><figure><div class="film-image">${image()}</div><figcaption><span>Material film concept · Scroll will control the final video.</span><span>Still frame for visual review</span></figcaption></figure></section>
<section class="light section"><div class="wrap ai-intro"><div><h2>Context connects<br>the next chapter.</h2><p>${text('agent-memory')}</p>${link('ai-systems.html', 'Explore AI Systems')}</div>${memory()}</div></section>
<section id="journey" class="wrap career"><div class="career-grid"><div id="about"><h2>A wider scope<br>with each role.</h2><p>My work connects product design, frontend systems, infrastructure, Web3, and applied AI.</p></div><div>${['smdevops', 'lighthouse-frontend', 'lighthouse-fullstack', 'ai-practice'].map(id => { const r = record(id); return `<article class="career-entry"><time>${escape(r.periodLabel)}</time><h3>${escape(r.organization ?? r.title)}</h3><p>${escape(r.role ?? r.summary)}</p></article>`; }).join('')}</div></div></section>`);

const backup = page('BackupData', 'work', `
<section class="wrap inner-hero"><a class="back" href="home.html#work">← Selected work</a><h1>BackupData.<br><span class="muted">From service to SDK.</span></h1><p class="lead">${text('backupdata')}</p><dl class="study-meta"><div><dt>Context</dt><dd>Lighthouse</dd></div><div><dt>Scope</dt><dd>Infrastructure, backend &amp; tools</dd></div><div><dt>Project dates</dt><dd>Confirmation pending</dd></div></dl></section>
<div class="light section"><div class="wrap study-layout"><aside class="study-contents"><p>In this study</p><nav aria-label="Study contents"><a href="#contribution">Contribution</a><a href="#system">System scope</a><a href="#evidence">Product evidence</a><a href="#decisions">Technical decisions</a><a href="#extension">AI extension</a></nav></aside><div class="study-body">
<section id="contribution"><h2>Ownership across the system.</h2><p class="intro-copy">${escape(record('backupdata').claims[0])}</p><div class="contribution"><div><h3>Infrastructure</h3><p>I planned the infrastructure for the backup service.</p></div><div><h3>Backend</h3><p>I built services for database and S3 backups.</p></div><div><h3>SDKs</h3><p>I built developer tools for Go and Node.js.</p></div><div><h3>Command line</h3><p>I built a CLI for the service.</p></div></div></section>
<section id="system"><h2>One service. Several entry points.</h2>${scope()}</section>
<section id="evidence"><h2>The product in use.</h2><div class="evidence-slot"><h3>A real backup workflow belongs here.</h3><p>The final study will show a product recording, with a clear transcript and playback controls.</p><span class="mono">Evidence pending: console images and workflow recording</span></div></section>
<section id="decisions"><h2>The decisions behind the work.</h2><p class="intro-copy">This section will explain two technical choices, their constraints, and their results.</p><div class="evidence-slot" style="margin-top:32px"><h3>Technical account pending.</h3><p>Each account will state the problem, alternatives, choice, and consequence.</p><span class="mono">No architecture or outcome claims without evidence</span></div></section>
<section id="extension"><h2>From backups to agent context.</h2><p class="intro-copy">${text('agent-memory')}</p>${link('ai-systems.html', 'Continue to AI Systems')}</section>
</div></div></div>`);

const examples = {
  automation: 'A workflow will show the trigger, business rule, action, and failure path.',
  'rag-agents': 'An example will place an answer beside its source passage.',
  lora: 'A comparison will use the same input for the base model and adapted model.',
  'voice-systems': 'A recording will pair voice interaction with a readable transcript.',
  'mcp-services': 'A tool example will show permission checks and a denied request.',
};
const ai = page('AI Systems', 'ai', `
<section class="wrap inner-hero ai-hero"><div><a class="back" href="home.html">← Home</a><h1>AI systems<br><span class="muted">for real tasks.</span></h1><p>I build AI tools around business rules, knowledge access, and customer support.</p></div><aside class="period-note"><p><strong>Lighthouse</strong><br>Agent memory and context, within my employment period.</p><p><strong>Freelance &amp; personal</strong><br>From August 2026. November remains planned.</p></aside></section>
<div class="light section"><div class="wrap"><section class="memory-feature"><div><p class="mono">Lighthouse · BackupData extension</p><h2>Memory across<br>AI agents.</h2><p>${text('agent-memory')}</p>${link('backupdata.html', 'View BackupData')}</div>${memory()}</section>
<section class="ai-work"><h2>Current areas of work.</h2><p>These areas cover freelance and personal work. Individual project dates, tools, and completion states still need confirmation.</p><div class="area-list">${records.filter(r => r.kind === 'ai-area').map((r, index) => `<details${index === 0 ? ' open' : ''}><summary><h3>${escape(r.title)}</h3></summary><div class="area-body"><p>${escape(r.summary)}</p><div class="area-note"><span class="mono">Example planned</span><p>${examples[r.id]}</p></div></div></details>`).join('')}</div></section>
<section class="ai-work"><h2>Evidence before broad claims.</h2><p>The final examples will show the task, system boundaries, and observed results.</p><p>Project names, recordings, and measurements will appear after confirmation.</p></section></div></div>`);

const output = new URL('../design/phase-2/frames/', import.meta.url);
await mkdir(output, { recursive: true });
for (const [name, html] of [['home', home], ['backupdata', backup], ['ai-systems', ai]]) {
  await writeFile(new URL(`${name}.html`, output), html);
}
console.log('Built three responsive design frames from the Phase 1 content records.');
