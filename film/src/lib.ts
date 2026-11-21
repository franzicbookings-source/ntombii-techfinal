import { Easing, interpolate, random } from "remotion";

export type Pt = { x: number; y: number };
export type Key = [frame: number, x: number, y: number];

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const ease = Easing.bezier(0.2, 0.7, 0.2, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** 0→1 over [start, start + duration] with an ease. */
export function progress(frame: number, start: number, duration: number, easing = ease) {
  return interpolate(frame, [start, start + duration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });
}

/** Position along keyframes. `bounce` adds a playful overshoot (the cool light), smooth otherwise (the warm light). */
export function path(frame: number, keys: Key[], bounce = false): Pt {
  if (frame <= keys[0][0]) return { x: keys[0][1], y: keys[0][2] };
  for (let i = 0; i < keys.length - 1; i++) {
    const [f0, x0, y0] = keys[i];
    const [f1, x1, y1] = keys[i + 1];
    if (frame <= f1) {
      const t = (frame - f0) / (f1 - f0);
      const k = bounce ? backOut(t) : easeInOut(t);
      return { x: x0 + (x1 - x0) * k, y: y0 + (y1 - y0) * k };
    }
  }
  const last = keys[keys.length - 1];
  return { x: last[1], y: last[2] };
}

function backOut(t: number) {
  const s = 1.9;
  const u = t - 1;
  return u * u * ((s + 1) * u + s) + 1;
}

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const seeded = (seed: string) => random(seed);
