import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { initialPose, layers, scenePose, selectPose } from './scene-state.ts';
import { diagnostics, useRuntime } from './runtime.ts';
gsap.registerPlugin(ScrollTrigger, useGSAP);
const SceneCanvas = lazy(() => import('./SceneCanvas.tsx'));
class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}
export default function SceneIsland({ visitor = false }: { visitor?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const pose = useRef(initialPose());
  const invalidate = useRef<() => void>(() => {});
  const activeRef = useRef(false);
  const owner = useRef('scroll');
  const progress = useRef(0);
  const driver = useRef({ progress: 0 });
  const trigger = useRef<ScrollTrigger | null>(null);
  const narrow = useRef(matchMedia('(max-width: 767px)'));
  const dataSaver = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const [enabled, setEnabled] = useState(!narrow.current.matches && !dataSaver);
  const [mobile, setMobile] = useState(narrow.current.matches);
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [light, setLight] = useState(matchMedia('(max-width: 1023px)').matches);
  const [selected, setSelected] = useState<number | null>(null);
  const [manual, setManual] = useState(false);
  const [step, setStep] = useState(0);
  const { off, hidden, filmActive } = useRuntime();
  const active = enabled && ready && visible && !off && !hidden && !filmActive && !failed;
  activeRef.current = active;
  diagnostics.active = active;
  const requestFrame = useCallback(() => { if (activeRef.current) invalidate.current(); }, []);
  const fail = useCallback(() => { setFailed(true); setReady(false); diagnostics.tier = 'static'; }, []);
  const onReady = useCallback((render: () => void) => { invalidate.current = render; setReady(true); }, []);
  const onSlow = useCallback(() => { if (!light) { setLight(true); diagnostics.tier = 'light'; } else { diagnostics.tier = 'static'; fail(); } }, [light, fail]);
  useEffect(() => {
    if (off) setReady(false);
  }, [off]);
  useEffect(() => {
    const media = narrow.current;
    const changed = () => { setMobile(media.matches); if (media.matches) { setEnabled(false); setReady(false); } };
    media.addEventListener('change', changed);
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: .01 });
    if (root.current) observer.observe(root.current);
    return () => { media.removeEventListener('change', changed); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!active) gsap.killTweensOf(pose.current);
    else requestFrame();
  }, [active, requestFrame]);
  const { contextSafe } = useGSAP(() => {
    if (off || !enabled || failed || !ready || mobile) return;
    const chapter = document.querySelector<HTMLElement>('.scene-chapter');
    if (!chapter) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (min-height: 700px)', () => {
      const tween = gsap.to(driver.current, {
        progress: 1, ease: 'none',
        onUpdate: () => {
          progress.current = driver.current.progress;
          const currentStep = Math.min(3, Math.floor(progress.current * 4));
          setStep(previous => previous === currentStep ? previous : currentStep);
          if (owner.current !== 'scroll' || !activeRef.current) return;
          Object.assign(pose.current, scenePose(progress.current)); requestFrame();
        },
        scrollTrigger: {
          id: 'portfolio-story', trigger: chapter, start: 'top top', end: () => `+=${innerHeight * (visitor ? .8 : 1.2)}`,
          pin: true, pinSpacing: true, scrub: .6, invalidateOnRefresh: true,
        },
      });
      trigger.current = tween.scrollTrigger ?? null;
      return () => { trigger.current = null; };
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [off, enabled, failed, ready, mobile], revertOnUpdate: true });
  const select = contextSafe((index: number | null) => {
    setSelected(index); setManual(true); owner.current = 'manual'; diagnostics.owner = 'manual';
    gsap.killTweensOf(pose.current);
    if (off) return;
    gsap.to(pose.current, { ...selectPose(index), duration: .55, ease: 'power2.out', overwrite: true, onUpdate: requestFrame });
  });
  const resume = contextSafe(() => {
    setManual(false); setSelected(null); owner.current = 'scroll'; diagnostics.owner = 'scroll';
    gsap.to(pose.current, { ...scenePose(progress.current), duration: .55, ease: 'power2.out', overwrite: true, onUpdate: requestFrame });
  });
  useEffect(() => {
    if (!manual || off || (!visitor && !document.documentElement.classList.contains('clean-preview'))) return;
    const onScroll = () => resume();
    const onKey = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('button, summary, input, select, textarea, a')) return;
      if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)) resume();
    };
    window.addEventListener('wheel', onScroll, { once: true, passive: true });
    window.addEventListener('touchmove', onScroll, { once: true, passive: true });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('wheel', onScroll); window.removeEventListener('touchmove', onScroll); window.removeEventListener('keydown', onKey); };
  }, [manual, off, resume]);
  const pointer = contextSafe((event: React.PointerEvent<HTMLDivElement>) => {
    if (!active || event.pointerType !== 'mouse' || gsap.isTweening(pose.current) || (trigger.current?.isActive && owner.current === 'scroll')) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pose.current.tiltY = ((event.clientX - rect.left) / rect.width - .5) * .14;
    pose.current.tiltX = ((event.clientY - rect.top) / rect.height - .5) * .1;
    requestFrame();
  });
  const skip = () => {
    gsap.killTweensOf(pose.current); Object.assign(pose.current, scenePose(1)); requestFrame();
    const work = document.querySelector<HTMLElement>('#work');
    work?.scrollIntoView({ behavior: 'instant' });
    const heading = work?.querySelector<HTMLElement>('h2');
    heading?.setAttribute('tabindex', '-1'); heading?.focus({ preventScroll: true });
  };
  useEffect(() => {
    if (!visitor) return;
    document.querySelectorAll<HTMLElement>('[data-chapter]').forEach(item => {
      item.classList.toggle('is-current', Number(item.dataset.chapter) === (manual && selected !== null ? selected : step));
    });
  }, [visitor, step, manual, selected]);
  const canRender = enabled && !off && !failed;
  return <div ref={root} className={`scene-widget ${visitor ? 'visitor-scene' : ''}`} data-ready={ready} data-owner={manual ? 'manual' : 'scroll'}>
    <div className="scene-surface" onPointerMove={pointer} onPointerLeave={() => { pose.current.tiltX = 0; pose.current.tiltY = 0; requestFrame(); }}>
      <img className={`scene-poster ${canRender && ready ? 'is-hidden' : ''}`} src="./media/scene-poster.webp" alt="Four metal layers with a rose inset." width="960" height="720" />
      {canRender && <SceneBoundary onFailure={fail}><Suspense fallback={null}><SceneCanvas pose={pose.current} active={active} light={light} onReady={onReady} onFailure={fail} onSlow={onSlow} onSelect={select} /></Suspense></SceneBoundary>}
    </div>
    {visitor ? <>
      <div className="scene-callout"><span className="mono">0{(manual && selected !== null ? selected : step) + 1} / {layers[manual && selected !== null ? selected : step]?.name}</span><p aria-live="polite">{manual && selected === null ? 'All layers form one system.' : layers[manual && selected !== null ? selected : step]?.description}</p></div>
      <details className="scene-display"><summary>Explore the model</summary><div className="scene-display-body"><p>Select a layer. Scroll to return to the story.</p><div className="layer-controls" role="group" aria-label="Inspect a layer">{layers.map((layer,index)=><button key={layer.name} onClick={()=>select(index)} aria-pressed={manual && selected===index}>{layer.name}</button>)}<button onClick={()=>select(null)}>Assemble</button></div>{!off && <button onClick={()=>{setEnabled(!enabled);setReady(false);setFailed(false);}}>{enabled && !failed ? 'Use still image' : 'Enable 3D'}</button>}</div></details>
      {(!enabled || failed) && !off && <button className="enable-model" onClick={()=>{setEnabled(true);setReady(false);setFailed(false);}}>Enable 3D</button>}
    </> : <>    <div className="layer-controls" role="group" aria-label="Inspect a layer">{layers.map((layer, index) => <button key={layer.name} onClick={() => select(index)} aria-pressed={manual && selected === index}>{layer.name}</button>)}<button onClick={() => select(null)} aria-pressed={manual && selected === null}>Assemble</button></div>
    <p className="scene-description" aria-live="polite">{manual ? selected === null ? 'All layers form one system.' : layers[selected]?.description : layers[step]?.description}</p>
    <div className="scene-options">
      {(!enabled || failed) && !off && <button onClick={() => { setFailed(false); setEnabled(true); setReady(false); }}>Enable 3D</button>}
      {enabled && !off && !failed && <button className="scene-hide-clean" onClick={() => { setEnabled(false); setReady(false); }}>Use still image</button>}
      {manual && !off && <button className="scene-hide-clean" onClick={resume}>Resume scroll</button>}
      <button className="scene-hide-clean" onClick={skip}>Skip to work</button>
    </div>
</>}
    {failed && <p className="scene-message" role="status">3D is unavailable. The still image remains available.</p>}
    {off && !visitor && <p className="scene-message">Motion is off. Layer buttons still show each description.</p>}
  </div>;
}
