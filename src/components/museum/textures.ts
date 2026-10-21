import * as THREE from 'three';
import type { Photograph } from '../../types/photography';
import { placeholderFor } from '../../utils/imageUtils';

const cache = new Map<string, THREE.Texture>();
const loader = new THREE.TextureLoader();
loader.setCrossOrigin('anonymous');

function configure(t: THREE.Texture): THREE.Texture {
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

/** Loads a photo texture; on failure falls back to a generated local placeholder. Never throws. */
export function loadPhotoTexture(photo: Photograph, mobile: boolean, onReady: (t: THREE.Texture) => void): () => void {
  let cancelled = false;
  const key = photo.id;
  const hit = cache.get(key);
  if (hit) { onReady(hit); return () => undefined; }
  const fallback = (): void => {
    loader.load(placeholderFor(photo.category, photo.title, 600, 600), (t) => {
      if (cancelled) return;
      cache.set(key, configure(t));
      onReady(t);
    });
  };
  const src = mobile ? photo.thumbUrl : photo.imageUrl;
  loader.load(
    src,
    (t) => { if (cancelled) return; cache.set(key, configure(t)); onReady(t); },
    undefined,
    () => { if (!cancelled) fallback(); },
  );
  return () => { cancelled = true; };
}

const labelCache = new Map<string, THREE.CanvasTexture>();

/** Small museum-plaque style label drawn on a canvas (no external fonts needed). */
export function makeLabelTexture(title: string, sub: string, dark = true): THREE.CanvasTexture {
  const key = `${title}|${sub}|${dark}`;
  const hit = labelCache.get(key);
  if (hit) return hit;
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const g = c.getContext('2d');
  if (g) {
    g.fillStyle = dark ? '#171512' : '#f4efe6';
    g.fillRect(0, 0, 512, 128);
    g.strokeStyle = '#c9a25a'; g.lineWidth = 3; g.strokeRect(4, 4, 504, 120);
    g.fillStyle = dark ? '#f3ead8' : '#1b1712';
    g.font = '600 38px Georgia, serif'; g.textBaseline = 'middle';
    g.fillText(title.length > 24 ? `${title.slice(0, 23)}…` : title, 24, 48);
    g.fillStyle = '#c9a25a'; g.font = '28px Georgia, serif';
    g.fillText(sub.length > 32 ? `${sub.slice(0, 31)}…` : sub, 24, 94);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  labelCache.set(key, t);
  return t;
}

export function makeSignTexture(text: string): THREE.CanvasTexture {
  const key = `sign|${text}`;
  const hit = labelCache.get(key);
  if (hit) return hit;
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 192;
  const g = c.getContext('2d');
  if (g) {
    g.clearRect(0, 0, 1024, 192);
    g.fillStyle = '#e8c27a';
    g.font = '500 84px Georgia, serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, 512, 96);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  labelCache.set(key, t);
  return t;
}
