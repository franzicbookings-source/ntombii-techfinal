# Website changes

- Cut taglines, helper text and secondary labels. If a screen needs them to make sense, fix the layout.
- Make the best decision that will elevate all three: the user experience (UX), developer experience (DX), and agent experience (AX) always, without breaking anything.
- Use plain, natural English. Keep copy specific to the service or project, cut repetition and vague sales phrases, and preserve client quotes. Background information shared in conversation is context, not public website copy, unless the owner explicitly asks to publish it.
- Preserve the existing brand, logo, palette and core layout. Keep real service details, prices, reviews and contact details accurate. WhatsApp remains the main call to action.
- Keep accessible names, visible form labels, validation, transactional status and material service conditions. These are functional information, not decorative copy.
- Shared service navigation lives in components/navigation-links.ts. Keep internal destinations, heading structure, canonical URLs and structured data consistent with the visible pages.
- Verify with npx tsc --noEmit, npm run build and node --test tests/*.test.mjs. Review changed layouts on desktop and phones and exercise affected interactions before publication.

- Replace decorative sequence numbering with small, content-specific illustrated icons. The owner rejects numbered feature/process labels as generic. Preserve meaningful numbers such as prices, contact details, quantities and accessible carousel position announcements. Use the shared ContentIllustration component and keep icons decorative when adjacent copy supplies their meaning.

- Use professional service terminology with plain-English explanations: e-commerce websites, responsive web design, search engine optimisation (SEO), website maintenance and support, company registration assistance, and tender application support. Use South African/British English and the spelling “e-commerce”. Retain the personal studio voice and approved hero/About headings. Describe shopping carts, WhatsApp ordering and online payments according to each project's actual functionality. CMS and admin-dashboard claims require confirmed scope; do not add them to packages merely as a wording change. Preserve client quotations and published URLs.

- Approved packages: Portfolio from R2,500 (up to 3 static pages), Business from R3,500 (up to 6 pages and a CMS for website content), Shopify e-commerce from R5,000 (existing theme customisation and up to 10 initial products). Use components/website-packages.ts as the source for prices, features and examples. Custom operational dashboards are quoted separately. Shopify subscription includes hosting and is separate from our one-time setup fee. Preserve two revision rounds per stage and 14 days of post-launch support.
