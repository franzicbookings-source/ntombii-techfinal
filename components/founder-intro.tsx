"use client";

import { useEffect, useRef, useState } from "react";
import "./founder-intro.css";

type State = "idle" | "playing" | "paused" | "ended";

const labels: Record<State, string> = { idle: "Watch my intro", playing: "Pause", paused: "Play", ended: "Watch again" };

export function FounderIntro() {
  const video = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<State>("idle");
  const [line, setLine] = useState("");

  useEffect(() => {
    const track = video.current?.textTracks[0];
    if (!track) return;
    track.mode = "hidden";
    const onCue = () => setLine([...(track.activeCues ?? [])].map(cue => (cue as VTTCue).text).join(" "));
    track.addEventListener("cuechange", onCue);
    return () => track.removeEventListener("cuechange", onCue);
  }, []);

  function toggle() {
    const element = video.current;
    if (!element) return;
    if (state === "playing") {
      element.pause();
      return;
    }
    if (state === "ended") element.currentTime = 0;
    element.muted = false;
    element.play().catch(() => setState("paused"));
  }

  return <figure className="founder-photo founder-intro" data-state={state} data-reveal>
    <img className="founder-intro-portrait" src="/videos/sabelo-intro-poster.webp" width={720} height={720} alt="Cartoon portrait of Sabelo Ndlovu" loading="lazy" />
    <video
      ref={video}
      className="founder-intro-video"
      preload="none"
      playsInline
      aria-label="Sabelo's animated introduction"
      onPlay={() => setState("playing")}
      onPause={() => setState(current => current === "playing" ? "paused" : current)}
      onEnded={() => { setState("ended"); setLine(""); }}
    >
      <source src="/videos/sabelo-intro.mp4" type="video/mp4" />
      <track kind="captions" src="/videos/sabelo-intro.vtt" srcLang="en" label="English" default />
    </video>
    <button type="button" className="founder-intro-button" aria-label={labels[state]} onClick={toggle}>
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <path d="M5 2.8v10.4L13.2 8z" fill="currentColor" />
      </svg>
    </button>
    <p className="founder-intro-line" aria-hidden="true">{line}</p>
  </figure>;
}
