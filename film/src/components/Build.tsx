import React from "react";
import { Img, interpolate, spring, staticFile } from "remotion";
import { easeInOut, progress } from "../lib";
import { C } from "../theme";

/** The laptop screen at full size. It stays the constant frame while the scale changes around it. */
export const FRAME = { x: 140, y: 79, w: 1640, h: 922 };
const S = FRAME.w / 1440; // the real homepage screenshot is 1440 wide; its top 810 px fill the frame
const X = (x: number) => FRAME.x + x * S;
const Y = (y: number) => FRAME.y + y * S;

type Part = { voice: "warm" | "cool"; draw: (k: number) => React.ReactNode };

// Wireframe of the Moyandi Scents homepage, in screenshot pixels. Warm draws structure, cool fills design.
const PARTS: Part[] = [
  { voice: "warm", draw: k => <Line x1={0} y1={72} x2={1440} y2={72} k={k} /> },
  { voice: "cool", draw: () => <><Box x={612} y={26} w={216} h={20} r={6} o={0.9} /><Box x={56} y={30} w={250} h={12} r={6} o={0.6} /><Box x={1268} y={26} w={112} h={22} r={11} o={0.6} /></> },
  { voice: "warm", draw: k => <Rect x={24} y={96} w={1392} h={690} k={k} /> },
  { voice: "cool", draw: () => <><Box x={24} y={96} w={1392} h={690} r={10} o={0.12} />{[[380, 470, 220, 300], [640, 330, 120, 440], [980, 230, 120, 540], [1160, 520, 70, 170]].map(([x, y, w, h], i) => <Box key={i} x={x} y={y} w={w} h={h} r={i === 2 ? 26 : 18} o={0.34} />)}{[0, 1, 2, 3, 4].map(i => <line key={i} x1={X(1040)} y1={Y(230)} x2={X(990 + i * 30)} y2={Y(60)} stroke={C.cool} strokeOpacity={0.45} strokeWidth={3} />)}</> },
  { voice: "warm", draw: k => <><Rect x={86} y={184} w={214} h={50} k={k} /><Rect x={86} y={240} w={214} h={50} k={k} /></> },
  { voice: "cool", draw: () => <><Box x={92} y={192} w={196} h={34} r={6} o={0.85} /><Box x={92} y={248} w={170} h={34} r={6} o={0.85} /></> },
  { voice: "warm", draw: k => <Rect x={86} y={322} w={190} h={40} k={k} /> },
  { voice: "cool", draw: () => <Box x={86} y={322} w={190} h={40} r={4} o={0.95} /> },
  { voice: "warm", draw: k => <>{[360, 720, 1080].map(x => <Line key={x} x1={x} y1={96} x2={x} y2={786} k={k} dash />)}</> },
  { voice: "cool", draw: () => <>{[0, 1, 2, 3].map(i => <circle key={i} cx={X(100 + i * 44)} cy={Y(742)} r={14} fill={C.cool} opacity={0.4 + i * 0.15} />)}</> },
  { voice: "warm", draw: k => <><Line x1={0} y1={184} x2={1440} y2={184} k={k} dash /><Line x1={0} y1={362} x2={1440} y2={362} k={k} dash /></> },
  { voice: "cool", draw: () => <>{[56, 118, 176, 236].map(x => <Box key={x} x={x} y={28} w={x === 236 ? 70 : 50} h={16} r={8} o={0.95} />)}</> },
];

const Line: React.FC<{ x1: number; y1: number; x2: number; y2: number; k: number; dash?: boolean }> = ({ x1, y1, x2, y2, k, dash }) => {
  const len = Math.hypot(X(x2) - X(x1), Y(y2) - Y(y1));
  return <line x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} stroke={C.warm} strokeWidth={dash ? 1.6 : 2.6} strokeOpacity={dash ? 0.55 : 0.95} strokeDasharray={dash ? "10 10" : `${len} ${len}`} strokeDashoffset={dash ? 0 : len * (1 - k)} style={dash ? { clipPath: `inset(0 ${(1 - k) * 100}% 0 0)` } : undefined} />;
};
const Rect: React.FC<{ x: number; y: number; w: number; h: number; k: number }> = ({ x, y, w, h, k }) => {
  const len = 2 * (w + h) * S;
  return <rect x={X(x)} y={Y(y)} width={w * S} height={h * S} rx={6} fill="none" stroke={C.warm} strokeWidth={2.6} strokeDasharray={`${len} ${len}`} strokeDashoffset={len * (1 - k)} />;
};
const Box: React.FC<{ x: number; y: number; w: number; h: number; r: number; o: number }> = ({ x, y, w, h, r, o }) => <rect x={X(x)} y={Y(y)} width={w * S} height={h * S} rx={r} fill={C.cool} opacity={o} />;

/** Wireframe build, the reveal of the real site and the pull-back into its 3D clip. */
export const BuildCanvas: React.FC<{ frame: number; fps: number; locks: number[]; reveal: number; pullback: number; clip: number; target: { x: number; y: number; w: number } }> = ({ frame, fps, locks, reveal, pullback, clip, target }) => {
  const enter = progress(frame, locks[0] - 16, 16);
  const push = 1 + 0.025 * progress(frame, locks[0], reveal - locks[0], easeInOut);
  const flash = interpolate(frame, [reveal - 2, reveal, reveal + 14], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const site = progress(frame, reveal - 2, 6);
  const wire = 1 - progress(frame, reveal + 6, 22);
  const back = progress(frame, pullback, clip - pullback - 4, easeInOut);
  const handOff = 1 - progress(frame, clip - 18, 18);
  const cx = FRAME.x + FRAME.w / 2, cy = FRAME.y + FRAME.h / 2;
  const scale = interpolate(back, [0, 1], [push, target.w / FRAME.w]);
  const tx = interpolate(back, [0, 1], [0, target.x - cx]);
  const ty = interpolate(back, [0, 1], [0, target.y - cy]);
  const rotY = interpolate(back, [0, 1], [0, -16]);
  const rotX = interpolate(back, [0, 1], [0, 9]);
  return <div style={{ position: "absolute", inset: 0, perspective: 2400, opacity: enter * handOff }}>
    <div style={{ position: "absolute", inset: 0, transformOrigin: `${cx}px ${cy}px`, transform: `translate(${tx}px, ${ty}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})` }}>
      <div style={{ position: "absolute", left: FRAME.x - 14, top: FRAME.y - 14, width: FRAME.w + 28, height: FRAME.h + 28, borderRadius: 26, background: "#1d2830", border: "2px solid #3d4f5c", boxShadow: `0 40px 120px rgba(0,0,0,0.55), 0 0 ${140 * site}px rgba(156,203,242,${0.25 * site})` }} />
      <div style={{ position: "absolute", left: FRAME.x, top: FRAME.y, width: FRAME.w, height: FRAME.h, borderRadius: 10, overflow: "hidden", background: "#0f161c" }}>
        <svg width={FRAME.w} height={FRAME.h} style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
          {Array.from({ length: 33 }, (_, i) => <line key={i} x1={i * 52} y1={0} x2={i * 52} y2={FRAME.h} stroke={C.slate} strokeWidth={1} opacity={0.35} />)}
          {Array.from({ length: 19 }, (_, i) => <line key={i} x1={0} y1={i * 52} x2={FRAME.w} y2={i * 52} stroke={C.slate} strokeWidth={1} opacity={0.35} />)}
        </svg>
        <Img src={staticFile("site/images/work-new/moyandi-scents-desktop.webp")} style={{ position: "absolute", left: 0, top: 0, width: FRAME.w, height: 1000 * S, opacity: site }} />
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: wire, mixBlendMode: frame >= reveal ? "screen" : "normal", filter: "drop-shadow(0 0 6px rgba(255,207,150,0.35))" }}>
        {PARTS.map((part, i) => {
          const at = locks[i];
          if (frame < at - 2) return null;
          if (part.voice === "warm") return <g key={i}>{part.draw(progress(frame, at - 2, 14))}</g>;
          const s = spring({ frame: frame - at + 2, fps, config: { damping: 11, stiffness: 190, mass: 0.6 } });
          return <g key={i} opacity={Math.min(1, s * 1.4)} style={{ transformOrigin: `${cx}px ${cy}px`, transform: `scale(${0.94 + 0.06 * s})` }}>{part.draw(1)}</g>;
        })}
      </svg>
      <div style={{ position: "absolute", inset: 0, background: "#ffffff", opacity: flash * 0.85, mixBlendMode: "screen" }} />
    </div>
  </div>;
};
