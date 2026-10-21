import type { GalleryId, Photograph } from '../../types/photography';
import type { GalleryInfo, CameraStep } from '../../types/museum';
import { photographs } from '../../data/photographs';

export const ROOM_W = 12;
export const ROOM_D = 10;
export const ROOM_H = 5;

export const galleries: GalleryInfo[] = [
  { id: 'nature', name: 'Nature Gallery', cx: -ROOM_W, description: 'Forests, mountains and night skies, softly lit in warm timber tones.' },
  { id: 'urban', name: 'Urban Gallery', cx: 0, description: 'Skylines, streets, cars and portraits under crisp cool spotlights.' },
  { id: 'wildlife', name: 'Wildlife Gallery', cx: ROOM_W, description: 'Animals and ocean life in a deep, atmospheric hall.' },
];

export interface FrameSpec {
  photo: Photograph;
  position: [number, number, number];
  rotationY: number;
  w: number;
  h: number;
}

const sizeFor = (o: Photograph['orientation']): [number, number] =>
  o === 'portrait' ? [1.5, 2.25] : o === 'square' ? [1.9, 1.9] : [2.7, 1.8];

/** Pick 7 photographs per gallery, round-robin across categories, featured first. */
function pick(gallery: GalleryId, n: number): Photograph[] {
  const pool = photographs.filter((p) => p.gallery === gallery).sort((a, b) => Number(b.featured) - Number(a.featured));
  const byCat = new Map<string, Photograph[]>();
  pool.forEach((p) => byCat.set(p.category, [...(byCat.get(p.category) ?? []), p]));
  const lists = [...byCat.values()];
  const out: Photograph[] = [];
  for (let i = 0; out.length < n && i < 10; i++) lists.forEach((l) => { if (l[i] && out.length < n) out.push(l[i]); });
  return out;
}

/** Wall slots per room: back wall x3, left wall z2, right wall z2. */
export function buildFrames(): FrameSpec[] {
  const frames: FrameSpec[] = [];
  const y = 2.1;
  const hw = ROOM_W / 2;
  const hd = ROOM_D / 2;
  galleries.forEach((g) => {
    const photos = pick(g.id, 7);
    const slots: { p: [number, number, number]; r: number }[] = [
      { p: [g.cx - 3.6, y, -hd + 0.17], r: 0 },
      { p: [g.cx, y, -hd + 0.17], r: 0 },
      { p: [g.cx + 3.6, y, -hd + 0.17], r: 0 },
      { p: [g.cx - hw + 0.17, y, -2.9], r: Math.PI / 2 },
      { p: [g.cx - hw + 0.17, y, 2.9], r: Math.PI / 2 },
      { p: [g.cx + hw - 0.17, y, -2.9], r: -Math.PI / 2 },
      { p: [g.cx + hw - 0.17, y, 2.9], r: -Math.PI / 2 },
    ];
    photos.forEach((photo, i) => {
      const [w, h] = sizeFor(photo.orientation);
      frames.push({ photo, position: slots[i].p, rotationY: slots[i].r, w, h });
    });
  });
  return frames;
}

export const frames: FrameSpec[] = buildFrames();

export const homeStep: CameraStep = { pos: { x: 0, y: 3.4, z: 13.5 }, target: { x: 0, y: 1.8, z: -1 }, dur: 2, hold: 0 };

export const galleryStep = (id: GalleryId, dur = 2.2): CameraStep => {
  const g = galleries.find((x) => x.id === id) ?? galleries[0];
  return { pos: { x: g.cx, y: 2.3, z: 3.4 }, target: { x: g.cx, y: 2, z: -ROOM_D / 2 }, dur, hold: 0, gallery: id };
};

export const cinematicSteps: CameraStep[] = [
  { pos: { x: -17, y: 1.7, z: 4 }, target: { x: -8, y: 2, z: -2 }, dur: 3, hold: 0 },
  { pos: { x: -6, y: 1.9, z: 3 }, target: { x: 0, y: 2, z: -3 }, dur: 6, hold: 0 },
  { pos: { x: 6, y: 2.2, z: 2.5 }, target: { x: 12, y: 2, z: -3 }, dur: 6, hold: 0 },
  { pos: { x: 18, y: 1.8, z: 3.5 }, target: { x: 12, y: 2, z: -2 }, dur: 5, hold: 0 },
  homeStep,
];

const frameFor = (id: string): FrameSpec | undefined => frames.find((f) => f.photo.id === id);

export function tourSteps(): CameraStep[] {
  const steps: CameraStep[] = [];
  const captions: Record<GalleryId, string> = {
    nature: 'Nature Gallery: light through forests, peaks and starry skies.',
    urban: 'Urban Gallery: cities, cars and faces under crisp spotlights.',
    wildlife: 'Wildlife Gallery: animals and ocean life in their own worlds.',
  };
  galleries.forEach((g) => {
    const base = galleryStep(g.id, 3);
    const fr = frames.filter((f) => f.photo.gallery === g.id);
    const star = fr.find((f) => f.photo.featured) ?? fr[0];
    steps.push({ ...base, hold: 3, caption: captions[g.id], photoId: star?.photo.id });
    const second = fr.find((f) => f.photo.id !== star?.photo.id && f.photo.featured);
    const sf = second ? frameFor(second.photo.id) : undefined;
    if (sf) {
      const nx = Math.sin(sf.rotationY);
      const nz = Math.cos(sf.rotationY);
      steps.push({
        pos: { x: sf.position[0] + nx * 4.2, y: 2.1, z: sf.position[2] + nz * 4.2 },
        target: { x: sf.position[0], y: 2.1, z: sf.position[2] },
        dur: 2.6, hold: 3, caption: `“${sf.photo.title}” by ${sf.photo.photographer}`, photoId: sf.photo.id, gallery: g.id,
      });
    }
  });
  steps.push({ ...homeStep, dur: 3, hold: 1.5, caption: 'Tour complete. Explore freely or revisit a gallery.' });
  return steps;
}
