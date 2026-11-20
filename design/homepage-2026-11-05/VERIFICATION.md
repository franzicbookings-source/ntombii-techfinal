# Homepage verification — 5 November 2026

The full restored live homepage (Sites version 71) is the content and supporting-page baseline. The shortened version 72 was not used as the visual starting point.

- TypeScript: `npx tsc --noEmit` passed after the final component changes.
- Production build and Worker artifact validation passed.
- `node --test tests/*.test.mjs`: 19 passed, 0 failed.
- Browser QA: 36 functional checks passed. Quote messages were intercepted locally; no WhatsApp messages were sent.
- Layouts reviewed at 1440×900, 1280×800, 390×844 and 320×740, including reduced motion. No document overflow, clipped headings, broken assets or browser errors were found.
- Supporting pricing, contact and website-services routes match the restored live baseline headings, content and page heights.
- Final targeted checks confirmed package text contrast, heading weights, all carousel arrow hit-tests at seven widths, floating-contact contrast/visibility and a full-height tablet menu with keyboard focus behavior.

Browser evidence is recorded in [browser-results.json](browser-results.json) and [final-targeted-results.json](final-targeted-results.json). Generated references are design documentation outside `public/`; the deployed page uses native HTML and original brand/project assets.

The existing public audience, URLs, metadata, structured data, service conditions and WhatsApp handoff remain intact. No dependency, backend, tracker or public API was added.
