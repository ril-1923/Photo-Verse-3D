# PhotoVerse 3D

An interactive 3D photography museum built with React 18, TypeScript, Vite, React Three Fiber, Drei, Zustand, Bootstrap 5 and Recharts.
Tagline: *Explore the World Through a Different Lens.*

## Run locally

```bash
npm install
npm run dev        # development server
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
```

Node 20 or newer is recommended. No API keys and no backend are needed.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository whose default branch is `main`.
2. In the repository go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab). `.github/workflows/deploy.yml` runs `npm ci`, the TypeScript check and the build, then deploys `dist/` with the official Pages actions.

Vite uses `base: './'` and the app uses `HashRouter`, so all eight routes work from a sub-path with no server rewrites.
Commit `package-lock.json` (it is included) because the workflow uses `npm ci`.

## Routes

`/` Home · `/museum` 3D museum · `/collections` · `/photographers` · `/explore` · `/favorites` · `/dashboard` · `/settings` (plus a 404 page)

## Implemented features

- **3D museum**: procedural low-poly hall with three connected rooms (Nature, Urban, Wildlife), doorways, columns, ceiling beams, benches, 21 photo frames (7 per room) with plaques, hover/selection glow, and ambient sparkles.
- **Camera**: OrbitControls with bounds, smooth gallery transitions, Reset / Home / Gallery / Cinematic views, auto-tour with captions and a Stop button. The camera rig disables OrbitControls while a scripted move runs so the two never fight.
- **Lighting**: Daylight, Golden Hour and Night Mode lerp real Three.js lights, fog and background; brightness slider; per-room colour tint.
- **Fallbacks**: 2D museum when WebGL is missing, the context is lost, the 3D view throws, or the visitor chooses "Simple gallery".
- **Collections**: 45 photos, 9 categories, search, category and photographer filters, sorting, masonry/grid toggle, Load more, clear filters, result count, loading and empty states.
- **Photographers**: 8 fictional profiles (clearly labelled demo content) with search, category filter and a detail modal.
- **Explorer**: stylised SVG map with 10 destinations, country and category filters, per-destination photographs.
- **Favorites**: persisted, cross-page synchronised, filter, sort, confirmed clear-all.
- **Dashboard**: stat cards, four Recharts charts, date-range selector, category summary, recently viewed, most viewed and recently added. Visitor numbers are **simulated**.
- **Settings**: theme, accent colour, reduced motion, default gallery/lighting/intensity, auto-rotate, default layout/sort/page size, and confirmed destructive actions.
- Shared photo-details modal (Escape, arrow keys, prev/next, focus return), toasts, error boundaries, skip link, keyboard-operable map.

## Images and data

- All 45 photographs are remote **Unsplash** URLs defined in `src/data/photographs.ts`.
- **These URLs could not be verified** (the build environment had no outbound access to image hosts). Some IDs may be wrong, may show a different subject than the title, or may be removed.
- Every `<img>` and every 3D texture falls back to a generated local placeholder if loading fails, so a bad URL never breaks the app. To replace an image, edit its row in `photographs.ts`.
- Check the Unsplash licence terms for your use case.
- Camera, aperture, shutter and ISO values are **illustrative sample data, not EXIF**. Photographers are **fictional**. Dashboard visits are **simulated**.

## Commands actually run

- `npm install` (succeeded)
- `npx tsc --noEmit` (no errors)
- `npm run build` (succeeded)
- A Node script checking the dataset (45 unique images, 5 per category, valid photographer and destination references, 21 frames) and the search/filter/sort logic.

## Known issues and unverified functionality

- **No browser testing was possible.** The 3D scene, camera transitions, lighting transitions, tour, modal behaviour, favorites persistence across reloads, theme persistence, responsive layouts and mobile layout have **not** been opened or seen in a browser. A successful build does not prove they work visually.
- Remote photo URLs unverified (see above); the Google Fonts stylesheet needs network access, with system-font fallbacks otherwise.
- GitHub Pages deployment has not been performed.
- No automated test suite is included.
- The 3D museum was designed for ordinary desktop GPUs; mobile uses lower pixel ratio, no spotlights, no sparkles and lower-resolution textures but is untested on real devices.
- "Nature & Landscapes" on the home page links to the Landscape category only.
