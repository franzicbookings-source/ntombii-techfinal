"use client";

import { useEffect, useState } from "react";

const defaultHref = "https://wa.me/27812360230?text=" + encodeURIComponent("Hi Sabelo, I'd like to talk about a project.");

/** Keep contact available without covering the task or an equivalent inline action. */
export function FloatingContact({ href = defaultHref }: { href?: string }) {
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll("main form, main .pricing-comparison, main .graphics-grid, main .reviews-grid, main a.button[href*='wa.me']");
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setCovered(visible.size > 0);
    });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return <a className="floating-contact" href={href} target="_blank" rel="noreferrer" aria-label="Chat to Sabelo on WhatsApp" hidden={covered}>
    <span className="floating-contact-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M27 15.5a11.5 11.5 0 0 1-17 10L4 27l1.5-6A11.5 11.5 0 1 1 27 15.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="m12 9-2 2c-.5 4 5 10 10 10l2-2-4-3-2 2c-2-1-3-2-4-4l2-1Z" fill="currentColor" /></svg></span>
    <span className="floating-contact-photo"><img src="/images/sabelo-portrait.webp" alt="" width="48" height="48" /></span>
    <span className="floating-contact-copy"><strong>WhatsApp</strong></span><span className="floating-contact-arrow" aria-hidden="true">↗</span>
  </a>;
}
