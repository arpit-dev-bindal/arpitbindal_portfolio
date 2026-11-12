import { setupRuntime } from '../motion/runtime.ts';
document.querySelectorAll<HTMLButtonElement>('.motion-toggle').forEach(button => { button.hidden = false; });
setupRuntime();
const menu = document.querySelector<HTMLDetailsElement>('.mobile-navigation')!;
const summary = menu.querySelector('summary')!;
const sync = () => summary.setAttribute('aria-expanded', String(menu.open));
menu.addEventListener('toggle', sync);
sync();
const close = (focus: boolean) => { menu.open = false; sync(); if (focus) summary.focus(); };
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.open) { close(true); event.preventDefault(); } });
document.addEventListener('click', event => { if (menu.open && !menu.contains(event.target as Node)) close(false); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close(false)));
matchMedia('(min-width: 768px)').addEventListener('change', event => {
  if (event.matches) {
    const hadFocus = menu.contains(document.activeElement);
    close(false);
    if (hadFocus) document.querySelector<HTMLAnchorElement>('.site-nav a')?.focus();
  }
});
window.addEventListener('pageshow', () => close(false));
if (document.getElementById('scene-root')) void import('./home.tsx');
if (document.getElementById('particle-canvas')) void import('./landing.ts');

if (document.querySelector('.turby-gallery')) void import('./turby-gallery.ts');


if (document.querySelector('.work-archive')) void import('./work-archive.ts');

if (document.querySelector('[data-copy-email]')) void import('./contact-controls.ts');

void import('./page-motion.ts');

if (document.querySelector('[data-backup-visual]')) void import('./project-visual-controls.ts');

void import('./visitor-interactions.ts');
