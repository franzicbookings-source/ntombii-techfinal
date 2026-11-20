"use client";

import { stopAnalytics } from "./analytics";
import { useEffect, useRef, useState } from "react";

import { cookieName, consentEvent, readAnalyticsChoice as readChoice, type AnalyticsChoice as Choice } from "./analytics-consent";
const settingsEvent = "ntombii:cookie-settings";

function publishChoice(choice: Choice | null) {
  document.documentElement.dataset.cookieChoice = choice ?? "unset";
  window.dispatchEvent(new CustomEvent(consentEvent, {
    detail: { choice, essential: true, analytics: choice === "analytics", marketing: false },
  }));
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const panel = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const saved = readChoice();
    setChoice(saved);
    setOpen(saved === null);
    publishChoice(saved);
    const show = (event: Event) => {
      const saved = readChoice();
      const detail = (event as CustomEvent<{ trigger?: HTMLElement }>).detail;
      trigger.current = detail?.trigger ?? null;
      setChoice(saved);
      setNotice("");
      setError("");
      setOpen(true);
    };
    window.addEventListener(settingsEvent, show);
    return () => window.removeEventListener(settingsEvent, show);
  }, []);

  useEffect(() => {
    if (open && trigger.current) panel.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 6000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function close() {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
    trigger.current = null;
  }

  function choose(value: Choice) {
    if (value === "essential") stopAnalytics(true);
    try {
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${cookieName}=${value}; Max-Age=15552000; Path=/; SameSite=Lax${secure}`;
      if (readChoice() !== value) throw new Error("Cookie storage unavailable");
    } catch {
      setError("Your browser couldn’t save this choice. Check that cookies are allowed for this site, then try again.");
      return;
    }
    setChoice(value);
    setError("");
    publishChoice(value);
    setNotice(`Cookie choice saved: ${value === "analytics" ? "analytics allowed" : "essential only"}.`);
    close();
  }

  return <>
    {open && <aside ref={panel} className="cookie-consent" aria-labelledby="cookie-choice-title" aria-describedby="cookie-choice-description" tabIndex={-1}
      onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); event.nativeEvent.stopImmediatePropagation(); if (choice !== null) close(); } }}>
      <div className="cookie-heading"><strong id="cookie-choice-title">Your cookie choice</strong>{choice !== null && <button type="button" className="cookie-close" aria-label="Close cookie settings" onClick={close}>×</button>}</div>
      <div><p id="cookie-choice-description">Essential storage remembers your choice. Optional analytics helps us understand page visits and enquiry clicks.</p>
        {choice !== null && <p className="cookie-current">Current choice: <b>{choice === "analytics" ? "Analytics allowed" : "Essential only"}</b></p>}
      </div>
      {error && <p className="cookie-error" role="alert">{error}</p>}
      <div className="cookie-actions"><button type="button" aria-pressed={choice === "essential"} onClick={() => choose("essential")}>Essential only</button><button type="button" aria-pressed={choice === "analytics"} onClick={() => choose("analytics")}>Allow analytics</button></div>
    </aside>}
    <p className={notice ? "cookie-status" : "cookie-announcement"} role="status" aria-live="polite" aria-atomic="true">{notice}</p>
  </>;
}

export function CookieSettingsLink() {
  return <button className="cookie-settings-link" type="button" onClick={event => window.dispatchEvent(new CustomEvent(settingsEvent, { detail: { trigger: event.currentTarget } }))}>Cookie settings</button>;
}
