"use client";

import { studioLocation } from "./locations";
import { ActiveLink as Link } from "./active-link";
import { usePathname } from "next/navigation";
import { serviceNavigationLinks } from "./navigation-links";
import { WorkNavigation } from "./work-navigation";
import { useEffect, useRef, useState } from "react";

const whatsapp = "https://wa.me/27812360230?text=Hi%20Ntombii%20Tech%2C%20I'd%20like%20a%20website%20quote.";

export function InnerNavigation() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab" && open && menu.current) {
        const links = Array.from(menu.current.querySelectorAll<HTMLAnchorElement>("a"));
        const last = links[links.length - 1];
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle.current?.focus(); }
        if (event.shiftKey && document.activeElement === toggle.current) { event.preventDefault(); last?.focus(); }
      }
    }
    function outside(event: MouseEvent) {
      if (dropdown.current && !dropdown.current.contains(event.target as Node)) setServicesOpen(false);
    }
    document.addEventListener("keydown", key);
    document.addEventListener("click", outside);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", key);
      document.removeEventListener("click", outside);
    };
  }, [open]);

  return <header className="inner-header">
    <div className="site-header wrap">
      <Link href="/" className="brand brand-light" aria-label="Ntombii Tech home"><img src="/brand/ntombii-logo-light.svg" width="1200" height="200" alt="Ntombii Tech" /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/">Home</Link><Link href="/about">About</Link>
        <div className="nav-dropdown" ref={dropdown}>
          <button type="button" aria-expanded={servicesOpen} aria-controls="inner-services-menu" data-active={pathname.startsWith("/services") || pathname === "/website-design-kzn" || pathname === "/printing-signage-toner-kzn" || undefined} onClick={() => setServicesOpen(!servicesOpen)}>Services <span className={`chevron ${servicesOpen ? "up" : ""}`} /></button>
          <div id="inner-services-menu" className="dropdown-panel" hidden={!servicesOpen}>
            {serviceNavigationLinks.map(({ label, href }) => <Link key={href} href={href} onClick={() => setServicesOpen(false)}>{label}</Link>)}
          </div>
        </div>
        <WorkNavigation /><Link href="/articles">Articles</Link><Link href="/pricing">Pricing</Link><Link href="/contact">Contact</Link>
      </nav>
      <a className="button button-blue header-cta" href={whatsapp} target="_blank" rel="noreferrer">Get a quote <span aria-hidden="true">↗</span></a>
      <button ref={toggle} className={`menu-toggle ${open ? "open" : ""}`} type="button" aria-expanded={open} aria-controls="inner-mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
    <div className="mobile-menu" id="inner-mobile-menu" ref={menu} hidden={!open}>
      <nav aria-label="Mobile navigation">
        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        {serviceNavigationLinks.slice(0, 1).map(({ label, href }) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href="/about" onClick={() => setOpen(false)}>About</Link><Link href="/work" onClick={() => setOpen(false)}>Our work</Link><Link href="/graphics" onClick={() => setOpen(false)}>Graphic design</Link><Link href="/articles" onClick={() => setOpen(false)}>Articles</Link>
        <Link href="/pricing" onClick={() => setOpen(false)}>Website pricing</Link><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        <Link className="mobile-secondary-link" href="/services#additional-services" onClick={() => setOpen(false)}>Additional services</Link>
        <a className="mobile-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Ask for a quote</a>
      </nav>
      <p>{studioLocation}</p>
    </div>
  </header>;
}
