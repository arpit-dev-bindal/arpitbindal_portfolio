const menu = document.querySelector('.menu-dialog');
const opener = document.querySelector('.menu-open');
opener.addEventListener('click', () => { menu.showModal(); document.body.style.overflow = 'hidden'; });
document.querySelector('.menu-close').addEventListener('click', () => menu.close());
menu.addEventListener('close', () => { document.body.style.overflow = ''; opener.focus(); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));

const preference = matchMedia('(prefers-reduced-motion: reduce)');
const toggle = document.querySelector('.motion-toggle');
const animations = new Set();
let motionOff = preference.matches;
try { motionOff ||= sessionStorage.getItem('phase2-motion') === 'off'; } catch { /* Storage is optional. */ }
const updateMotion = () => {
  document.documentElement.classList.toggle('motion-off', motionOff);
  toggle.textContent = `Motion: ${motionOff ? 'off' : 'on'}`;
  toggle.setAttribute('aria-pressed', String(motionOff));
  if (motionOff) for (const animation of animations) animation.finish();
};
toggle.addEventListener('click', () => {
  motionOff = !motionOff;
  try { sessionStorage.setItem('phase2-motion', motionOff ? 'off' : 'on'); } catch { /* Keep the control available. */ }
  updateMotion();
});
preference.addEventListener('change', event => { motionOff = event.matches; updateMotion(); });
updateMotion();
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    observer.unobserve(entry.target);
    if (motionOff) continue;
    const animation = entry.target.animate([
      { opacity: .45, transform: 'translateY(16px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)' });
    animations.add(animation);
    animation.finished.finally(() => animations.delete(animation));
  }
}, { threshold: .1 });
document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
