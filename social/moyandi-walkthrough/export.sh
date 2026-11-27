#!/usr/bin/env bash
# Upload-ready 9:16 exports from the 2160 x 3840 master (.renders/moyandi-walkthrough-2x-master.mp4).
# TikTok, Instagram, Facebook and YouTube always re-encode uploads; these files give their encoders as much clean detail as possible.
set -euo pipefail
cd "$(dirname "$0")"
master=.renders/moyandi-walkthrough-2x-master.mp4
mkdir -p exports

audio="loudnorm=I=-14.5:TP=-2:LRA=11,alimiter=limit=0.84:level=false"
common=(
  -c:v libx264 -preset slower -profile:v high -pix_fmt yuv420p -fps_mode cfr -r 30
  -g 60 -keyint_min 30 -sc_threshold 0
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv
  -af "$audio" -ar 48000 -ac 2 -c:a aac -b:a 320k -movflags +faststart
)
# Faint, fixed-seed film grain keeps the dark candlelit gradients from banding after the platform re-encodes them.
grain="noise=c0s=3:c0f=t:all_seed=20261127"

# 1. Best quality: full 2160 x 3840 (4K vertical). Upload from a computer, or to YouTube Shorts.
ffmpeg -y -loglevel error -i "$master" -vf "$grain" "${common[@]}" -crf 14 -maxrate 32M -bufsize 64M -level 5.1 \
  exports/moyandi-walkthrough-2160x3840.mp4

# 2. Phone upload: 1080 x 1920, scaled down from the 2x master so the shop's text stays sharper than a native 1080 render.
ffmpeg -y -loglevel error -i "$master" -vf "scale=1080:1920:flags=lanczos,noise=c0s=2:c0f=t:all_seed=20261127" "${common[@]}" -crf 14 -maxrate 20M -bufsize 40M -level 4.2 \
  exports/moyandi-walkthrough-1080x1920.mp4

for f in exports/*.mp4; do
  printf '%s  ' "$f"
  ffprobe -v error -show_entries format=size,bit_rate:stream=width,height -of compact=p=0:nk=1 "$f" | tr '\n' ' '
  echo
done
