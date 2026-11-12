import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root='design/phase-13';
const files=JSON.parse(await readFile(`${root}/exports/files.json`,'utf8'));
for(const file of files){const bytes=await readFile(file.file);assert.equal(bytes.length,file.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),file.sha256);}
const probe=JSON.parse(execFileSync('/opt/homebrew/bin/ffprobe',['-v','error','-show_streams','-show_format','-of','json',`${root}/exports/material-film.mp4`],{encoding:'utf8'}));
const video=probe.streams.find(x=>x.codec_type==='video');
assert.equal(video.codec_name,'h264');assert.equal(video.width,1280);assert.equal(video.height,720);
assert.equal(probe.streams.some(x=>x.codec_type==='audio'),false);
assert.ok(Number(probe.format.duration)>=5.8 && Number(probe.format.duration)<=6.2);
assert.ok(Number(probe.format.size)<4*1024*1024);
const keyframes=execFileSync('/opt/homebrew/bin/ffprobe',['-v','error','-select_streams','v','-skip_frame','nokey','-show_entries','frame=best_effort_timestamp_time','-of','csv=p=0',`${root}/exports/material-film.mp4`],{encoding:'utf8'}).split('\n').map(x=>parseFloat(x)).filter(Number.isFinite);
for(let i=1;i<keyframes.length;i++)assert.ok(keyframes[i]-keyframes[i-1]<0.21);
const bytes=await readFile(`${root}/exports/material-film.mp4`);assert.ok(bytes.indexOf('moov')<bytes.indexOf('mdat'));
const report={checks:['All export hashes and byte counts match','Film uses H.264 at 1280×720 without audio','Film lasts six seconds and stays below 4 MiB','Keyframes remain within 0.21 seconds; fast-start metadata precedes video data'],video:{duration:Number(probe.format.duration),bytes:Number(probe.format.size),keyframes:keyframes.length},errors:[]};
await writeFile(`${root}/review/media-checks.json`,JSON.stringify(report,null,2)+'\n');
console.log(report);
