export const layers = [
  { name: 'Interface', description: 'Products and internal tools.' },
  { name: 'Systems', description: 'Backend, SDKs, and infrastructure.' },
  { name: 'Integration', description: 'Wallets and connected services.' },
  { name: 'Intelligence', description: 'AI tools for business tasks.' },
] as const;
export const initialPose = () => ({ spread: 1, turn: 0, tiltX: 0, tiltY: 0, lift0: 0, lift1: 0, lift2: 0, lift3: 0 });
export type Pose = ReturnType<typeof initialPose>;
export function scenePose(progress: number): Pose {
  const p = Math.max(0, Math.min(1, progress));
  const spread = p === 1 ? 0 : (1 - p) + Math.sin(Math.PI * p) * .6;
  return { ...initialPose(), spread, turn: spread * .2 };
}
export function selectPose(index: number | null): Pose {
  const pose = { ...initialPose(), spread: index === null ? 0 : 1 };
  if (index !== null && index >= 0 && index < 4) pose[`lift${index}` as 'lift0'] = .38;
  return pose;
}
