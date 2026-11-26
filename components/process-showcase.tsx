"use client";

import { useEffect, useRef, useState } from "react";
import "./process-showcase.css";

/** Where each step's part of the 12-second film begins. The chat part also covers the fold back at the end of the loop. */
const steps = [
  { title: "Tell us what you need", body: "Send a WhatsApp. We agree on the pages, price and timeline before we start.", at: 0 },
  { title: "We design and build", body: "You review each stage, with two rounds of changes per stage.", at: 3.6 },
  { title: "We test and launch", body: "Checked on phones and computers, then published. 14 days of support included.", at: 7.6 },
] as const;
const LOOP = 12;
const FOLD = 11.2;
const FILM = "/videos/process.mp4";

function position(time: number) {
  if (time >= FOLD) return { step: 0, progress: (time - FOLD) / (LOOP - FOLD + steps[1].at) };
  if (time < steps[1].at) return { step: 0, progress: (time + LOOP - FOLD) / (LOOP - FOLD + steps[1].at) };
  if (time < steps[2].at) return { step: 1, progress: (time - steps[1].at) / (steps[2].at - steps[1].at) };
  return { step: 2, progress: (time - steps[2].at) / (FOLD - steps[2].at) };
}

function Arrow() {
  return <svg aria-hidden="true" className="arrow diagonal" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/**
 * "We build websites.": three short steps beside one looping film of the whole journey,
 * from a WhatsApp chat to a live site. The step on screen lights up, and choosing a step jumps the film to it.
 * The film plays only while visible and stays on its poster for reduced-motion and data-saver visitors.
 */
export function ProcessShowcase({ startingPrice }: { startingPrice: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const choice = useRef<"play" | "pause" | null>(null);
  const load = useRef<() => Promise<void>>(async () => {});
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    element.muted = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    let visible = false;
    let frame = 0;
    let objectUrl = "";
    let loading: Promise<void> | null = null;

    // The film is small, so it is fetched whole and played from memory: jumping between steps then works on any host.
    load.current = () => loading ??= fetch(FILM)
      .then(response => response.ok ? response.blob() : Promise.reject(new Error(String(response.status))))
      .then(blob => { objectUrl = URL.createObjectURL(blob); element.src = objectUrl; })
      .catch(() => { element.src = FILM; })
      .then(() => sync());

    function sync() {
      if (!element || !loading) return;
      const autoplay = !reducedMotion.matches && !saveData;
      const shouldPlay = visible && !document.hidden && (choice.current === "play" || (choice.current === null && autoplay));
      if (shouldPlay && element.paused) element.play().catch(() => setPlaying(false));
      else if (!shouldPlay && !element.paused) element.pause();
    }
    function tick() {
      if (!element) return;
      const { step, progress } = position(element.currentTime % LOOP);
      setActive(step);
      bars.current.forEach((bar, index) => { if (bar) bar.style.transform = `scaleY(${index === step ? Math.min(1, progress).toFixed(3) : 0})`; });
      frame = requestAnimationFrame(tick);
    }
    const onPlaying = () => { setPlaying(true); cancelAnimationFrame(frame); frame = requestAnimationFrame(tick); };
    const onPause = () => { setPlaying(false); cancelAnimationFrame(frame); };

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.3 });
    observer.observe(element);
    // Start downloading shortly before the film scrolls into view, unless it will not play on its own.
    const preload = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      preload.disconnect();
      if (!reducedMotion.matches && !saveData) load.current();
    }, { rootMargin: "400px 0px" });
    preload.observe(element);
    element.addEventListener("playing", onPlaying);
    element.addEventListener("pause", onPause);
    reducedMotion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      preload.disconnect();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      element.removeEventListener("playing", onPlaying);
      element.removeEventListener("pause", onPause);
      reducedMotion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  async function toggle() {
    const element = video.current;
    if (!element) return;
    if (!element.paused) {
      choice.current = "pause";
      element.pause();
      return;
    }
    choice.current = "play";
    await load.current();
    element.play().catch(() => setPlaying(false));
  }

  async function jump(index: number) {
    const element = video.current;
    if (!element) return;
    setActive(index);
    choice.current = "play";
    await load.current();
    element.currentTime = steps[index].at + 0.05;
    element.play().catch(() => setPlaying(false));
  }

  return <section className="process-showcase section wrap" aria-labelledby="process-title" data-playing={playing}>
    <div className="process-copy" data-reveal>
      <h2 id="process-title">We build websites.</h2>
      <p>Business websites, e-commerce websites and ongoing maintenance.</p>
    </div>
    <div className="process-film" data-reveal>
      <video ref={video} id="process-film" muted loop playsInline preload="none" poster="/videos/process-poster.webp" width={1200} height={750} aria-label="A WhatsApp chat becomes a website on a computer, then a phone, then goes live">
      </video>
      <button type="button" className="process-film-control" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} the animation`} />
    </div>
    <ol className="process-list">
      {steps.map((step, index) => <li key={step.title} data-active={index === active}>
        <span className="process-track" aria-hidden="true"><span ref={element => { bars.current[index] = element; }} /></span>
        <h3><button type="button" onClick={() => jump(index)} aria-controls="process-film">{step.title}</button></h3>
        <p>{step.body}</p>
      </li>)}
    </ol>
    <a className="text-link process-link" href="/pricing">Websites from {startingPrice} <Arrow /></a>
  </section>;
}
