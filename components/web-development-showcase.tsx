"use client";
import { portfolioPackage } from "./website-packages";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const stages = [
  { name: "Design", title: "Design the pages.", description: "We organise the pages, words and images around what your customers need to know.", tools: [{ name: "Figma", icon: "figma" }, { name: "Framer", icon: "framer" }] },
  { name: "Build", title: "Develop the website.", description: "We add the products, size and colour choices, and the WhatsApp ordering process.", tools: [{ name: "Codex", icon: "openai" }, { name: "Cursor", icon: "cursor" }] },
  { name: "Launch", title: "Check before launch.", description: "We check the pages, buttons and forms on different screens before your website goes live.", tools: [] },
] as const;

function BrowserBar({ address }: { address: string }) {
  return <div className="demo-browser-bar"><span className="demo-window-dots" aria-hidden="true"><i /><i /><i /></span><span>{address}</span><span aria-hidden="true">↗</span></div>;
}

function DesignVisual() {
  return <div className="demo-design-workspace">
    <div className="demo-editor-bar"><span><img src="/tools/figma.svg" alt="" width="16" height="16" />Website design</span><span>Desktop / Home</span><span className="demo-editor-share">Review design ↗</span></div>
    <div className="demo-editor-body">
      <div className="demo-layers" aria-hidden="true"><span>Pages</span><strong>Home</strong><span>Shop</span><span>Contact</span><i /><span>Layers</span><small>Navigation</small><small>Main image</small><small>Shop button</small></div>
      <div className="demo-design-canvas"><div className="demo-artboard"><span className="demo-artboard-label">Home / Desktop</span><img src="/images/web-demo-home.jpg" width="1440" height="1000" alt="Desktop homepage of the Legend Black Jesus website in a design workspace" loading="lazy" /><i className="demo-selection-corner demo-selection-top" /><i className="demo-selection-corner demo-selection-bottom" /></div></div>
      <div className="demo-properties" aria-hidden="true"><strong>Design</strong><span>Layout</span><div className="demo-properties-grid"><small>1440</small><small>Auto</small></div><span>Colour</span><div className="demo-colours"><i /><i /><i /></div><span>Type</span><small>Clear & readable</small></div>
    </div>
    <span className="demo-cursor" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 2v19l5-6 7 2z" fill="currentColor" /></svg><span>Ntombii Tech</span></span>
  </div>;
}

function BuildVisual() {
  return <>
    <div className="demo-code-window" aria-hidden="true"><div className="demo-code-heading"><img src="/tools/cursor.svg" width="16" height="16" alt="" /><span>store / product.tsx</span><span>●</span></div><div className="demo-code-content"><span className="demo-code-comment">// Turn the design into a website</span><br /><span className="demo-code-purple">function</span> ProductPage() {'{'}<br /><span className="demo-code-indent"><span className="demo-code-purple">return</span> (</span><br /><span className="demo-code-indent">&lt;<b>Product</b></span><br /><span className="demo-code-indent demo-code-green">&nbsp; photos={'{'}images{'}'}</span><br /><span className="demo-code-indent demo-code-green">&nbsp; sizes={'{'}sizes{'}'}</span><br /><span className="demo-code-indent demo-code-green">&nbsp; onOrder={'{'}sendToWhatsApp{'}'}</span><br /><span className="demo-code-indent">/&gt;</span><br /><span className="demo-code-indent">);</span><br />{'}'}</div><div className="demo-code-status"><img src="/tools/openai.svg" alt="" width="16" height="16" /><span>Codex + Cursor</span><span>✓</span></div></div>
    <div className="demo-store-window"><BrowserBar address="legendblackjesus.co.za / shop" /><img src="/images/web-demo-shop.jpg" width="1440" height="1000" alt="Legend Black Jesus e-commerce website with products, categories and prices" loading="lazy" /></div>
    <div className="demo-product-window"><BrowserBar address="A closer look / product page" /><img src="/images/web-demo-product.jpg" width="1440" height="1000" alt="A close look at a product page with photos, price, colour and size choices" loading="lazy" /></div>

  </>;
}

function LaunchVisual() {
  return <>
    <div className="demo-launch-desktop"><BrowserBar address="legendblackjesus.co.za" /><img src="/images/web-demo-shop.jpg" width="1440" height="1000" alt="E-commerce website shown on a desktop screen" loading="lazy" /></div>
    <div className="demo-phone"><span className="demo-phone-camera" aria-hidden="true" /><img src="/images/web-demo-mobile.jpg" width="390" height="844" alt="The same Legend Black Jesus store adapted for a phone" loading="lazy" /></div>
    <div className="demo-launch-checks"><span className="demo-check-heading"><i />Ready to go live</span><span><b>✓</b> Mobile layout</span><span><b>✓</b> Product pages</span><span><b>✓</b> Contact & ordering</span></div>

  </>;
}

export function WebDevelopmentShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const scrollArea = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const selectedTarget = useRef<number | null>(null);
  const controls = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = scrollArea.current;
    if (!area) return;
    const desktop = window.matchMedia("(min-width: 901px) and (min-height: 701px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function update() {
      frame = 0;
      if (!area || !desktop.matches || motion.matches) return;
      const distance = area.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -area.getBoundingClientRect().top / Math.max(1, distance)));
      area.style.setProperty("--demo-progress", String(progress));
      const next = Math.min(2, Math.floor(progress * 3));
      if (selectedTarget.current !== null) {
        if (next !== selectedTarget.current) return;
        selectedTarget.current = null;
      }
      if (next !== activeRef.current) { activeRef.current = next; setActiveStep(next); }
    }
    function schedule() { if (!frame) frame = window.requestAnimationFrame(update); }
    function resumeScroll() { selectedTarget.current = null; schedule(); }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("wheel", resumeScroll, { passive: true });
    window.addEventListener("touchstart", resumeScroll, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    motion.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("wheel", resumeScroll);
      window.removeEventListener("touchstart", resumeScroll);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  function selectStage(index: number) {
    activeRef.current = index;
    setActiveStep(index);
    const area = scrollArea.current;
    if (!area) return;
    if (window.matchMedia("(min-width: 901px) and (min-height: 701px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      selectedTarget.current = index;
      const top = area.getBoundingClientRect().top + window.scrollY;
      const distance = area.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + distance * ((index + 0.35) / 3), behavior: "smooth" });
    }
  }

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % stages.length;
    else if (event.key === "ArrowLeft") next = (index + stages.length - 1) % stages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stages.length - 1;
    else return;
    event.preventDefault();
    selectStage(next);
    controls.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus({ preventScroll: true });
  }

  return <section id="services" className="web-showcase" aria-labelledby="services-title">
    <div className="web-showcase-heading wrap"><div><h2 id="services-title">We build websites.</h2><p>Business websites. E-commerce websites. Website maintenance.</p></div><a href="/services/websites">Websites from {portfolioPackage.price} <span aria-hidden="true">↗</span></a></div>
    <div className="web-demo-scroll" ref={scrollArea}><div className="web-demo-pin"><div className="web-demo wrap" id="websites" data-scene={activeStep}>
      <div className="web-demo-topline"><span>Inside the work</span><span className="web-demo-example">Example: Legend Black Jesus</span></div>
      <div className="web-demo-stage">
        <div className="web-demo-grid" aria-hidden="true" />
        <div id="web-demo-panel-0" className={`web-demo-panel demo-design ${activeStep === 0 ? "is-active" : ""}`} role="tabpanel" aria-labelledby="web-demo-tab-0" aria-describedby="web-demo-description" tabIndex={activeStep === 0 ? 0 : -1} aria-hidden={activeStep !== 0}><DesignVisual /></div>
        <div id="web-demo-panel-1" className={`web-demo-panel demo-build ${activeStep === 1 ? "is-active" : ""}`} role="tabpanel" aria-labelledby="web-demo-tab-1" aria-describedby="web-demo-description" tabIndex={activeStep === 1 ? 0 : -1} aria-hidden={activeStep !== 1}><BuildVisual /></div>
        <div id="web-demo-panel-2" className={`web-demo-panel demo-launch ${activeStep === 2 ? "is-active" : ""}`} role="tabpanel" aria-labelledby="web-demo-tab-2" aria-describedby="web-demo-description" tabIndex={activeStep === 2 ? 0 : -1} aria-hidden={activeStep !== 2}><LaunchVisual /></div>
      </div>
      <div className="web-demo-caption"><div className="web-demo-copy"><h3>{stages[activeStep].title}</h3><p id="web-demo-description">{stages[activeStep].description}</p></div><div className="web-demo-tools" role="group" aria-label="Tools used in this stage">{stages[activeStep].tools.length ? stages[activeStep].tools.map(tool => <span key={tool.name}><img src={`/tools/${tool.icon}.svg`} alt="" width="18" height="18" />{tool.name}</span>) : <span><span aria-hidden="true">✓</span> Desktop & mobile</span>}</div></div>
      <div className="web-demo-footer"><div className="web-demo-tabs" role="tablist" aria-label="See how we build a website" ref={controls}>{stages.map((stage, index) => <button key={stage.name} id={`web-demo-tab-${index}`} type="button" role="tab" aria-selected={activeStep === index} aria-controls={`web-demo-panel-${index}`} tabIndex={activeStep === index ? 0 : -1} onClick={() => selectStage(index)} onKeyDown={event => navigateTabs(event, index)}>{stage.name}<i aria-hidden="true" /></button>)}</div></div>
    </div></div></div>
    <div className="web-showcase-bottom wrap" id="process"><p>We handle the design, build and launch. You review the work with us.</p><a href="/services/websites">Discuss your website <span aria-hidden="true">↗</span></a></div>
  </section>;
}
