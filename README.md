# No Sleep — homepage foundation

Chunk 1 only: React + TypeScript + Vite. No backend, auth, catalogue, payment, upload, or inquiry integration.

## Local development

Requires Node 22.12+ (validated on Node 24).

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Structure

- `src/features/public/`: header, homepage, quick navigation cards and static studio clock.
- `src/components/`: shared brand, icon and native accessible notice dialog.
- `src/content/`: replaceable artwork paths, navigation artwork and availability copy.
- `src/index.css`: design tokens, component styling, responsive layouts and reduced-motion support.
- `public/images/`: self-hosted generated placeholder artwork.

Future producer functionality should live in `src/features/producer/` with its own layout and routes. No empty dashboard or auth scaffolding has been added. Replace availability notices with real destinations only as those chunks are authorized. There are no external runtime requests: fonts ship through Fontsource and artwork is local.

## Art direction and deliberate adaptations

The approved board's upper-left homepage is the reference. The other panels depict later features and are excluded. Both graphical brand placements use the same unmodified artist-supplied transparent PNG at `public/images/no-sleep-logo.png`, preserving its proportions and lettering. The red clock is a fixed, accessible seven-segment SVG reading 4:12 AM aligned to the generated wall clock housing.

The scene and card art are original generated placeholders, not cropped UI screenshots or third-party image dependencies. See `docs/assets.md`. The header omits catalogue search and unprovided social destinations; future navigation opens honest availability notices. On phones the scene is recropped, navigation collapses and quick navigation cards wrap to a 3+2 grid.

## Validation

Production build includes TypeScript checking. Oxlint checks the source. Browser checks used headless Microsoft Edge through Playwright at 1440, 834, 390 and 320 px: no horizontal overflow, no runtime exceptions, clock label present, navigation notices, native dialog dismissal and focus restoration, and mobile navigation. Axe WCAG A/AA checks reported zero violations at all four widths. Screenshots were visually reviewed against the concept; mobile logo clipping, clock visibility and scene blending were corrected. These automated checks supplement basic review and are not a full accessibility certification.

QA tools and screenshots are outside the repository; no test framework is a product dependency. Build output and dependencies are gitignored. No secrets or external endpoints are required.

## Outer page background

`PageBackground` renders the approved animation behind the page, outside the opaque studio hero panel. `HeroMedia` retains the original studio image and clock. Tune the outer video overlay using `--hero-media-overlay-opacity` (0.56) and cover positioning with `--hero-video-position`. Native muted autoplay, loop and playsInline are used; React only responds to playback readiness and reduced-motion changes. Reduced motion mounts no video and makes no video requests. Failed or blocked playback leaves the dark poster visible. See `docs/video-delivery.md` for encoding and validation.

## Canonical navigation

`src/content/navigation.ts` is the single definition for HOME (/), BEATS (/beats), BIO (/bio), CONTACT (/contact), and LOGIN (/login). Both navigation surfaces use native links via SiteLink. Future routes display availability notices over the homepage; no catalogue, login form or backend is implemented. Dismissing a route notice returns the URL to /. Production hosting must serve index.html for these SPA paths (Vite development/preview already does).
