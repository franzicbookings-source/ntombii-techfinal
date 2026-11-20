"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ImgHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import "./image-frame.css";

type ImageFrameProps = {
  as?: "div" | "a" | "button" | "link";
  className: string;
  image: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };
  before?: ReactNode;
  after?: ReactNode;
  href?: string;
  label?: string;
  onActivate?: () => void;
  announce?: boolean;
  style?: CSSProperties;
  tabIndex?: number;
  role?: string;
  hasPopup?: "dialog";
};

function retryUrl(url: string, attempt: number) {
  return attempt ? `${url}${url.includes("?") ? "&" : "?"}_image_retry=${attempt}` : url;
}
function Frame({ as = "div", image, className, before, after, href, label, onActivate, announce = false, style, tabIndex, role, hasPopup }: ImageFrameProps) {
  const [state, setState] = useState<"initial" | "loading" | "loaded" | "error">("initial");
  const [attempt, setAttempt] = useState(0);
  const element = useRef<HTMLImageElement>(null);
  const actionable = as !== "div";
  useEffect(() => {
    const img = element.current;
    setState(img?.complete ? (img.naturalWidth > 0 ? "loaded" : "error") : "loading");
  }, [attempt]);
  function retry() { setState("loading"); setAttempt(value => value + 1); }
  function activate(event: MouseEvent<HTMLElement>) {
    if (state === "error") { event.preventDefault(); event.stopPropagation(); retry(); }
    else onActivate?.();
  }
  const content = <>
    {before}
    <img {...image} key={attempt} ref={element} src={retryUrl(image.src, attempt)}
      srcSet={image.srcSet?.split(",").map(part => { const [src, ...descriptor] = part.trim().split(/\s+/); return [retryUrl(src, attempt), ...descriptor].join(" "); }).join(", ")}
      onLoad={event => { setState("loaded"); image.onLoad?.(event); }}
      onError={event => { setState("error"); image.onError?.(event); }} />
    {(state === "loading" || state === "error") && <span className={`image-load-feedback${state === "loading" ? " image-loading" : ""}`} role={announce ? "status" : undefined} aria-hidden={announce ? undefined : true}>
      {state === "loading" ? <span>Loading image…</span> : <><span>Image couldn’t load.</span>{actionable ? <span className="image-retry-label">Try again ↻</span> : null}</>}
    </span>}
    {state === "error" && !actionable && <button className="image-retry" type="button" onClick={retry}>Try again <span aria-hidden="true">↻</span></button>}
    {state !== "error" && after}
  </>;
  const props = {
    className: `${className} image-frame`, style, tabIndex, role,
    "data-image-state": state, "aria-busy": state === "loading",
    "aria-label": actionable && state === "error" ? `Retry image: ${image.alt}` : label,
    "aria-haspopup": state === "error" ? undefined : hasPopup,
    onClick: actionable ? activate : undefined,
  };
  if (as === "link") return <Link {...props} href={href!}>{content}</Link>;
  if (as === "a") return <a {...props} href={href}>{content}</a>;
  if (as === "button") return <button {...props} type="button">{content}</button>;
  return <div {...props}>{content}</div>;
}

// Reset status when switching artwork; cached images are checked after mounting.
export function ImageFrame(props: ImageFrameProps) {
  return <Frame key={props.image.src} {...props} />;
}
