import type { Category } from '../types/photography';

const palette: Record<Category, [string, string, string]> = {
  Nature: ['#1d3b2a', '#4f8a5b', '#d9c27a'],
  Landscape: ['#2a3550', '#8a7a9a', '#f0b06a'],
  Architecture: ['#1b2230', '#4a5d7a', '#e8c88a'],
  Wildlife: ['#3a2a18', '#9a6a2e', '#e8b25a'],
  Automotive: ['#1a1a1f', '#5a2a2a', '#e86a4a'],
  Portrait: ['#2a2024', '#8a5a5a', '#f0cfa0'],
  Travel: ['#1f2d3a', '#4f7a8a', '#f0c27a'],
  Ocean: ['#0e2a40', '#1f7a9a', '#9fe0e8'],
  'Night Sky': ['#07091a', '#2a2a6a', '#f0e0a0'],
};

const esc = (s: string): string => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Generated local fallback artwork (no network). Used for broken <img> and 3D textures. */
export function placeholderFor(category: Category, title: string, w = 900, h = 600): string {
  const [a, b, c] = palette[category];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<circle cx="${w * 0.72}" cy="${h * 0.3}" r="${Math.min(w, h) * 0.09}" fill="${c}" opacity=".85"/>
<path d="M0 ${h * 0.78} L${w * 0.22} ${h * 0.5} L${w * 0.4} ${h * 0.68} L${w * 0.62} ${h * 0.4} L${w} ${h * 0.75} L${w} ${h} L0 ${h}Z" fill="#000" opacity=".35"/>
<text x="${w / 2}" y="${h * 0.9}" fill="#fff" fill-opacity=".8" font-family="Georgia,serif" font-size="${Math.round(Math.min(w, h) * 0.055)}" text-anchor="middle">${esc(title)}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function avatarFor(name: string, hue: number): string {
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="hsl(${hue},38%,24%)"/><circle cx="100" cy="82" r="34" fill="hsl(${hue},40%,62%)" opacity=".5"/><path d="M30 200c6-48 38-62 70-62s64 14 70 62z" fill="hsl(${hue},40%,62%)" opacity=".5"/><text x="100" y="116" text-anchor="middle" font-family="Georgia,serif" font-size="46" fill="#fff" fill-opacity=".92">${esc(initials)}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}
