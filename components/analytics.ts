import { analyticsConfig } from "./analytics-config";
import { readAnalyticsChoice } from "./analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}
type HandoffForm = "website_quote" | "kzn_print";
let initialized = false;
let active = false;
let sessionOptOut = false;
let lastPage: string | null = null;

function browser(): Window { return window; }
function allowed() {
  return !sessionOptOut && typeof window !== "undefined" && window.location.hostname === analyticsConfig.hostname
    && /^G-[A-Z0-9]+$/.test(analyticsConfig.measurementId) && readAnalyticsChoice() === "analytics";
}
function pageDetails() {
  let referrer = "";
  try { referrer = document.referrer ? new URL(document.referrer).origin : ""; } catch { /* Invalid referrers are omitted. */ }
  return {
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_title: document.title,
    page_referrer: referrer,
  };
}
function clearAnalyticsCookies() {
  try {
    const names = document.cookie.split(";").map(cookie => cookie.trim().split("=")[0])
      .filter(name => name === "_ga" || name.startsWith("_ga_"));
    for (const name of names) {
      for (const domain of ["", `; Domain=${analyticsConfig.hostname}`, `; Domain=.${analyticsConfig.hostname}`]) {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain}`;
      }
    }
  } catch { /* Restricted cookie storage must not prevent the site from working. */ }
}

export function stopAnalytics(explicitChoice = false) {
  if (typeof window === "undefined") return;
  if (explicitChoice) sessionOptOut = true;
  const view = browser();
  const wasActive = active;
  active = false;
  lastPage = null;
  view[`ga-disable-${analyticsConfig.measurementId}`] = true;
  // Discard events still queued while the script was downloading.
  if (wasActive && view.dataLayer) {
    for (let i = view.dataLayer.length - 1; i >= 0; i--) {
      if ((view.dataLayer[i] as ArrayLike<unknown>)?.[0] === "event") view.dataLayer.splice(i, 1);
    }
  }
  if (wasActive) view.gtag?.("consent", "update", { analytics_storage: "denied" });
  clearAnalyticsCookies();
}

export function syncAnalyticsConsent(renewConsent = false) {
  if (typeof window === "undefined") return;
  if (renewConsent && readAnalyticsChoice() === "analytics") sessionOptOut = false;
  if (!allowed()) { stopAnalytics(); return; }
  const view = browser();
  if (active) return;
  active = true;
  view[`ga-disable-${analyticsConfig.measurementId}`] = false;
  if (!initialized) {
    view.dataLayer ??= [];
    view.gtag = function () { view.dataLayer!.push(arguments); };
    view.gtag("consent", "default", {
      analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    });
    view.gtag("js", new Date());
    view.gtag("set", "ads_data_redaction", true);
    view.gtag("set", "url_passthrough", false);
    view.gtag("config", analyticsConfig.measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: analyticsConfig.cookieLifetimeSeconds,
      ...pageDetails(),
    });
    const script = document.createElement("script");
    script.id = "ntombii-google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.measurementId}&l=dataLayer`;
    document.head.appendChild(script);
    initialized = true;
  } else {
    view.gtag?.("consent", "update", { analytics_storage: "granted" });
  }
}

export function trackPageView() {
  if (!active || !allowed()) return;
  const path = window.location.pathname;
  if (lastPage === path) return;
  lastPage = path;
  browser().gtag?.("event", "page_view", pageDetails());
}
export function trackQuoteHandoff(form: HandoffForm) {
  if (!active || !allowed()) return;
  browser().gtag?.("event", "quote_form_handoff", { ...pageDetails(), form_type: form });
}
export function trackWhatsAppClick(placement: "header" | "hero" | "pricing" | "contact" | "floating" | "content") {
  if (!active || !allowed()) return;
  browser().gtag?.("event", "whatsapp_click", { ...pageDetails(), placement });
}
