import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { makeStructure, setEnvironment } from './geometry.ts';
import { diagnostics } from './runtime.ts';
import type { Pose } from './scene-state.ts';

export type SceneProps = {
  pose: Pose; active: boolean; light: boolean;
  onReady: (invalidate: () => void) => void;
  onFailure: () => void;
  onSlow: () => void;
  onSelect: (index: number) => void;
};
function Structure(props: SceneProps) {
  const model = useMemo(makeStructure, []);
  const { gl, scene, camera, invalidate } = useThree();
  const lastFrame = useRef(0);
  const slow = useRef(0);
  useEffect(() => { diagnostics.tier = props.light ? 'light' : 'full'; }, [props.light]);
  useEffect(() => {
    camera.lookAt(0, 0, 0);
    const clearEnvironment = setEnvironment(gl, scene);
    const lost = (event: Event) => { event.preventDefault(); props.onFailure(); };
    gl.domElement.addEventListener('webglcontextlost', lost);
    diagnostics.ready = true;
    props.onReady(invalidate);
    invalidate();
    return () => {
      gl.domElement.removeEventListener('webglcontextlost', lost);
      clearEnvironment(); model.dispose(); diagnostics.ready = false; diagnostics.disposed++;
    };
  }, [gl, scene, camera, invalidate, model]);
  useFrame(() => {
    model.apply(props.pose);
    diagnostics.spread = props.pose.spread;
    diagnostics.lift = [props.pose.lift0, props.pose.lift1, props.pose.lift2, props.pose.lift3];
    const now = performance.now();
    const interval = now - lastFrame.current;
    lastFrame.current = now;
    if (interval > 4 && interval < 100) {
      diagnostics.sceneIntervals.push(interval);
      if (diagnostics.sceneIntervals.length > 240) diagnostics.sceneIntervals.shift();
      slow.current = interval > (props.light ? 40 : 24) ? slow.current + 1 : Math.max(0, slow.current - 1);
      if (slow.current >= 45) { slow.current = 0; props.onSlow(); }
    }
    diagnostics.frames++;
    queueMicrotask(() => {
      diagnostics.calls = gl.info.render.calls;
      diagnostics.triangles = gl.info.render.triangles;
      diagnostics.geometries = gl.info.memory.geometries;
      diagnostics.textures = gl.info.memory.textures;
    });
  });
  return <>
    <ambientLight intensity={.45} />
    <directionalLight position={[-3, 5, 4]} intensity={3.2} />
    <directionalLight position={[4, 2, -3]} intensity={1.8} />
    <pointLight position={[0, -2, 1]} color="#e75b7f" intensity={4} />
    <primitive object={model.root} dispose={null} onClick={(event: { stopPropagation: () => void; object: { userData: { layer?: number } } }) => {
      event.stopPropagation();
      if (typeof event.object.userData.layer === 'number') props.onSelect(event.object.userData.layer);
    }} />
  </>;
}
export default function SceneCanvas(props: SceneProps) {
  return <Canvas aria-hidden="true" frameloop={props.active ? 'demand' : 'never'} dpr={props.light ? 1 : Math.min(devicePixelRatio, 1.5)}
    camera={{ position: [5.4, 4.5, 6.6], fov: 38, near: .1, far: 50 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} fallback={<span>3D is unavailable.</span>}>
    <Structure {...props} />
  </Canvas>;
}
