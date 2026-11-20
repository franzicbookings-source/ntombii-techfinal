# Website audit: first release

24 October 2026. Implements the first release proposed in the read-only website audit. Existing logo, Satoshi, slate palette, prices, services, review wording, project content and core page structure remain in place.

## Delivered

- One shared FloatingContact component for home and inner pages. IntersectionObserver hides the floating action while forms, pricing, gallery/review reading grids or inline WhatsApp buttons are visible. CSS also hides it for focused fields and open dialogs. Phones use a compact 52px WhatsApp icon; the larger existing treatment remains elsewhere. Navigation-open behaviour is retained.
- `/reviews` presents all nine existing approved client reviews in a stable reading grid. Both existing “View all” links now go there. A shared testimonials data file keeps the marquee and full page consistent; no review text, ratings or new clients were invented.
- `/privacy` describes the actual WhatsApp handoff, current cookie, 180-day preference duration, absence of analytics/marketing trackers, external font requests and contact route. Linked from both footers and sitemap. No unsupported payment, retention-duration or business-contract promises were added.
- A branded `not-found` page retains HTTP 404 and gives home/work/contact recovery paths.
- Active navigation for home, inner pages, nested articles/projects and service/work menus, using current-page or current-location semantics.
- Homepage main now includes the hero H1 and quote form. The global header remains outside main; a consistent dark header surface preserves its identity.
- Project breadcrumb and screenshot-caption contrast corrected within the slate palette.
- Nine review portraits use 160px WebP thumbnails. The full-resolution toner image uses an optimised WebP. Those ten served image variants fall from 4,716,691 bytes to 202,436 bytes, approximately 96% less. This is asset-byte reduction, not a page-speed or traffic claim. Original assets are retained.

## Verification

TypeScript, production build and all 17 tests pass, including new checks for missing-page status/recovery, the complete review page, homepage landmark content and public privacy route. Browser coverage checks all 28 sitemap routes plus a missing URL at 320, 390 and 1440px. Form/price obstruction, current navigation, WhatsApp message construction and popup fallback, cookie persistence and graphics-viewer controls are exercised. No external messages are sent. The final refinements were rechecked on the affected routes at all three widths. The missing page uses the branded recovery content and 404 status; the current hosting renderer still inherits the site title for unmatched URLs. Axe WCAG A/AA checks cover representative changed pages. Evidence and screenshots: /workspace/ntombii-site-qa/audit-release/.

## Following work

The audit's portfolio curation, richer case studies, project walkthrough, homepage flow changes and measurement setup are subsequent releases, not part of this bounded release. New public client work, testimonials, business terms or performance outcomes must use actual approved material. No analytics provider was added or purchase made.
