# Generated homepage references: analysis before implementation

Inspected the actual pixels of references 01–07 on 5 November 2026. These PNGs are design references only. All page text, controls, navigation, form fields, pricing and testimonials must remain native HTML; original assets and structured source data replace their rendered counterparts in the references.

## Shared visual system

Exact existing brand facts: Aeonik from `/fonts/aeonik-regular.woff`; navy `#1B242B`; ink `#252B30`; slate `#506F82`; darker slate `#354F61`; pale surface `#EDF0F3`; white `#FFFFFF`; exact logo SVGs in `/brand/`. Use the real vectors, not the image model's recreation. Reference pixels include tonal variation and antialiasing; their colour samples should not replace these known source tokens.

Observed design logic: one dark opening followed by alternation between white and very pale slate, generous horizontal space, left-aligned short headings, strong but calm sans-serif hierarchy, thin horizontal rules, bounded authentic media and minimal enclosure. No giant wrapper cards, nested panels, glow, decorative serial numbers or tiny pseudo-system labels. Buttons are slate/white with an arrow; text links usually have a modest underline. The primary hero button is pill-shaped; several generated secondary buttons appear more squared, so use the established pill family consistently rather than inventing a second button system.

Spatial estimates from the images, not extracted CSS: content occupies roughly 85–90% of each canvas; media and quote corners appear around 12–18 CSS pixels once mapped to a 1280px content area; major section gaps approximately 88–112px; row gaps around 24–32px. Suggested responsive translation: cap content at 1280px, use 24px phone gutters and 40–64px desktop gutters, reduce section spacing to 56–72px on phones. These are implementation choices preserving the visible proportions, not claims of exact measured source CSS.

Typography relationship: H1 is regular and about 1.4–1.6× the section title; section titles appear medium/semibold, not heavy display type. Body text is unusually readable in the generated references. Preserve this by avoiding inherited 12–14px explanatory copy: target 18–20px body and 16–18px form controls, with real functional labels. Use concise headings and natural line breaks; H1 must remain two lines on desktop and must fit without overflow at 320px.

## 01 — Header and hero

Two-column dark composition: left literal service statement, one location/audience sentence, white quote button and quiet work link; right large white form. Main headline reads `Websites and online stores.` in two balanced lines. Header contains logo, a plain link row and one quote button. No surrounding navigation pill, circular stamp, outlined selected-word effect or badge cluster remains. Background is primarily navy, with a restrained tonal slate wash along the bottom.

The form is a clear white surface, around 46% of the content width, with approximately 32–40px internal padding. Name and optional business fields share a row; project selection and message span the width. Pale neutral inputs, thin borders, modest rounding, full-width slate action. Form labels are visible and dark. Native input/select/textarea/button semantics and required validation must survive.

Implementation corrections: use the exact logo SVG. Keep full live navigation destinations/dropdowns even though the concept's `Services` and `Work` appear as simple labels. Keep all existing service options. The reference says `Send on WhatsApp`, but current extracted form's `Continue in WhatsApp` is more accurate: submission only prepares a message. Preserve the review-and-send status and fallback link. At 1366×768, headline, main CTA and main form action should fit or remain naturally reachable without setting a clipped fixed height. Stack copy above form on phones.

## 02 — Toolkit

Short light section; prominent left-aligned `Our toolkit` heading, then two spacious rows of slate monochrome brand marks/names, finished with a thin rule. It is a toolkit, not a client trust bar. No explanatory paragraph or badge is required. The first row contains Codex, Paper, Figma, Framer, Canva, Cursor and Vercel; the second Grokbot, Notion AI, Slack, Wispr Flow, Claude, Make and Perplexity.

Use existing authentic logo SVGs and existing fallback text for Paper. Generated logos are approximate and should never be traced or shipped. Retain every tool, accessible static list, hover/focus pause and reduced-motion behavior if using the existing opposing marquees. On phones, maintain legible logos and names rather than shrinking all fourteen into one viewport.

## 03 — Design/build/launch showcase

Pale slate full section. Heading `Design. Build. Launch.` and right-aligned `Website services ↗`, followed by a fine rule. The body is roughly one-third explanatory controls and two-thirds bounded real website preview. The observed concept uses **horizontal** Design/Build/Launch tabs above the left paragraph (despite the original prompt suggesting vertical tabs). Active Design has a short slate underline. The authentic Legend Black Jesus screen occupies the dominant right area with one simple frame, not a fabricated editor or device stack. A lower rule separates the short closing sentence `You review the work with us.`

Preserve all three existing process states and keyboard tab behavior. All process copy should come from live baseline source. The selected screenshot corresponds to the real Design state; Build/Launch must use authentic existing assets and actual service descriptions. Avoid dropping the existing interactive process simply because the reference shows a still. On narrow screens put controls/description before media; do not create overflow or lock scrolling.

## 04 — Founder

White section with a generous portrait column on the left, narrative on the right, a short `Hi, I’m Sabelo.` heading and a slate contact button. Portrait is approximately 42% of available width in a 4:5 frame; its caption is below the photo, not an overlay. Caption hierarchy: Sabelo Ndlovu, then Founder & Digital Product Developer in slate. Text column preserves all three real story paragraphs, with readable line length and space between paragraphs. No decorative metadata chips.

Use `/images/sabelo-portrait.webp` directly: do not ship the model-rendered likeness. Keep the complete three-paragraph story from baseline notes/source. The generated social row incorrectly depicts LinkedIn, GitHub and YouTube. Replace it with the existing real Instagram, Facebook, LinkedIn and email links through `SocialLinks`; do not invent accounts. Mobile can stack text then portrait or retain source reading order, but must show the entire story and normal-flow caption.

## 05 — Portfolio

Pale slate section. `Our work` with `View all work ↗`, thin rule, one large authentic Legend Black Jesus preview and a narrow glimpse of the Snesenzo Security Group slide on the right. The preview is the main focal point (approximately 84% of row width); rounded corners are restrained. Native project title, one factual sentence and two underlined actions sit underneath. Prev/next are true circular buttons aligned at the right of caption area; the next button is filled slate and previous white/outlined.

Use `portfolioProjects`, original screenshots, alt text and real case-study/live URLs. Never use the generated composite as a project image. Preserve touch swipe, keyboard arrows/Home/End, wraparound, focus visibility, resize correction, inactive-slide `inert` and live announcement. The glimpse of the next card may be implemented within the carousel track, but must not cause document horizontal overflow. On phones preview remains large enough to recognize and controls remain at least 44×44px.

## 06 — Pricing

White background; short `Website packages` heading; three horizontal open comparison rows separated by subtle rules. Each row has package/price, concise description, feature list and a single quote action. Business receives a pale full-row tint, not a dark standout card. Within rows there is one delicate divider separating description/features; there are no nested card frames. Bottom conditions are readable, with online-store/custom quote action to the right.

Use `websitePackages` for every package name, price, note and feature. Exact prices remain From R2,500 / R3,500 / R7,500. Retain 1–3 / up to 6 / up to 10 pages, two revision rounds per stage, 14 days after-launch support, and quote-specific hosting/domain arrangements. `Online stores from R5,500` is meaningful, not decorative text. Keep all data on phones by stacking each row into a coherent package group, rather than shrinking a four-column table. If shared PricingComparison is restored to live behavior for other routes, scope new row styling only under the redesigned homepage root.

## 07 — Reviews

Very pale slate section, `Reviews` on left and `View all ↗` on right. Two spacious white flat quote blocks are visible, with authentic round photo, name, service context, fine separator and readable quote. Corners roughly 14–18px; no star score, rating, logo badge or fabricated statistic. The quote itself is the largest content element after the title.

The concept shows Anele Mbatha/Enquiry workflow and Sibusiso Blose/CSD profile support with genuine quotes. Use original images and all nine entries from `testimonials.ts`, not just these two examples. Keep all review content accessible even when the live lane animation shows only a subset. Preserve pause and reduced-motion behavior. Context labels are factual information identifying the reviewed service, so keep them despite the general direction to remove decorative secondary labels.

## Fidelity and verification priorities

1. Preserve the hero's service clarity, two-column balance and quiet bottom wash; do not reintroduce the live smoky background, badge cluster or rotating seal.
2. Preserve changes of pace: toolkit compact; process media-led; founder editorial; work expansive; pricing flat/structured; reviews human/readable.
3. Scope new homepage CSS. Existing global stylesheet has many legacy overrides; visual work must not silently change service, pricing or contact routes.
4. Keep native text and controls, source data and exact assets ahead of imagegen's spelling, logos, UI-state omissions and invented social icons.
5. Compare screenshots at 1440px and 1366px desktop plus 390px and 320px phone widths. Exercise all inherited interactions, reduced motion, validation/status, and actual WhatsApp URL contents.

## 08 — Questions / FAQ

White full-width section. `Questions` is a large plain heading at left; `Ask on WhatsApp ↗` is a quiet right-aligned action. All eight questions appear as full-width open rows with fine rules. The first question is expanded and its answer occupies a pale slate inset, with comfortable padding and a modest corner radius. The remaining questions are closed. Plus/minus is contained in a small pale rounded square at the far right, while the whole question row should be the clickable button.

Retain all eight live questions and answers from baseline source, including the practical pricing/hosting conditions, realistic timelines, nationwide availability, search-ranking caveat and after-launch support. Image wording abbreviates some headings (`Can we work together outside Newcastle?`, `What happens after launch?`); this is harmless visual simplification, but the existing full question wording can remain for semantic consistency. Preserve one-open-by-default behavior, `aria-expanded`, answer IDs, keyboard activation and focus style. Ensure long questions can wrap naturally without colliding with the expand icon. The cost answer correctly preserves R2,500 / R3,500 / R7,500 and online stores from R5,500.

## 09 — Additional services

Pale slate section, large `Additional services` heading and one meaningful condition: `Available on request. We’ll confirm availability before agreeing on work.` Five flat rows use a slate content-specific line illustration at left, service title plus one concise description in the centre, and diagonal arrow at right. Horizontal rules separate the rows; there are no cards or decorative sequence numbers. The bottom underlined destination is `Printing, signage or toner in KZN? ↗`.

The five real destinations remain Business setup, Tender support, Opportunities & applications, Branding & print, AI & digital tools. Use existing `AdditionalServices` data and `ContentIllustration`, with decorative icons hidden from assistive technology where adjacent text conveys their meaning. Each whole service row should be an actual link to the real route; arrows are not separate meaningless links. Preserve the availability condition and printing/supplies destination. On phones allow the title and description to wrap with a stable small icon column, without forcing the heading or arrow off-canvas.

## 10 — Latest articles

White section with heading `Latest articles` and `All articles ↗` aligned at the opposite edge. Three open columns, each with a bounded authentic illustration above a readable two-line article title, category/read-time and a text link. Images have restrained rounded corners and equal aspect ratio; no outer card border or enclosing background. The comp shows existing toner/ink, business-printing and signage imagery. Article metadata is meaningful content, not decoration.

Use actual `articleSummaries` and existing latest-by-date selection; do not hard-code the three pictured entries or freeze article order. The comp shortens titles, but real source titles remain the factual source of truth and may wrap to three lines when needed. Use original local images and alt text rather than the model-rendered product/brand mockups. Keep card image/title/read links on their canonical article routes. Reduce to one column on phones or a usable responsive intermediate grid; do not squeeze the three columns into small unreadable type. The existing explanatory intro can be trimmed as repeated copy, while retaining all article destinations and the meaningful category/read-time.

## 11 — WhatsApp tips

Pale slate two-column section: left a strong two-line `Business tips on WhatsApp.` heading, one short sentence, and an obvious slate `Get tips on WhatsApp ↗` button; right one large authentic LBJ screen in a simple rounded frame. The composition is flat and spacious, with no fake browser/editor chrome, layered labels or micro-badges.

This remains the existing WhatsApp advice handoff, not a newsletter signup, broadcast subscription, promise of automated updates or new backend. Keep the exact existing encoded WhatsApp destination/message (business tips about websites, Google, printing or signage). Use an existing authentic screenshot directly. The current three-screen decorative artwork can be translated into the single media frame shown by the comp; preserve the section and action rather than requiring the old decorative layering. For visual variety, source `web-demo-shop.jpg` is also faithful to the existing artwork while avoiding a third identical homepage screenshot elsewhere. On phones stack copy/action above media and keep the button text inside its available width.

## 12 — Contact and footer

A navy contact band returns to the opening palette. Left: large two-line `Let’s build your website.` and one white quote CTA. Right: straightforward contact details in normal document flow, separated by subtle light rules: WhatsApp 081 236 0230, email hello@ntombii.tech, Newcastle KZN, nationwide service and Monday–Friday 09:00–17:00 SAST. No floating boxed business card or decorative labels beyond functional contact channel names. Below, a white footer uses the exact dark logo, a wrapping link row, fine divider and compact copyright/privacy/cookie controls.

Use actual WhatsApp/mailto links, real hours and locality. Keep all live footer destinations, privacy and functional `CookieSettingsLink`; do not implement Cookie settings as a dead plain text label. The generated single desktop navigation row is wider than many real laptop containers: use flex-wrap or a deliberate responsive grid instead of shrinking links or overflowing. The email must wrap safely (`overflow-wrap:anywhere` or equivalent) and remain a single mailto anchor; never position it absolutely over other contact rows. Contact heading, details and footer must all grow with their text. At narrow widths stack the two contact columns and footer rows with clear spacing. Any floating WhatsApp widget must stay clear of these links and active form inputs.

## 13 — Mobile hero and quote form

Inspected the full tall mobile comp. It stacks exact logo/menu, the literal two-line service heading, the Newcastle/nationwide sentence, quote/work actions, then one white form in normal flow. The navy/slate tonal wash continues behind the entire opening. Every form field is present: Your name, Business name (optional), Project select, Message textarea and full-width `Continue in WhatsApp` button. Name and business become separate full-width fields. The menu is a native button, not an image.

The generated canvas is an illustrative high-resolution comp, not measured mobile CSS; do not scale its raster type down proportionally and accidentally create 9–12px labels. Use native minimum 16px input/select/textarea text to prevent mobile zoom, comfortable visible labels, at least 44px controls/touch targets and 24px-ish phone gutters. At 320px allow heading, CTA text and labels to wrap or adjust size without clipping. Both actions can wrap to separate rows when their combined width exceeds the viewport. Preserve required name/service/message, optional business, max lengths, all service options, current autocomplete, textarea resizing if supported, accurate status and persistent fallback. Do not force the complete long form into one fixed viewport or crop it to mimic the static image. The hero can scroll naturally.

## 14 — Mobile portfolio

Inspected the dedicated tall mobile work comp (869×1810). It keeps a pale slate background, short `Our work` heading and a `View all ↗` action, then a large nearly full-width authentic LBJ preview. Beneath the media are native project title, factual description, prominent View project action, quieter Live website link and a separate lower row of comfortably spaced previous/next circular buttons. Unlike the desktop comp, no narrow next-slide preview is required on phones. This allows the active media to remain recognizable without causing overflow.

Preserve carousel swipe/keyboard behavior, all real URLs and inactive-slide focus management. Use the actual screenshot as media; only the screenshot's own inner site text is rasterized, while the surrounding project title/description/actions remain native. Use source data for the full Legend Black Jesus title and description rather than flattening the whole comp. At 320px let the heading/action row or project actions wrap, keep buttons at least 44×44px and prevent the next-control row from overlapping captions. The comp's generous vertical spacing is a cue, not a requirement to set a tall fixed section height.

## 15 — Mobile pricing

Inspected the final mobile pricing comp (1073×1466). The three packages appear sequentially with subtle horizontal separators; Business has a pale row tint. Package name and slate price sit at left, features and slate quote button at right. Actual prices and feature counts are correct. The closing revision/support/hosting conditions remain visible.

The image model retained **two columns**, which would become cramped if copied literally at a real 320–390px viewport. The approved responsive translation takes precedence: below 600px each package must become one coherent vertical group in native flow—name/From price, actual `pkg.note`, all features, then quote button—with body text at least 16px and 44px minimum touch targets. Keep the pale Business distinction as a flat row highlight, not a nested-card hierarchy. The comp omits the package notes; do not omit these factual source descriptions in code merely because the model left them out. It also omits the online-store/custom link; keep the approved Online stores from R5,500 / custom-quote destination below the conditions. Preserve the precise two rounds per stage, 14 days after-launch support and quote-specific hosting/domain arrangements.

## Image-analysis gate complete

All fifteen references have now been inspected as actual pixels: twelve desktop section references and three dedicated mobile references. They are readable enough to implement. The corrections above resolve model omissions and responsive issues without requiring another generation. Preserve source facts, original assets, native controls and accessible behavior ahead of literal raster details. No website code was changed by this analysis task.
