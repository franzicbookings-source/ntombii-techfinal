# Moyandi Scents walkthrough (vertical)

30 s, 9:16, for TikTok, Instagram Reels, Facebook Reels and YouTube Shorts. It walks through moyandiscents.co.za on a phone, from browsing to the secure payment step, then hands over to the Ntombii Tech end card. Music and sound are mixed to about −14.5 LUFS. Run `./export.sh` after rendering to make the upload files in `exports/`:

| File | Use |
| --- | --- |
| `moyandi-walkthrough-2160x3840.mp4` | Best quality (4K vertical). Upload from a computer, or to YouTube Shorts. |
| `moyandi-walkthrough-1080x1920.mp4` | Upload from a phone to TikTok, Instagram or Facebook. |

Cover image: `cover.jpg` (the opening line and the shop's address).

The posting-quality steps in `../facebook-launch/README.md` apply here too: send the file to your phone as a file (not as a WhatsApp video), switch on HD upload in each app, and give Facebook 10–30 minutes to finish the HD version.

## What happens

| Time | Beat |
| --- | --- |
| 0–2 s | "How an online shop should work." over candlelight, with the shop's address. |
| 2–4 s | The phone rises with the shop's home page. |
| 4–7 s | Browse the collection: the page scrolls and a candle is tapped. |
| 7–10 s | Pick a scent: the camera pushes in and Rose & Peony is chosen. |
| 10–12 s | Add to cart: the cart slides in. |
| 12–18 s | Build a gift box: choose the pieces and the scents, see the R450 total. |
| 18–23.5 s | Guest checkout: details, then locker collection with The Courier Guy (total R229). |
| 23.5–26 s | Pay securely: the Paystack step and the payment methods the shop accepts. |
| 26–30 s | The Ntombii Tech end card: "Want an online shop like this?", WhatsApp 081 236 0230, ntombii.tech. |

Every text line sits inside the area TikTok, Reels and Shorts all leave clear (288–1248 px down, 120–888 px across on 1080 × 1920).

## Sources

The screens are real captures of the live shop at iPhone 13 size (`capture.cjs`, `recapture.cjs`). The scripts block every request except GET and HEAD, so nothing is ever sent to the real shop, and no order or payment is made: the film stops at the payment step. The customer details are made up (Thandi Mokoena, thandi@example.com).

Music (`assets/audio/bed-1.mp3`, 118 BPM) and effects were made in ElevenLabs; the beats land on the music's bars (every 2.03 s).

## Re-render

Needs the HyperFrames CLI (`npm install -g hyperframes`) and FFmpeg. The film is designed at 1080 × 1920 and rendered at 2160 × 3840 (`#canvas` is zoomed 2×). From this folder:

```sh
hyperframes check
hyperframes render --quality delivery --crf 10 --video-frame-format png -o .renders/moyandi-walkthrough-2x-master.mp4
./export.sh
```

To refresh the screens after the shop changes: `node capture.cjs` then `node recapture.cjs`. Tap positions are written to `assets/ui/taps.json`; update the `tap(...)` calls in `index.html` if they move.
