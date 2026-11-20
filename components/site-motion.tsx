"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "./site-motion.css";

/**
 * Sitewide motion layer, progressively enhancing server-rendered pages. Nothing here hides content
 * that is already on screen, and none of it runs for visitors who prefer reduced motion.
 * - Headings below the fold reveal word by word; illustrations draw their lines.
 * - Project clips land in 3D as they scroll in and tilt toward a fine pointer.
 * - Buttons lean toward a fine pointer; the header hides on scroll down and returns on scroll up.
 */
export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    const belowFold = (element: Element) => element.getBoundingClientRect().top > window.innerHeight * 0.92;

    // Reveal once, when an element enters the viewport.
    const pending = new Set<Element>();
    function reveal(element: Element) {
      element.classList.add("motion-in");
      element.classList.remove("motion-pending");
      pending.delete(element);
      revealer.unobserve(element);
    }
    const revealer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target); }), { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });
    cleanups.push(() => revealer.disconnect());

    // Headings: wrap each word so it can rise out of its own line.
    document.querySelectorAll<HTMLElement>("main section h2:not(.sr-only):not(.tools-title)").forEach(heading => {
      if (heading.dataset.split || heading.querySelector("a, button") || !belowFold(heading) || (heading.textContent ?? "").trim().split(/\s+/).length > 9) return;
      heading.dataset.split = "true";
      heading.setAttribute("aria-label", (heading.textContent ?? "").replace(/\s+/g, " ").trim());
      let index = 0;
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
      for (const node of textNodes) {
        const fragment = document.createDocumentFragment();
        for (const part of (node.textContent ?? "").split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) { fragment.append(part); continue; }
          const word = document.createElement("span");
          word.className = "split-word";
          word.setAttribute("aria-hidden", "true");
          word.style.setProperty("--i", String(index++));
          word.textContent = part;
          fragment.append(word);
        }
        node.replaceWith(fragment);
      }
      heading.classList.add("is-split", "motion-pending");
      pending.add(heading);
      revealer.observe(heading);
    });

    // Illustrations: draw each stroke, then fill the soft wash.
    document.querySelectorAll<SVGSVGElement>("main .content-illustration").forEach(icon => {
      if (icon.dataset.draw || !belowFold(icon)) return;
      icon.dataset.draw = "true";
      icon.querySelectorAll<SVGGeometryElement>("path:not(.illustration-wash), rect, circle").forEach((shape, index) => {
        const length = Math.ceil(shape.getTotalLength?.() ?? 0);
        if (!length) return;
        shape.style.setProperty("--length", String(length));
        shape.style.setProperty("--i", String(index));
      });
      icon.classList.add("motion-pending");
      pending.add(icon);
      revealer.observe(icon);
    });

    // Scroll-linked effects share one rAF loop.
    const workCarousel = document.querySelector<HTMLElement>("#work .work-carousel");
    const landing = [...document.querySelectorAll<HTMLElement>(".portfolio-case .project-motion")];
    if (workCarousel) landing.push(workCarousel);
    const steps = document.querySelector<HTMLElement>(".process-steps");
    const hero = document.querySelector<HTMLElement>(".hero-shell");
    const header = document.querySelector<HTMLElement>(".inner-header");
    let frame = 0;
    let lastY = window.scrollY;
    function update() {
      frame = 0;
      const viewport = window.innerHeight;
      // Safety net: anything scrolled past (a fast scroll or a jump link) is revealed at once.
      for (const element of pending) if (element.getBoundingClientRect().top < viewport) reveal(element);
      for (const element of landing) {
        const top = element.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, (viewport - top) / (viewport * 0.65)));
        const eased = 1 - Math.pow(1 - progress, 3);
        element.style.setProperty(element === workCarousel ? "--carousel-land" : "--land", (1 - eased).toFixed(4));
      }
      if (steps) {
        const box = steps.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (viewport * 0.85 - box.top) / (box.height + viewport * 0.35)));
        steps.style.setProperty("--progress", progress.toFixed(4));
      }
      if (hero) {
        const shift = Math.min(window.scrollY, hero.offsetHeight + 200);
        hero.style.setProperty("--hero-shift", `${(shift * 0.35).toFixed(1)}px`);
      }
      if (header) {
        const y = window.scrollY;
        const busy = document.body.style.overflow === "hidden" || header.querySelector("[aria-expanded=\"true\"]");
        header.classList.toggle("is-scrolled", y > 8);
        if (busy || y < 240 || y < lastY - 4) header.classList.remove("is-hidden");
        else if (y > lastY + 4) header.classList.add("is-hidden");
        lastY = y;
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); });
    if (header) {
      const reveal = () => header.classList.remove("is-hidden");
      header.addEventListener("focusin", reveal);
      cleanups.push(() => header.removeEventListener("focusin", reveal));
    }

    if (finePointer) {
      // Project clips tilt toward the pointer, with a soft sheen where it rests.
      document.querySelectorAll<HTMLElement>(".project-motion").forEach(clip => {
        const move = (event: PointerEvent) => {
          const box = clip.getBoundingClientRect();
          const x = (event.clientX - box.left) / box.width, y = (event.clientY - box.top) / box.height;
          clip.style.setProperty("--tilt-x", `${((0.5 - y) * 6).toFixed(2)}deg`);
          clip.style.setProperty("--tilt-y", `${((x - 0.5) * 8).toFixed(2)}deg`);
          clip.style.setProperty("--sheen-x", `${(x * 100).toFixed(1)}%`);
          clip.style.setProperty("--sheen-y", `${(y * 100).toFixed(1)}%`);
          clip.classList.add("is-pointer");
        };
        const leave = () => { clip.classList.remove("is-pointer"); clip.style.setProperty("--tilt-x", "0deg"); clip.style.setProperty("--tilt-y", "0deg"); };
        clip.addEventListener("pointermove", move);
        clip.addEventListener("pointerleave", leave);
        cleanups.push(() => { clip.removeEventListener("pointermove", move); clip.removeEventListener("pointerleave", leave); });
      });

      // Buttons lean a little toward the pointer.
      document.querySelectorAll<HTMLElement>(".button, .project-motion-toggle, .work-slider-controls button").forEach(button => {
        const move = (event: PointerEvent) => {
          const box = button.getBoundingClientRect();
          const x = (event.clientX - box.left - box.width / 2) * 0.18, y = (event.clientY - box.top - box.height / 2) * 0.3;
          button.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
        };
        const leave = () => { button.style.translate = ""; };
        button.addEventListener("pointermove", move);
        button.addEventListener("pointerleave", leave);
        cleanups.push(() => { button.removeEventListener("pointermove", move); button.removeEventListener("pointerleave", leave); button.style.translate = ""; });
      });
    }

    return () => cleanups.forEach(cleanup => cleanup());
  }, [pathname]);

  return null;
}
