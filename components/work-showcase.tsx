"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { portfolioProjects, projectMotion } from "./portfolio-projects";
import { ProjectMotion } from "./project-motion";
import "./work-showcase.css";

const summaries: Record<string, string> = {
  "la-raza": "A countdown to the grand opening, table bookings on WhatsApp and a sign-up for news and specials.",
  "moyandi-scents": "Pick a scent, build a gift box and check out in two steps at this Durban fragrance shop.",
  "keep-newcastle-alive": "A place for Newcastle residents to find support, volunteer or help fund local work.",
  "friday-consulting": "Six areas of expertise, past project work and a direct way to brief the consulting team.",
  "fezile-security": "Compare guarding and response services, find a branch and get a quote.",
  "legend-black-jesus": "Browse the collection, choose a size and colour, and order the piece on WhatsApp.",
  "snesenzo-security": "Meet the team, explore its protection services and request a quote in three provinces.",
};

function Chevron({ previous = false }: { previous?: boolean }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
    <path d={previous ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function WorkShowcase() {
  const track = useRef<HTMLDivElement>(null);
  const position = useRef(0);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  // Each film plays once, then the next project comes in. Any browsing by the visitor hands control back to them.
  const [auto, setAuto] = useState(true);
  const project = portfolioProjects[active];
  const total = portfolioProjects.length;

  function showProgress(fraction: number) {
    if (bar.current) bar.current.style.transform = `scaleX(${fraction})`;
  }

  useEffect(() => showProgress(0), [active]);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    let width = element.clientWidth;
    function syncPosition() {
      frame = 0;
      if (!element || !width) return;
      position.current = Math.max(0, Math.min(total - 1, Math.round(element.scrollLeft / width)));
      setActive(position.current);
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(syncPosition); };
    const observer = new ResizeObserver(() => {
      if (width !== element.clientWidth) {
        width = element.clientWidth;
        element.scrollTo({ left: position.current * width, behavior: "instant" });
      }
    });
    observer.observe(element);
    element.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      element.removeEventListener("scroll", onScroll);
    };
  }, [total]);

  function select(index: number, animate = false) {
    const element = track.current;
    if (!element) return;
    const next = (index + total) % total;
    const smooth = animate && Math.abs(next - position.current) === 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({ left: next * element.clientWidth, behavior: smooth ? "smooth" : "instant" });
  }

  function choose(index: number, animate = false) {
    setAuto(false);
    select(index, animate);
  }

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    switch (event.key) {
      case "ArrowLeft": choose(active - 1, true); break;
      case "ArrowRight": choose(active + 1, true); break;
      case "Home": choose(0); break;
      case "End": choose(total - 1); break;
      default: return;
    }
    event.preventDefault();
  }

  const stopAuto = () => setAuto(false);

  return <section id="work" className="studio-showcase" aria-labelledby="work-title">
    <div className="wrap">
      <header className="studio-showcase-heading">
        <h2 id="work-title">Selected work.</h2>
        <a href="/work">View portfolio</a>
      </header>
      <div className="studio-showcase-body" role="region" aria-roledescription="carousel" aria-label="Website projects">
        <div className="studio-screen">
          <div className="studio-reel">
            <div className="studio-reel-track" id="work-films" ref={track} role="group" tabIndex={0} onKeyDown={navigate} onPointerDown={stopAuto} onWheel={stopAuto} aria-label="Project films. Swipe or use the arrow keys to browse">
              {portfolioProjects.map((item, index) =>
                <div className="studio-reel-slide" key={item.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${total}: ${item.previewName}`} aria-hidden={index !== active} inert={index !== active}>
                  <ProjectMotion
                    project={item}
                    active={index === active}
                    loop={index !== active || !auto}
                    onProgress={index === active ? showProgress : undefined}
                    onEnded={index === active && auto ? () => select(active + 1, true) : undefined}
                  />
                </div>
              )}
            </div>
            <div className="studio-progress" aria-hidden="true"><span ref={bar} /></div>
          </div>
          <div className="studio-film-caption" key={project.id}>
            <div>
              <h3><a href={project.caseStudyUrl ?? project.url}>{project.previewName}</a></h3>
              <p>{summaries[project.id]}</p>
            </div>
            <div className="studio-film-links">
              {project.caseStudyUrl && <a href={project.caseStudyUrl}>View project</a>}
              <a href={project.url} target="_blank" rel="noreferrer">Live website</a>
            </div>
          </div>
          <div className="studio-mobile-controls" role="group" aria-label="Browse website projects">
            <button type="button" onClick={() => choose(active - 1, true)} aria-label="Previous project"><Chevron previous /></button>
            <span aria-hidden="true">{active + 1} / {total}</span>
            <button type="button" onClick={() => choose(active + 1, true)} aria-label="Next project"><Chevron /></button>
          </div>
        </div>
        <div className="studio-project-index" role="group" aria-label="Choose a project">
          {portfolioProjects.map((item, index) =>
            <button key={item.id} type="button" aria-pressed={index === active} aria-controls="work-films" onClick={() => choose(index)}>
              <img src={projectMotion(item.id).thumbnail} width="57" height="44" loading="lazy" decoding="async" alt="" />
              <span>{item.previewName}</span>
            </button>
          )}
        </div>
        <p className="sr-only" role="status" aria-atomic="true">Showing {project.previewName}, project {active + 1} of {total}</p>
      </div>
    </div>
  </section>;
}
