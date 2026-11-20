# Current website design

November 2026 refresh of the restored original site. The palette, Aeonik type, logo and page layouts are unchanged; the refresh removes decoration and makes every control respond.

## What changed

- **No eyebrow labels.** The small pill labels above headings are gone sitewide. Where a label carried a real condition (for example "available on request" or "based in Newcastle"), that wording now sits in the page text.
- **3D motion clips of real work.** Each project in `components/portfolio-projects.ts` has a clip of its live site scrolling on a laptop and phone (`public/videos/work/`). `components/project-motion.tsx` shows it on the homepage carousel, `/work`, every project page, and the services, pricing and regional page heroes. Clips load only when on screen, stay paused for reduced-motion and data-saver visitors, and always have a pause/play button. To add or refresh a clip, see `scripts/motion/README.md`.
- **Homepage.** Same order and format. The fake design/code editor showcase is replaced by three plain steps (with `ContentIllustration` icons), the spinning "Let's build something" badge and the heading's selection-box decoration are removed, the articles preview is removed (articles remain at `/articles`), and the "Have a website question?" band is light so it no longer merges with the dark contact section. The homepage now uses the shared `InnerNavigation` header.
- **Copy.** Plainer wording for non-technical readers, keeping professional terms with short explanations (for example "Content management system (CMS): an editor to change…"). Prices, conditions, approved headings and client quotes are unchanged.

## Where styles live

- `app/globals.css` ends with the **November 2026 refresh** block: the source of truth for button, link and focus states and for the redesigned homepage sections. Earlier blocks in the file are older layers that still style the inner pages.
- Unused rules (from removed sections) were deleted from the stylesheets, so a class that appears in CSS should be in use.
- Component styles: `components/project-motion.css`, `components/pricing-comparison.css`, `components/project-screens.css` and others next to their components.

The `design/` directory contains historical references from earlier designs; it does not describe the current site.
