"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ImageFrame } from "./image-frame";
import { portfolioProjects } from "./portfolio-projects";

const projectSummaries: Record<string, string> = {
  "friday-consulting": "Choose a consulting service, review the work and send a project brief.",
  "penny-ntuli": "Explore Penny’s career and brand work, then discuss a collaboration.",
  "khuzani-blue-nation": "Discover the music, follow live dates and enquire about a booking.",
  "fezile-security": "Explore security services, find a branch and request a quote.",
  "legend-black-jesus": "Clothing collections, product choices and orders on WhatsApp.",
  "snesenzo-security": "Security services and a clear way for customers to request a quote.",
};

export function WorkShowcase() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const project = portfolioProjects[active];

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    let previousWidth = element.clientWidth;
    function syncPosition() {
      frame = 0;
      if (!element) return;
      const next = Math.max(0, Math.min(portfolioProjects.length - 1, Math.round(element.scrollLeft / Math.max(1, element.clientWidth))));
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
  }, []);

  function selectProject(index: number) {
    const element = track.current;
    if (!element) return;
    const next = (index + portfolioProjects.length) % portfolioProjects.length;
    element.scrollTo({ left: next * element.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") selectProject(active + 1);
    else if (event.key === "ArrowLeft") selectProject(active - 1);
    else if (event.key === "Home") selectProject(0);
    else if (event.key === "End") selectProject(portfolioProjects.length - 1);
    else return;
    event.preventDefault();
  }

  return <section id="work" className="work-section section" aria-labelledby="work-title"><div className="wrap">
    <div className="section-heading" data-reveal><div><h2 id="work-title">Websites we’ve built.</h2></div><a className="button button-blue" href="/work">Explore our work</a></div>
    <div className="work-carousel" role="region" aria-roledescription="carousel" aria-label="Website projects">
      <div className="work-carousel-track" ref={track} role="group" tabIndex={0} onKeyDown={navigate} aria-label="Swipe or use the arrow keys to browse projects">
        {portfolioProjects.map((item, index) => <div className="work-carousel-slide" key={item.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${portfolioProjects.length}: ${item.name}`} aria-hidden={index !== active} inert={index !== active}>
          <div className="work-slide-layout">
            <ImageFrame as="a" className="work-slide-image" href={item.caseStudyUrl ?? item.url} label={`Explore ${item.name}`} image={{ src: item.desktop.src, alt: item.desktop.alt, width: 1440, height: 1000, loading: "lazy", draggable: false }} />
            <div className="work-slide-copy"><p className="work-slide-kind">{item.kind}</p><h3><a href={item.caseStudyUrl ?? item.url}>{item.previewName}</a></h3><p>{projectSummaries[item.id]}</p><div className="work-slide-links">{item.caseStudyUrl && <a href={item.caseStudyUrl}>View project</a>}<a href={item.url} target="_blank" rel="noreferrer">Live website <span aria-hidden="true">↗</span></a></div></div>
          </div>
        </div>)}
      </div>
      <div className="work-slider-controls" role="group" aria-label="Browse website projects"><button type="button" onClick={() => selectProject(active - 1)}>Previous</button><button type="button" onClick={() => selectProject(active + 1)}>Next</button></div>
      <p className="sr-only" role="status" aria-atomic="true">Showing {project.name}</p>
    </div>
  </div></section>;
}
