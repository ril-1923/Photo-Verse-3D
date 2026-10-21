import { useMemo } from 'react';
import * as THREE from 'three';
import { Sparkles } from '@react-three/drei';
import { frames, galleries, ROOM_D, ROOM_H, ROOM_W } from './museumLayout';
import MuseumRoom from './MuseumRoom';
import PhotoFrame3D from './PhotoFrame3D';
import LightingRig from './LightingRig';

const box = new THREE.BoxGeometry(1, 1, 1);
const cyl = new THREE.CylinderGeometry(1, 1, 1, 18);

interface Props { mobile: boolean; reducedMotion: boolean }

export default function MuseumEnvironment({ mobile, reducedMotion }: Props) {
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8e8a84', roughness: 0.95 }), []);
  const colMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d8d0c0', roughness: 0.55 }), []);
  const groundMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0d0c0b', roughness: 1 }), []);
  const list = useMemo(() => frames.map((f) => f.photo.id), []);
  const hd = ROOM_D / 2;
  const hw = ROOM_W / 2;
  const walls = [-3 * hw, -hw, hw, 3 * hw];

  return (
    <>
      <LightingRig mobile={mobile} />
      <mesh geometry={box} material={groundMat} position={[0, -0.3, 0]} scale={[90, 0.3, 50]} />
      {galleries.map((g) => <MuseumRoom key={g.id} gallery={g} />)}

      {walls.map((x, i) => {
        const door = i === 1 || i === 2;
        return door ? (
          <group key={x}>
            <mesh geometry={box} material={wallMat} position={[x, ROOM_H / 2, -(hd + 1.5) / 2]} scale={[0.2, ROOM_H, hd - 1.5]} />
            <mesh geometry={box} material={wallMat} position={[x, ROOM_H / 2, (hd + 1.5) / 2]} scale={[0.2, ROOM_H, hd - 1.5]} />
            <mesh geometry={box} material={wallMat} position={[x, 4.2, 0]} scale={[0.2, 1.6, 3]} />
            {[-1.35, 1.35].map((z) => (
              <mesh key={z} geometry={cyl} material={colMat} position={[x, ROOM_H / 2, z]} scale={[0.15, ROOM_H, 0.15]} />
            ))}
          </group>
        ) : (
          <mesh key={x} geometry={box} material={wallMat} position={[x, ROOM_H / 2, 0]} scale={[0.2, ROOM_H, ROOM_D]} />
        );
      })}

      {[-3 * hw, 3 * hw, -hw, hw].map((x) => (
        <mesh key={`c${x}`} geometry={cyl} material={colMat} position={[x, ROOM_H / 2, hd - 0.1]} scale={[0.2, ROOM_H, 0.2]} />
      ))}

      {frames.map((f) => <PhotoFrame3D key={f.photo.id} spec={f} mobile={mobile} list={list} />)}

      {!mobile && !reducedMotion && (
        <Sparkles count={70} scale={[ROOM_W * 3, 4, ROOM_D]} position={[0, 2.5, 0]} size={2.2} speed={0.25} opacity={0.5} color="#f2c879" />
      )}
    </>
  );
}
