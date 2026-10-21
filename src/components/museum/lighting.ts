import type { LightingMode } from '../../types/museum';

export interface LightPreset {
  bg: string; fog: string;
  ambient: number; ambientColor: string;
  hemi: number; hemiSky: string; hemiGround: string;
  sun: number; sunColor: string;
  point: number; pointColor: string;
  spot: number; spotColor: string;
  emissive: number;
  label: string;
  blurb: string;
}

export const LIGHT: Record<LightingMode, LightPreset> = {
  daylight: {
    bg: '#b9c4cc', fog: '#b9c4cc', ambient: 0.75, ambientColor: '#ffffff', hemi: 0.8, hemiSky: '#f4f8ff', hemiGround: '#9a948a',
    sun: 1.35, sunColor: '#ffffff', point: 5, pointColor: '#fff4e0', spot: 0, spotColor: '#ffffff', emissive: 0.1,
    label: 'Daylight', blurb: 'Neutral, bright museum lighting',
  },
  golden: {
    bg: '#3b261a', fog: '#3b261a', ambient: 0.45, ambientColor: '#ffcf9a', hemi: 0.55, hemiSky: '#ffc68a', hemiGround: '#5a3320',
    sun: 1.1, sunColor: '#ffa64d', point: 9, pointColor: '#ffb060', spot: 14, spotColor: '#ffc27a', emissive: 0.16,
    label: 'Golden Hour', blurb: 'Warm amber light with softer shadows',
  },
  night: {
    bg: '#04050a', fog: '#04050a', ambient: 0.1, ambientColor: '#8fa2c8', hemi: 0.12, hemiSky: '#3a4a78', hemiGround: '#050508',
    sun: 0.08, sunColor: '#8fa2ff', point: 4, pointColor: '#ffcf8a', spot: 42, spotColor: '#ffd9a0', emissive: 0.32,
    label: 'Night Mode', blurb: 'Dark hall with warm exhibition spotlights',
  },
};

/** Per-room colour tint so each gallery has its own lighting character. */
export const ROOM_TINT: Record<string, string> = {
  nature: '#fff0d6',
  urban: '#e3efff',
  wildlife: '#d9f2e4',
};
