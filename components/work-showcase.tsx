"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { portfolioProjects } from "./portfolio-projects";
import { ProjectMotion } from "./project-motion";

const projectSummaries: Record<string, string> = {
  "moyandi-scents": "Shoppers pick a scent, build a gift box and check out in two steps, with no account needed.",
  "friday-consulting": "Visitors pick the help they need, see past projects and send a project brief.",
  "penny-ntuli": "Brands can see Penny’s radio and TV work, then get in touch about working together.",
  "khuzani-blue-nation": "Fans find his music and upcoming shows. Promoters can ask about bookings.",
  "fezile-security": "Customers compare security services, find their nearest branch and ask for a quote.",
  "legend-black-jesus": "Shoppers browse the clothing, choose a size and colour, then order on WhatsApp.",
  "snesenzo-security": "Customers see what the company offers and where it works, then ask for a quote.",
};

function Chevron({ direction }: { direction: "left" | "right" }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={direction === "left" ? "M14.5 6 8.5 12l6 6" : "m9.5 6 6 6-6 6"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function WorkShowcase() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const project = portfolioProjects[active];
  const total = portfolioProjects.length;

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    let previousWidth = element.clientWidth;
    function syncPosition() {
      frame = 0;
      if (!element) return;
      const next = Math.max(0, Math.min(total - 1, Math.round(element.scrollLeft / Math.max(1, element.clientWidth))));
      if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(syncPosition); }
    const observer = new ResizeObserver(() => {
      if (element.clientWidth !== previousWidth) {
        previousWidth = element.clientWidth;
        element.scrollTo({ left: activeRef.current * previousWidth, behavior: "instant" });
      }
    });
    observer.observe(element);
    element.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); element.removeEventListener("scroll", onScroll); };
  }, [total]);

  function selectProject(index: number) {
    const element = track.current;
    if (!element) return;
    const next = (index + total) % total;
    element.scrollTo({ left: next * element.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") selectProject(active + 1);
    else if (event.key === "ArrowLeft") selectProject(active - 1);
    else if (event.key === "Home") selectProject(0);
    else if (event.key === "End") selectProject(total - 1);
    else return;
    event.preventDefault();
  }

  return <section id="work" className="work-section section" aria-labelledby="work-title"><div className="wrap">
    <div className="section-heading" data-reveal><h2 id="work-title">Websites we’ve built.</h2><a className="button button-white" href="/work">See all projects</a></div>
    <div className="work-carousel" role="region" aria-roledescription="carousel" aria-label="Website projects">
      <div className="work-carousel-track" ref={track} role="group" tabIndex={0} onKeyDown={navigate} aria-label="Swipe or use the arrow keys to browse projects">
        {portfolioProjects.map((item, index) => <div className="work-carousel-slide" key={item.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${total}: ${item.name}`} aria-hidden={index !== active} inert={index !== active}>
          <div className="work-slide-layout">
            <ProjectMotion project={item} />
            <div className="work-slide-copy">
              <h3><a href={item.caseStudyUrl ?? item.url}>{item.previewName}</a></h3>
              <p>{projectSummaries[item.id]}</p>
              <div className="work-slide-links">{item.caseStudyUrl && <a className="button button-white" href={item.caseStudyUrl}>View project</a>}<a className="text-link" href={item.url} target="_blank" rel="noreferrer">Visit the live site <span aria-hidden="true">↗</span></a></div>
            </div>
          </div>
        </div>)}
      </div>
      <div className="work-slider-controls" role="group" aria-label="Browse website projects">
        <button type="button" onClick={() => selectProject(active - 1)} aria-label="Previous project"><Chevron direction="left" /></button>
        <span aria-hidden="true">{active + 1} / {total}</span>
        <button type="button" onClick={() => selectProject(active + 1)} aria-label="Next project"><Chevron direction="right" /></button>
      </div>
      <p className="sr-only" role="status" aria-atomic="true">Showing {project.name}, project {active + 1} of {total}</p>
    </div>
  </div></section>;
}
