import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { createSeekController } from './seek-controller.ts';
import { diagnostics, updateRuntime, useRuntime } from './runtime.ts';
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollFilm({ visitor = false }: { visitor?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const controller = useRef<ReturnType<typeof createSeekController> | null>(null);
  const { off, hidden } = useRuntime();
  const [mobile, setMobile] = useState(matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const query = matchMedia('(max-width: 767px)');
    const change = () => setMobile(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const [visible, setVisible] = useState(false);
  const [near, setNear] = useState(false);
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<'scroll' | 'play'>(mobile || saveData || off ? 'play' : 'scroll');
  const [error, setError] = useState('');
  const [slow, setSlow] = useState(false);
  const shouldLoad = requested || (near && !off && !saveData && !mobile);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: .05 });
    const preload = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) setNear(true); }, { rootMargin: '400px' });
    observer.observe(element); preload.observe(element);
    return () => { observer.disconnect(); preload.disconnect(); };
  }, []);
  useEffect(() => {
    const media = video.current;
    if (!media) return;
    controller.current = createSeekController(media, {
      onSlow: () => { setSlow(true); setMode('play'); media.pause(); },
      onSample: ms => { diagnostics.seekSamples.push(ms); if (diagnostics.seekSamples.length > 120) diagnostics.seekSamples.shift(); },
    });
    return () => { controller.current?.dispose(); controller.current = null; media.pause(); updateRuntime({ filmActive: false }); };
  }, []);
  useEffect(() => {
    if (off || hidden || !visible) { video.current?.pause(); controller.current?.cancel(); }
    if (off || mobile) setMode('play');
  }, [off, hidden, visible, mobile]);
  useEffect(() => {
    updateRuntime({ filmActive: visible && !hidden && (playing || (!off && mode === 'scroll' && ready)) });
    return () => updateRuntime({ filmActive: false });
  }, [visible, hidden, playing, off, mode, ready]);
  useGSAP(() => {
    const media = video.current;
    if (!media || !ready || mode !== 'scroll' || off || hidden || !visible || slow) return;
    media.pause();
    const state = { progress: 0 };
    const tween = gsap.to(state, {
      progress: 1, ease: 'none',
      onUpdate: () => controller.current?.request(state.progress * media.duration),
      scrollTrigger: { id: 'portfolio-film', trigger: root.current, start: 'top 80%', end: 'bottom 20%', scrub: true, invalidateOnRefresh: true },
    });
    const start = tween.scrollTrigger?.progress ?? 0;
    controller.current?.request(start * media.duration);
    return () => controller.current?.cancel();
  }, { scope: root, dependencies: [ready, mode, off, hidden, visible, slow], revertOnUpdate: true });
  const play = async () => {
    setRequested(true); setMode('play'); controller.current?.cancel();
    const media = video.current;
    if (!media) return;
    setError('');
    if (!media.getAttribute('src')) { media.src = './media/material-film.mp4'; media.load(); }
    try { await media.play(); } catch { setError('Playback did not start. Use the video controls to try again.'); }
  };
  const scroll = () => { video.current?.pause(); setSlow(false); setMode('scroll'); setRequested(true); setError(''); };
  const skip = () => {
    video.current?.pause(); controller.current?.cancel();
    const target = document.querySelector<HTMLElement>('#ai-next');
    target?.scrollIntoView({ behavior: 'instant' });
    const heading = target?.querySelector<HTMLElement>('h2');
    heading?.setAttribute('tabindex', '-1'); heading?.focus({ preventScroll: true });
  };
  return <div ref={root} className="scroll-film" data-mode={mode} data-ready={ready}>
    <video ref={video} className="film-video" muted playsInline preload={shouldLoad ? 'auto' : 'none'}
      {...(shouldLoad ? { src: './media/material-film.mp4' } : {})} poster="./media/film-poster.webp"
      controls={mode === 'play'} aria-label="Six-second film of the four metal layers" onLoadedData={() => { setReady(true); ScrollTrigger.refresh(); }}
      onError={() => { setError('The film is unavailable. The still image remains available.'); setReady(false); }}
      onPlay={() => { controller.current?.cancel(); setMode('play'); setPlaying(true); }} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
    {visitor ? <div className="visitor-film-controls"><button onClick={playing ? () => video.current?.pause() : play} aria-label={playing ? 'Pause film' : 'Play film'}>{playing ? 'Ⅱ' : '▷'} <span>{playing ? 'Pause' : 'Play'}</span></button><details><summary>Playback options</summary><div><button onClick={scroll} disabled={off} aria-pressed={mode === 'scroll'}>Use scroll</button><button onClick={skip}>Skip film</button></div></details></div> : <div className="film-controls"><button onClick={playing ? () => video.current?.pause() : play}>{playing ? 'Pause film' : 'Play film'}</button>
      <button onClick={scroll} disabled={off} aria-pressed={mode === 'scroll'}>Use scroll</button><button onClick={skip}>Skip film</button></div>}
    <p className="film-state" role="status" hidden={visitor && !error && !slow}>{error || (slow ? 'This device seeks slowly. Use normal playback.' : off ? 'Motion is off. You can play the film manually.' : mode === 'scroll' ? 'Scroll forward or backward. Stop to hold the frame.' : 'Normal playback. Scroll does not change the film.')}</p>
  </div>;
}
