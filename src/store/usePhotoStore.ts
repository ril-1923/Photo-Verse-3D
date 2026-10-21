import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GalleryId } from '../types/photography';
import type { CameraRequest, CameraStep, LightingMode } from '../types/museum';

export interface Toast { id: number; message: string; tone: 'success' | 'info' | 'warning' }

interface PhotoState {
  // persisted
  favorites: string[];
  recent: string[];
  views: Record<string, number>;
  // session
  selectedPhotoId: string | null;
  modalList: string[];
  toasts: Toast[];
  // museum
  gallery: GalleryId;
  lighting: LightingMode;
  intensity: number;
  cameraRequest: CameraRequest | null;
  tourActive: boolean;
  tourCaption: string | null;
  highlightId: string | null;

  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
  resetDemoData: () => void;
  openPhoto: (id: string, list?: string[]) => void;
  closePhoto: () => void;
  stepPhoto: (dir: 1 | -1) => void;
  pushToast: (message: string, tone?: Toast['tone']) => void;
  dismissToast: (id: number) => void;
  setGallery: (g: GalleryId) => void;
  setLighting: (m: LightingMode) => void;
  setIntensity: (n: number) => void;
  requestCamera: (steps: CameraStep[], kind: CameraRequest['kind']) => void;
  setTour: (active: boolean, caption: string | null, highlightId: string | null) => void;
  setHighlight: (id: string | null) => void;
}

let reqId = 0;
let toastId = 0;

const strArray = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);

export const usePhotoStore = create<PhotoState>()(
  persist(
    (set, get) => ({
      favorites: [],
      recent: [],
      views: {},
      selectedPhotoId: null,
      modalList: [],
      toasts: [],
      gallery: 'nature',
      lighting: 'daylight',
      intensity: 1,
      cameraRequest: null,
      tourActive: false,
      tourCaption: null,
      highlightId: null,

      toggleFavorite: (id) => {
        const has = get().favorites.includes(id);
        set({ favorites: has ? get().favorites.filter((f) => f !== id) : [...get().favorites, id] });
        get().pushToast(has ? 'Removed from favorites' : 'Saved to favorites', has ? 'info' : 'success');
      },
      clearFavorites: () => { set({ favorites: [] }); get().pushToast('Favorites cleared', 'info'); },
      resetDemoData: () => { set({ favorites: [], recent: [], views: {} }); get().pushToast('Demo data reset', 'info'); },

      openPhoto: (id, list) => {
        const s = get();
        set({
          selectedPhotoId: id,
          modalList: list && list.includes(id) ? list : [id],
          recent: [id, ...s.recent.filter((r) => r !== id)].slice(0, 12),
          views: { ...s.views, [id]: (s.views[id] ?? 0) + 1 },
        });
      },
      closePhoto: () => set({ selectedPhotoId: null }),
      stepPhoto: (dir) => {
        const { selectedPhotoId, modalList } = get();
        if (!selectedPhotoId || modalList.length < 2) return;
        const i = modalList.indexOf(selectedPhotoId);
        const next = modalList[(i + dir + modalList.length) % modalList.length];
        get().openPhoto(next, modalList);
      },
      pushToast: (message, tone = 'info') => {
        const id = ++toastId;
        set({ toasts: [...get().toasts.slice(-2), { id, message, tone }] });
      },
      dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),

      setGallery: (gallery) => set({ gallery }),
      setLighting: (lighting) => set({ lighting }),
      setIntensity: (intensity) => set({ intensity }),
      requestCamera: (steps, kind) => set({ cameraRequest: { id: ++reqId, steps, kind } }),
      setTour: (tourActive, tourCaption, highlightId) => set({ tourActive, tourCaption, highlightId }),
      setHighlight: (highlightId) => set({ highlightId }),
    }),
    {
      name: 'photoverse-data',
      version: 1,
      partialize: (s) => ({ favorites: s.favorites, recent: s.recent, views: s.views }),
      merge: (persisted, current) => {
        const p = (persisted && typeof persisted === 'object' ? persisted : {}) as Record<string, unknown>;
        const views: Record<string, number> = {};
        if (p.views && typeof p.views === 'object') {
          for (const [k, v] of Object.entries(p.views as Record<string, unknown>)) if (typeof v === 'number') views[k] = v;
        }
        return { ...current, favorites: strArray(p.favorites), recent: strArray(p.recent), views };
      },
    },
  ),
);
