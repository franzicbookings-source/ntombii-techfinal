# Website audit: portfolio release

24 October 2026. Continues the approved audit work with graphics browsing and stronger case studies. Existing identity, artwork, client details, project links, service prices and core layout remain intact.

## Graphics

The collection opens with nine selected pieces, mixing actual website work, product packaging, tangible mockups and client campaigns. All 29 original entries remain in the server-rendered HTML and CollectionPage image schema. The remaining entries are hidden until requested, so the opening feed is shorter. No original image or description was replaced.

Five understated filter buttons provide All work, Client campaigns, Websites, Products, and Print & branding. The filtered groups contain four, seven, nine and nine pieces respectively. Show more reveals the mixed collection in batches of nine and focuses the first newly revealed item. The full-size viewer follows the chosen collection, including wraparound keyboard navigation. Direct artwork fragment URLs reveal the requested item even if it was outside the opening selection. Selecting a filter clears the fragment while preserving browser navigation state.

Ordering, grouping and page size are maintained in components/graphic-collections.ts. This is a browsing improvement, not a search service or new campaign claim.

## Case studies

Both existing project stories retain their hero, project facts, features, actual screenshots and live links. Copy now states the website's practical design problem and ties decisions to visible details. A screen explorer replaces the repeated generic three-column explanation and static screenshot block. Homepage, product/service page and phone tabs show the original screens with relevant explanations. Full-size images open in a native dialog, with a keyboard-scrollable inspection region and original-image link. Closing restores body scrolling and focus; keyboard tabs support arrows, Home and End.

The Legend Black Jesus explanation covers clothing-first navigation, grouped price/colour/size/quantity choices and the mobile product grid. The Snesenzo explanation covers team photography, service inclusions and enquiry actions, plus the mobile reading order. These describe observable screen contents, not measured sales outcomes or invented client quotes. No additional client, private dashboard, per-person project credit, performance metric or testimonial was introduced.

## Verification

TypeScript, production build and all 19 rendered tests pass. Browser evidence in /workspace/ntombii-site-qa/portfolio-release/ checks four widths (320, 390, 768 and 1440px), all filters, every pagination batch, direct fragments, filtered viewer wraparound, focus restoration and scroll unlocking. Both cases exercise every screen tab, full-size opening/closing and keyboard navigation. Accessibility checks cover gallery and case pages at phone and desktop sizes, plus an open screenshot dialog. Screenshots are visually reviewed for intact images, text wrapping and responsive alignment. Previous cookie, contact, review and pricing behaviour receives a targeted smoke check before publication.
