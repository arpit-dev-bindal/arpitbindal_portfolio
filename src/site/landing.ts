import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createParticles, type Shape } from './particles.ts';

gsap.registerPlugin(ScrollTrigger);
const root = document.documentElement;
const motionOff = () => root.classList.contains('motion-off') || matchMedia('(prefers-reduced-motion: reduce)').matches;
// Lenis also writes classes on the root while the page scrolls, so the callback runs only when the motion setting itself changes.
const onMotionChange = (callback: () => void) => { let last = motionOff(); new MutationObserver(() => { const now = motionOff(); if (now === last) return; last = now; callback(); }).observe(root, { attributes: true, attributeFilter: ['class'] }); };

// Smooth scroll runs only while motion remains enabled.
let lenis: Lenis | undefined;
const syncLenis = () => {
  if (motionOff()) { lenis?.destroy(); lenis = undefined; return; }
  if (lenis) return;
  lenis = new Lenis({ smoothWheel: true, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
};
syncLenis();
onMotionChange(syncLenis);

// Scroll scenes. Every scene starts from the finished layout, so the page reads fully without them.
const hero = document.querySelector<HTMLElement>('.landing-hero');
const heroName = document.querySelector<HTMLElement>('.hero-name');
const portrait = document.querySelector<HTMLElement>('.hero-portrait');
let scenes: gsap.Context | undefined;
let drift: ((x: number, y: number) => void) | undefined;
const buildScenes = () => {
  scenes?.revert();
  scenes = undefined;
  drift = undefined;
  if (motionOff()) return;
  scenes = gsap.context(() => {
    // Hero: the name opens outward and recedes while the portrait holds.
    if (hero && heroName) {
      gsap.to(heroName, { letterSpacing: '.09em', opacity: .12, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      if (portrait) gsap.to(portrait, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      const nameX = gsap.quickTo(heroName, 'x', { duration: 1.2, ease: 'power3.out' });
      const nameY = gsap.quickTo(heroName, 'y', { duration: 1.2, ease: 'power3.out' });
      const faceX = portrait ? gsap.quickTo(portrait, 'x', { duration: 1.2, ease: 'power3.out' }) : undefined;
      drift = (x, y) => { nameX(x * -18); nameY(y * -10); faceX?.(x * 10); };
    }

    // Statement: the paragraph lies back and rises upright while its words come into the light.
    const statement = document.querySelector<HTMLElement>('.statement');
    if (statement) {
      gsap.fromTo('.statement-text', { rotateX: 32, yPercent: 16, scale: .94 }, { rotateX: 0, yPercent: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: statement, start: 'top 92%', end: 'center 52%', scrub: .7 } });
      gsap.fromTo('.statement-text .word', { opacity: .14 }, { opacity: 1, ease: 'none', stagger: .12, scrollTrigger: { trigger: statement, start: 'top 70%', end: 'center 45%', scrub: .7 } });
    }

    // Journey: each line draws from its start date.
    gsap.utils.toArray<HTMLElement>('.era-bar').forEach(bar => {
      gsap.from(bar, { scaleX: 0, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: bar, start: 'top 88%', once: true } });
    });

    // Testimonials: the quote arrives word by word, then the cards turn up from the page.
    const featured = document.querySelector<HTMLElement>('.voice-featured');
    if (featured) {
      gsap.from(featured.querySelectorAll('.word'), { opacity: 0, y: 26, rotateX: -50, duration: 1.1, ease: 'power3.out', stagger: .025, scrollTrigger: { trigger: featured, start: 'top 78%', once: true } });
      gsap.from(featured.querySelector('figcaption'), { opacity: 0, y: 16, duration: 1, delay: .7, ease: 'power2.out', scrollTrigger: { trigger: featured, start: 'top 78%', once: true } });
    }
    gsap.from('.voice', { opacity: 0, y: 48, rotateX: 18, transformOrigin: '50% 100%', duration: 1.2, ease: 'power3.out', stagger: .14, clearProps: 'transform', scrollTrigger: { trigger: '.voice-grid', start: 'top 86%', once: true } });

    // Closing: the headline settles as the page ends.
    gsap.from('.closing h2', { letterSpacing: '.04em', ease: 'none', scrollTrigger: { trigger: '.closing', start: 'top bottom', end: 'center center', scrub: .6 } });
  });
};
buildScenes();
onMotionChange(buildScenes);
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => { syncLenis(); buildScenes(); });

// Counters start when their figure enters the viewport.
const seen = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  seen.unobserve(entry.target);
  const element = entry.target as HTMLElement;
  const end = Number(element.dataset.count), suffix = element.dataset.suffix ?? '';
  if (motionOff() || !Number.isFinite(end)) return;
  const start = performance.now();
  const step = (now: number) => { const t = Math.min(1, (now - start) / 1600), eased = 1 - Math.pow(1 - t, 3); element.textContent = Math.round(end * eased) + suffix; if (t < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}), { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(element => seen.observe(element));

// The player loads only after a press. Before that, the page requests only the preview image.
document.querySelectorAll<HTMLButtonElement>('[data-youtube]').forEach(button => button.addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(button.dataset.youtube!)}?autoplay=1&rel=0&start=${Number(button.dataset.start) || 0}`;
  frame.title = button.dataset.title ?? 'Event presentation';
  frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.allowFullscreen = true;
  frame.className = 'talk';
  button.replaceWith(frame);
}));

// Particle scene. Each section names a shape; the viewport centre blends neighbours.
const canvas = document.querySelector<HTMLCanvasElement>('#particle-canvas');
let cloud: ReturnType<typeof createParticles> | undefined;
try { if (canvas) cloud = createParticles(canvas); } catch { canvas?.remove(); root.classList.add('no-webgl'); }
const sections = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
let bounds: { top: number; bottom: number; shape: Shape }[] = [];
const measure = () => { bounds = sections.map(section => { const rect = section.getBoundingClientRect(); return { top: rect.top + scrollY, bottom: rect.bottom + scrollY, shape: section.dataset.scene as Shape }; }); };
const blend = () => {
  if (!cloud || !bounds.length) return;
  const centre = scrollY + innerHeight * .5, window_ = innerHeight * .45;
  let index = bounds.findIndex(item => centre < item.bottom);
  if (index < 0) index = bounds.length - 1;
  const current = bounds[index]!, next = bounds[index + 1], previous = bounds[index - 1];
  const mix: Partial<Record<Shape, number>> = {};
  const add = (shape: Shape, amount: number) => { mix[shape] = (mix[shape] ?? 0) + amount; };
  const smooth = (t: number) => { const c = Math.min(1, Math.max(0, t)); return c * c * (3 - 2 * c); };
  let toNext = next ? smooth((centre - (current.bottom - window_)) / (window_ * 2)) : 0;
  let toPrevious = previous ? smooth(((current.top + window_) - centre) / (window_ * 2)) : 0;
  const total = toNext + toPrevious;
  if (total > 1) { toNext /= total; toPrevious /= total; }
  add(current.shape, 1 - toNext - toPrevious);
  if (next) add(next.shape, toNext);
  if (previous) add(previous.shape, toPrevious);
  cloud.setBlend(mix);
};
measure(); blend();
addEventListener('resize', () => { cloud?.resize(); measure(); blend(); });
new ResizeObserver(() => { measure(); blend(); }).observe(document.body);
addEventListener('pointermove', event => {
  cloud?.pointer(event.clientX, event.clientY);
  if (scrollY < innerHeight) drift?.(event.clientX / innerWidth * 2 - 1, event.clientY / innerHeight * 2 - 1);
}, { passive: true });

let before = performance.now(), lastScroll = scrollY, stillDrawn = false;
const loop = (now: number) => {
  requestAnimationFrame(loop);
  const delta = Math.min(.05, (now - before) / 1000);
  before = now;
  const still = motionOff();
  if (!still) lenis?.raf(now);
  if (document.hidden) return;
  const moved = scrollY - lastScroll;
  lastScroll = scrollY;
  blend();
  if (still) {
    // A still scene redraws only after a scroll or a size change.
    if (!stillDrawn || moved) { cloud?.frame(delta, true); stillDrawn = true; }
    return;
  }
  stillDrawn = false;
  cloud?.frame(delta, false);
};
requestAnimationFrame(loop);
document.fonts.ready.then(() => { measure(); ScrollTrigger.refresh(); });
