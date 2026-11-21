import React from "react";
import { interpolate, interpolateColors, spring } from "remotion";
import { easeInOut, mix, progress, type Pt } from "../lib";
import { C, FONT } from "../theme";

/** A laptop drawn around its hinge. `open` lifts the lid, `screen` turns the display on; the rims catch both lights. */
export const Laptop: React.FC<{ x: number; y: number; scale?: number; open: number; screen: number; warm?: number; cool?: number; opacity?: number }> = ({ x, y, scale = 1, open, screen, warm = 1, cool = 1, opacity = 1 }) => {
  const lid = Math.max(0.035, open);
  return <svg width={900} height={560} viewBox="-450 -470 900 560" style={{ position: "absolute", left: x - 450 * scale, top: y - 470 * scale, width: 900 * scale, height: 560 * scale, opacity, overflow: "visible" }}>
    <defs>
      <linearGradient id="deck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#33434f" /><stop offset="1" stopColor="#161e25" /></linearGradient>
      <linearGradient id="screen-on" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e9f3fb" /><stop offset="1" stopColor="#bcd8ee" /></linearGradient>
      <linearGradient id="rim-warm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={C.warm} stopOpacity={0.7 * warm} /><stop offset="0.45" stopColor={C.warm} stopOpacity={0} /></linearGradient>
      <linearGradient id="rim-cool" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor={C.cool} stopOpacity={0.7 * cool} /><stop offset="0.45" stopColor={C.cool} stopOpacity={0} /></linearGradient>
      <filter id="screen-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="40" /></filter>
    </defs>
    <ellipse cx={0} cy={78} rx={430} ry={26} fill="#000" opacity={0.45} style={{ filter: "blur(12px)" }} />
    <g transform={`scale(1 ${lid})`}>
      <rect x={-330} y={-400} width={660} height={400} rx={20} fill={C.cool} opacity={0.5 * screen} filter="url(#screen-glow)" />
      <rect x={-312} y={-392} width={624} height={392} rx={18} fill="#1d2830" stroke="#3d4f5c" strokeWidth={2} />
      <rect x={-296} y={-376} width={592} height={362} rx={6} fill="#0a1015" />
      <rect x={-296} y={-376} width={592} height={362} rx={6} fill="url(#screen-on)" opacity={screen} />
      <g opacity={screen * 0.8}>
        <rect x={-272} y={-352} width={544} height={14} rx={7} fill={C.dot} opacity={0.55} />
        <rect x={-272} y={-322} width={330} height={150} rx={10} fill={C.slate} opacity={0.32} />
        <rect x={74} y={-322} width={198} height={70} rx={10} fill={C.blue} opacity={0.3} />
        <rect x={74} y={-242} width={198} height={70} rx={10} fill={C.blue} opacity={0.22} />
        {[0, 1, 2].map(i => <rect key={i} x={-272 + i * 186} y={-158} width={172} height={110} rx={10} fill={C.slate} opacity={0.2} />)}
      </g>
      <rect x={-312} y={-392} width={624} height={392} rx={18} fill="url(#rim-warm)" opacity={0.6} />
      <rect x={-312} y={-392} width={624} height={392} rx={18} fill="url(#rim-cool)" opacity={0.6} />
    </g>
    <polygon points="-318,0 318,0 372,62 -372,62" fill="url(#deck)" stroke="#475a68" strokeWidth={1.5} />
    <polygon points="-318,0 318,0 372,62 -372,62" fill="url(#rim-warm)" opacity={0.5} />
    <polygon points="-318,0 318,0 372,62 -372,62" fill="url(#rim-cool)" opacity={0.5} />
    <polygon points="-74,30 74,30 82,54 -82,54" fill="#273440" stroke="#3e505d" strokeWidth={1} />
    <rect x={-372} y={62} width={744} height={8} rx={4} fill="#0f151a" />
  </svg>;
};

/** A ticket stub that becomes a browser window. m: 0 = ticket, 1 = browser. */
export const TicketToBrowser: React.FC<{ cx: number; cy: number; m: number; scale?: number; opacity?: number; rotate?: number }> = ({ cx, cy, m, scale = 1, opacity = 1, rotate = 0 }) => {
  const k = easeInOut(Math.min(1, Math.max(0, m)));
  const w = mix(560, 720, k), h = mix(236, 450, k), r = mix(16, 14, k), notch = mix(28, 0, k);
  const x0 = -w / 2, x1 = w / 2, y0 = -h / 2, y1 = h / 2;
  const shape = `M ${x0 + r} ${y0} H ${x1 - r} A ${r} ${r} 0 0 1 ${x1} ${y0 + r} V ${-notch} A ${notch} ${notch} 0 0 0 ${x1} ${notch} V ${y1 - r} A ${r} ${r} 0 0 1 ${x1 - r} ${y1} H ${x0 + r} A ${r} ${r} 0 0 1 ${x0} ${y1 - r} V ${notch} A ${notch} ${notch} 0 0 0 ${x0} ${-notch} V ${y0 + r} A ${r} ${r} 0 0 1 ${x0 + r} ${y0} Z`;
  const paper = interpolateColors(k, [0, 1], ["#f4e2c6", "#eef3f6"]);
  const ticket = Math.max(0, 1 - k * 2.2);
  const browser = Math.max(0, (k - 0.45) / 0.55);
  const perfX = mix(x0 + w * 0.72, x0 + 20, k);
  return <svg width={900} height={700} viewBox="-450 -350 900 700" style={{ position: "absolute", left: cx - 450 * scale, top: cy - 350 * scale, width: 900 * scale, height: 700 * scale, opacity, transform: `rotate(${rotate}deg)`, overflow: "visible" }}>
    <ellipse cx={0} cy={h / 2 + 40} rx={w * 0.55} ry={22} fill="#000" opacity={0.4} style={{ filter: "blur(14px)" }} />
    <path d={shape} fill={paper} />
    <g opacity={ticket}>
      <line x1={perfX} x2={perfX} y1={y0 + 14} y2={y1 - 14} stroke="#b08b62" strokeWidth={3} strokeDasharray="2 9" strokeLinecap="round" />
      <text x={x0 + 46} y={-12} fontFamily={FONT} fontSize={58} letterSpacing={6} fill="#6b4524">ADMIT ONE</text>
      <text x={x0 + 48} y={38} fontFamily={FONT} fontSize={22} letterSpacing={8} fill="#9a7148">LIVE · BOOKED</text>
      <text transform={`translate(${perfX + (x1 - perfX) / 2 + 9} 0) rotate(-90)`} textAnchor="middle" fontFamily={FONT} fontSize={24} letterSpacing={7} fill="#9a7148">STAGE</text>
    </g>
    <g opacity={browser}>
      <path d={`M ${x0} ${y0 + 44} H ${x1}`} stroke="#cfd9e0" strokeWidth={2} />
      {[0, 1, 2].map(i => <circle key={i} cx={x0 + 24 + i * 20} cy={y0 + 22} r={6} fill={["#c9d4dc", "#d6dee4", "#e0e6ea"][i]} />)}
      <rect x={-140} y={y0 + 12} width={280} height={20} rx={10} fill="#dfe6eb" />
      <rect x={x0 + 34} y={y0 + 74} width={w * 0.42} height={22} rx={6} fill={C.slate} opacity={0.75} />
      <rect x={x0 + 34} y={y0 + 110} width={w * 0.3} height={14} rx={6} fill={C.blue} opacity={0.5} />
      <rect x={x0 + 34} y={y0 + 146} width={110} height={34} rx={17} fill={C.slate} opacity={0.85} />
      <rect x={x0 + w * 0.52} y={y0 + 70} width={w * 0.42} height={h * 0.42} rx={10} fill={C.blue} opacity={0.28} />
      {[0, 1, 2].map(i => <rect key={i} x={x0 + 34 + i * ((w - 68) / 3)} y={y1 - 130} width={(w - 68) / 3 - 14} height={100} rx={10} fill={C.slate} opacity={0.16} />)}
    </g>
  </svg>;
};

/** The handoff: a glowing orb arcs from one light to the other, changing colour on the way. */
export const Orb: React.FC<{ frame: number; from: Pt; to: Pt; launch: number; land: number }> = ({ frame, from, to, launch, land }) => {
  if (frame < launch - 8 || frame > land + 26) return null;
  const at = (t: number) => {
    const c = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 300 };
    const u = 1 - t;
    return { x: u * u * from.x + 2 * u * t * c.x + t * t * to.x, y: u * u * from.y + 2 * u * t * c.y + t * t * to.y };
  };
  const t = progress(frame, launch, land - launch, easeInOut);
  const grow = progress(frame, launch - 8, 10);
  const pop = progress(frame, land, 24);
  const color = interpolateColors(t, [0, 0.5, 1], [C.warm, "#ffffff", C.cool]);
  const p = at(t);
  const trail = Array.from({ length: 14 }, (_, i) => ({ ...at(Math.max(0, t - (i + 1) * 0.018)), a: (1 - i / 14) * 0.5 }));
  return <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, mixBlendMode: "screen", overflow: "visible" }}>
    <defs><filter id="orb-blur" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="14" /></filter></defs>
    {frame < land + 2 && trail.map((q, i) => <circle key={i} cx={q.x} cy={q.y} r={12 - i * 0.6} fill={color} opacity={q.a * (t > 0 ? 1 : 0)} filter="url(#orb-blur)" />)}
    {frame < land + 4 && <><circle cx={p.x} cy={p.y} r={46 * grow} fill={color} opacity={0.55} filter="url(#orb-blur)" /><circle cx={p.x} cy={p.y} r={13 * grow} fill="#ffffff" /></>}
    {pop > 0 && pop < 1 && <circle cx={to.x} cy={to.y} r={40 + pop * 260} fill="none" stroke={C.cool} strokeWidth={6 * (1 - pop)} opacity={1 - pop} />}
  </svg>;
};

const BLOCKS: [number, number, number, number][] = [
  [-200, -156, 400, 30],
  [-200, -108, 400, 150],
  [-200, 62, 124, 96],
  [-62, 62, 124, 96],
  [76, 62, 124, 96],
];

/** Layout blocks that drop and snap into a page, one per beat. */
export const LayoutBlocks: React.FC<{ frame: number; fps: number; cx: number; cy: number; snaps: number[]; scale?: number; opacity?: number }> = ({ frame, fps, cx, cy, snaps, scale = 1, opacity = 1 }) => (
  <svg width={600} height={500} viewBox="-300 -250 600 500" style={{ position: "absolute", left: cx - 300 * scale, top: cy - 250 * scale, width: 600 * scale, height: 500 * scale, opacity, overflow: "visible" }}>
    {BLOCKS.map(([x, y, w, h], i) => {
      const s = spring({ frame: frame - snaps[i] + 6, fps, config: { damping: 9, stiffness: 170, mass: 0.6 } });
      if (frame < snaps[i] - 6) return null;
      const dy = interpolate(s, [0, 1], [-80, 0]);
      return <g key={i} transform={`translate(0 ${dy}) translate(${x + w / 2} ${y + h / 2}) scale(${0.85 + 0.15 * s}) translate(${-(x + w / 2)} ${-(y + h / 2)})`} opacity={Math.min(1, s * 1.6)}>
        <rect x={x} y={y} width={w} height={h} rx={i === 0 ? 15 : 12} fill="#d9ebf8" opacity={0.9} />
        {i === 1 && <><rect x={x + 22} y={y + 30} width={180} height={18} rx={6} fill={C.slate} opacity={0.7} /><rect x={x + 22} y={y + 60} width={130} height={12} rx={6} fill={C.blue} opacity={0.5} /><rect x={x + 22} y={y + 92} width={84} height={28} rx={14} fill={C.slate} opacity={0.8} /><circle cx={x + 310} cy={y + 75} r={46} fill={C.cool} opacity={0.65} /></>}
        {i >= 2 && <><rect x={x + 12} y={y + 12} width={w - 24} height={44} rx={8} fill={C.cool} opacity={0.55} /><rect x={x + 12} y={y + 66} width={w * 0.5} height={10} rx={5} fill={C.slate} opacity={0.5} /></>}
        {i === 0 && <><circle cx={x + 20} cy={y + 15} r={6} fill={C.slate} /><rect x={x + 250} y={y + 10} width={130} height={10} rx={5} fill={C.blue} opacity={0.6} /></>}
      </g>;
    })}
  </svg>
);
