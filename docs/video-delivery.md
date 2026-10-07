# Restrained outer page background

The opaque studio hero panel, logo and red clock are preserved. Animation remains on the surrounding page layer; it does not replace or shine through the existing studio image. Smooth independent masks suppress the navigation region, outer edges and lower microcopy without a rectangular clip.

## Approved source segment

Original source: user-supplied bg_loop.mp4, 3840×2160 H.264, 60fps, 16 seconds, 72,754,420 bytes, no audio. Source remains outside production. Only 00:00.25–00:03.60 is used. Later source content is excluded. The previous full-length/dissolve versions are replaced, not retained in production.

The selected segment plays forward, then backward. The reverse branch drops its first and last frames so neither turn repeats an identical endpoint. At 30fps the output is 198 frames / **6.60 seconds** after frame quantization and endpoint removal. No crossfade or later-source material is used. The representative poster comes from source 2.8 seconds, within the approved interval.

| File                             | Dimensions | Codec/container  | Rate   | Bytes   |
| -------------------------------- | ---------- | ---------------- | ------ | ------- |
| `public/media/hero-loop.mp4`     | 1920×1080  | H.264 High / MP4 | 30fps  | 765,642 |
| `public/media/hero-loop.webm`    | 1920×1080  | VP9 / WebM       | 30fps  | 752,176 |
| `public/images/hero-poster.webp` | 1920×1080  | WebP             | Static | 30,460  |

Both video files have no audio. MP4 has moov before mdat for fast-start. WebM is offered first, MP4 second; metadata preload and an independent poster prevent rendering from waiting for the video. Reduced-motion users mount no video and make no media requests.

## Encoding recipe

FFmpeg 7.1, filter graph:

```text
[0:v]trim=start=0.25:end=3.60,setpts=PTS-STARTPTS,scale=1920:1080:flags=lanczos,fps=30,trim=end_frame=101,split=2[f][r];
[r]reverse,trim=start_frame=1,reverse,trim=start_frame=1,reverse,setpts=PTS-STARTPTS[rev];
[f][rev]concat=n=2:v=1:a=0,fps=30,format=yuv420p[v]
```

Map `[v]`, `-an -map_metadata -1`. H.264: libx264, preset slow, CRF 24, +faststart. VP9: libvpx-vp9, CRF 34, bitrate 0, cpu-used 4, row-mt 1. Poster: Lanczos downscale, WebP quality 90. No upscaling or baked vignette.

## Tunable CSS treatment

- `--hero-media-overlay-opacity: 0.56`: unchanged readability overlay, independent of masks. Video opacity stays 1.
- `--background-top-black: 12%`: fully black through the top 12% of the viewport.
- `--background-top-clear: 32%`: vertical mask fades to transparent by 32%.
- `--background-bottom-clear: 65%`: central clear interval ends at 65%.
- `--background-bottom-black: 88%`: fades to full black by 88%, remaining black below.
- `--background-edge-strength: 0.86`: horizontal edge black opacity.
- `--background-edge-clear: 22%`: edges fade to transparent at 22% and 78% across the viewport.

Layers: full-strength cover video/poster, readability overlay, independent vertical and horizontal gradient masks. Original foreground panel stays opaque and unchanged.

## Validation

Build, lint and typecheck pass. Chromium at 1440, 834, 390 and 320px: playback, silent/muted inline looping flags, cover cropping, no overflow, visible poster on media failure, reduced-motion zero video requests and live preference change, CTA interaction. Both codecs played. Decoded frame count is 198; adjacent differences at both reversals are nonzero, verifying no repeated endpoint pause. Navbar and quick keys share all five hrefs; direct routes, reload, dismissal, keyboard focus and reduced-motion interaction checked. Axe WCAG A/AA checks found no violations at all four widths. Screenshot review caught and corrected anchor-label alignment to preserve centered card lettering.

No persistent test framework or new app dependency was added. QA tooling remains outside the repository. Future-route availability notices are the only route content added; hosting needs SPA fallback to index.html.
