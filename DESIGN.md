# Current website design

November 2026 refresh of the restored original site. The studio uses Aeonik, navy and pale blue. Real client work supplies the photography and colour in the website portfolio.

## What changed

- **No eyebrow labels.** The small pill labels above headings are gone sitewide. Where a label carried a real condition (for example "available on request" or "based in Newcastle"), that wording now sits in the page text.
- **Website portfolio.** The homepage pairs one film with a named project index on desktop and a swipeable film on phones. The films sit straight on the section's navy. Each plays once with a thin progress line, then the next project comes in; choosing a project, swiping, using the arrows or the keyboard hands control back to the visitor, and that film loops. On `/work` the opening project pairs a film with a detail from the same site, followed by alternating pairs of projects. Case studies open with the film and brief, and finish with a link to the next project in `components/portfolio-projects.ts` order.
- **Project films.** 12-second HyperFrames films built from captures of each live site: the site's sections as 3D layers fold into a browser, the page scrolls, the browser narrows into a phone, and the loop closes on the opening frame. `components/project-motion.tsx` plays them while visible, with tap and keyboard controls. Reduced-motion and data-saver visitors see the poster until they opt in. See `scripts/motion/README.md` to capture, edit and render them.
- **Homepage.** Same order and format. The fake design/code editor showcase is replaced by three plain steps (with `ContentIllustration` icons), the spinning "Let's build something" badge and the heading's selection-box decoration are removed, the articles preview is removed (articles remain at `/articles`), and the "Have a website question?" band is light so it no longer merges with the dark contact section. The homepage now uses the shared `InnerNavigation` header.
- **Copy.** Plainer wording for non-technical readers, keeping professional terms with short explanations (for example "Content management system (CMS): an editor to change…"). Prices, conditions, approved headings and client quotes are unchanged.

## Motion

`components/site-motion.tsx` (mounted once in `app/layout.tsx`) with `components/site-motion.css`. No animation library; one IntersectionObserver and one scroll loop. Nothing runs for visitors who prefer reduced motion, and nothing hides content that is already on screen.

- Hero: headline lines rise out of a mask, then the text, buttons, badges and quote card settle in (CSS only, so no flash before JavaScript loads). The background drifts slower than the page.
- Headings below the fold reveal word by word (headings containing links are left alone). `ContentIllustration` icons draw their lines.
- Process steps: a line fills across each card in turn as you scroll.
- Portfolio frames stay level so the motion comes from the films. Elsewhere, supporting project clips tilt toward a fine pointer.
- Buttons lean toward a fine pointer. The header is sticky, hides on scroll down and returns on scroll up or keyboard focus.

## Where styles live

- `app/globals.css` ends with the **November 2026 refresh** block: the source of truth for button, link and focus states and for the redesigned homepage sections. Earlier blocks in the file are older layers that still style the inner pages.
- Unused rules (from removed sections) were deleted from the stylesheets, so a class that appears in CSS should be in use.
- Component styles: `components/project-motion.css`, `components/pricing-comparison.css`, `components/project-screens.css` and others next to their components.

The `design/` directory contains historical references from earlier designs; it does not describe the current site.
