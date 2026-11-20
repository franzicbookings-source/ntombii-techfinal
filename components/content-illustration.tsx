/** Small, decorative editorial illustrations. The adjacent copy carries the meaning. */
export type IllustrationKind = "browser" | "bag" | "palette" | "document" | "chat" | "search" | "review" | "settings" | "location" | "people" | "shield" | "phone";

export function illustrationFor(text: string): IllustrationKind {
  const value = text.toLowerCase();
  if (/phone|desktop|mobile|responsive/.test(value)) return "phone";
  if (/whatsapp|contact|enquir|message|question|discuss|tell us|conversation|personal/.test(value)) return "chat";
  if (/review|check|approve|agree|quote|price|proof|submit/.test(value)) return "review";
  if (/location|coverage|area|where|route/.test(value)) return "location";
  if (/search|find|browse|discover|notice/.test(value)) return "search";
  if (/photo|graphic|colour|color|design|logo|brand identity|print|signage/.test(value)) return "palette";
  if (/e-commerce|ecommerce|shop|store|product|clothing|collection|bag|order|buy|sell|size/.test(value)) return "bag";
  if (/story|community|team|company introduction|introduce|business information/.test(value)) return "people";
  if (/security|protect|compliance|tax/.test(value)) return "shield";
  if (/document|form|certificate|register|registration|record|prepare|application|content|copy/.test(value)) return "document";
  if (/update|support|launch|fix|tool|automat|connect|integrat|maintain/.test(value)) return "settings";
  return "browser";
}

export function ContentIllustration({ kind, className = "" }: { kind: IllustrationKind; className?: string }) {
  return <svg className={`content-illustration ${className}`} viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path className="illustration-wash" d="M10 9 35 6 43 20 38 40 15 43 5 28Z" fill="currentColor" stroke="none" />
    {kind === "browser" && <><rect x="8" y="11" width="32" height="26" rx="3" /><path d="M8 18h32M13 14.5h.1m4 0h.1M14 24h9v7h-9m14-7h6m-6 5h6" /></>}
    {kind === "bag" && <><path d="m11 17-2 23h30l-2-23ZM18 19v-6a6 6 0 0 1 12 0v6" /><path d="m20 28 3 3 6-7" /></>}
    {kind === "palette" && <><path d="M25 8C14 8 7 15 7 24s7 15 15 15c5 0 7-3 4-6-2-3 0-5 4-5h4c6 0 8-5 5-10S31 8 25 8Z" /><circle cx="16" cy="19" r="1.8" /><circle cx="24" cy="14" r="1.8" /><circle cx="32" cy="19" r="1.8" /><circle cx="13" cy="28" r="1.8" /></>}
    {kind === "document" && <><path d="M12 7h17l8 8v26H12ZM29 7v9h8M18 23h13m-13 6h13m-13 6h8" /><path d="m8 13-2 25" /></>}
    {kind === "chat" && <><path d="M10 10h28a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H22l-10 7v-7h-2a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3Z" /><path d="M15 19h18m-18 7h12" /></>}
    {kind === "search" && <><circle cx="21" cy="21" r="12" /><path d="m30 30 10 10M16 17h10m-10 6h7" /></>}
    {kind === "review" && <><path d="M16 10h-5v31h27V10h-6" /><rect x="17" y="6" width="14" height="8" rx="2" /><path d="m17 26 5 5 10-11" /></>}
    {kind === "settings" && <><path d="m24 8 4 5 7-1 1 7 5 5-5 5-1 7-7-1-4 5-5-5-7 1-1-7-5-5 5-5 1-7 7 1Z" /><circle cx="24" cy="24" r="7" /></>}
    {kind === "location" && <><path d="M36 19c0 9-12 21-12 21S12 28 12 19a12 12 0 0 1 24 0Z" /><circle cx="24" cy="19" r="4" /><path d="m9 35-4 7h12m14 0h12l-4-7" /></>}
    {kind === "people" && <><circle cx="20" cy="16" r="6" /><path d="M8 39v-5a12 12 0 0 1 24 0v5ZM31 10a6 6 0 0 1 0 12m5 5a10 10 0 0 1 5 9v3" /></>}
    {kind === "shield" && <><path d="m24 6 15 6v11c0 10-15 19-15 19S9 33 9 23V12Z" /><path d="m17 23 5 5 10-11" /></>}
    {kind === "phone" && <><rect x="13" y="6" width="22" height="36" rx="4" /><path d="M20 10h8M18 17h12v15H18m5 5h2" /></>}
  </svg>;
}
