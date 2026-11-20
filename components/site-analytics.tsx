"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { consentEvent } from "./analytics-consent";
import { syncAnalyticsConsent, trackPageView, trackWhatsAppClick } from "./analytics";

export function SiteAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    const sync = (event?: Event) => {
      const choice = (event as CustomEvent<{ choice?: string }> | undefined)?.detail?.choice;
      syncAnalyticsConsent(choice === "analytics"); trackPageView();
    };
    sync();
    window.addEventListener(consentEvent, sync);
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || !(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.closest(".quote-form, .regional-enquiry-form")) return;
      let url: URL;
      try { url = new URL(anchor.href); } catch { return; }
      if (url.hostname !== "wa.me" || url.pathname !== "/27812360230") return;
      const placement = anchor.closest("header") ? "header"
        : anchor.closest(".hero") ? "hero"
        : anchor.closest(".pricing-comparison, #pricing, .detail-price") ? "pricing"
        : anchor.closest(".floating-contact") ? "floating"
        : anchor.closest("#contact, .inner-contact") ? "contact" : "content";
      trackWhatsAppClick(placement);
    };
    document.addEventListener("click", click);
    return () => { window.removeEventListener(consentEvent, sync); document.removeEventListener("click", click); };
  }, []);
  useEffect(() => { syncAnalyticsConsent(); trackPageView(); }, [pathname]);
  return null;
}
