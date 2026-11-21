import React from "react";
import { Img, interpolateColors, OffthreadVideo, Sequence, spring, staticFile } from "remotion";
import { progress } from "../lib";
import { C, FONT } from "../theme";

// The site's light logo (1200 x 200) shown at 0.75: icon at x 510-630, wordmark from x 664. The dot sits at (594, 460).
export const LOGO = { x: 510, y: 415, w: 900, h: 150, dot: { x: 594.4, y: 460 } };

/** The two lights end as one point that becomes the logo's dot; the mark and wordmark build around it. */
export const Logo: React.FC<{ frame: number; fps: number; start: number }> = ({ frame, fps, start }) => {
  if (frame < start - 2) return null;
  const sq = spring({ frame: frame - start - 3, fps, config: { damping: 14, stiffness: 160, mass: 0.8 } });
  const n = progress(frame, start + 6, 16);
  const dot = progress(frame, start, 18);
  const word = progress(frame, start + 12, 26);
  const iconScale = 120 / 64;
  const dotR = 3 * iconScale + (1 - dot) * 70;
  const dotColor = interpolateColors(dot, [0, 0.6, 1], ["#ffffff", "#e9f3fb", C.dot]);
  return <>
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <defs>
        <clipPath id="n-wipe"><rect x={0} y={64 - 64 * n} width={64} height={64 * n} /></clipPath>
        <filter id="dot-glow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      <g transform={`translate(${LOGO.x} ${LOGO.y + 15}) scale(${iconScale})`}>
        <g transform={`translate(32 32) scale(${Math.max(0.001, sq)}) translate(-32 -32)`} opacity={Math.min(1, sq * 1.5)}>
          <rect width={64} height={64} rx={15} fill="#354f61" />
        </g>
        <path d="M19 46V24h6v3c3-4 6-5 10-5 8 0 11 5 11 13v11h-6V35c0-5-2-7-6-7s-9 3-9 8v10z" fill="#f6f8fa" clipPath="url(#n-wipe)" />
      </g>
      <circle cx={LOGO.dot.x} cy={LOGO.dot.y} r={dotR * 3} fill="#ffffff" opacity={(1 - dot) * 0.8} filter="url(#dot-glow)" />
      <circle cx={LOGO.dot.x} cy={LOGO.dot.y} r={dotR} fill={dotColor} />
    </svg>
    <Img src={staticFile("site/brand/ntombii-logo-light.svg")} style={{ position: "absolute", left: LOGO.x, top: LOGO.y, width: LOGO.w, height: LOGO.h, clipPath: `inset(0 ${(1 - word) * 83}% 0 17.2%)` }} />
  </>;
};

/** A real project clip (rendered from the live site by scripts/motion), feathered into the stage. */
export const WorkClip: React.FC<{ file: string; from: number; duration: number; opacity: number }> = ({ file, from, duration, opacity }) => (
  <Sequence from={from} durationInFrames={duration} layout="none">
    <div style={{ position: "absolute", left: 640, top: 50, width: 1225, height: 980, opacity, WebkitMaskImage: "radial-gradient(ellipse 62% 64% at 50% 50%, #000 74%, transparent 100%)", maskImage: "radial-gradient(ellipse 62% 64% at 50% 50%, #000 74%, transparent 100%)" }}>
      <OffthreadVideo src={staticFile(`site/videos/work/${file}`)} muted style={{ width: "100%", height: "100%" }} />
    </div>
  </Sequence>
);

export const Label: React.FC<{ frame: number; start: number; end: number; name: string; detail: string }> = ({ frame, start, end, name, detail }) => {
  const inn = progress(frame, start, 18), out = progress(frame, end, 12);
  if (frame < start || out >= 1) return null;
  return <div style={{ position: "absolute", left: 100, top: 792, fontFamily: FONT, opacity: inn * (1 - out), transform: `translateY(${(1 - inn) * 20}px)` }}>
    <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${C.warm}, ${C.cool})`, marginBottom: 22, borderRadius: 2 }} />
    <div style={{ fontSize: 64, color: C.white, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{name}</div>
    <div style={{ fontSize: 46, color: C.pale, letterSpacing: "-0.01em", marginTop: 10 }}>{detail}</div>
  </div>;
};
