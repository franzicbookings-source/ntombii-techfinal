"use client";

import { useEffect, useRef, useState } from "react";
import { projectMotion, type PortfolioProject } from "./portfolio-projects";
import "./project-motion.css";

type Choice = "play" | "pause" | null;

/**
 * A short film made from a project's website. It loads nothing until it is on screen, plays only while visible,
 * stays paused for reduced-motion and data-saver visitors, and supports tap, click and keyboard playback control without an on-screen icon.
 */
type ProjectMotionProps = {
  project: PortfolioProject;
  className?: string;
  active?: boolean;
  priority?: boolean;
};

export function ProjectMotion({ project, className = "", active = true, priority = false }: ProjectMotionProps) {
  const motion = projectMotion(project.id);
  const video = useRef<HTMLVideoElement>(null);
  const choice = useRef<Choice>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!active) {
      element.pause();
      return;
    }
    element.muted = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    let visible = false;

    function sync() {
      if (!element) return;
      const autoplay = !reducedMotion.matches && !saveData;
      const shouldPlay = visible && !document.hidden && (choice.current === "play" || (choice.current === null && autoplay));
      if (shouldPlay && element.paused) element.play().catch(() => setPlaying(false));
      else if (!shouldPlay && !element.paused) element.pause();
    }

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= 0.35; sync(); }, { threshold: 0.35 });
    observer.observe(element);
    reducedMotion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [active]);

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
    <img className="project-motion-poster" src={motion.poster} width={motion.width} height={motion.height} alt="" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" draggable={false} />
    <video ref={video} className="project-motion-video" onPlaying={() => { setPlaying(true); setStarted(true); }} onPause={() => setPlaying(false)} muted loop playsInline preload="none" width={motion.width} height={motion.height} aria-label={`The ${project.name} website on desktop and mobile`}>
      <source src={motion.src} type="video/mp4" />
    </video>
    <button type="button" className="project-motion-control" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} the ${project.name} video`} />
  </div>;
}
