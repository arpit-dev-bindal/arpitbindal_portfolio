import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, PerspectiveCamera, Points, Scene, ShaderMaterial, Vector2, WebGLRenderer } from 'three';

// One fine particle scene with four target shapes. Scroll position blends the shapes.
export type Shape = 'orb' | 'galaxy' | 'brain' | 'field';
const order: Shape[] = ['orb', 'galaxy', 'brain', 'field'];
const TAU = Math.PI * 2;
// Each ring: tilt about x, roll about z, radius.
const rings: [number, number, number][] = [[1.32, .1, 1], [1.05, .95, 1.12], [1.1, -.9, 1.12], [.2, .3, .86], [1.5, 0, 1.3]];

// A seeded generator keeps the cloud identical between visits.
function random(seed: number) {
  let state = seed;
  return () => { state |= 0; state = state + 0x6d2b79f5 | 0; let t = Math.imul(state ^ state >>> 15, 1 | state); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

function shapes(count: number) {
  const rand = random(7);
  const gauss = () => (rand() + rand() + rand() + rand() - 2) / 2;
  const orb = new Float32Array(count * 3), galaxy = new Float32Array(count * 3), brain = new Float32Array(count * 3), field = new Float32Array(count * 3), seed = new Float32Array(count * 2);
  const direction = () => { const u = rand() * 2 - 1, a = rand() * TAU, s = Math.sqrt(1 - u * u); return [s * Math.cos(a), u, s * Math.sin(a)] as const; };
  for (let i = 0; i < count; i++) {
    const o = i * 3;
    seed[i * 2] = rand(); seed[i * 2 + 1] = rand();

    // The hero shape is an armillary: fine rings on tilted planes around a sparse inner dust.
    if (rand() < .7) {
      const ring = rings[i % rings.length]!;
      const a = rand() * TAU, r = ring[2] * (1 + gauss() * .004);
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const y1 = -z * Math.sin(ring[0]), z1 = z * Math.cos(ring[0]);
      orb[o] = x * Math.cos(ring[1]) - y1 * Math.sin(ring[1]); orb[o + 1] = x * Math.sin(ring[1]) + y1 * Math.cos(ring[1]); orb[o + 2] = z1;
    } else {
      const [dx, dy, dz] = direction();
      const shell = Math.pow(rand(), .6) * 1.25;
      orb[o] = dx * shell; orb[o + 1] = dy * shell; orb[o + 2] = dz * shell;
    }

    const core = rand() < .16;
    const radius = core ? Math.abs(gauss()) * .45 : .25 + Math.pow(rand(), .7) * 2.5;
    const arm = (i % 3) * TAU / 3;
    const angle = core ? rand() * TAU : arm + radius * 1.75 + gauss() * (.34 / (.5 + radius));
    galaxy[o] = Math.cos(angle) * radius + gauss() * .05;
    galaxy[o + 1] = gauss() * (core ? .22 : .07);
    galaxy[o + 2] = Math.sin(angle) * radius + gauss() * .05;

    // The brain uses two cerebral halves, temporal lobes, a cerebellum, and a stem.
    const side = rand() < .5 ? -1 : 1;
    const pick = rand();
    let bx = 0, by = 0, bz = 0;
    if (pick < .03) { const t = rand(); bx = gauss() * .05; by = -.34 - t * .5; bz = -.22 - t * .12 + gauss() * .04; }
    else {
      const [x, y, z] = direction();
      const fold = 1 + .055 * Math.sin(x * 13 + z * 9) * Math.sin(y * 11 + z * 7) + .03 * Math.sin(z * 23 + y * 5);
      const depth = rand() < .74 ? fold : .3 + rand() * .65;
      if (pick < .13) { bx = side * .15 + x * .2 * depth; by = -.4 + y * .15 * depth; bz = -.5 + z * .22 * depth; }
      else if (pick < .25) { bx = side * .3 + x * .17 * depth; by = -.24 + y * .16 * depth; bz = .14 + z * .38 * depth; }
      else {
        const taper = 1 - .22 * Math.max(0, z);
        bx = x * .33 * depth * taper; by = y * .5 * depth; bz = z * .74 * depth;
        if (by < -.2) by = -.2 + (by + .2) * .35;
        bx = side * (.035 + Math.abs(bx) + .17 * (1 - Math.abs(x)) * taper);
        by += .08;
      }
    }
    brain[o] = bx; brain[o + 1] = by; brain[o + 2] = bz;

    field[o] = (rand() * 2 - 1) * 4.8; field[o + 1] = (rand() * 2 - 1) * 2.8; field[o + 2] = rand() * -4 + 1;
  }
  return { orb, galaxy, brain, field, seed };
}

const vertex = /* glsl */`
attribute vec3 aGalaxy; attribute vec3 aBrain; attribute vec3 aField; attribute vec2 aSeed;
uniform vec4 uW; uniform float uTime; uniform vec2 uPointer; uniform float uPush; uniform float uSize;
varying float vAlpha; varying float vMix;
void main() {
  vec3 p = position * uW.x + aGalaxy * uW.y + aBrain * uW.z + aField * uW.w;
  p *= 1.0 + uW.x * (0.045 * sin(uTime * 0.9) + 0.03 * sin(uTime * 1.7 + aSeed.x * 6.283));
  p += 0.018 * vec3(sin(uTime * 0.7 + aSeed.x * 40.0), cos(uTime * 0.6 + aSeed.y * 40.0), sin(uTime * 0.5 + aSeed.x * 20.0));
  vec4 world = modelMatrix * vec4(p, 1.0);
  vec2 away = world.xy - uPointer;
  float reach = smoothstep(0.95, 0.0, length(away)) * uPush;
  world.xy += normalize(away + 0.0001) * reach;
  vec4 view = viewMatrix * world;
  gl_Position = projectionMatrix * view;
  float twinkle = 0.6 + 0.4 * sin(uTime * (1.5 + aSeed.y * 3.0) + aSeed.x * 50.0);
  float spark = step(0.992, fract(aSeed.x * 91.7 + uTime * 0.35)) * uW.z;
  vAlpha = mix(0.5, 1.0, aSeed.y) * mix(1.0, twinkle, 0.35 + 0.4 * uW.z) + spark;
  vMix = aSeed.x;
  gl_PointSize = uSize * (0.55 + aSeed.y + spark * 1.5) / -view.z;
}`;
const fragment = /* glsl */`
precision mediump float;
uniform vec3 uA; uniform vec3 uB; uniform vec3 uTint; uniform float uTintAmount; uniform float uOpacity;
varying float vAlpha; varying float vMix;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  vec3 color = mix(mix(uA, uB, smoothstep(0.62, 0.98, vMix)), uTint, uTintAmount);
  gl_FragColor = vec4(color, smoothstep(0.5, 0.1, d) * vAlpha * uOpacity * 0.85);
}`;

type Target = { x: number; y: number; scale: number; tilt: number; opacity: number };

export function createParticles(canvas: HTMLCanvasElement) {
  const small = Math.min(innerWidth, innerHeight) < 700;
  const count = small ? 6000 : 15000;
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  const dpr = Math.min(devicePixelRatio, small ? 1.5 : 2);
  renderer.setPixelRatio(dpr);
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, .1, 50);
  camera.position.z = 5;
  const data = shapes(count);
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(data.orb, 3));
  geometry.setAttribute('aGalaxy', new BufferAttribute(data.galaxy, 3));
  geometry.setAttribute('aBrain', new BufferAttribute(data.brain, 3));
  geometry.setAttribute('aField', new BufferAttribute(data.field, 3));
  geometry.setAttribute('aSeed', new BufferAttribute(data.seed, 2));
  const uniforms = {
    uW: { value: [1, 0, 0, 0] }, uTime: { value: 0 }, uPointer: { value: new Vector2(99, 99) }, uPush: { value: .12 }, uSize: { value: 11 * dpr },
    uA: { value: new Color('#c6a15b') }, uB: { value: new Color('#f2ecdf') }, uTint: { value: new Color('#ffffff') }, uTintAmount: { value: 0 }, uOpacity: { value: 1 },
  };
  const material = new ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms, transparent: true, depthWrite: false, depthTest: false, blending: AdditiveBlending });
  const points = new Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  let halfH = 0, halfW = 0, portrait = false;
  const resize = () => {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    halfH = Math.tan(camera.fov * Math.PI / 360) * camera.position.z; halfW = halfH * camera.aspect; portrait = camera.aspect < .9;
    uniforms.uSize.value = 11 * dpr * (h / 900);
  };
  resize();

  const target = (shape: Shape): Target => {
    if (shape === 'orb') return { x: 0, y: halfH * (portrait ? .3 : .12), scale: portrait ? Math.min(.9, halfW * .82) : 1.42, tilt: .18, opacity: .9 };
    if (shape === 'galaxy') return { x: 0, y: 0, scale: portrait ? .62 : 1, tilt: 1.02, opacity: portrait ? .32 : .4 };
    if (shape === 'brain') return { x: portrait ? 0 : halfW * .46, y: portrait ? halfH * .45 : 0, scale: portrait ? halfW * 1.1 : 1.75, tilt: .12, opacity: portrait ? .28 : .8 };
    return { x: 0, y: 0, scale: 1, tilt: 0, opacity: .22 };
  };

  const weights = [1, 0, 0, 0];
  const goal = [1, 0, 0, 0];
  const pose: Target = target('orb');
  const pointer = { x: 99, y: 99, push: .12, last: 0, speed: 0 };
  let spin = 0, time = 0, tintGoal = 0, sized = false;

  return {
    resize: () => { resize(); sized = false; },
    // The blend maps each shape name to a weight. The weights sum to one.
    setBlend(blend: Partial<Record<Shape, number>>) { order.forEach((shape, index) => { goal[index] = blend[shape] ?? 0; }); },
    setTint(color: string | null) { if (color) uniforms.uTint.value.set(color); tintGoal = color ? .55 : 0; },
    pointer(clientX: number, clientY: number) {
      const x = (clientX / innerWidth * 2 - 1) * halfW, y = -(clientY / innerHeight * 2 - 1) * halfH;
      const now = performance.now();
      const distance = Math.hypot(x - pointer.x, y - pointer.y);
      if (pointer.last && distance < 2) pointer.speed = Math.min(1, distance / Math.max(8, now - pointer.last) * 12);
      pointer.x = x; pointer.y = y; pointer.last = now;
    },
    frame(delta: number, still: boolean) {
      const ease = still ? 1 : 1 - Math.exp(-delta * 4.5);
      const want: Target = { x: 0, y: 0, scale: 0, tilt: 0, opacity: 0 };
      order.forEach((shape, index) => {
        weights[index]! += (goal[index]! - weights[index]!) * ease;
        const t = target(shape), w = goal[index]!;
        want.x += t.x * w; want.y += t.y * w; want.scale += t.scale * w; want.tilt += t.tilt * w; want.opacity += t.opacity * w;
      });
      const snap = still || !sized ? 1 : ease;
      sized = true;
      (Object.keys(pose) as (keyof Target)[]).forEach(key => { pose[key] += (want[key] - pose[key]) * snap; });
      if (!still) { time += delta; spin += delta * (.1 + .08 * weights[1]!); }
      pointer.speed *= Math.exp(-delta * 3);
      pointer.push += ((still ? 0 : .1 + pointer.speed * .55) - pointer.push) * ease;
      const brain = weights[2]!;
      points.position.set(pose.x, pose.y, 0);
      points.scale.setScalar(pose.scale);
      points.rotation.set(pose.tilt, spin * (1 - brain) + (1.2 + .5 * Math.sin(time * .32)) * brain, 0);
      uniforms.uW.value = weights;
      uniforms.uTime.value = time;
      uniforms.uPointer.value.set(pointer.x, pointer.y);
      uniforms.uPush.value = pointer.push;
      uniforms.uOpacity.value = pose.opacity;
      uniforms.uTintAmount.value += (tintGoal - uniforms.uTintAmount.value) * ease;
      renderer.render(scene, camera);
    },
  };
}
