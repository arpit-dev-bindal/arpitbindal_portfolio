import { createRoot } from 'react-dom/client';
import SceneIsland from '../motion/SceneIsland.tsx';
import ScrollFilm from '../motion/ScrollFilm.tsx';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
createRoot(document.getElementById('scene-root')!).render(<SceneIsland visitor />);
createRoot(document.getElementById('film-root')!).render(<ScrollFilm visitor />);
document.fonts.ready.then(() => ScrollTrigger.refresh());
