# Facebook launch film

`ntombii-facebook-launch.mp4`: 29.7 s, 1080 × 1350 (4:5, the format that takes the most room in a phone feed), with music and sound. Mixed to −14.4 LUFS, true peak −1.4 dBTP.

Cover images: `cover-building.jpg` ("Because we've been building.") or `cover-endcard.jpg` (logo and WhatsApp number).

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

Needs the HyperFrames CLI (`npm install -g hyperframes`) and FFmpeg. The project films and Sabelo's intro are linked from `public/videos/`. From this folder:

```sh
hyperframes check
hyperframes render --quality delivery -o .renders/facebook-launch.mp4
ffmpeg -i .renders/facebook-launch.mp4 -c:v copy -af "loudnorm=I=-14.5:TP=-2:LRA=11,alimiter=limit=0.84:level=false" -ar 48000 -c:a aac -b:a 192k -movflags +faststart ntombii-facebook-launch.mp4
```
