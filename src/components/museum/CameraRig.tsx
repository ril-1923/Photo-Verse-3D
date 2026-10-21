import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { usePhotoStore } from '../../store/usePhotoStore';
import type { CameraRequest, CameraStep, Vec3 } from '../../types/museum';

interface Anim {
  req: CameraRequest;
  idx: number;
  t: number;
  holdLeft: number;
  phase: 'move' | 'hold';
  fromPos: THREE.Vector3;
  fromTarget: THREE.Vector3;
}

const v3 = (v: Vec3): THREE.Vector3 => new THREE.Vector3(v.x, v.y, v.z);
const smooth = (t: number): number => t * t * (3 - 2 * t);

interface Props { reducedMotion: boolean; autoRotate: boolean; mobile: boolean }

/**
 * Single owner of the camera. OrbitControls are disabled while a scripted move/tour runs,
 * so user input and animation never fight over the camera position.
 */
export default function CameraRig({ reducedMotion, autoRotate, mobile }: Props) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const anim = useRef<Anim | null>(null);
  const request = usePhotoStore((s) => s.cameraRequest);
  const handled = useRef(0);

  const begin = (a: Anim, step: CameraStep): void => {
    a.fromPos.copy(camera.position);
    a.fromTarget.copy(controls.current?.target ?? new THREE.Vector3());
    a.t = 0;
    a.phase = 'move';
    a.holdLeft = step.hold;
    const st = usePhotoStore.getState();
    if (a.req.kind === 'tour') st.setTour(true, step.caption ?? null, step.photoId ?? null);
    if (step.gallery) st.setGallery(step.gallery);
  };

  useEffect(() => {
    if (!request || request.id === handled.current || request.steps.length === 0) return;
    handled.current = request.id;
    const a: Anim = { req: request, idx: 0, t: 0, holdLeft: 0, phase: 'move', fromPos: new THREE.Vector3(), fromTarget: new THREE.Vector3() };
    anim.current = a;
    begin(a, request.steps[0]);
    if (controls.current) controls.current.enabled = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  useFrame((_, dtRaw) => {
    const c = controls.current;
    if (!c) return;
    const dt = Math.min(dtRaw, 0.05);
    const a = anim.current;

    if (a) {
      const st = usePhotoStore.getState();
      if (a.req.kind !== 'move' && !st.tourActive) {
        anim.current = null; c.enabled = true; return;
      }
      const step = a.req.steps[a.idx];
      if (a.phase === 'move') {
        const dur = reducedMotion ? 0.05 : Math.max(step.dur, 0.05);
        a.t = Math.min(1, a.t + dt / dur);
        const e = a.req.kind === 'cinematic' ? a.t * 0.5 + smooth(a.t) * 0.5 : smooth(a.t);
        camera.position.lerpVectors(a.fromPos, v3(step.pos), e);
        c.target.lerpVectors(a.fromTarget, v3(step.target), e);
        c.update();
        if (a.t >= 1) a.phase = 'hold';
      } else {
        a.holdLeft -= dt;
        if (a.holdLeft <= 0) {
          if (a.idx + 1 < a.req.steps.length) {
            a.idx += 1;
            begin(a, a.req.steps[a.idx]);
          } else {
            const kind = a.req.kind;
            anim.current = null;
            c.enabled = true;
            if (kind !== 'move') {
              const s2 = usePhotoStore.getState();
              s2.setTour(false, null, null);
              s2.pushToast(kind === 'tour' ? 'Tour finished' : 'Cinematic view finished', 'info');
            }
          }
        }
      }
      return;
    }

    // Free navigation: keep the visitor inside sensible bounds.
    const p = camera.position;
    p.x = THREE.MathUtils.clamp(p.x, -21, 21);
    p.y = THREE.MathUtils.clamp(p.y, 0.7, 7);
    p.z = THREE.MathUtils.clamp(p.z, -4.4, 18);
    c.target.x = THREE.MathUtils.clamp(c.target.x, -18, 18);
    c.target.y = THREE.MathUtils.clamp(c.target.y, 0.8, 4);
    c.target.z = THREE.MathUtils.clamp(c.target.z, -5, 5);
    c.autoRotate = autoRotate && !reducedMotion;
    c.update();
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={1.5}
      maxDistance={mobile ? 22 : 26}
      minPolarAngle={0.35}
      maxPolarAngle={Math.PI / 2 + 0.05}
      autoRotateSpeed={0.4}
      target={[0, 1.8, -1]}
    />
  );
}
