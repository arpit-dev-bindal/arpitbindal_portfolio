import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { Pose } from './scene-state.ts';

function rounded(size: number, radius: number) {
  const h = size / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-h + radius, -h);
  shape.lineTo(h - radius, -h); shape.quadraticCurveTo(h, -h, h, -h + radius);
  shape.lineTo(h, h - radius); shape.quadraticCurveTo(h, h, h - radius, h);
  shape.lineTo(-h + radius, h); shape.quadraticCurveTo(-h, h, -h, h - radius);
  shape.lineTo(-h, -h + radius); shape.quadraticCurveTo(-h, -h, -h + radius, -h);
  return shape;
}
function frameGeometry(outer: number, inner: number, depth: number, bevel: number) {
  const shape = rounded(outer, .25);
  const hole = new THREE.Path(rounded(inner, .18).getPoints(8).reverse());
  shape.holes.push(hole);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, steps: 1, curveSegments: 8, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3 });
  geometry.center();
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}
export function makeStructure() {
  const root = new THREE.Group();
  const geometry = frameGeometry(3.55, 2.52, .19, .045);
  const insetGeometry = frameGeometry(3.18, 3.02, .014, .008);
  const silver = new THREE.MeshStandardMaterial({ color: '#bbc1ca', roughness: .32, metalness: .94 });
  const graphite = new THREE.MeshStandardMaterial({ color: '#353b44', roughness: .36, metalness: .88 });
  const rose = new THREE.MeshStandardMaterial({ color: '#e75b7f', emissive: '#e75b7f', emissiveIntensity: .7, roughness: .4, metalness: .4 });
  const meshes = Array.from({ length: 4 }, (_, index) => {
    const group = new THREE.Group();
    group.name = `layer-${index}`;
    const mesh = new THREE.Mesh(geometry, index === 3 ? graphite : silver);
    mesh.userData.layer = index;
    group.add(mesh);
    if (index === 3) {
      const inset = new THREE.Mesh(insetGeometry, rose);
      inset.position.y = .14;
      group.add(inset);
    }
    root.add(group);
    return group;
  });
  return {
    root,
    apply(pose: Pose) {
      root.rotation.set(pose.tiltX, -.12 + pose.turn + pose.tiltY, 0);
      meshes.forEach((mesh, index) => {
        const lift = pose[`lift${index}` as 'lift0'];
        mesh.position.set(lift * .8, (1.5 - index) * (.31 + .46 * pose.spread) + lift, 0);
      });
    },
    dispose() { geometry.dispose(); insetGeometry.dispose(); silver.dispose(); graphite.dispose(); rose.dispose(); },
  };
}
export function setEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(room, .04);
  scene.environment = target.texture;
  room.dispose(); pmrem.dispose();
  return () => { scene.environment = null; target.dispose(); };
}
