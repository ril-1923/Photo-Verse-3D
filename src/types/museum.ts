import type { GalleryId } from './photography';

export type LightingMode = 'daylight' | 'golden' | 'night';
export type ViewPreset = 'home' | 'gallery' | 'cinematic';

export interface Vec3 { x: number; y: number; z: number }

export interface CameraStep {
  pos: Vec3;
  target: Vec3;
  dur: number;
  hold: number;
  caption?: string;
  photoId?: string;
  gallery?: GalleryId;
}

export interface CameraRequest {
  id: number;
  steps: CameraStep[];
  kind: 'move' | 'tour' | 'cinematic';
}

export interface GalleryInfo {
  id: GalleryId;
  name: string;
  description: string;
  cx: number;
}
