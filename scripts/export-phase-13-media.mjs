import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile, stat, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root = 'design/phase-13';
await mkdir(`${root}/exports`, { recursive:true });
const run = args => execFileSync('/opt/homebrew/bin/ffmpeg', ['-hide_banner','-loglevel','error','-y', ...args]);
const webp = (input, output, width) => execFileSync('python3', ['-c', 'from PIL import Image; import sys; im=Image.open(sys.argv[1]); w=int(sys.argv[3]); im.resize((w,round(im.height*w/im.width)),Image.Resampling.LANCZOS).save(sys.argv[2],quality=85)', input, output, String(width)]);
const files=[];
for (const width of [640,960,1440]) {
 const file=`${root}/exports/structure-concept-${width}.webp`;
 webp(`${root}/masters/structure.png`, file, width); files.push(file);
}
try {
 await stat(`${root}/masters/material-film.mp4`);
 const file=`${root}/exports/material-film.mp4`;
 run(['-i',`${root}/masters/material-film.mp4`,'-vf','scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30','-c:v','libx264','-preset','slow','-crf','22','-pix_fmt','yuv420p','-g','6','-keyint_min','6','-sc_threshold','0','-bf','0','-movflags','+faststart','-an',file]); files.push(file);
 run(['-i',file,'-frames:v','1',`${root}/review/film-first.png`]);
 webp(`${root}/review/film-first.png`, `${root}/exports/film-poster.webp`, 1280); files.push(`${root}/exports/film-poster.webp`);
 run(['-i',file,'-vf','fps=1,scale=384:-2,tile=3x2','-frames:v','1',`${root}/review/film-frames.jpg`]);
} catch (error) { if(error.code!=='ENOENT') throw error; }
for (const [source, target] of [['material-film.mp4','selected-material-film.mp4'],['film-poster.webp','selected-film-poster.webp'],['scene-poster.webp','selected-scene-poster.webp']]) {
 const file=`${root}/exports/${target}`;
 await copyFile(`design/phase-3/media/${source}`,file); files.push(file);
}
const manifest=[];
for(const file of files){const bytes=await readFile(file);manifest.push({file,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}
await writeFile(`${root}/exports/files.json`,JSON.stringify(manifest,null,2)+'\n');
console.log(manifest.map(x=>`${x.file}: ${x.bytes} bytes`).join('\n'));
