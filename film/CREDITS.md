# Credits and references — Two Lights

## Made for this film
- **Concept, script, art direction, animation, edit:** original, built in code (Remotion) for Ntombii Tech.
- **Music:** original composition, written as MIDI by `audio/make_audio.py` and played with the FluidR3 General MIDI soundfont (see licence below). Instruments: electric piano (Sabelo's voice), glockenspiel (Sthembile's voice), finger bass, warm pad, strings, GM drum kit.
- **Sound effects:** original, synthesised in `audio/make_audio.py` (thumps, ticks, whooshes, shimmers, riser, impacts). No sample libraries.
- **Voice:** none. The film has no narration, so there is no synthetic voice to credit and no captions file.
- **Lights, ticket, browser, laptop, orb, layout blocks, wireframe:** original vector artwork drawn in code. No generated images; neither founder is depicted.

## Ntombii Tech's own material
- Logo and icon: `public/brand/ntombii-logo-light.svg` (website). The icon is redrawn from the same paths so it can build on screen.
- Typeface: Aeonik Regular, the website's self-hosted font (`public/fonts/aeonik-regular.woff`). Per `docs/aeonik-source.md`, the owner supplied it and its metadata references a This Is Our Shop EULA. **Confirm your licence covers use in video before publishing.**
- Atmosphere texture: `public/images/hero-atmosphere.webp` (website hero).
- Moyandi Scents homepage screenshot and the 3D project clips for Moyandi Scents and Friday Consulting: rendered from the live sites by `scripts/motion/make-video.cjs`. These are Ntombii Tech's client projects, already shown in the portfolio.
- Story facts: the About page and `docs/about-team.md` (owner-approved).

## Tools
- [Remotion](https://www.remotion.dev/) 4.0.535. Its licence is free for individuals and for companies with up to 3 employees; larger companies need a company licence.
- FluidSynth (LGPL) for rendering the MIDI; ffmpeg for loudness normalisation (−16 LUFS, −1.5 dBTP) and encoding.

### FluidR3 GM soundfont licence (MIT)
Copyright © 2000–2002, 2008 Frank Wen. Copyright © 2008 Toby Smithe.
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

## Reference films
I studied these to inform the film; nothing was copied. For the first four I viewed real frames sampled from the public player at the timestamps given (picture only, no sound). The last three I could only read about.

| Film | Link | What I looked at | Craft choice taken |
|---|---|---|---|
| *Powers of Ten*, Charles & Ray Eames (1977) | https://www.youtube.com/watch?v=0fKBhvDjuy0 | Frames at 0:45 (picnic from above inside a 1-metre square, labelled 10⁰ m) and 1:15 (the same square now 1,000 m wide). Also read eamesoffice.com. | A constant frame makes huge jumps in scale readable. The laptop screen is our constant frame: we dive into it, build inside it, then pull back out of it. |
| *Cog*, Honda / Wieden+Kennedy London, dir. Antoine Bardou-Jacquet (2003) | https://www.youtube.com/watch?v=bl2U1p3fVRk | Frames at 0:03 (one transmission cog rolling along a board in close-up), 0:40 (parts of very different sizes mid-chain), 1:53 (the payoff: the whole car rolls down the ramp). Read the Guardian making-of (theguardian.com/media-network/2016/jun/02/how-we-made-hondas-cog-ad-wieden-kennedy): it was shot in two takes, joined as the exhaust rolls across the floor. | The delayed reveal: what you've been watching assemble *is* the product. Our wireframe snaps together beat by beat, then becomes the real Moyandi Scents site. The hidden cut on a moving object is our light wipe between the two projects. |
| *Catch Me If You Can* titles, Kuntzel + Deygas (2002) | https://www.youtube.com/watch?v=aN715Rp4L74 (an upload with a 5-second collector's card first; times are for this upload) | Frames at 0:12 (the studio logo assembled from the sequence's own vertical lines), 0:40 and 1:35 (characters as flat silhouettes defined only by pose and movement). Read the analysis at cinemablography.org. | Characters defined by movement, not faces, and a logo born from the film's own visual language. Our founders are two lights with different motion (smooth and patient; quick and bouncy), and the logo's dot is where they finally meet. |
| *Dear Sophie*, Google Chrome (2011) | https://www.youtube.com/watch?v=zhPklt9nYas | One frame at 1:00: a family story told entirely through typed text on screen ("The tooth fairy is going broke ;)"). Frames I requested at 0:14 and 1:24 came back black, so I don't claim them. | Personal story without a voice: the words on screen carry it. That is why this film uses typography instead of narration. |
| *The Way Things Go*, Fischli & Weiss (1987) | https://www.guggenheim.org/artwork/32552 | Read only (Guggenheim collection text). | Continuous-looking chains are sold by masked transitions and sound added in post. Every lock, snap and landing in our film has its own sound. |
| *Westworld* main titles, Elastic / Patrick Clair (2016) | https://muddycolors.com/2016/10/making-the-westworld-title-sequence/ | Read only (making-of interview summary: concept art, style frames, storyboards, 3D). | Develop from style frames first; the three style frames in `BRIEF.md` came out of that. |
| Airbnb, *Introducing the Bélo* (2014) | https://www.youtube.com/watch?v=nMITXMrrVQU | Read only (official page and description; 1:45 brand film introducing a symbol). | A film whose job is to make a mark mean something. Ours ends by giving the logo's dot a story. |
