# Graphics portfolio

Added at `/graphics` on 22 October 2026, using the restored website design as the
base. The request is a portfolio of existing Ntombii Tech social artwork. The
user's job applications are background context and are not public page copy.

The selection contains 12 existing posters from the graphic rework and the first
four campaigns. The user clarified before publication that they dislike
illustration-led posters and want real products, photographs and realistic
mockups. The earlier 15-piece illustrated selection was not published. The
current selection excludes its mazes, drawn objects, abstract ribbons, paperclip
and oversized Print key. The rejected all-faces campaign, funding material and
confidential client screenshots are also excluded. Exact source files are listed in
`docs/graphics-selection.json`; original PNGs remain in the marketing workspace.
Only resizing and WebP encoding were used for the website copies.

The page uses the existing InnerPage shell, logo, colours and typeface. Its own
CSS is scoped to graphics selectors. The homepage, reviews, pricing and global
styling were not polished again. Changes to existing pages are limited to work
navigation, footer links, portfolio category links and the sitemap.

The gallery displays complete posters without cropping. Native dialog viewing
supports previous/next buttons, arrow keys, Escape, focus restoration and opening
the full-resolution image separately. Reduced-motion preferences are respected.
Mobile graphics remain readable as one column; larger screens use two or three.

Validation: TypeScript and Worker build pass. All 12 rendered tests pass. Browser
checks at 320, 390, 768 and 1440px found no horizontal overflow, broken images or
runtime errors. Image viewer, keyboard and mobile navigation checks pass. Axe
WCAG A/AA checks returned no violations on this page at mobile and desktop widths.
QA reports and screenshots are in `/workspace/ntombii-site-qa/graphics/`.

## 22 October update
Added four existing Snesenzo Security Group campaign posters, preserving their client identity and complete square compositions. Brand labels distinguish them from Ntombii campaigns. Promotional imagery is not presented as documentary evidence or a relationship with the pictured retailer. Removed the Amcordam project, story, gallery piece, links, sitemap entry and unused image assets at the owner’s request. The current gallery contains 15 pieces.

## 24 October update

Added 14 selected pieces from the new creative-45 campaign, bringing the gallery to 29. New work leads the gallery; all 15 earlier pieces, including four Snesenzo campaign posters, remain. Selection favours actual website screens and packaging, realistic product visuals and tangible brand mockups. No drawn illustrations, private dashboard records or retired festival work were added. Product illustrations, concept settings and physical mockups are identified accurately in the viewer descriptions. Sources are recorded in graphics-selection.json, with the campaign evidence and asset-provenance records retained. Each new image has an optimised 640px thumbnail and a full image; no source image was upscaled. Existing page layout, navigation, branding and viewer behaviour are preserved. Social share image text now follows the first gallery item.

Validation: TypeScript, production Worker build and all13 existing tests pass. Browser checks at320,390,768 and1440px confirm29 complete images, no horizontal overflow, no runtime errors, working previous/next and wraparound, Escape and focus restoration. Axe WCAG A/AA checks returned no violations at390 and1440px. Screenshots and report are in /workspace/ntombii-site-qa/graphics-update/.
