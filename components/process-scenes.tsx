import type { CSSProperties } from "react";
import "./process-scenes.css";

/**
 * Small animated scenes for the three homepage process steps. Decorative: each step's heading and text carry the meaning.
 * Each plays once when its card scrolls into view (`li.visible`); without motion they show their finished state.
 */
export type ProcessSceneKind = "talk" | "build" | "launch";

function Talk() {
  return <>
    <g className="scene-pop scene-from-left" style={{ "--d": ".1s" } as CSSProperties}>
      <path d="M22 26a10 10 0 0 1 10-10h104a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10H34l-12 8Z" fill="#fff" />
      <g className="scene-typing">
        <circle cx="44" cy="37" r="3.2" /><circle cx="56" cy="37" r="3.2" /><circle cx="68" cy="37" r="3.2" />
      </g>
      <rect className="scene-grow" style={{ "--d": "1.15s" } as CSSProperties} x="34" y="28" width="96" height="6" rx="3" fill="#c5d2db" />
      <rect className="scene-grow" style={{ "--d": "1.3s" } as CSSProperties} x="34" y="41" width="62" height="6" rx="3" fill="#c5d2db" />
    </g>
    <g className="scene-pop scene-from-right" style={{ "--d": "1.65s" } as CSSProperties}>
      <path d="M218 82a10 10 0 0 0-10-10H104a10 10 0 0 0-10 10v22a10 10 0 0 0 10 10h102l12 8Z" fill="var(--blue)" />
      <rect className="scene-grow" style={{ "--d": "1.9s" } as CSSProperties} x="106" y="84" width="84" height="6" rx="3" fill="#ffffffb3" />
      <rect className="scene-grow" style={{ "--d": "2.05s" } as CSSProperties} x="106" y="97" width="52" height="6" rx="3" fill="#ffffffb3" />
      <path className="scene-draw scene-ticks" style={{ "--d": "2.35s" } as CSSProperties} pathLength="1" d="M175 100l3 3 6-7M182 103l6-7" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </>;
}

function Build() {
  return <>
    <g className="scene-pop" style={{ "--d": "0s" } as CSSProperties}>
      <rect x="40" y="14" width="168" height="112" rx="9" fill="#fff" />
      <path d="M40 31h168" stroke="#dce4ea" />
      <circle cx="51" cy="22.5" r="2.4" fill="#c5d2db" /><circle cx="59" cy="22.5" r="2.4" fill="#c5d2db" /><circle cx="67" cy="22.5" r="2.4" fill="#c5d2db" />
    </g>
    <g className="scene-swatches">
      <circle className="scene-pop" style={{ "--d": ".25s" } as CSSProperties} cx="22" cy="44" r="7" fill="var(--navy, #202c36)" />
      <circle className="scene-pop" style={{ "--d": ".35s" } as CSSProperties} cx="22" cy="64" r="7" fill="var(--blue)" />
      <circle className="scene-pop" style={{ "--d": ".45s" } as CSSProperties} cx="22" cy="84" r="7" fill="#d9c7a8" />
    </g>
    <rect className="scene-grow" style={{ "--d": ".55s" } as CSSProperties} x="52" y="40" width="30" height="5" rx="2.5" fill="var(--ink)" />
    <rect className="scene-grow" style={{ "--d": ".6s" } as CSSProperties} x="166" y="40" width="30" height="5" rx="2.5" fill="#c5d2db" />
    <rect className="scene-grow" style={{ "--d": ".75s" } as CSSProperties} x="52" y="54" width="68" height="8" rx="3" fill="var(--ink)" />
    <rect className="scene-grow" style={{ "--d": ".88s" } as CSSProperties} x="52" y="67" width="52" height="5" rx="2.5" fill="#c5d2db" />
    <g className="scene-reveal" style={{ "--d": "1s" } as CSSProperties}>
      <rect x="130" y="52" width="66" height="42" rx="5" fill="#cfdde6" />
      <path d="M130 86l17-15 12 10 9-7 28 22v-1a5 5 0 0 1-5 5h-56a5 5 0 0 1-5-5Z" fill="#9db6c6" />
      <circle cx="181" cy="64" r="5" fill="#fff" />
    </g>
    <rect className="scene-pop scene-button" style={{ "--d": "1.2s" } as CSSProperties} x="52" y="80" width="36" height="12" rx="6" fill="var(--blue)" />
    <rect className="scene-rise" style={{ "--d": "1.35s" } as CSSProperties} x="52" y="102" width="44" height="16" rx="3.5" fill="#edf2f5" />
    <rect className="scene-rise" style={{ "--d": "1.45s" } as CSSProperties} x="102" y="102" width="44" height="16" rx="3.5" fill="#edf2f5" />
    <rect className="scene-rise" style={{ "--d": "1.55s" } as CSSProperties} x="152" y="102" width="44" height="16" rx="3.5" fill="#edf2f5" />
    <path className="scene-cursor" d="M0 0v15l4.2-4 3.1 7 2.8-1.3-3-6.8H13Z" fill="var(--ink)" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
  </>;
}

function Launch() {
  return <>
    <g className="scene-pop" style={{ "--d": "0s" } as CSSProperties}>
      <rect x="30" y="12" width="64" height="116" rx="11" fill="#fff" />
      <rect x="51" y="18" width="22" height="5" rx="2.5" fill="#dce4ea" />
      <rect x="38" y="30" width="48" height="30" rx="4" fill="#cfdde6" />
      <rect x="38" y="66" width="38" height="5" rx="2.5" fill="var(--ink)" />
      <rect x="38" y="76" width="44" height="4" rx="2" fill="#c5d2db" />
      <rect x="38" y="85" width="30" height="4" rx="2" fill="#c5d2db" />
      <rect x="38" y="96" width="26" height="9" rx="4.5" fill="var(--blue)" />
    </g>
    {[30, 58, 86].map((y, i) => <g key={y} className="scene-check" style={{ "--d": `${0.55 + i * 0.4}s` } as CSSProperties}>
      <circle className="scene-check-dot" cx="122" cy={y} r="9" />
      <path className="scene-draw" style={{ "--d": `${0.7 + i * 0.4}s` } as CSSProperties} pathLength="1" d={`M117.5 ${y}l3 3 6-6.5`} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="140" y={y - 6} width={[72, 58, 66][i]} height="5" rx="2.5" fill="#c5d2db" />
      <rect x="140" y={y + 2} width={[44, 50, 36][i]} height="4" rx="2" fill="#dce4ea" />
    </g>)}
    <g className="scene-pop scene-from-left" style={{ "--d": "1.95s" } as CSSProperties}>
      <rect x="113" y="106" width="98" height="22" rx="11" fill="#e2f3e8" />
      <circle className="scene-live-ring" cx="127" cy="117" r="4.5" fill="none" stroke="#2f9e5b" strokeWidth="1.5" />
      <circle cx="127" cy="117" r="4.5" fill="#2f9e5b" />
      <rect x="139" y="114.5" width="56" height="5" rx="2.5" fill="#9fd3b2" />
    </g>
  </>;
}

const scenes = { talk: Talk, build: Build, launch: Launch };

export function ProcessScene({ kind }: { kind: ProcessSceneKind }) {
  const Scene = scenes[kind];
  return <div className={`process-scene process-scene-${kind}`} aria-hidden="true">
    <svg viewBox="0 0 240 140" focusable="false"><Scene /></svg>
  </div>;
}
