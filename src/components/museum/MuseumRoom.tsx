import { useMemo } from 'react';
import * as THREE from 'three';
import type { GalleryInfo } from '../../types/museum';
import { ROOM_D, ROOM_H, ROOM_W } from './museumLayout';
import { makeSignTexture } from './textures';

const box = new THREE.BoxGeometry(1, 1, 1);
const plane = new THREE.PlaneGeometry(1, 1);
const beamMat = new THREE.MeshStandardMaterial({ color: '#2a2622', roughness: 0.6, metalness: 0.3 });
const trimMat = new THREE.MeshStandardMaterial({ color: '#15130f', roughness: 0.5 });
const benchMat = new THREE.MeshStandardMaterial({ color: '#3b2f25', roughness: 0.7 });

const style: Record<string, { wall: string; floor: string; rug: string; roughness: number }> = {
  nature: { wall: '#cdbb9d', floor: '#4a3626', rug: '#7a5c3a', roughness: 0.5 },
  urban: { wall: '#aab1b9', floor: '#2b2d30', rug: '#4a5058', roughness: 0.3 },
  wildlife: { wall: '#4f5f55', floor: '#1f241f', rug: '#33423a', roughness: 0.4 },
};

export default function MuseumRoom({ gallery }: { gallery: GalleryInfo }) {
  const s = style[gallery.id];
  const { cx } = gallery;
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({ color: s.wall, roughness: 0.92 }), [s.wall]);
  const floorMat = useMemo(() => new THREE.MeshStandardMaterial({ color: s.floor, roughness: s.roughness, metalness: 0.12 }), [s]);
  const rugMat = useMemo(() => new THREE.MeshStandardMaterial({ color: s.rug, roughness: 0.95 }), [s.rug]);
  const signMat = useMemo(() => new THREE.MeshBasicMaterial({ map: makeSignTexture(gallery.name), transparent: true }), [gallery.name]);
  const beams = [-4.5, -1.5, 1.5, 4.5];
  return (
    <group>
      <mesh geometry={box} material={floorMat} position={[cx, -0.05, 0]} scale={[ROOM_W, 0.1, ROOM_D]} />
      <mesh geometry={box} material={rugMat} position={[cx, 0.01, 1.6]} scale={[ROOM_W - 3, 0.02, 3.2]} />
      <mesh geometry={box} material={wallMat} position={[cx, ROOM_H / 2, -ROOM_D / 2]} scale={[ROOM_W, ROOM_H, 0.2]} />
      <mesh geometry={box} material={trimMat} position={[cx, 0.14, -ROOM_D / 2 + 0.11]} scale={[ROOM_W, 0.28, 0.04]} />
      <mesh geometry={plane} material={signMat} position={[cx, 4.15, -ROOM_D / 2 + 0.12]} scale={[5.2, 0.98, 1]} />
      {beams.map((x) => (
        <mesh key={x} geometry={box} material={beamMat} position={[cx + x, ROOM_H, 0]} scale={[0.22, 0.28, ROOM_D]} />
      ))}
      <mesh geometry={box} material={beamMat} position={[cx, ROOM_H + 0.02, -ROOM_D / 2 + 0.1]} scale={[ROOM_W, 0.2, 0.2]} />
      <mesh geometry={box} material={beamMat} position={[cx, ROOM_H + 0.02, ROOM_D / 2 - 0.1]} scale={[ROOM_W, 0.2, 0.2]} />
      <mesh geometry={box} material={benchMat} position={[cx, 0.24, 0.6]} scale={[3, 0.12, 0.8]} />
      <mesh geometry={box} material={beamMat} position={[cx - 1.2, 0.12, 0.6]} scale={[0.12, 0.24, 0.6]} />
      <mesh geometry={box} material={beamMat} position={[cx + 1.2, 0.12, 0.6]} scale={[0.12, 0.24, 0.6]} />
    </group>
  );
}
