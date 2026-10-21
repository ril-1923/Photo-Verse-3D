import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings } from '../types/settings';

export const defaultSettings: Settings = {
  theme: 'dark',
  accent: '#e8a948',
  reducedMotion: false,
  defaultGallery: 'nature',
  defaultLighting: 'daylight',
  lightingIntensity: 1,
  autoRotate: false,
  layout: 'masonry',
  sort: 'featured',
  perPage: 12,
};

export const accentChoices = [
  { name: 'Amber', value: '#e8a948' },
  { name: 'Soft gold', value: '#d8c07a' },
  { name: 'Copper', value: '#d9825b' },
  { name: 'Sage', value: '#8fb996' },
  { name: 'Sky', value: '#79b4e0' },
];

interface SettingsState extends Settings {
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  reset: () => void;
}

/** Keep only well-typed values from storage; anything malformed falls back to defaults. */
function sanitize(raw: unknown): Settings {
  const d = defaultSettings;
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const pick = <T,>(v: unknown, ok: (x: unknown) => boolean, fb: T): T => (ok(v) ? (v as T) : fb);
  return {
    theme: pick(r.theme, (x) => x === 'dark' || x === 'light', d.theme),
    accent: pick(r.accent, (x) => typeof x === 'string' && /^#[0-9a-f]{6}$/i.test(x), d.accent),
    reducedMotion: pick(r.reducedMotion, (x) => typeof x === 'boolean', d.reducedMotion),
    defaultGallery: pick(r.defaultGallery, (x) => x === 'nature' || x === 'urban' || x === 'wildlife', d.defaultGallery),
    defaultLighting: pick(r.defaultLighting, (x) => x === 'daylight' || x === 'golden' || x === 'night', d.defaultLighting),
    lightingIntensity: pick(r.lightingIntensity, (x) => typeof x === 'number' && x >= 0.3 && x <= 2, d.lightingIntensity),
    autoRotate: pick(r.autoRotate, (x) => typeof x === 'boolean', d.autoRotate),
    layout: pick(r.layout, (x) => x === 'masonry' || x === 'grid', d.layout),
    sort: pick(r.sort, (x) => x === 'featured' || x === 'title' || x === 'year-desc' || x === 'year-asc', d.sort),
    perPage: pick(r.perPage, (x) => x === 6 || x === 12 || x === 24 || x === 48, d.perPage),
  };
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      set: (key, value) => set({ [key]: value } as Partial<Settings>),
      reset: () => set({ ...defaultSettings }),
    }),
    {
      name: 'photoverse-settings',
      version: 1,
      merge: (persisted, current) => ({ ...current, ...sanitize(persisted) }),
      partialize: (s): Settings => ({
        theme: s.theme, accent: s.accent, reducedMotion: s.reducedMotion,
        defaultGallery: s.defaultGallery, defaultLighting: s.defaultLighting,
        lightingIntensity: s.lightingIntensity, autoRotate: s.autoRotate,
        layout: s.layout, sort: s.sort, perPage: s.perPage,
      }),
    },
  ),
);
