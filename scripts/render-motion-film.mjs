import { mkdir, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const directory = await mkdtemp(join(tmpdir(), 'arpit-film-'));
const output = resolve('design/phase-3/media');
await mkdir(output, { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('http://127.0.0.1:4174/render-film.html');
  await page.waitForFunction(() => typeof window.renderFilmFrame === 'function');
  for (const [name, width] of [['scene-poster', 960], ['film-poster', 1280]]) {
    const data = await page.evaluate(width => window.renderFilmFrame(0, 'image/webp', width, 720), width);
    await writeFile(join(output, `${name}.webp`), Buffer.from(data.split(',')[1], 'base64'));
  }
  if (process.argv.includes('--posters-only')) { console.log('Saved both posters.'); }
  else {
  for (let index = 0; index < 180; index++) {
    const data = await page.evaluate(progress => window.renderFilmFrame(progress), index / 179);
    await writeFile(join(directory, `${String(index).padStart(4, '0')}.png`), Buffer.from(data.split(',')[1], 'base64'));
    if (index % 60 === 0) console.log(`Rendered frame ${index + 1} of 180.`);
  }
  const ffmpeg = process.env.FFMPEG ?? '/opt/homebrew/bin/ffmpeg';
  const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  run(['-framerate', '30', '-i', join(directory, '%04d.png'), '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p', '-g', '6', '-keyint_min', '6', '-sc_threshold', '0', '-bf', '0', '-movflags', '+faststart', '-an', join(output, 'material-film.mp4')]);
  console.log('Saved the six-second film and both posters. Keyframes occur every six frames.');
  }
} finally { await browser.close(); await rm(directory, { recursive: true, force: true }); }
