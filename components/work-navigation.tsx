"use client";

import { ActiveLink as Link } from "./active-link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

export function WorkNavigation() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  return <div className="nav-dropdown" ref={root}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => {
      if (event.key !== "Escape" || !open) return;
      event.stopPropagation();
      setOpen(false);
      trigger.current?.focus();
    }}>
    <button ref={trigger} type="button" aria-expanded={open} aria-controls={id} data-active={pathname === "/graphics" || pathname.startsWith("/work") || undefined} onClick={() => setOpen(value => !value)}>Our work <span className={`chevron ${open ? "up" : ""}`} /></button>
    <div id={id} className="dropdown-panel" hidden={!open}>
      <Link href="/work" onClick={() => setOpen(false)}>Websites</Link>
      <Link href="/graphics" onClick={() => setOpen(false)}>Graphic design</Link>
    </div>
  </div>;
}
