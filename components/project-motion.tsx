"use client";

import { useEffect, useRef, useState } from "react";
import { projectMotion, type PortfolioProject } from "./portfolio-projects";
import "./project-motion.css";

type Choice = "play" | "pause" | null;

/**
 * A project's 3D motion clip. It loads nothing until it is on screen, plays only while visible,
 * stays paused for reduced-motion and data-saver visitors, and always offers a pause/play button.
 */
export function ProjectMotion({ project, className = "" }: { project: PortfolioProject; className?: string }) {
  const motion = projectMotion(project.id);
  const video = useRef<HTMLVideoElement>(null);
  const choice = useRef<Choice>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    element.muted = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    let visible = false;

    function sync() {
      if (!element) return;
      const autoplay = !reducedMotion.matches && !saveData;
      const shouldPlay = visible && (choice.current === "play" || (choice.current === null && autoplay));
      if (shouldPlay && element.paused) element.play().catch(() => setPlaying(false));
      else if (!shouldPlay && !element.paused) element.pause();
    }

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.35 });
    observer.observe(element);
    const onPlaying = () => { setPlaying(true); setStarted(true); };
    const onPause = () => setPlaying(false);
    element.addEventListener("playing", onPlaying);
    element.addEventListener("pause", onPause);
    reducedMotion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      element.removeEventListener("playing", onPlaying);
      element.removeEventListener("pause", onPause);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  function toggle() {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      choice.current = "play";
      element.play().catch(() => setPlaying(false));
    } else {
      choice.current = "pause";
      element.pause();
    }
  }

  return <div className={`project-motion${started ? " is-started" : ""} ${className}`.trim()}>
    <img className="project-motion-poster" src={motion.poster} width={motion.width} height={motion.height} alt="" loading="lazy" decoding="async" draggable={false} />
    <video ref={video} className="project-motion-video" muted loop playsInline preload="none" width={motion.width} height={motion.height} aria-label={`The ${project.name} website scrolling on a laptop and a phone`}>
      <source src={motion.src} type="video/mp4" />
    </video>
    <button type="button" className="project-motion-toggle" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} the ${project.name} video`}>
      {playing
        ? <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6.5 4.5v11m7-11v11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
        : <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L7.9 4.3a.6.6 0 0 0-.9.5Z" fill="currentColor" /></svg>}
    </button>
  </div>;
}
