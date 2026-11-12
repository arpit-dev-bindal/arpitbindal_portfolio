import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createSeekController } from '../src/motion/seek-controller.ts';
import { scenePose, initialPose, selectPose } from '../src/motion/scene-state.ts';

class Media extends EventTarget {
  duration = 6;
  readyState = 2;
  seeking = false;
  writes = [];
  time = 0;
  get currentTime() { return this.time; }
  set currentTime(value) { this.time = value; this.writes.push(value); this.seeking = true; }
  finish() { this.seeking = false; this.dispatchEvent(new Event('seeked')); }
}

test('video seeks keep only the latest target during an active seek', () => {
  const media = new Media();
  const controller = createSeekController(media);
  controller.request(1); controller.request(2); controller.request(4);
  assert.deepEqual(media.writes, [1]);
  media.finish();
  assert.deepEqual(media.writes, [1, 4]);
  controller.dispose();
});
test('video seeks accept reversal and clamp to available duration', () => {
  const media = new Media(); const controller = createSeekController(media);
  controller.request(100); media.finish(); controller.request(-10);
  assert.ok(media.writes[0] < 6 && media.writes[0] > 5.9);
  assert.equal(media.writes[1], 0);
  controller.dispose();
});
test('video waits for usable media and rejects invalid targets', () => {
  const media = new Media(); media.readyState = 0;
  const controller = createSeekController(media);
  controller.request(3); controller.request(NaN);
  assert.deepEqual(media.writes, []);
  controller.dispose();
});
test('manual playback clears queued seeks', () => {
  const media = new Media(); const controller = createSeekController(media);
  controller.request(2); controller.request(4); controller.cancel(); media.finish();
  assert.deepEqual(media.writes, [2]);
  controller.dispose();
});
test('seek cleanup removes event work', () => {
  const media = new Media(); const controller = createSeekController(media);
  controller.request(2); controller.request(4); controller.dispose(); media.finish(); controller.request(5);
  assert.deepEqual(media.writes, [2]);
});
test('a stalled seek selects the slow-media fallback', t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const media = new Media(); let fallback = 0;
  const controller = createSeekController(media, { onSlow: () => fallback++ });
  controller.request(1); controller.request(4);
  t.mock.timers.tick(2001);
  assert.equal(fallback, 1);
  media.finish();
  assert.deepEqual(media.writes, [1]);
  controller.dispose();
});
test('three slow seeks select normal playback', t => {
  let now = 0; let fallback = 0;
  t.mock.method(performance, 'now', () => now);
  const media = new Media();
  const controller = createSeekController(media, { onSlow: () => fallback++ });
  for (const target of [1, 2, 3]) { controller.request(target); now += 250; media.finish(); }
  assert.equal(fallback, 1);
  controller.dispose();
});
test('scroll poses are bounded and end with an assembled object', () => {
  assert.deepEqual(scenePose(-1), scenePose(0));
  assert.deepEqual(scenePose(2), scenePose(1));
  assert.equal(scenePose(1).spread, 0);
  assert.ok(scenePose(.5).spread > scenePose(0).spread);
});
test('manual layer selection changes one layer without changing the base pose', () => {
  const pose = initialPose();
  const selected = selectPose(2);
  assert.equal(selected.lift2, .38);
  assert.equal(selected.lift0, 0);
  assert.equal(pose.lift2, 0);
  assert.equal(selectPose(null).spread, 0);
});
