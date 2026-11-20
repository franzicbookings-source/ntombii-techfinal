"use client";

import { ImageFrame } from "./image-frame";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import "./project-screens.css";

export type ProjectScreen = {
  id: string;
  label: string;
  image: { src: string; alt: string; width: number; height: number };
  title: string;
  description: string;
};

export function ProjectScreens({ projectId, screens }: { projectId: string; screens: readonly ProjectScreen[] }) {
  const [selected, setSelected] = useState(0);
  const [enlarged, setEnlarged] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewer = useRef<HTMLDialogElement>(null);
  const current = enlarged === null ? null : screens[enlarged];
  useEffect(() => {
    if (enlarged === null || !viewer.current) return;
    if (!viewer.current.open) viewer.current.showModal();
  }, [enlarged]);

  function openScreenshot(index: number) {
    setEnlarged(index);
  }

  function closeScreenshot() {
    viewer.current?.close();
  }

  function afterClose() {
    setEnlarged(null);
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % screens.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + screens.length) % screens.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = screens.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return <section className="story-explorer wrap" aria-labelledby={`${projectId}-screens-title`}>
    <h2 id={`${projectId}-screens-title`}>Why we built it this way.</h2>
    <div className="story-screen-tabs" role="tablist" aria-label="Project screens">
      {screens.map((screen, index) => <button key={screen.id} ref={element => { tabs.current[index] = element; }} id={`${projectId}-tab-${screen.id}`} type="button" role="tab" aria-selected={selected === index} aria-controls={`${projectId}-panel-${screen.id}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => navigate(event, index)}>{screen.label}</button>)}
    </div>
    {screens.map((screen, index) => <div key={screen.id} id={`${projectId}-panel-${screen.id}`} className="story-screen-panel" role="tabpanel" aria-labelledby={`${projectId}-tab-${screen.id}`} hidden={selected !== index}>
      <ImageFrame as="button" className={`story-screen-preview${screen.image.width < screen.image.height ? " story-screen-phone" : ""}`} onActivate={() => openScreenshot(index)} hasPopup="dialog" label={`Open ${screen.label.toLowerCase()} screenshot at full size`}
        image={{ src: screen.image.src, width: screen.image.width, height: screen.image.height, alt: screen.image.alt, loading: "lazy" }}
        after={<span className="story-screen-enlarge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6m0 6 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>} />
      <div className="story-screen-note"><h3>{screen.title}</h3><p>{screen.description}</p></div>
    </div>)}
    <dialog ref={viewer} className="story-screen-viewer" aria-labelledby={`${projectId}-viewer-title`} onClose={afterClose}
      onClick={event => { if (event.target === event.currentTarget) closeScreenshot(); }}
      onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); event.nativeEvent.stopImmediatePropagation(); } }}>
      {current && <><header><h2 id={`${projectId}-viewer-title`}>{current.label}</h2><button type="button" onClick={closeScreenshot} aria-label="Close screenshot">×</button></header>
        <ImageFrame className="story-screen-original" tabIndex={0} role="region" label="Full-size screenshot" image={{ src: current.image.src, width: current.image.width, height: current.image.height, alt: current.image.alt }} announce />
        <a href={current.image.src} target="_blank" rel="noreferrer">Open original image <span aria-hidden="true">↗</span></a>
      </>}
    </dialog>
  </section>;
}
