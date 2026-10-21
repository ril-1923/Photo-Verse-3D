import type { GalleryId } from './photography';
import type { LightingMode } from './museum';

export type Theme = 'dark' | 'light';
export type Layout = 'masonry' | 'grid';
export type SortKey = 'featured' | 'title' | 'year-desc' | 'year-asc';

export interface Settings {
  theme: Theme;
  accent: string;
  reducedMotion: boolean;
  defaultGallery: GalleryId;
  defaultLighting: LightingMode;
  lightingIntensity: number;
  autoRotate: boolean;
  layout: Layout;
  sort: SortKey;
  perPage: number;
}
