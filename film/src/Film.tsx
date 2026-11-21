import React from "react";
import { AbsoluteFill, cancelRender, continueRender, delayRender, Html5Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import timeline from "./timeline.json";
import { easeInOut, mix, path, progress, type Key, type Pt } from "./lib";
import { C } from "./theme";
import { Finish, Stage, Words } from "./components/Stage";
import { Lights, type LightSpec } from "./components/Light";
import { Laptop, LayoutBlocks, Orb, TicketToBrowser } from "./components/Objects";
import { BuildCanvas } from "./components/Build";
import { Label, Logo, LOGO, WorkClip } from "./components/Logo";

const Q = timeline.cues;

// Aeonik, the website's typeface, loaded before any frame renders.
const fontHandle = delayRender("Loading Aeonik");
const aeonik = new FontFace("Aeonik", `url('${staticFile("site/fonts/aeonik-regular.woff")}') format('woff')`);
aeonik.load().then(font => { document.fonts.add(font); continueRender(fontHandle); }).catch(error => cancelRender(error));

const WARM_SRC: Pt = { x: -180, y: -260 };
const COOL_SRC: Pt = { x: 2110, y: -240 };
const LAPTOP: Pt = { x: 960, y: 760 }; // hinge
const SCREEN_CENTER: Pt = { x: 960, y: 565 };
const CLIP_BROWSER = { x: 1199, y: 502, w: 822 }; // where the browser sits in frame 0 of a project clip

// Scene 1: the warm light searches; the cool light pops on, darts, tags it, and they collide.
const warmOpen: Key[] = [[0, 700, 790], [60, 740, 812], [110, 860, 780], [150, 900, 800], [Q.spark, 960, 800]];
const coolOpen: Key[] = [[Q.coolOn, 1700, 840], [72, 1480, 770], [84, 1600, 880], [96, 1330, 800], [108, 1440, 860], [Q.tag, 1080, 800], [134, 1320, 830], [Q.converge, 1120, 800], [Q.spark, 960, 800]];

function lightsAt(f: number, fps: number): LightSpec[] {
  const L: LightSpec[] = [];
  if (f < 180) {
    const pop = f < Q.coolOn ? 0 : interpolate(f, [Q.coolOn, Q.coolOn + 3, Q.coolOn + 10], [0, 1.35, 1], { extrapolateRight: "clamp" });
    const meet = progress(f, Q.converge, Q.spark - Q.converge);
    L.push({ id: "w1", color: C.warm, source: { x: WARM_SRC.x + f * 0.4, y: WARM_SRC.y }, target: path(f, warmOpen), radius: mix(290, 220, meet), intensity: 1.25 + meet * 0.2 });
    if (f < Q.coolOn) L.push({ id: "glint", color: C.cool, source: COOL_SRC, target: { x: 1700, y: 840 }, radius: 10 + 4 * Math.sin(f * 0.35), intensity: 0.3 + 0.15 * Math.sin(f * 0.5), spread: 4, dust: 0 });
    L.push({ id: "c1", color: C.cool, source: COOL_SRC, target: path(f, coolOpen, true), radius: mix(160, 200, meet), intensity: pop + meet * 0.3 });
    return L;
  }
  if (f < 480) {
    const together = progress(f, Q.laptop, 30, easeInOut);
    const warmIris = spring({ frame: f - Q.uncle, fps, config: { damping: 13, stiffness: 140 } });
    const coolIris = f < Q.niece ? 0 : spring({ frame: f - Q.niece, fps, config: { damping: 8, stiffness: 190, mass: 0.7 } });
    const coolX = f < Q.niece ? 1360 : interpolate(f, [Q.niece, Q.niece + 8], [1720, 1360], { extrapolateRight: "clamp", easing: easeInOut });
    const shape = "wall";
    L.push({ id: "w2", color: C.warm, shape, source: WARM_SRC, target: { x: mix(560, 930, together), y: mix(470, 600, together) }, radius: mix(300 * warmIris, 380, together), intensity: 1 });
    if (f >= Q.niece) L.push({ id: "c2", color: C.cool, shape, source: COOL_SRC, target: { x: mix(coolX, 990, together), y: mix(470, 600, together) }, radius: mix(260 * coolIris, 360, together), intensity: 1 });
    return L;
  }
  if (f < 900) {
    const split = progress(f, Q.storyStart, 20, easeInOut);
    const join = progress(f, 860, 34, easeInOut);
    const coolLevel = f < Q.handoff ? 0.16 : f < Q.orbLand ? mix(0.16, 0.45, progress(f, Q.handoff, 30)) : interpolate(f, [Q.orbLand, Q.orbLand + 4, Q.orbLand + 20], [0.45, 1.4, 1], { extrapolateRight: "clamp" });
    L.push({ id: "w3", color: C.warm, shape: "wall", source: WARM_SRC, target: { x: mix(mix(930, 600, split), 930, join), y: mix(600, 560, split) + join * 40 }, radius: mix(380, 330, split) + join * 40, intensity: f >= Q.handoff && f < Q.orbLand ? 0.85 : 1 });
    L.push({ id: "c3", color: C.cool, shape: "wall", source: COOL_SRC, target: { x: mix(mix(990, 1340, split), 990, join), y: mix(600, 560, split) + join * 40 }, radius: mix(360, 300, split) + join * 60, intensity: mix(coolLevel, 1, join) });
    return L;
  }
  if (f < 940) {
    const fade = 1 - progress(f, 900, 26);
    L.push({ id: "w4", color: C.warm, shape: "wall", source: WARM_SRC, target: { x: 930, y: 640 }, radius: 370, intensity: fade });
    L.push({ id: "c4", color: C.cool, shape: "wall", source: COOL_SRC, target: { x: 990, y: 640 }, radius: 360, intensity: fade });
    return L;
  }
  // Premiere sweeps over the work: the two lights rise from below and cross.
  for (const [id, start] of [["s1", Q.sweep1], ["s2", Q.sweep2]] as const) {
    if (f >= start && f < start + 70) {
      const t = progress(f, start, 70, easeInOut);
      const level = Math.sin(Math.PI * t) * 0.5;
      L.push({ id: `${id}w`, color: C.warm, shape: "wall", spread: 34, dust: 30, source: { x: 860, y: 1260 }, target: { x: mix(520, 1900, t), y: -120 }, radius: 170, intensity: level });
      L.push({ id: `${id}c`, color: C.cool, shape: "wall", spread: 34, dust: 30, source: { x: 1560, y: 1260 }, target: { x: mix(2000, 700, t), y: -120 }, radius: 150, intensity: level });
    }
  }
  if (f >= 1636 && f < 1700) {
    const t = progress(f, 1636, Q.logo - 1636, easeInOut);
    const on = progress(f, 1636, 14) * (1 - progress(f, Q.logo, 10));
    L.push({ id: "w6", color: C.warm, shape: "wall", source: WARM_SRC, target: { x: mix(300, LOGO.dot.x, t), y: mix(760, LOGO.dot.y, t) }, radius: mix(260, 26, t), intensity: on * 1.2 });
    L.push({ id: "c6", color: C.cool, shape: "wall", source: COOL_SRC, target: { x: mix(1620, LOGO.dot.x, t), y: mix(760, LOGO.dot.y, t) }, radius: mix(200, 26, t), intensity: on * 1.2 });
  }
  return L;
}

export const Film: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 2 camera: a slow push while the laptop opens.
  const push2 = f >= 180 && f < 480 ? 1 + 0.035 * progress(f, Q.laptop, 180, easeInOut) : 1;
  // Scene 4 dive: the laptop screen grows until it becomes the frame.
  const dive = progress(f, Q.dive, 32, easeInOut);
  const laptopIn2 = progress(f, Q.laptop - 4, 16);
  const lid = progress(f, Q.lidOpen, 44, easeInOut);
  const screen = progress(f, Q.screenOn, 14);
  const laptopBack = progress(f, 868, 22);
  const showLaptop = (f >= Q.laptop - 4 && f < Q.storyStart + 22) || (f >= 868 && f < 934);
  const laptopOpacity = f < Q.storyStart + 22 ? laptopIn2 * (1 - progress(f, Q.storyStart, 20)) : laptopBack * (1 - progress(f, 922, 10));
  const laptopOpen = f < Q.storyStart + 22 ? lid : 1;
  const laptopScreen = f < Q.storyStart + 22 ? screen : 1;

  // Scene 3: ticket → browser; then both his browser and her layout fly into the laptop.
  const ticketIn = progress(f, Q.storyStart + 4, 18);
  const intoLaptop = progress(f, 860, 32, easeInOut);
  const flash1 = interpolate(f, [Q.spark - 6, Q.spark, Q.spark + 14], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scene 5 clips and the light wipe that hides the cut between them.
  const clip1 = progress(f, Q.clip1 - 20, 20) * (1 - progress(f, Q.clip2 - 4, 6));
  const clip2 = progress(f, Q.clip2 - 2, 6) * (1 - progress(f, 1622, 20));
  const wipe = f >= Q.clip2 - 14 && f < Q.clip2 + 14 ? interpolate(f, [Q.clip2 - 14, Q.clip2 + 14], [0, 1]) : -1;

  return <AbsoluteFill style={{ backgroundColor: C.bgEdge }}>
    <Html5Audio src={staticFile("audio/score.mp3")} />
    <Stage frame={f}>
      <AbsoluteFill style={{ transformOrigin: "960px 600px", transform: `scale(${push2})` }}>
        <AbsoluteFill style={{ transformOrigin: `${SCREEN_CENTER.x}px ${SCREEN_CENTER.y}px`, transform: `translateY(${-25 * dive}px) scale(${1 + 1.77 * dive})` }}>
          {f < 940 && <Lights frame={f} lights={lightsAt(f, fps)} />}
          {showLaptop && <Laptop x={LAPTOP.x} y={LAPTOP.y} open={laptopOpen} screen={laptopScreen} opacity={laptopOpacity} />}
        </AbsoluteFill>

        {/* Scene 1: the spark where the two lights meet. */}
        {flash1 > 0 && <div style={{ position: "absolute", left: 960 - 900, top: 800 - 300, width: 1800, height: 600, background: "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,240,220,0.4) 30%, rgba(255,255,255,0) 70%)", opacity: flash1, mixBlendMode: "screen", transform: `scaleX(${1 + flash1 * 0.6})` }} />}

        {/* Scene 2: an uncle, his niece, and a laptop. */}
        <Words text="An uncle," frame={f} start={Q.uncle + 4} end={Q.laptop - 8} size={104} color={C.warmText} x={560} y={392} align="center" width={900} />
        <Words text="Sabelo" frame={f} start={Q.uncle + 14} end={Q.laptop - 8} size={62} color={C.white} x={560} y={520} align="center" width={600} letterSpacing="0em" />
        <Words text="his niece," frame={f} start={Q.niece + 6} end={Q.laptop - 8} size={104} color={C.coolText} x={1360} y={392} align="center" width={900} />
        <Words text="Sthembile" frame={f} start={Q.niece + 16} end={Q.laptop - 8} size={62} color={C.white} x={1360} y={520} align="center" width={600} letterSpacing="0em" />
        <Words text="An uncle, his niece, and a laptop." frame={f} start={Q.laptop + 4} end={Q.storyStart - 8} size={92} color={C.white} x={960} y={118} align="center" width={1700} stagger={4} />
        <Words text="Newcastle, KwaZulu-Natal" frame={f} start={Q.screenOn + 16} end={Q.storyStart - 8} size={42} color={C.pale} x={960} y={900} align="center" width={900} letterSpacing="0em" />
      </AbsoluteFill>

      {/* Scene 3: how it started. */}
      {f >= Q.storyStart && f < 900 && <>
        <TicketToBrowser cx={mix(600, SCREEN_CENTER.x, intoLaptop)} cy={mix(560, SCREEN_CENTER.y, intoLaptop)} m={progress(f, Q.morph, 42)} scale={mix(1, 0.8, intoLaptop)} rotate={mix(-3, 0, progress(f, Q.morph, 42))} opacity={ticketIn * (1 - progress(f, 882, 10))} />
        <Orb frame={f} from={{ x: 600, y: 520 }} to={{ x: 1340, y: 540 }} launch={Q.orbLaunch} land={Q.orbLand} />
        <LayoutBlocks frame={f} fps={fps} cx={mix(1340, SCREEN_CENTER.x, intoLaptop)} cy={mix(560, SCREEN_CENTER.y, intoLaptop)} snaps={Q.snaps} scale={mix(1, 0.7, intoLaptop)} opacity={1 - progress(f, 880, 10)} />
        <Words text="Sabelo worked in music, managing artists and booking shows." frame={f} start={Q.ticketLine} end={Q.morph - 4} size={76} color={C.warmText} x={960} y={78} align="center" width={1500} stagger={2} />
        <Words text="Then he discovered AI tools and taught himself to build websites." frame={f} start={Q.browserLine} end={Q.handoff + 4} size={76} color={C.warmText} x={960} y={78} align="center" width={1560} stagger={2} />
        <Words text="He introduced his niece to computers and AI." frame={f} start={Q.orbLaunch + 2} end={Q.layoutLine - 6} size={76} color={C.white} x={960} y={78} align="center" width={1500} stagger={3} />
        <Words text="She took to page layouts and graphics." frame={f} start={Q.layoutLine} end={872} size={76} color={C.coolText} x={960} y={78} align="center" width={1500} stagger={3} />
      </>}

      {/* Scene 4: building together, then the real website, then its 3D clip. */}
      {f >= Q.dive - 2 && f < Q.clip1 + 4 && <BuildCanvas frame={f} fps={fps} locks={Q.locks} reveal={Q.reveal} pullback={Q.pullback} clip={Q.clip1} target={CLIP_BROWSER} />}
      <div style={{ textShadow: "0 4px 30px rgba(0,0,0,0.75)" }}>
        <Words text="Sabelo builds." frame={f} start={Q.locks[0] + 6} end={Q.reveal - 26} size={80} color={C.warmText} x={200} y={830} width={900} />
        <Words text="Sthembile designs." frame={f} start={Q.locks[1] + 6} end={Q.reveal - 26} size={80} color={C.coolText} x={1720} y={830} align="right" width={900} />
      </div>

      {/* Scene 5: today. */}
      <WorkClip file="moyandi-scents.mp4" from={Q.clip1 - 20} duration={Q.clip2 - Q.clip1 + 26} opacity={clip1} />
      <WorkClip file="friday-consulting.mp4" from={Q.clip2 - 4} duration={1640 - Q.clip2} opacity={clip2} />
      {wipe >= 0 && <div style={{ position: "absolute", top: 0, bottom: 0, left: mix(500, 1900, wipe) - 170, width: 340, background: `linear-gradient(90deg, rgba(255,207,150,0), rgba(255,236,210,0.95), rgba(156,203,242,0.6), rgba(156,203,242,0))`, filter: "blur(28px)", mixBlendMode: "screen", opacity: Math.sin(Math.PI * wipe) }} />}
      <Words text="Today," frame={f} start={Q.todayLine} end={1622} size={124} color={C.white} x={100} y={210} width={520} />
      <Words text="they build websites for businesses across South Africa." frame={f} start={Q.todayLine + 8} end={1622} size={62} color={C.pale} x={100} y={372} width={520} lineHeight={1.18} />
      <Label frame={f} start={Q.clip1 + 20} end={Q.clip2 - 12} name="Moyandi Scents" detail="Online shop · Durban" />
      <Label frame={f} start={Q.clip2 + 14} end={1620} name="Friday Consulting" detail="Business website" />

      {/* Scene 5 sweeps and scene 6: the two lights become the logo's dot. */}
      {f >= 940 && <Lights frame={f} lights={lightsAt(f, fps)} />}
      {f >= Q.logo - 4 && <LogoGlow f={f} />}
      <Logo frame={f} fps={fps} start={Q.logo} />
      <Words text="ntombii.tech" frame={f} start={Q.logo + 38} size={50} color={C.pale} x={960} y={612} align="center" width={600} letterSpacing="0.01em" />
    </Stage>
    <Finish frame={f} />
  </AbsoluteFill>;
};

const LogoGlow: React.FC<{ f: number }> = ({ f }) => {
  const burst = interpolate(f, [Q.logo - 4, Q.logo, Q.logo + 22], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ambient = progress(f, Q.logo, 30) * (1 - 0.5 * progress(f, Q.finalNote, 40));
  return <>
    <div style={{ position: "absolute", left: LOGO.dot.x - 280, top: LOGO.dot.y - 280, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%)", opacity: burst * 0.85, mixBlendMode: "screen" }} />
    <div style={{ position: "absolute", left: 260, top: 260, width: 700, height: 460, background: `radial-gradient(closest-side, ${C.warm}, transparent)`, opacity: 0.1 * ambient, mixBlendMode: "screen" }} />
    <div style={{ position: "absolute", left: 960, top: 260, width: 700, height: 460, background: `radial-gradient(closest-side, ${C.cool}, transparent)`, opacity: 0.1 * ambient, mixBlendMode: "screen" }} />
  </>;
};

