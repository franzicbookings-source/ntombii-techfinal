# Portfolio films

The website shows silent, 12-second films at 1200 × 960. Each opens on the client's mobile site with photography from the same project, cuts to the desktop design on Ntombii's navy background, then moves in on a feature from the case study. The last shot returns to the opening frame.

## Render

From the repository root, with Node 22.13+, Python 3 with Pillow, and FFmpeg with libx264 installed:

```sh
python3 scripts/motion/editorial-film.py la-raza
python3 scripts/motion/editorial-film.py --sheet /tmp/portfolio-storyboard.jpg
```

Omit the project ID to render the full collection. The storyboard shows three frames per project. Rendering uses the published case-study screenshots declared in `components/portfolio-projects.ts`, the WebP artwork in `plates/`, and the framing in `film-crops.json`. The website build uses the finished films and posters in `public/videos/work/`.

For a new project, add its three screenshots to the project record, save a suitable client image as `plates/<project-id>.webp`, and record its origin in `plates/sources.json`. Add the crop settings under the same ID. The six detail values are the centre X, centre Y and crop width at the beginning and end of the shot, in pixels on the original detail screenshot. Check the storyboard and finished loop before publishing. Bump the media revision in `projectMotion()` when replacing published files.

The earlier laptop-and-phone scroll renderer remains available as `make-video.cjs <project-id> <live-url> [scroll-fraction]`. It writes the same output paths. The editorial command above reproduces the current portfolio.
