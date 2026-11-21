"""Original score and sound design for "Two Lights".

Writes the arrangement as MIDI (mido), renders it with FluidSynth and the FluidR3 General MIDI
soundfont (MIT licence), synthesises the sound effects with numpy at the cue frames in
src/timeline.json, then loudness-normalises the mix with ffmpeg.

Two voices carry the story: a warm electric piano (Sabelo) and a bright glockenspiel (Sthembile).
They call and answer, harmonise at the handoff, play every build "lock" between them and end in unison.

Run: python3 audio/make_audio.py   (needs: pip install mido numpy scipy; apt install fluidsynth fluid-soundfont-gm; ffmpeg)
Output: public/audio/score.wav (local) and public/audio/score.mp3 (used by the film).
"""
import json
import os
import subprocess

import mido
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, "public", "audio")
os.makedirs(OUT, exist_ok=True)
TL = json.load(open(os.path.join(ROOT, "src", "timeline.json")))
FPS, BPM = TL["fps"], TL["bpm"]
CUE = TL["cues"]
SR = 48000
TPB = 480  # ticks per beat
SOUNDFONT = "/usr/share/sounds/sf2/FluidR3_GM.sf2"


def f2s(frame):
    return frame / FPS


def beat_of_frame(frame):
    return f2s(frame) * BPM / 60


def bar(n, beat=0.0):
    """Beat position of bar n (1-based) plus a beat offset."""
    return (n - 1) * 4 + beat


# ---------------------------------------------------------------- MIDI arrangement
CH = {"warm": 0, "cool": 1, "bass": 2, "pad": 3, "strings": 4, "drums": 9}
PROGRAM = {"warm": 4, "cool": 9, "bass": 33, "pad": 89, "strings": 48}  # E.Piano 1, Glockenspiel, Finger Bass, Warm Pad, Strings
events = []  # (beat, channel, note, velocity, duration_beats)


def note(beat, ch, n, vel, dur):
    events.append((beat, CH[ch], n, vel, dur))


CHORDS = {  # voicings for pad, bass root, warm chord tones (mid), cool chord tones (high)
    "D":   {"pad": [50, 57, 61, 66], "bass": 38, "warm": [62, 66, 69, 71], "cool": [81, 83, 86, 90]},
    "Bm":  {"pad": [47, 54, 57, 62], "bass": 35, "warm": [59, 62, 66, 69], "cool": [78, 81, 83, 86]},
    "G":   {"pad": [43, 50, 54, 59], "bass": 31, "warm": [62, 67, 71, 74], "cool": [79, 83, 86, 88]},
    "A":   {"pad": [45, 52, 54, 61], "bass": 33, "warm": [61, 64, 69, 71], "cool": [81, 85, 88, 90]},
    "Em":  {"pad": [52, 55, 59, 62], "bass": 40, "warm": [64, 67, 71, 74], "cool": [79, 83, 86, 88]},
    "D/F#": {"pad": [42, 50, 57, 62], "bass": 42, "warm": [62, 66, 69, 74], "cool": [81, 86, 90, 93]},
}
# 30 bars at 120 BPM = 60 s
PROGRESSION = ["D", "Bm", "G",                       # 1-3 intro
               "D", "Bm", "G", "A", "D",             # 4-8 groove: an uncle, his niece, and a laptop
               "Bm", "G", "D/F#", "Em", "G", "A", "A",  # 9-15 half-time story; handoff 12-13
               "D", "Bm", "G", "A",                  # 16-19 build
               "D", "Bm", "G", "D", "Bm", "G", "A", "D",  # 20-27 reveal and chorus
               "G", "D", "D"]                        # 28 breakdown, 29 logo, 30 ring-out


def warm_motif(start, chord, vel=74, slow=False):
    t = CHORDS[chord]["warm"]
    if slow:  # half-time: quarter notes
        for i, idx in enumerate([0, 1, 2, 1]):
            note(start + i, "warm", t[idx], vel, 0.95)
        return
    for off, idx, dur in [(0, 0, .5), (.5, 1, .5), (1, 2, 1), (2, 3, .5), (2.5, 2, .5), (3, 1, 1)]:
        note(start + off, "warm", t[idx], vel, dur)


def cool_answer(start, chord, vel=70):
    t = CHORDS[chord]["cool"]
    for off, idx, dur in [(.5, 0, .25), (1, 1, .25), (1.5, 2, .5), (2.5, 3, .25), (3, 2, .25), (3.5, 1, .5)]:
        note(start + off, "cool", t[idx], vel, dur)


def pad(start, chord, beats, vel=48, ch="pad"):
    for n in CHORDS[chord]["pad"]:
        note(start, ch, n + (12 if ch == "strings" else 0), vel, beats)


def bass_pulse(start, chord, vel=84, pattern="eighths"):
    root = CHORDS[chord]["bass"]
    if pattern == "eighths":
        for i in range(8):
            note(start + i * .5, "bass", root + (12 if i in (3, 7) else 0), vel - (10 if i % 2 else 0), .45)
    elif pattern == "long":
        note(start, "bass", root, vel, 3.8)
    elif pattern == "pump":
        for off in (0, 1.5, 2, 3.5):
            note(start + off, "bass", root, vel, .45)


# drum map (General MIDI)
KICK, SNARE, CLAP, HAT, OHAT, SHAKER, CRASH, RIDE, TOM = 36, 38, 39, 42, 46, 82, 49, 51, 45


def drums(start, style, vel=1.0):
    def d(off, n, v):
        note(start + off, "drums", n, int(v * vel), .25)
    if style == "groove":
        for off in (0, 1.5, 2):
            d(off, KICK, 96)
        for off in (1, 3):
            d(off, CLAP, 82)
        for i in range(8):
            d(i * .5, HAT, 52 if i % 2 else 64)
    elif style == "halftime":
        d(0, KICK, 84); d(2, SNARE, 70)
        for i in range(4):
            d(i + .5, SHAKER, 40)
    elif style == "shaker":
        for i in range(8):
            d(i * .5, SHAKER, 34 + (8 if i % 2 else 0))
    elif style == "build":
        for off in range(4):
            d(off, KICK, 98)
        for off in (1, 3):
            d(off, CLAP, 84)
        for i in range(16):
            d(i * .25, HAT, 40 + (16 if i % 4 == 0 else 0))
    elif style == "chorus":
        for off in (0, 1, 2, 3):
            d(off, KICK, 100)
        for off in (1, 3):
            d(off, CLAP, 90); d(off, SNARE, 60)
        for i in range(8):
            d(i * .5 + .25, OHAT if i % 2 else HAT, 58)
        for i in range(16):
            d(i * .25, SHAKER, 30)
    elif style == "intro":
        for off in range(4):
            d(off, KICK, 46 + off * 8)


# Intro (bars 1-3): warm motif alone, the cool voice arrives with its light at bar 2.
warm_motif(bar(1), "D", 64)
warm_motif(bar(2), "Bm", 66)
note(beat_of_frame(CUE["coolOn"]), "cool", 86, 86, .5)          # the cool light pops on
note(beat_of_frame(CUE["coolOn"]) + 1.5, "cool", 90, 62, .25)
note(beat_of_frame(CUE["coolOn"]) + 1.75, "cool", 88, 62, .25)
note(beat_of_frame(CUE["coolOn"]) + 2.0, "cool", 86, 70, .5)
warm_motif(bar(3), "G", 70)
cool_answer(bar(3), "G", 60)
drums(bar(3), "intro")
for n in [38, 50]:
    note(bar(1), "bass", n, 50, 11.5)  # a low pedal under the intro

# Groove (bars 4-8): each word lands as a hit in its own voice.
for b, chord in zip(range(4, 9), ["D", "Bm", "G", "A", "D"]):
    drums(bar(b), "groove", .9)
    bass_pulse(bar(b), chord, 80)
    pad(bar(b), chord, 4, 40)
warm_motif(bar(4), "D", 82)          # "An uncle,"
cool_answer(bar(5), "Bm", 80)        # "his niece,"
warm_motif(bar(6), "G", 78)          # "and a laptop." both together
cool_answer(bar(6), "G", 72)
warm_motif(bar(7), "A", 74)
cool_answer(bar(7), "A", 66)
for n in CHORDS["D"]["warm"]:
    note(bar(8), "warm", n, 70, 2)
for n in CHORDS["D"]["cool"][:3]:
    note(bar(8, 2), "cool", n, 60, 1.5)

# Half-time story (bars 9-15). Drums drop out for the handoff (bar 12), the voices harmonise (bar 13).
for b, chord in zip(range(9, 16), ["Bm", "G", "D/F#", "Em", "G", "A", "A"]):
    pad(bar(b), chord, 4, 38 if b in (12, 13) else 40)
    if b not in (12, 13):
        bass_pulse(bar(b), chord, 56, "long")
        drums(bar(b), "halftime" if b < 14 else "shaker", .7)
warm_motif(bar(9), "Bm", 62, slow=True)
warm_motif(bar(10), "G", 60, slow=True)
warm_motif(bar(11), "D/F#", 58, slow=True)
warm_motif(bar(12), "Em", 64, slow=True)                 # he passes the light on
for i, (w, c) in enumerate([(67, 83), (71, 86), (74, 88), (71, 86)]):  # bar 13: first harmony
    note(bar(13, i), "warm", w, 66, .95)
    note(bar(13, i), "cool", c, 62, .95)
pad(bar(12), "Em", 8, 36, "strings")
for frame, n in zip(CUE["snaps"], [81, 85, 88, 90, 93]):  # each layout block snaps as a note
    note(beat_of_frame(frame), "cool", n, 72, .4)

# Build (bars 16-19): every lock alternates between the two voices, climbing.
for b, chord in zip(range(16, 20), ["D", "Bm", "G", "A"]):
    drums(bar(b), "build", .85 + (b - 16) * .05)
    bass_pulse(bar(b), chord, 82)
    pad(bar(b), chord, 4, 44)
climb_warm = [62, 66, 69, 71, 74, 78]
climb_cool = [81, 83, 86, 88, 90, 93]
for i, frame in enumerate(CUE["locks"]):
    who = "warm" if i % 2 == 0 else "cool"
    pitch = (climb_warm if who == "warm" else climb_cool)[i // 2]
    note(beat_of_frame(frame), who, pitch, 84, .45)

# Reveal and chorus (bars 20-27): both voices together.
for b, chord in zip(range(20, 28), ["D", "Bm", "G", "D", "Bm", "G", "A", "D"]):
    drums(bar(b), "chorus", .95)
    bass_pulse(bar(b), chord, 86, "pump" if b == 20 else "eighths")
    pad(bar(b), chord, 4, 46)
    pad(bar(b), chord, 4, 42, "strings")
    warm_motif(bar(b), chord, 80)
    cool_answer(bar(b), chord, 74)
note(bar(20), "drums", CRASH, 110, 1)
note(bar(25), "drums", CRASH, 96, 1)   # second project
note(bar(24, 3), "drums", TOM, 80, .25)
note(bar(24, 3.5), "drums", TOM - 2, 80, .25)

# Breakdown (bar 28) into the logo (bar 29): one rising unison line, then one chord.
pad(bar(28), "G", 4, 40)
for i, (w, c) in enumerate(zip([62, 64, 66, 69, 71, 73, 74, 76], [86, 88, 90, 93, 95, 97, 98, 100])):
    note(bar(28, i * .5), "warm", w, 60 + i * 3, .45)
    note(bar(28, i * .5), "cool", c, 52 + i * 3, .45)
for n in [50, 57, 61, 64, 66]:
    note(bar(29), "warm", n + 12, 80, 5)
for n in [86, 90, 93]:
    note(bar(29), "cool", n, 70, 3)
pad(bar(29), "D", 5, 50)
pad(bar(29), "D", 5, 44, "strings")
note(bar(29), "bass", 38, 90, 4)
note(bar(29), "drums", CRASH, 100, 1)
note(beat_of_frame(CUE["finalNote"]), "warm", 74, 64, 1.5)   # the last sound: both voices, one note
note(beat_of_frame(CUE["finalNote"]), "cool", 86, 58, 1.5)


def write_midi(path):
    mid = mido.MidiFile(ticks_per_beat=TPB)
    track = mido.MidiTrack()
    mid.tracks.append(track)
    track.append(mido.MetaMessage("set_tempo", tempo=mido.bpm2tempo(BPM), time=0))
    msgs = []
    for name, ch in CH.items():
        if name != "drums":
            msgs.append((0, mido.Message("program_change", channel=ch, program=PROGRAM[name])))
    volume = {"warm": 104, "cool": 88, "bass": 96, "pad": 70, "strings": 64, "drums": 92}
    reverb = {"warm": 50, "cool": 70, "bass": 10, "pad": 90, "strings": 90, "drums": 30}
    pan = {"warm": 50, "cool": 78, "bass": 64, "pad": 64, "strings": 64, "drums": 64}
    for name, ch in CH.items():
        msgs.append((0, mido.Message("control_change", channel=ch, control=7, value=volume[name])))
        msgs.append((0, mido.Message("control_change", channel=ch, control=91, value=reverb[name])))
        msgs.append((0, mido.Message("control_change", channel=ch, control=10, value=pan[name])))
    for beat, ch, n, vel, dur in events:
        on = int(round(beat * TPB))
        off = int(round((beat + dur) * TPB))
        msgs.append((on, mido.Message("note_on", channel=ch, note=n, velocity=max(1, min(127, vel)))))
        msgs.append((off, mido.Message("note_off", channel=ch, note=n, velocity=0)))
    msgs.sort(key=lambda m: (m[0], 0 if m[1].type == "note_off" else 1))
    last = 0
    for tick, msg in msgs:
        msg.time = tick - last
        last = tick
        track.append(msg)
    mid.save(path)


# ---------------------------------------------------------------- sound effects (synthesised)
rng = np.random.default_rng(7)


def env(n, attack, decay_s):
    t = np.arange(n) / SR
    a = np.minimum(1, t / max(attack, 1e-4))
    return a * np.exp(-t / decay_s)


def bandpass(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], btype="band", fs=SR, output="sos"), x)


def lowpass(x, hi):
    return sosfilt(butter(2, hi, btype="low", fs=SR, output="sos"), x)


def thunk(dur=.5, f=62):
    n = int(dur * SR); t = np.arange(n) / SR
    body = np.sin(2 * np.pi * (f + 40 * np.exp(-t * 30)) * t) * env(n, .002, .12)
    click = bandpass(rng.standard_normal(n), 1500, 5000) * env(n, .0005, .008) * .3
    air = bandpass(rng.standard_normal(n), 300, 2500) * env(n, .05, .25) * .08
    return body + click + air


def tick(pitch=2400, dur=.08, level=.35):
    n = int(dur * SR); t = np.arange(n) / SR
    tone = (np.sin(2 * np.pi * pitch * t) + .5 * np.sin(2 * np.pi * pitch * 2.01 * t)) * env(n, .0005, .012)
    noise = bandpass(rng.standard_normal(n), pitch * .8, min(pitch * 3, 18000)) * env(n, .0002, .004) * .6
    return (tone + noise) * level


def whoosh(dur=.7, lo=300, hi=4000, rising=True, level=.25):
    n = int(dur * SR); t = np.linspace(0, 1, n)
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    steps = 24
    for i in range(steps):  # moving band-pass sweep, built in chunks
        a, b = i * n // steps, (i + 1) * n // steps
        p = i / (steps - 1)
        p = p if rising else 1 - p
        c = lo * (hi / lo) ** p
        out[a:b] = bandpass(noise[a:b], c * .6, min(c * 1.6, 20000))
    shape = np.sin(np.pi * t) ** 1.5
    return out * shape * level


def shimmer(dur=1.2, base=2200, level=.12):
    n = int(dur * SR); t = np.arange(n) / SR
    out = np.zeros(n)
    for k, f in enumerate([base, base * 1.5, base * 2.01, base * 2.98, base * 4.02]):
        out += np.sin(2 * np.pi * f * t + k) * env(n, .01 + k * .01, .25 + .1 * k) / (k + 1)
    return out * level


def riser(dur=2.0, level=.22):
    n = int(dur * SR); t = np.linspace(0, 1, n)
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    steps = 40
    for i in range(steps):
        a, b = i * n // steps, (i + 1) * n // steps
        c = 400 * (9000 / 400) ** (i / (steps - 1))
        out[a:b] = bandpass(noise[a:b], c * .7, min(c * 1.4, 20000))
    tone = np.sin(2 * np.pi * (180 + 520 * t ** 2) * t * dur) * .3
    return (out + tone) * (t ** 2.2) * level


def impact(dur=2.2, level=.6):
    n = int(dur * SR); t = np.arange(n) / SR
    sub = np.sin(2 * np.pi * (48 + 60 * np.exp(-t * 18)) * t) * env(n, .001, .5)
    crack = lowpass(rng.standard_normal(n), 6000) * env(n, .0005, .06) * .35
    return (sub + crack) * level


def chime(level=.16):
    return shimmer(1.4, 1760, level)


def place(mix, clip, frame, gain=1.0, pan=0.0):
    i = int(round(f2s(frame) * SR))
    j = min(len(mix), i + len(clip))
    if j <= i:
        return
    l, r = gain * (1 - max(0, pan)), gain * (1 + min(0, pan))
    mix[i:j, 0] += clip[: j - i] * l
    mix[i:j, 1] += clip[: j - i] * r


def main():
    mid_path = os.path.join(HERE, "score.mid")
    music_path = os.path.join(OUT, "music-raw.wav")
    write_midi(mid_path)
    subprocess.run(["fluidsynth", "-ni", "-q", "-g", "0.55", "-r", str(SR), "-F", music_path, SOUNDFONT, mid_path], check=True)
    sr, music = wavfile.read(music_path)
    assert sr == SR
    music = music.astype(np.float64) / 32768.0
    total = int(TL["durationInFrames"] / FPS * SR)
    mix = np.zeros((total, 2))
    n = min(total, len(music))
    mix[:n] += music[:n]

    # Sound design, placed on the picture's cues.
    place(mix, thunk(.6, 58), 0, .55, -.4)                    # the warm light is already on
    place(mix, tick(3200, .12, .5), CUE["coolOn"], 1, .5)     # the cool light pops on
    place(mix, tick(2600, .1, .45), CUE["tag"], 1, .1)        # tag
    place(mix, whoosh(.9, 500, 7000, True, 0.108), CUE["converge"] - 12, 1)
    place(mix, shimmer(1.6, 2600, .16), CUE["spark"], 1)
    place(mix, thunk(.5, 70), CUE["uncle"], .3, -.5)          # each word is lit
    place(mix, tick(3000, .1, .35), CUE["niece"], 1, .5)
    place(mix, thunk(.5, 66), CUE["laptop"], .3)
    place(mix, whoosh(1.4, 200, 1200, True, 0.06), CUE["lidOpen"], 1)
    place(mix, shimmer(1.2, 1980, .12), CUE["screenOn"], 1)
    place(mix, whoosh(.8, 600, 6000, False, 0.096), CUE["morph"] - 6, 1, -.4)
    place(mix, whoosh(2.0, 400, 2400, True, 0.048), CUE["orbLaunch"], 1)
    place(mix, chime(.07), CUE["orbLand"], 1, .4)
    for f in CUE["snaps"]:
        place(mix, tick(2800, .08, .3), f, 1, .4)
    place(mix, whoosh(1.0, 3000, 200, True, 0.132), CUE["dive"] - 10, 1)
    for i, f in enumerate(CUE["locks"]):
        place(mix, tick(1500 if i % 2 == 0 else 3100, .09, .32), f, 1, -.3 if i % 2 == 0 else .3)
    place(mix, riser(2.0, .2), CUE["riser"], 1)
    place(mix, impact(2.4, .45), CUE["reveal"], 1)
    place(mix, whoosh(1.6, 5000, 300, True, 0.096), CUE["pullback"], 1)
    place(mix, whoosh(1.2, 300, 3000, True, 0.06), CUE["sweep1"], 1, -.3)
    place(mix, whoosh(.7, 700, 7000, True, 0.096), CUE["clip2"] - 10, 1, .3)
    place(mix, whoosh(1.2, 300, 3000, True, 0.06), CUE["sweep2"], 1, .3)
    place(mix, whoosh(1.0, 400, 5000, True, 0.096), CUE["cross"], 1, -.5)
    place(mix, whoosh(1.0, 500, 6000, True, 0.096), CUE["cross"] + 3, 1, .5)
    place(mix, impact(3.0, .5), CUE["logo"], 1)
    place(mix, shimmer(2.4, 2350, .14), CUE["logo"], 1)

    # Gentle bus glue and a hard stop into silence at the end.
    mix = np.tanh(mix * 1.15) / np.tanh(1.15)
    s = int(f2s(CUE["silence"]) * SR)
    fade = np.linspace(1, 0, int(.5 * SR))
    mix[s - len(fade):s] *= fade[:, None]
    mix[s:] = 0
    raw = os.path.join(OUT, "mix-raw.wav")
    wavfile.write(raw, SR, (np.clip(mix, -1, 1) * 32767).astype(np.int16))
    final = os.path.join(OUT, "score.wav")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", str(SR), final], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", final, "-c:a", "libmp3lame", "-b:a", "320k", os.path.join(OUT, "score.mp3")], check=True)
    for p in (raw, music_path):
        os.remove(p)
    print("wrote", final, "and score.mp3")


if __name__ == "__main__":
    main()
