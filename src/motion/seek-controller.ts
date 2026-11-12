type SeekMedia = Pick<HTMLVideoElement, 'duration' | 'readyState' | 'seeking' | 'currentTime' | 'addEventListener' | 'removeEventListener'>;
export function createSeekController(media: SeekMedia, options: { onSlow?: () => void; onSample?: (ms: number) => void } = {}) {
  let latest: number | null = null;
  let pending = false;
  let disposed = false;
  let started = 0;
  let slowCount = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const clear = () => { clearTimeout(timer); timer = undefined; };
  const cancel = () => { latest = null; pending = false; clear(); };
  const flush = () => {
    if (disposed || pending || media.seeking || latest === null) return;
    const target = latest;
    latest = null;
    if (Math.abs(media.currentTime - target) < 1 / 60) return;
    pending = true;
    started = performance.now();
    timer = setTimeout(() => { cancel(); options.onSlow?.(); }, 2000);
    try { media.currentTime = target; } catch { cancel(); options.onSlow?.(); }
  };
  const onSeeked = () => {
    if (disposed) return;
    if (pending) {
      const ms = performance.now() - started;
      options.onSample?.(ms);
      slowCount = ms > 180 ? slowCount + 1 : 0;
    }
    pending = false;
    clear();
    if (slowCount >= 3) { cancel(); options.onSlow?.(); return; }
    flush();
  };
  media.addEventListener('seeked', onSeeked);
  return {
    request(time: number) {
      if (disposed || !Number.isFinite(time) || !Number.isFinite(media.duration) || media.duration <= 0 || media.readyState < 2) return;
      latest = Math.max(0, Math.min(media.duration - 1 / 30, time));
      flush();
    },
    cancel,
    dispose() { disposed = true; cancel(); media.removeEventListener('seeked', onSeeked); },
  };
}
