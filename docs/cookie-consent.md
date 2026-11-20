# Cookie choice behaviour and verification

Updated 24 October 2026. The live-site baseline showed that clicking Allow marketing already wrote the consent cookie and closed the banner. The source had no success confirmation, did not show the stored preference when settings reopened, treated any existing cookie value as a choice, silently hid the panel if a write failed, and did not restore the consent event on a returning visit. No Google Analytics or Meta Pixel integration was present.

## Visitor behaviour

A first visitor sees Essential only and Allow marketing. Selecting either writes `ntombii_cookie_choice` with `essential` or `marketing`, path `/`, SameSite=Lax and a 180-day maximum age. Production HTTPS uses Secure. Local HTTP previews do not attach Secure. The write is read back before showing success or enabling the saved marketing state.

Successful saves show a short confirmation. Refreshing, navigating to another page or opening another tab in the same browser restores the choice and keeps the banner closed. Cookie settings in either footer shows the current choice and allows changing it. An explicitly reopened panel receives focus and returns focus to the settings button after saving, closing or Escape. Its Escape handler consumes the event so the existing navigation listener cannot steal focus.

Unknown cookie values reopen the banner and leave marketing disallowed. If the browser refuses the write, the panel stays open, shows an error and does not publish false consent. Browser deletion/expiry of the cookie means a new visit needs a new choice.

## How the owner can verify without developer tools

1. Open https://ntombii.tech in a new private/incognito window.
2. Choose Allow marketing. A confirmation reads “Cookie choice saved: marketing allowed.”
3. Refresh. The banner should stay closed.
4. Open Cookie settings in the footer. It should say “Current choice: Marketing allowed”.
5. Choose Essential only. The new confirmation should appear. Refresh and reopen settings to verify “Current choice: Essential only”.
6. Repeat on an inner page and a phone. These choices belong to the current browser and site origin, so another device/private session starts separately.

## Technical checks

Developer Tools > Application/Storage > Cookies > ntombii.tech shows `ntombii_cookie_choice`, its value and expiry. This preference is intentionally browser-readable; do not mark it HttpOnly if the current client controls must read it.

`document.documentElement.dataset.cookieChoice` returns `unset`, `essential` or `marketing`. On initial hydration and every verified change, `ntombii:consent-changed` carries `{ choice, essential: true, marketing: boolean }`. A missing/invalid choice gives `choice: null` and `marketing: false`. This restores the site-wide preference signal; a future tracker must still explicitly integrate with it and default to disabled.

## What this does not measure

The choice is stored on the visitor's device. It does not send a consent count or identify people to the owner, and accepting does not install analytics or connect a Facebook audience. There is currently no Google Analytics/Meta Pixel integration, consent dashboard or server-side consent reporting. The UI says that no marketing trackers are installed. If an analytics/advertising integration is added later, revise that copy, gate the integration on consent, and test grant, restore and withdrawal against real network requests. No tracking service or visitor reporting was added in this fix.

## Validation

Browser regression checks live in /workspace/ntombii-site-qa/cookies/check.py. They cover fresh visits, accept/reject persistence, returning-visit events, homepage/inner pages, a second tab, settings/current choice, keyboard focus/Escape, invalid cookies, simulated blocked storage, mobile/desktop bounds and absence of Google/Meta tracker requests. Test screenshots and reports remain in that QA directory. Required TypeScript, production build and existing rendered-route tests also run before publication.

Final validation passed: TypeScript, production Worker build, all 13 existing tests; browser flows at 320, 390 and 1440px; invalid values; blocked writes; and axe WCAG A/AA checks at phone and desktop widths. The final browser report contains no JavaScript errors, horizontal overflow or Google/Meta tracking requests. Mobile and desktop cookie settings, success confirmation and blocked-storage screenshots were inspected.
