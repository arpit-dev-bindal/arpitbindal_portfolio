import { escape as e } from './shell.ts';
import { media } from '../content/media.ts';
import { testimonials, type Testimonial } from '../content/testimonials.ts';
import { achievements, clientPractice, clients, figures, projects, stack, techIcon, type Project, type Tech } from '../content/landing.ts';
import type { getPublicRecords } from '../content/validate.ts';
type Records = ReturnType<typeof getPublicRecords>;
import type { Period } from '../content/types.ts';
// The build script supplies this check, so a link to a document renders only when the file is in public/.
const hasPublicFile = (path: string) => (globalThis as { hasPublicFile?: (path: string) => boolean }).hasPublicFile?.(path) ?? true;
type Contact = { email: string; github: string; linkedin: string };

// Each word carries its own index so the stylesheet and the scroll script can stagger it.
const words = (text: string) => text.split(' ').map((word, index) => `<span class="word" style="--i:${index}">${e(word)}</span>`).join(' ');
const letters = (text: string, start = 0) => [...text].map((letter, index) => `<i style="--i:${start + index}">${e(letter)}</i>`).join('');
const year = (value: string | null) => value ? Number(value.slice(0, 4)) + (value.length >= 7 ? (Number(value.slice(5, 7)) - 1) / 12 : 0) : null;
const index = (value: number) => String(value).padStart(2, '0');
const arrow = '<span class="arrow" aria-hidden="true">→</span>';
const glyph = (item: Tech) => `<svg viewBox="0 0 24 24" aria-hidden="true">${techIcon(item.icon)}</svg>`;

export function landingPage(records: Records, introduction: string, contact: Contact, periods: Record<string, Period>) {
  const get = (id: string) => { const record = records.find(r => r.id === id); if (!record) throw new Error(`Missing record: ${id}`); return record; };
  const events = records.filter(r => r.kind === 'event');
  const aiAreas = [get('agent-memory'), ...records.filter(r => r.kind === 'ai-area')];

  // Each marquee row holds two copies of its list so the loop has no seam. The second copy is hidden from assistive technology.
  const lane = (items: Tech[], reverse: boolean) => {
    const set = (hidden: boolean) => `<ul${hidden ? ' aria-hidden="true"' : ''}>${items.map(item => `<li>${glyph(item)}<span>${e(item.label)}</span></li>`).join('')}</ul>`;
    return `<div class="lane${reverse ? ' is-reverse' : ''}">${set(false)}${set(true)}</div>`;
  };

  const row = (item: Project, position: number) => {
    const title = item.href ? `<a href="${item.href}">${e(item.title)}</a>` : e(item.title);
    const logo = `<a class="work-art is-${item.tone}${/\.(webp|png)$/.test(item.logo) ? ' is-emblem' : ''}" href="${e(item.site)}" target="_blank" rel="noopener" aria-label="Visit the ${e(item.brand)} website"><img src="${item.logo}" width="320" height="200" loading="lazy" alt="${e(item.brand)} logo"></a>`;
    return `<article class="work-row" data-home-reveal><div class="work-copy"><p class="eyebrow"><span class="gilt">${index(position + 1)}</span> — ${e(item.context)}</p><h3>${title}</h3><p class="work-tagline">${e(item.tagline)}</p><p class="work-summary">${e(item.summary)}</p>${item.href ? `<a class="text-link" href="${item.href}">${e(item.linkLabel ?? 'View study')} ${arrow}</a>` : `<a class="text-link" href="${e(item.site)}" target="_blank" rel="noopener">Visit website ${arrow}</a>`}</div>${logo}</article>`;
  };

  // The journey chart positions each line from the confirmed record dates.
  const first = 2015, last = 2027;
  const pct = (value: number) => ((value - first) / (last - first) * 100).toFixed(2);
  const journey = ['university', 'smdevops', 'lighthouse-frontend', 'lighthouse-fullstack', 'ai-practice'].map(id => {
    const r = get(id);
    const period = periods[id]!;
    const start = year(period.start.value) ?? first;
    const end = year(period.end.value) ?? last - .1;
    const finish = period.end.precision === 'year' ? end + 1 : end;
    const note = achievements[id];
    return `<li class="era" data-home-reveal><div class="era-meta"><h3>${e(r.organization ?? r.title)}</h3><p>${e(r.role ?? r.title)}</p></div><div class="era-track"><span class="era-bar${r.workState === 'ongoing' ? ' is-live' : ''}" style="--from:${pct(start)}%;--to:${pct(finish)}%"></span></div><p class="eyebrow era-time">${e(r.periodLabel ?? '')}</p>${note ? `<aside class="era-note"><p class="eyebrow gilt">Patent application</p><p>${e(note.text)}</p>${note.proof && hasPublicFile(note.proof) ? `<a class="era-proof" href="${e(note.proof)}" target="_blank" rel="noopener">View the patent search report ↗</a>` : ''}</aside>` : ''}</li>`;
  }).join('');
  const ticks = Array.from({ length: (last - first) / 2 + 1 }, (_, i) => first + i * 2).map(y => `<span style="--at:${pct(y)}%">${y}</span>`).join('');

  const slot = (text: string) => `<div class="slot"><span class="eyebrow">Media slot</span><p>${text}</p></div>`;
  const talks = (id: string) => (media.talks[id] ?? []).map(t => `<figure class="talk-card"><button class="talk" type="button" data-youtube="${e(t.youtubeId)}" data-start="${t.start ?? 0}" data-title="${e(t.title)}" aria-label="Play: ${e(t.title)}"><img src="https://i.ytimg.com/vi/${e(t.youtubeId)}/hqdefault.jpg" width="480" height="360" loading="lazy" alt=""><span class="talk-play" aria-hidden="true">▶</span></button><figcaption><strong>${e(t.title)}</strong><span>${e(t.note)}</span></figcaption></figure>`).join('');
  const proof = (id: string) => { const p = media.proof[id]; return p ? `<figure class="proof"><a href="${e(p.href)}"><img src="${e(p.src)}" width="${p.width}" height="${p.height}" loading="lazy" alt="${e(p.alt)}"></a><figcaption class="eyebrow">${e(p.caption)} ↗</figcaption></figure>` : ''; };
  const photos = (id: string) => { const list = media.photos[id] ?? []; return list.length ? `<figure class="event-photos${list.length === 2 ? ' is-pair' : ''}"><div>${list.map(p => `<img src="${e(p.src)}" width="${p.width}" height="${p.height}" loading="lazy" alt="${e(p.alt)}"${p.focus ? ` style="object-position:${e(p.focus)}"` : ''}>`).join('')}</div><figcaption class="eyebrow">${e(media.photoCaption[id] ?? '')}</figcaption></figure>` : ''; };
  const eventCard = (r: Records[number], lead: boolean) => {
    const extras = lead ? `<div class="event-media">${talks(r.id) || slot('The presentation video appears here after the YouTube link arrives.')}${proof(r.id) || slot('The judge listing screenshot appears here.')}</div>` : photos(r.id) + proof(r.id);
    return `<article class="event${lead ? ' event-lead' : ''}${!lead && media.photos[r.id] ? ' event-wide' : ''}" data-home-reveal><p class="eyebrow gilt">${e(r.periodLabel ?? '')} · ${e(r.role ?? '')}</p><h3>${e(r.title)}</h3><p>${e(r.summary)}</p>${extras}</article>`;
  };
  const lead = get('ethglobal-2025');

  const voice = (t: Testimonial) => `<figure class="voice${t.placeholder ? ' is-placeholder' : ''}"><span class="voice-mark" aria-hidden="true">“</span><blockquote><p>${e(t.quote)}</p></blockquote><figcaption><strong>${e(t.name)}</strong><span>${e(t.role)}</span></figcaption>${t.placeholder ? '<span class="eyebrow voice-tag">Placeholder</span>' : ''}</figure>`;
  const count = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

  return `<canvas id="particle-canvas" aria-hidden="true"></canvas>
<section class="landing-hero" data-scene="orb" aria-labelledby="hero-title"><div class="hero-stage"><p class="hero-name" aria-hidden="true"><span>${letters('Arpit')}</span><span>${letters('Bindal', 5)}</span></p>${media.portrait ? `<img class="hero-portrait" src="${e(media.portrait)}" alt="Portrait of Arpit Bindal." fetchpriority="high">` : ''}</div><div class="hero-row"><div class="hero-left"><p class="eyebrow gilt reveal" style="--d:500ms">Interfaces · Infrastructure · AI</p><h1 id="hero-title" class="hero-title">${words('Product engineer building complete digital products.')}</h1></div><div class="hero-right reveal" style="--d:1100ms"><p class="hero-open"><span class="live-dot" aria-hidden="true"></span>Open to engineering and technical leadership roles</p><div class="hero-actions"><a class="btn solid" href="#work">View the work</a><a class="btn" href="/resume/arpit-bindal.pdf" download>Resume</a><a class="btn" href="/contact">Contact</a></div></div></div><p class="hero-foot reveal" style="--d:1500ms" aria-hidden="true"><span></span>Scroll</p></section>

<section class="stack" data-scene="field" aria-labelledby="stack-title"><p id="stack-title" class="eyebrow gilt">Technology I work in</p><div class="lanes">${stack.map((items, position) => lane(items, position % 2 === 1)).join('')}</div></section>

<section class="statement" data-scene="field" aria-label="Introduction"><div class="wrap statement-frame"><p class="statement-text">${words(`I build complete digital products. ${introduction}`)}</p></div></section>

<section class="figures" data-scene="field" aria-labelledby="figures-title"><div class="wrap"><p id="figures-title" class="eyebrow gilt" data-home-reveal>The record in figures</p><dl class="figure-grid">${figures.map(f => `<div class="figure" data-home-reveal><dd data-count="${f.value}" data-suffix="${e(f.suffix)}">${f.value}${e(f.suffix)}</dd><dt><span class="eyebrow">${e(f.label)}</span>${f.note ? `<span class="figure-note">${e(f.note)}</span>` : ''}</dt></div>`).join('')}</dl></div></section>

<section id="work" class="work" data-scene="galaxy" aria-labelledby="work-title"><div class="wrap"><div class="section-head" data-home-reveal><div><p class="eyebrow gilt">Selected work</p><h2 id="work-title">${count[projects.length] ?? projects.length} products.<br><em>One practice.</em></h2></div><a class="text-link" href="/work">All projects ${arrow}</a></div><div class="work-list">${projects.map(row).join('')}</div></div></section>

<section id="ai" class="ai" data-scene="brain" aria-labelledby="ai-title"><div class="wrap ai-grid"><div class="ai-copy" data-home-reveal><p class="eyebrow gilt">Applied AI</p><h2 id="ai-title">Systems that<br><em>remember and act.</em></h2><p>${e(get('agent-memory').summary)}</p><a class="text-link" href="/ai-systems">Explore AI Systems ${arrow}</a></div><ol class="ai-index" data-home-reveal>${aiAreas.map((r, position) => `<li><a href="/ai-systems#${r.id === 'agent-memory' ? 'memory' : r.id}"><span class="eyebrow gilt" aria-hidden="true">${index(position + 1)}</span><span class="ai-title">${e(r.title)}</span><span class="eyebrow ai-org">${e(r.organization ?? 'Independent')}</span></a></li>`).join('')}</ol></div></section>

<section id="stage" class="stage" data-scene="field" aria-labelledby="stage-title"><div class="wrap"><div class="section-head" data-home-reveal><div><p class="eyebrow gilt">On stage</p><h2 id="stage-title">Share the work.<br><em>Support other builders.</em></h2></div></div><div class="event-grid">${eventCard(lead, true)}${events.filter(r => r.id !== lead.id).reverse().map(r => eventCard(r, false)).join('')}</div></div></section>

<section id="journey" class="journey" data-scene="field" aria-labelledby="journey-title"><div class="wrap"><div class="section-head" data-home-reveal><div><p class="eyebrow gilt">Journey</p><h2 id="journey-title">A wider scope<br><em>with each role.</em></h2></div><a class="text-link" href="/journey">Full journey ${arrow}</a></div><ol class="eras">${journey}</ol><div class="era-axis" aria-hidden="true">${ticks}</div></div></section>

<section class="earlier" data-scene="field" aria-labelledby="earlier-title"><div class="wrap"><div class="section-head" data-home-reveal><div><p class="eyebrow gilt">Earlier work · SMDEVOPS</p><h2 id="earlier-title">${count[clients.length] ?? clients.length} client <em>products.</em></h2></div><p class="earlier-practice">${e(clientPractice)}</p></div><ul class="earlier-row">${clients.map((client, position) => `<li data-home-reveal><h3><span class="eyebrow gilt" aria-hidden="true">${index(position + 1)}</span>${e(client.title)}</h3><p>${e(client.summary)}</p><ul class="tech" aria-label="Technology used">${client.tech.map(item => `<li>${glyph(item)}<span>${e(item.label)}</span></li>`).join('')}</ul></li>`).join('')}</ul></div></section>

<section id="testimonials" class="voices" data-scene="field" aria-labelledby="voices-title"><div class="wrap"><div class="section-head" data-home-reveal><div><p class="eyebrow gilt">Testimonials</p><h2 id="voices-title">In their <em>words.</em></h2></div></div><figure class="voice-featured"><span class="voice-mark" aria-hidden="true">“</span><blockquote><p>${words(testimonials.featured.quote)}</p></blockquote><figcaption><span class="voice-rule" aria-hidden="true"></span><strong>${e(testimonials.featured.name)}</strong><span>${e(testimonials.featured.role)}</span></figcaption></figure><div class="voice-grid">${testimonials.more.map(voice).join('')}</div></div></section>

<section id="contact" class="closing" data-scene="orb" aria-labelledby="closing-title"><div class="wrap"><p class="eyebrow gilt" data-home-reveal>Contact</p><h2 id="closing-title" data-home-reveal>Let’s build<br><em>what’s next.</em></h2><a class="closing-email" href="mailto:${e(contact.email)}" data-home-reveal>${e(contact.email)}</a><div class="closing-links" data-home-reveal><a class="btn solid" href="mailto:${e(contact.email)}">Email me</a><a class="btn" href="${e(contact.linkedin)}">LinkedIn</a><a class="btn" href="${e(contact.github)}">GitHub</a><a class="btn" href="/resume/arpit-bindal.pdf" download>Resume</a></div></div></section>`;
}
