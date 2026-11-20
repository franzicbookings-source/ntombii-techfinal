# HTML validation and homepage cleanup

The existing ChatGPT Site, canonical URL and public audience are retained.

Validation fixes:

- Percent-encode the square brackets in the Fontshare CSS URL, including React's automatically emitted preload.
- Give the credentials, stage tools, social links, carousel track and testimonial labels meaningful group roles.
- Use a heading for the tools section and an accessible heading for the pricing package section.
- Defer the document's closing body/html tags until Vinext's appended hydration scripts have streamed. HTML still streams progressively; RSC, JSON, image responses and empty bodies pass through unchanged.

The work carousel now presents one accurate existing screenshot, a short explanation and project/live links per slide. Previous/Next controls, native swipe, keyboard navigation and resize handling are retained. Duplicated feature imagery and project-choice rows are removed.

The homepage article section stays immediately before Notes from Ntombii Tech. It uses the established slate blue, shows three previews and links to the complete five-article catalogue. Mobile previews have a small image beside the title instead of a large stacked card.

Verification completed before publication:

- Nu checker 26.10.11 (af56e12), matching the user's report: all 26 sitemap pages, zero errors and zero warnings.
- Production browser checks at 360, 390 and 1280px: carousel buttons, keyboard and touch swipe; compact article height; full catalogue; cookie controls, demonstration tabs, FAQ and mobile navigation; no page errors.
- Streaming regression checks cover all possible byte boundaries, UTF-8/Unicode preservation, scripts within the document, already valid HTML and non-HTML pass-through.
- Existing rendered route tests, TypeScript and whitespace checks pass.

Validation JSON and screenshots are saved in /workspace/artifacts/ntombii-html-validation. Live pages will also be downloaded and checked after publication for the award submission.
