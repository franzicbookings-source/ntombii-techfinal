# Portfolio films

The website shows a silent 12-second film for each project, 1200 × 960, on the same navy as the homepage work section (`#202c36`), so the devices sit straight on the page. Every film is built from captures of the client's live website:

1. The site's sections float as 3D layers, then fold into one page and turn to face the camera as a browser window.
2. The real page scrolls.
3. The browser narrows into a phone and the page switches to the mobile layout, while two sections of the site hang either side.
4. The phone page scrolls, then the phone falls back and the layers rise into the opening frame, so the film loops without a visible cut.

The films are a [HyperFrames](https://hyperframes.heygen.com) composition in `films/`. One composition (`films/index.html`) serves every project through variables: the website address, an accent colour for the light behind the devices, and the two captures.

## Refresh or add a project

Needs Node 22+, the HyperFrames CLI (`npm install -g hyperframes`), Playwright with Chromium, FFmpeg with libx264 and libwebp, and Python 3 with Pillow. From the repository root:

```sh
node scripts/motion/films/capture.cjs la-raza     # tall desktop and phone captures of the live site
node scripts/motion/films/render.cjs la-raza      # renders the film, then writes the MP4, poster and thumbnail to public/videos/work/
```

Leave out the project ID to do all of them. Add `--draft` to `render.cjs` for a quick check render (kept in `films/.renders/`, nothing published).

For a new project, add it to `films/projects.json` with its live URL, the address shown in the browser bar and an accent colour from its brand, then capture and render. Bump the revision in `projectMotion()` (`components/portfolio-projects.ts`) whenever published films change, so browsers fetch the new files.

To change the film itself, edit `films/index.html`, or open the folder in the HyperFrames desktop app. Run `hyperframes check` and `hyperframes snapshot --at 0,3.4,7.5,11.9` from `scripts/motion/films/` before rendering.

## Process film

The "We build websites." film on the homepage is the HyperFrames composition in `process/`. To change it, edit `process/index.html` (the chapter times must stay in step with `components/process-showcase.tsx`), then from `scripts/motion/process/`:

```sh
hyperframes check
hyperframes render --quality delivery -o .renders/process.mp4
ffmpeg -i .renders/process.mp4 -an -c:v libx264 -preset veryslow -crf 26 -pix_fmt yuv420p -movflags +faststart ../../../public/videos/process.mp4
ffmpeg -ss 5.9 -i .renders/process.mp4 -frames:v 1 -c:v libwebp -quality 82 ../../../public/videos/process-poster.webp
```

## Earlier styles

`editorial-film.py` (with `plates/` and `film-crops.json`) made the previous editorial films, and `make-video.cjs` the first laptop-and-phone films. Both write to the same output paths, so running either replaces the current films.
