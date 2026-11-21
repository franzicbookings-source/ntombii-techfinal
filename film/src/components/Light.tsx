import React from "react";
import { random } from "remotion";
import type { Pt } from "../lib";
import { H, W } from "../theme";

export type LightSpec = {
  id: string;
  color: string;
  source: Pt;
  target: Pt;
  radius: number;
  intensity: number;
  /** "floor" pools are flattened ellipses; "wall" pools are round spots. */
  shape?: "floor" | "wall";
  spread?: number;
  dust?: number;
};

/** One or more volumetric lights. Drawn with screen blending, so overlapping lights add up towards white. */
export const Lights: React.FC<{ frame: number; lights: LightSpec[] }> = ({ frame, lights }) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, mixBlendMode: "screen", overflow: "visible" }}>
    <defs>
      <filter id="beam-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="16" /></filter>
      <filter id="pool-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10" /></filter>
    </defs>
    {lights.map(light => <Light key={light.id} frame={frame} {...light} />)}
  </svg>
);

const Light: React.FC<LightSpec & { frame: number }> = ({ id, frame, color, source, target, radius, intensity, shape = "floor", spread = 16, dust = 60 }) => {
  if (intensity <= 0.001 || radius <= 0.5) return null;
  const dx = target.x - source.x, dy = target.y - source.y;
  const length = Math.hypot(dx, dy) || 1;
  const dir = { x: dx / length, y: dy / length };
  const perp = { x: -dir.y, y: dir.x };
  const ry = shape === "floor" ? radius * 0.36 : radius * 0.94;
  const edge = radius * 0.96;
  const cone = [
    [source.x + perp.x * spread, source.y + perp.y * spread],
    [target.x + perp.x * edge, target.y + perp.y * edge],
    [target.x - perp.x * edge, target.y - perp.y * edge],
    [source.x - perp.x * spread, source.y - perp.y * spread],
  ].map(p => p.join(",")).join(" ");
  const motes = Array.from({ length: dust }, (_, i) => {
    const t0 = 0.08 + random(`${id}-t-${i}`) * 0.86;
    const u0 = random(`${id}-u-${i}`) * 2 - 1;
    const phase = random(`${id}-p-${i}`) * Math.PI * 2;
    const t = t0 + 0.03 * Math.sin(frame * 0.011 + phase);
    const u = clampU(u0 + 0.18 * Math.sin(frame * 0.017 + phase * 1.7));
    const half = spread + (edge - spread) * t;
    const x = source.x + dir.x * length * t + perp.x * u * half;
    const y = source.y + dir.y * length * t + perp.y * u * half;
    const twinkle = 0.55 + 0.45 * Math.sin(frame * 0.09 + phase * 3);
    const size = 0.8 + random(`${id}-s-${i}`) * 1.9;
    return { x, y, size, alpha: intensity * (1 - Math.abs(u)) ** 0.6 * twinkle * (0.25 + 0.75 * t) };
  });
  return <g>
    <defs>
      <linearGradient id={`${id}-cone`} gradientUnits="userSpaceOnUse" x1={source.x} y1={source.y} x2={target.x} y2={target.y}>
        <stop offset="0" stopColor={color} stopOpacity={0.62 * intensity} />
        <stop offset="0.7" stopColor={color} stopOpacity={0.24 * intensity} />
        <stop offset="1" stopColor={color} stopOpacity={0.16 * intensity} />
      </linearGradient>
      <radialGradient id={`${id}-pool`}>
        <stop offset="0" stopColor={color} stopOpacity={0.95 * intensity} />
        <stop offset="0.55" stopColor={color} stopOpacity={0.5 * intensity} />
        <stop offset="1" stopColor={color} stopOpacity={0} />
      </radialGradient>
    </defs>
    <polygon points={cone} fill={`url(#${id}-cone)`} filter="url(#beam-blur)" />
    <ellipse cx={target.x} cy={target.y} rx={radius * 1.05} ry={ry * 1.05} fill={`url(#${id}-pool)`} filter="url(#pool-blur)" />
    <ellipse cx={target.x} cy={target.y} rx={radius * 0.38} ry={ry * 0.38} fill={color} opacity={0.34 * intensity} filter="url(#pool-blur)" />
    {motes.map((m, i) => <circle key={i} cx={m.x} cy={m.y} r={m.size} fill={color} opacity={Math.max(0, m.alpha)} />)}
  </g>;
};

const clampU = (u: number) => Math.max(-0.98, Math.min(0.98, u));
