import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { usePhotoStore } from '../../store/usePhotoStore';
import { LIGHT } from './lighting';
import { loadPhotoTexture, makeLabelTexture } from './textures';
import type { FrameSpec } from './museumLayout';

const unitBox = new THREE.BoxGeometry(1, 1, 1);
const unitPlane = new THREE.PlaneGeometry(1, 1);
const frameMat = new THREE.MeshStandardMaterial({ color: '#1a1612', roughness: 0.45, metalness: 0.5 });
const matMat = new THREE.MeshStandardMaterial({ color: '#efe8da', roughness: 0.9 });
const shadowMat = new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.22, depthWrite: false });
const glowMat = new THREE.MeshBasicMaterial({ color: '#e8a948', transparent: true, opacity: 0.9, depthWrite: false });

interface Props { spec: FrameSpec; mobile: boolean; list: string[] }

function PhotoFrame3D({ spec, mobile, list }: Props) {
  const { photo, w, h } = spec;
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);
  const photoMat = useRef<THREE.MeshStandardMaterial>(null);
  const glow = useRef<THREE.Mesh>(null);
  const openPhoto = usePhotoStore((s) => s.openPhoto);
  const setGallery = usePhotoStore((s) => s.setGallery);
  const active = usePhotoStore((s) => s.selectedPhotoId === photo.id || s.highlightId === photo.id);
  useCursor(hovered);

  useEffect(() => loadPhotoTexture(photo, mobile, setTex), [photo, mobile]);
  const label = useMemo(() => makeLabelTexture(photo.title, photo.photographer), [photo.title, photo.photographer]);
  const labelMat = useMemo(() => new THREE.MeshBasicMaterial({ map: label }), [label]);
  useEffect(() => () => labelMat.dispose(), [labelMat]);

  useFrame((_, dt) => {
    const mode = usePhotoStore.getState().lighting;
    const k = 1 - Math.exp(-dt * 8);
    if (photoMat.current) {
      const target = LIGHT[mode].emissive + (hovered || active ? 0.2 : 0);
      photoMat.current.emissiveIntensity += (target - photoMat.current.emissiveIntensity) * k;
    }
    if (group.current) {
      const s = hovered || active ? 1.035 : 1;
      group.current.scale.x += (s - group.current.scale.x) * k;
      group.current.scale.y = group.current.scale.x;
    }
    if (glow.current) glow.current.visible = hovered || active;
  });

  return (
    <group position={spec.position} rotation={[0, spec.rotationY, 0]}>
      <group ref={group}>
        <mesh geometry={unitPlane} material={shadowMat} position={[0.06, -0.08, -0.03]} scale={[w + 0.55, h + 0.55, 1]} />
        <mesh ref={glow} geometry={unitBox} material={glowMat} position={[0, 0, -0.01]} scale={[w + 0.36, h + 0.36, 0.08]} visible={false} />
        <mesh geometry={unitBox} material={frameMat} position={[0, 0, 0.03]} scale={[w + 0.24, h + 0.24, 0.1]} />
        <mesh geometry={unitBox} material={matMat} position={[0, 0, 0.065]} scale={[w + 0.1, h + 0.1, 0.06]} />
        <mesh
          geometry={unitPlane}
          position={[0, 0, 0.1]}
          scale={[w, h, 1]}
          onClick={(e) => { e.stopPropagation(); setGallery(photo.gallery); openPhoto(photo.id, list); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            ref={photoMat}
            map={tex ?? undefined}
            emissiveMap={tex ?? undefined}
            emissive="#ffffff"
            emissiveIntensity={0.1}
            color={tex ? '#ffffff' : '#2a2724'}
            roughness={0.6}
          />
        </mesh>
      </group>
      <mesh geometry={unitPlane} material={labelMat} position={[0, -(h / 2 + 0.5), 0.02]} scale={[1.2, 0.3, 1]} />
    </group>
  );
}

export default memo(PhotoFrame3D);
