import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePhotoStore } from '../../store/usePhotoStore';
import { LIGHT, ROOM_TINT } from './lighting';
import { galleries, ROOM_D } from './museumLayout';

interface Props { mobile: boolean }

/** Owns every light and lerps them toward the active preset each frame (no React re-renders). */
export default function LightingRig({ mobile }: Props) {
  const { scene } = useThree();
  const ambient = useRef<THREE.AmbientLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const points = useRef<(THREE.PointLight | null)[]>([]);
  const spots = useRef<(THREE.SpotLight | null)[]>([]);
  const targets = useRef<(THREE.Object3D | null)[]>([]);
  const tmp = useRef(new THREE.Color());
  const bg = useRef(new THREE.Color(LIGHT.daylight.bg));

  useEffect(() => {
    scene.background = bg.current;
    scene.fog = new THREE.Fog(LIGHT.daylight.fog, 26, 70);
    spots.current.forEach((s, i) => { const t = targets.current[i]; if (s && t) s.target = t; });
    return () => { scene.background = null; scene.fog = null; };
  }, [scene]);

  useFrame((_, dt) => {
    const { lighting, intensity } = usePhotoStore.getState();
    const p = LIGHT[lighting];
    const k = 1 - Math.exp(-dt * 3.5);
    const lerpNum = (cur: number, target: number): number => cur + (target - cur) * k;
    if (ambient.current) { ambient.current.intensity = lerpNum(ambient.current.intensity, p.ambient * intensity); ambient.current.color.lerp(tmp.current.set(p.ambientColor), k); }
    if (hemi.current) {
      hemi.current.intensity = lerpNum(hemi.current.intensity, p.hemi * intensity);
      hemi.current.color.lerp(tmp.current.set(p.hemiSky), k);
      hemi.current.groundColor.lerp(tmp.current.set(p.hemiGround), k);
    }
    if (sun.current) { sun.current.intensity = lerpNum(sun.current.intensity, p.sun * intensity); sun.current.color.lerp(tmp.current.set(p.sunColor), k); }
    galleries.forEach((g, i) => {
      const pl = points.current[i];
      if (pl) { pl.intensity = lerpNum(pl.intensity, p.point * intensity); pl.color.lerp(tmp.current.set(p.pointColor).multiply(new THREE.Color(ROOM_TINT[g.id])), k); }
      const sp = spots.current[i];
      if (sp) { sp.intensity = lerpNum(sp.intensity, p.spot * intensity); sp.color.lerp(tmp.current.set(p.spotColor).multiply(new THREE.Color(ROOM_TINT[g.id])), k); }
    });
    bg.current.lerp(tmp.current.set(p.bg), k);
    if (scene.fog) (scene.fog as THREE.Fog).color.lerp(tmp.current.set(p.fog), k);
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={LIGHT.daylight.ambient} />
      <hemisphereLight ref={hemi} intensity={LIGHT.daylight.hemi} />
      <directionalLight ref={sun} position={[10, 16, 14]} intensity={LIGHT.daylight.sun} />
      {galleries.map((g, i) => (
        <group key={g.id}>
          <pointLight ref={(el) => { points.current[i] = el; }} position={[g.cx, 4.3, 1]} distance={16} decay={1.6} intensity={LIGHT.daylight.point} />
          {!mobile && (
            <>
              <spotLight ref={(el) => { spots.current[i] = el; }} position={[g.cx, 4.9, 3.5]} angle={1.0} penumbra={0.7} distance={18} decay={1.2} intensity={0} />
              <object3D ref={(el) => { targets.current[i] = el; }} position={[g.cx, 1.8, -ROOM_D / 2]} />
            </>
          )}
        </group>
      ))}
    </>
  );
}
