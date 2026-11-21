import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import { progress } from "../lib";
import { C, FONT, H, W } from "../theme";

/** The dark studio: navy gradient, the site's atmosphere texture as haze, a floor plane, grain and vignette. */
export const Stage: React.FC<{ frame: number; floor?: number; haze?: number; children?: React.ReactNode }> = ({ frame, floor = 1, haze = 1, children }) => (
  <AbsoluteFill style={{ background: `radial-gradient(120% 95% at 50% 42%, ${C.bgCenter} 0%, ${C.bgMid} 45%, ${C.bgEdge} 100%)`, overflow: "hidden" }}>
    <Img src={staticFile("site/images/hero-atmosphere.webp")} style={{ position: "absolute", left: -80, top: -60, width: W + 160, height: H + 120, objectFit: "cover", opacity: 0.16 * haze, mixBlendMode: "screen", transform: `translateX(${-frame * 0.04}px) scale(${1.04 + frame * 0.00002})` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 640, bottom: 0, opacity: floor, background: "linear-gradient(180deg, rgba(8,12,15,0) 0%, rgba(8,12,15,0.55) 30%, rgba(6,9,12,0.85) 100%)" }} />
    {children}
  </AbsoluteFill>
);

/** Film grain and vignette, on top of everything. Grain is deterministic per frame. */
export const Finish: React.FC<{ frame: number }> = ({ frame }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <svg width={W / 2} height={H / 2} style={{ position: "absolute", inset: 0, width: W, height: H, opacity: 0.07, mixBlendMode: "overlay" }}>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={frame % 12} /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(110% 90% at 50% 48%, rgba(0,0,0,0) 58%, rgba(3,6,8,0.55) 100%)" }} />
  </AbsoluteFill>
);

type WordsProps = { text: string; frame: number; start: number; end?: number; size: number; color: string; x: number; y: number; align?: "left" | "center" | "right"; width?: number; stagger?: number; lineHeight?: number; weight?: number; letterSpacing?: string };

/** Words rise out of their own line, one after another (the same reveal the website uses). */
export const Words: React.FC<WordsProps> = ({ text, frame, start, end, size, color, x, y, align = "left", width = 1600, stagger = 3, lineHeight = 1.12, letterSpacing = "-0.03em" }) => {
  const out = end === undefined ? 0 : progress(frame, end, 12);
  if (frame < start - 1 || out >= 1) return null;
  const left = align === "left" ? x : align === "center" ? x - width / 2 : x - width;
  return <div style={{ position: "absolute", left, top: y, width, textAlign: align, fontFamily: FONT, fontSize: size, lineHeight, letterSpacing, color, opacity: 1 - out, transform: `translateY(${-out * 18}px)` }}>
    {text.split(" ").map((word, i) => {
      const p = progress(frame, start + i * stagger, 22);
      return <React.Fragment key={i}>{i > 0 ? " " : null}<span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: size * 0.14, marginBottom: -size * 0.14 }}>
        <span style={{ display: "inline-block", transform: `translateY(${(1 - p) * 105}%)`, opacity: interpolate(p, [0, 0.3, 1], [0, 1, 1]) }}>{word}</span>
      </span></React.Fragment>;
    })}
  </div>;
};
