"use client";

import { useEffect, useRef, useState } from "react";
import { ImageFrame } from "./image-frame";
import { graphicCollections, graphicCollectionFor, graphicPageSize, orderedGraphicWorks as works, type GraphicCollection } from "./graphic-collections";

export function GraphicsGallery() {
  const [collection, setCollection] = useState<GraphicCollection>("all");
  const [visibleCount, setVisibleCount] = useState(graphicPageSize);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [pendingTarget, setPendingTarget] = useState<{ slug: string; focus: boolean } | null>(null);
  const viewer = useRef<HTMLDialogElement>(null);
  const matching = works.filter(work => collection === "all" || graphicCollectionFor(work) === collection);
  const visible = new Set(matching.slice(0, visibleCount).map(work => work.slug));
  const current = matching.find(work => work.slug === activeSlug);
  const currentIndex = matching.findIndex(work => work.slug === activeSlug);

  useEffect(() => {
    function revealHash() {
      let slug: string;
      try { slug = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const index = works.findIndex(work => work.slug === slug);
      if (index < 0) return;
      setCollection("all");
      setVisibleCount(Math.ceil((index + 1) / graphicPageSize) * graphicPageSize);
      setPendingTarget({ slug, focus: false });
    }
    revealHash();
    window.addEventListener("hashchange", revealHash);
    return () => window.removeEventListener("hashchange", revealHash);
  }, []);

  useEffect(() => {
    if (!pendingTarget) return;
    const article = document.getElementById(pendingTarget.slug);
    if (!article || article.hidden) return;
    if (pendingTarget.focus) article.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    article.scrollIntoView({ block: "nearest", behavior: "instant" });
    setPendingTarget(null);
  }, [pendingTarget, collection, visibleCount]);

  useEffect(() => {
    const dialog = viewer.current;
    if (!dialog) return;
    if (activeSlug === null) { if (dialog.open) dialog.close(); return; }
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [activeSlug]);

  function chooseCollection(next: GraphicCollection) {
    setCollection(next);
    setVisibleCount(graphicPageSize);
    setPendingTarget(null);
    if (window.location.hash) window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  }

  function showMore() {
    const next = matching[visibleCount];
    setVisibleCount(count => count + graphicPageSize);
    if (next) setPendingTarget({ slug: next.slug, focus: true });
  }

  function move(direction: number) {
    setActiveSlug(matching[(currentIndex + direction + matching.length) % matching.length].slug);
  }

  return <>
    <div className="graphics-filters wrap" role="group" aria-label="Filter graphic design work">
      {graphicCollections.map(item => <button key={item.id} type="button" aria-pressed={collection === item.id} aria-controls="graphics-collection" onClick={() => chooseCollection(item.id)}>{item.label}</button>)}
    </div>
    <p className="sr-only" role="status" aria-live="polite">{Math.min(visibleCount, matching.length)} of {matching.length} designs shown. {graphicCollections.find(item => item.id === collection)?.label}.</p>
    <section id="graphics-collection" className="graphics-grid wrap" aria-label="Selected social media graphics">
      {works.map((work, index) => <article className="graphics-piece" key={work.slug} id={work.slug} hidden={!visible.has(work.slug)}>
        <ImageFrame as="button" className="graphics-artwork" style={{ aspectRatio: `${work.width} / ${work.height}` }} onActivate={() => setActiveSlug(work.slug)} label={`View ${work.title} at full size`} hasPopup="dialog"
          image={{ src: work.thumbnail, srcSet: `${work.thumbnail} 640w, ${work.full} ${Math.min(1600, work.width)}w`, sizes: "(max-width: 599px) calc(100vw - 40px), (max-width: 1000px) 45vw, 410px", alt: work.alt, width: work.width, height: work.height, loading: index === 0 ? "eager" : "lazy", decoding: "async" }}
          after={<span className="graphics-open" aria-hidden="true">View full image <span>↗</span></span>} />
        <div className="graphics-piece-caption"><p>{work.brand}</p><h2>{work.title}</h2></div>
      </article>)}
    </section>
    {visibleCount < matching.length && <div className="graphics-more wrap"><button className="button button-blue" type="button" onClick={showMore}>Show more work <span aria-hidden="true">↓</span></button></div>}
    <dialog ref={viewer} className="graphics-viewer" aria-labelledby="graphic-view-title" aria-describedby="graphic-view-description"
      onCancel={() => setActiveSlug(null)} onClose={() => setActiveSlug(null)}
      onClick={event => { if (event.target === event.currentTarget) setActiveSlug(null); }}
      onKeyDown={event => {
        if (event.key === "Escape") { event.stopPropagation(); event.nativeEvent.stopImmediatePropagation(); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      }}>
      {current && <div className="graphics-viewer-content">
        <header className="graphics-viewer-header"><div><p>{current.brand}</p><h2 id="graphic-view-title">{current.title}</h2></div><button type="button" className="graphics-close" onClick={() => setActiveSlug(null)} aria-label="Close image viewer"><span aria-hidden="true">×</span></button></header>
        <ImageFrame className="graphics-viewer-image" image={{ src: current.full, width: current.width, height: current.height, alt: current.alt }} announce />
        <div className="graphics-viewer-details"><p id="graphic-view-description">{current.description}</p><a href={current.full} target="_blank" rel="noreferrer">Open image <span aria-hidden="true">↗</span></a></div>
        <div className="graphics-viewer-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous graphic">← <span>Previous</span></button><p role="status" aria-live="polite">{currentIndex + 1} / {matching.length}</p><button type="button" onClick={() => move(1)} aria-label="Next graphic"><span>Next</span> →</button></div>
      </div>}
    </dialog>
  </>;
}
