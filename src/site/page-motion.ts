import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// Native page flow and visible text remain the baseline.
const selectors = '[data-home-reveal], .work-feature, .journey-entry, .about-example, .about-events li, .study-body > section, .contact-context';
const elements = [...document.querySelectorAll<HTMLElement>(selectors)];
elements.forEach(element => element.setAttribute('data-page-reveal', ''));
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let context: gsap.Context | undefined;
let frame = 0;
const refresh = () => {
 cancelAnimationFrame(frame);
 frame = requestAnimationFrame(() => ScrollTrigger.refresh());
};
const rebuild = () => {
 context?.revert();
 context = undefined;
 if (preference.matches || document.hidden || document.documentElement.classList.contains('motion-off')) return;
 context = gsap.context(() => {
  elements.forEach(element => {
   if (element.getBoundingClientRect().top < innerHeight || element.contains(document.activeElement)) return;
   gsap.from(element, { y: 20, duration: .6, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
  });
 });
 refresh();
};
// Other scripts write classes on the root during scroll. A rebuild follows only a change of the motion setting.
let motionWasOff = document.documentElement.classList.contains('motion-off');
const observer = new MutationObserver(() => { const off = document.documentElement.classList.contains('motion-off'); if (off === motionWasOff) return; motionWasOff = off; rebuild(); });
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
preference.addEventListener('change', rebuild);
document.addEventListener('visibilitychange', rebuild);
window.addEventListener('pagehide', () => { context?.revert(); cancelAnimationFrame(frame); });
window.addEventListener('pageshow', rebuild);
document.addEventListener('toggle', refresh, true);
document.fonts.ready.then(refresh);
document.querySelectorAll('img').forEach(image => image.addEventListener('load', refresh, { once: true }));
rebuild();
