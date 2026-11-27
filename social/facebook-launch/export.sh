#!/usr/bin/env bash
# Upload-ready exports from the 2160 x 2700 master (.renders/facebook-launch-2x-master.mp4).
# Facebook and Instagram always re-encode uploads; these files give their encoder as much clean detail as possible.
set -euo pipefail
cd "$(dirname "$0")"
master=.renders/facebook-launch-2x-master.mp4
mkdir -p exports

audio="loudnorm=I=-14.5:TP=-2:LRA=11,alimiter=limit=0.84:level=false"
common=(
  -c:v libx264 -preset slower -profile:v high -pix_fmt yuv420p -fps_mode cfr -r 30
  -g 60 -keyint_min 30 -sc_threshold 0
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv
  -af "$audio" -ar 48000 -ac 2 -c:a aac -b:a 320k -movflags +faststart
)
# Faint, fixed-seed film grain keeps the navy gradients from banding after the platform re-encodes them.
grain="noise=c0s=3:c0f=t:all_seed=20261127"

# 1. Best quality: full 2160 x 2700. Upload from a computer (facebook.com or Meta Business Suite).
ffmpeg -y -loglevel error -i "$master" -vf "$grain" "${common[@]}" -crf 13 -maxrate 45M -bufsize 90M -level 5.1 \
  exports/ntombii-launch-2160x2700.mp4

# 2. Phone upload: 1080 x 1350, scaled down from the 2x master so it stays sharper than a native 1080 render.
ffmpeg -y -loglevel error -i "$master" -vf "scale=1080:1350:flags=lanczos,noise=c0s=2:c0f=t:all_seed=20261127" "${common[@]}" -crf 14 -maxrate 20M -bufsize 40M -level 4.2 \
  exports/ntombii-launch-1080x1350.mp4

for f in exports/*.mp4; do
  printf '%s  ' "$f"
  ffprobe -v error -show_entries format=size,bit_rate:stream=width,height -of compact=p=0:nk=1 "$f" | tr '\n' ' '
  echo
done
