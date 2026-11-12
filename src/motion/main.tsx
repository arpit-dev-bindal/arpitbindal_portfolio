import { createRoot } from 'react-dom/client';
import SceneIsland from './SceneIsland.tsx';
import ScrollFilm from './ScrollFilm.tsx';
import { diagnostics, setupRuntime } from './runtime.ts';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stopRuntime = setupRuntime();
const sceneNode = document.getElementById('scene-root')!;
let sceneRoot: ReturnType<typeof createRoot> | null = createRoot(sceneNode);
const filmRoot = createRoot(document.getElementById('film-root')!);
sceneRoot.render(<SceneIsland />);
filmRoot.render(<ScrollFilm />);
const menu = document.querySelector<HTMLDialogElement>('.menu-dialog');
const opener = document.querySelector<HTMLButtonElement>('.menu-open');
opener?.addEventListener('click', () => { menu?.showModal(); document.body.style.overflow = 'hidden'; });
document.querySelector('.menu-close')?.addEventListener('click', () => menu?.close());
menu?.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));
document.fonts.ready.then(() => ScrollTrigger.refresh());

// Local prototype inspection only. The production build will omit this interface.
Object.assign(window, { portfolioPrototype: {
  diagnostics,
  triggers: () => ScrollTrigger.getAll().map(trigger => ({ id: trigger.vars.id, start: trigger.start, end: trigger.end, progress: trigger.progress })),
  unmountScene: () => { sceneRoot?.unmount(); sceneRoot = null; },
  mountScene: () => { if (!sceneRoot) { sceneRoot = createRoot(sceneNode); sceneRoot.render(<SceneIsland />); } },
  dispose: () => { sceneRoot?.unmount(); filmRoot.unmount(); stopRuntime(); },
} });
