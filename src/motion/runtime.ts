import { useSyncExternalStore } from 'react';
const listeners = new Set<() => void>();
const state = { off: false, hidden: false, filmActive: false };
export const diagnostics = {
  frames: 0, calls: 0, triangles: 0, geometries: 0, textures: 0,
  tier: 'full', ready: false, disposed: 0, active: false, owner: 'scroll',
  spread: 1, lift: [0, 0, 0, 0],
  seekSamples: [] as number[], sceneIntervals: [] as number[],
};
export function updateRuntime(patch: Partial<typeof state>) {
  const changed = Object.entries(patch).some(([key, value]) => state[key as keyof typeof state] !== value);
  Object.assign(state, patch);
  if (changed) listeners.forEach(listener => listener());
}
export function useRuntime() {
  useSyncExternalStore(callback => { listeners.add(callback); return () => { listeners.delete(callback); }; }, () => `${state.off}/${state.hidden}/${state.filmActive}`);
  return { ...state };
}
export function setupRuntime() {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let choice = false;
  try { choice = localStorage.getItem('portfolio-motion') === 'off'; } catch { /* Storage is optional. */ }
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('.motion-toggle')];
  const apply = () => {
    const off = media.matches || choice;
    updateRuntime({ off, hidden: document.hidden });
    document.documentElement.classList.toggle('motion-off', off);
    buttons.forEach(button => {
      button.textContent = `Motion: ${off ? 'off' : 'on'}`;
      button.setAttribute('aria-pressed', String(off));
      button.disabled = media.matches;
      button.title = media.matches ? 'Your system requests reduced motion.' : 'Change motion preference';
    });
  };
  const toggle = () => { choice = !choice; try { localStorage.setItem('portfolio-motion', choice ? 'off' : 'on'); } catch { /* Keep the control usable. */ } apply(); };
  buttons.forEach(button => button.addEventListener('click', toggle));
  media.addEventListener('change', apply);
  document.addEventListener('visibilitychange', apply);
  apply();
  return () => {
    buttons.forEach(button => button.removeEventListener('click', toggle));
    media.removeEventListener('change', apply);
    document.removeEventListener('visibilitychange', apply);
  };
}
