# Facebook launch film

29.7 s, 4:5 portrait, with music and sound, mixed to about −14.5 LUFS. Run `./export.sh` after rendering to make the upload files in `exports/`:

| File | Use |
| --- | --- |
| `ntombii-launch-2160x2700.mp4` | Best quality. Upload from a computer at facebook.com or in Meta Business Suite. |
| `ntombii-launch-1080x1350.mp4` | Upload from a phone, with HD upload switched on. |

Cover images: `cover-building.jpg` ("Because we've been building.") or `cover-endcard.jpg` (logo and WhatsApp number).

## Keeping the quality when you post

Facebook and Instagram re-compress every video. The film is rendered at 2160 × 2700 from the full-quality project films, at a high bitrate, with faint grain so the navy gradients don't band, so the platform starts from a clean source. The rest is in how it's uploaded:

1. **Get the file to your phone as a file.** Download it straight from here, Google Drive or email. Sending it through WhatsApp as a video compresses it heavily (send as a Document if you must).
2. **Facebook app:** Menu → Settings & privacy → Settings → Media → Video quality → choose **Upload HD** (not Data saver or Optimised).
3. **Instagram app:** Settings → Data usage and media quality → turn on **Upload at highest quality**, and turn off Data saver.
4. **Best of all, post from a computer** (facebook.com or business.facebook.com) with the 2160 × 2700 file.
5. **Give it time.** Right after posting, Facebook often plays a low-quality version while it finishes the HD one. Check again after 10–30 minutes before judging it.

## What happens

| Time | Beat |
| --- | --- |
| 0–4 s | A WhatsApp chat: "Do you still build websites?" / "We never stopped." The reply floods the screen. |
| 4–8 s | "We've been quiet. Because we've been building." The letters of "building." drop in like bricks. |
| 8–14 s | One tile flips on each bar: Business websites, Online shops, Maintenance & support. |
| 14–16 s | The 2026 Web Design Award, then the camera dives through it into the drop. |
| 16–22.5 s | The seven portfolio films, cut on the beat. |
| 22.5–25.6 s | Cartoon Sabelo: "Sawubona! I'm Sabelo from Ntombii Tech." |
| 25.6–29.6 s | The circle becomes the logo mark. "Websites that work.", WhatsApp 081 236 0230, ntombii.tech, websites from R2,500. |

Music and effects were made in ElevenLabs (flow "Ntombii Tech – Facebook launch film"); the film is cut to the music's 120 BPM grid, with the drop on bar 9 (16.0 s).

## Suggested post

> We've been quiet on here, because we've been building.
>
> Restaurants, online shops, security companies and community organisations across South Africa now have websites that work. Our own website won a 2026 Web Design Award along the way.
>
> Need a business website, an online shop, or someone to look after the one you have? Websites from R2,500.
>
> WhatsApp us on 081 236 0230 or visit ntombii.tech

Post it as a native video (upload the MP4, not a link), pin it to the top of the page, and pick one of the covers.

## Re-render

Needs the HyperFrames CLI (`npm install -g hyperframes`) and FFmpeg. The film is designed at 1080 × 1350 and rendered at 2160 × 2700 (`#canvas` is zoomed 2×). It reads full-quality sources from `assets/hq/`, which is not committed because of its size:

- the seven project films: run `node scripts/motion/films/render.cjs` from the repository root, then copy `scripts/motion/films/.renders/<id>.mp4` into `assets/hq/`;
- `sabelo-intro.mp4`: the 1920 × 1072 talking-head master from the ElevenLabs flow "Ntombii Tech – Sabelo intro", cropped to a 1072 × 1072 square;
- `award-2026@4x.png`: `assets/brand/award-2026.png` enlarged 4× with Lanczos.

Then, from this folder:

```sh
hyperframes check
hyperframes render --quality delivery --crf 10 --video-frame-format png -o .renders/facebook-launch-2x-master.mp4
./export.sh
```
