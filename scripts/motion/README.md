# Project motion clips

Each website in `components/portfolio-projects.ts` has a 12-second clip in `public/videos/work/`: the live site scrolling on a 3D laptop and phone, on the site's navy backdrop. `components/project-motion.tsx` plays it (only while on screen, paused for reduced-motion and data-saver visitors, with a pause button).

## Add or refresh a clip

```sh
node scripts/motion/make-video.cjs <project-id> <live-url> [scroll-fraction]
# e.g. node scripts/motion/make-video.cjs penny-ntuli https://penny-ntuli-partnerships.vercel.app/ 0.72
```

This captures the live site on desktop and phone, renders `scene.html` frame by frame, and writes `public/videos/work/<project-id>.mp4` (H.264, about 1–1.5 MB) and `<project-id>-poster.webp`. It takes a few minutes. Lower `scroll-fraction` (default 0.7) to stop before footers or maps. Captures and lossless masters go to `scripts/motion/.work/`, which is ignored by Git.

Requirements: Playwright with Chromium and `ffmpeg` with `libx264` and `libwebp`. These are not site dependencies; the site build never runs this script.

Fractions used for the current clips: friday-consulting 0.62, penny-ntuli 0.72, fezile-security 0.55 (stops before the branch map), legend-black-jesus 0.7, snesenzo-security 0.7, khuzani-blue-nation 0.72, moyandi-scents 0.7.
