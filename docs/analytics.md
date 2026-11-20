# Ntombii Tech analytics

GA4 Measurement ID: `G-JT3MH8VDXB`. This is a public identifier; account credentials are not stored in the repository.

## Property settings

Use the owner's existing Google Analytics property for `https://ntombii.tech`.

- Keep **Enhanced measurement off** in Admin → Data streams → the web stream. The site sends page views itself; automatic history tracking would duplicate them, and automatic outbound events could include WhatsApp message URLs.
- Keep **User-provided data collection off** in Admin → Data collection and modification → Data collection. Do not enable automatic detection of contact details.
- Keep Google Signals, advertising integrations and personalization off for this implementation.
- Use South Africa time and ZAR. No API secret is needed for browser collection.

## Collection

The shared ID is configured in `components/analytics-config.ts`. Collection is limited to the canonical production hostname. Local development and the Sites hostname do not send analytics.

No Google script is loaded before an explicit `analytics` choice in `ntombii_cookie_choice`. The old `marketing` value is not analytics consent. Essential-only choices remain valid. Withdrawal stops measurement and removes the site's `_ga` cookies; it does not delete historical records from Google's account.

Events:

- `page_view`: initial consented page and subsequent path changes, once per navigation.
- `whatsapp_click`: a WhatsApp link, labelled by a fixed page placement.
- `quote_form_handoff`: a valid website or KZN-print form prepared for WhatsApp. Its fallback link does not generate a second event and keeps the prepared message out of its HTML href.

These are enquiry actions, not verified messages, sales or completed leads. Parameters contain public page paths/titles, referrer origins and fixed labels. Do not add names, business names, email addresses, enquiry text, raw destination URLs, page queries or fragments. GA cookies are configured for up to 180 days from the last visit.

## Verification

1. Run `npx tsc --noEmit`, `npm run build`, then `node --test tests/*.test.mjs`.
2. In a clean browser, verify no Google requests or `_ga` cookies before consent or after choosing Essential only.
3. Accept analytics on `ntombii.tech`. Check the tag and collection requests target the configured ID, and verify the page view in the owner's GA4 Realtime report.
4. Follow internal links and use Back/Forward; check one page view per page navigation. Test an enquiry with dummy data only, and inspect the analytics payload for excluded fields.
5. Switch to Essential only and confirm no further events and no remaining `_ga` cookies. Test with tracking blockers and blocked cookie storage; the site and enquiry forms must still work.

Google references: https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic and https://developers.google.com/analytics/devguides/collection/ga4/views.

## Existing account-side event rule

The live Google tag also defines `ads_conversion_Request_quote_1`, triggered when a page view's path starts with `/services`. It labels a service-page visit, not a submitted enquiry. The owner should remove this generated rule in GA4's event settings, or exclude it from lead reporting. Use the site's `whatsapp_click` and `quote_form_handoff` events to measure enquiry actions. This account-side rule cannot be edited using the website's public Measurement ID.
