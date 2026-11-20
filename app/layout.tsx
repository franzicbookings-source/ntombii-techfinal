import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteAnalytics } from "../components/site-analytics";
import { CookieConsent } from "../components/cookie-consent";
import { SiteMotion } from "../components/site-motion";
import { businessSchema, pageMetadata } from "../components/site-seo";
import { StructuredData } from "../components/structured-data";
export const metadata: Metadata = {
  ...pageMetadata({ title: "Website Design in Newcastle & Pretoria", description: "Business and e-commerce website development from Newcastle, KZN, and Pretoria, Gauteng. Serving Pretoria, Centurion and KZN, with remote support across South Africa.", path: "/" }),
  metadataBase: new URL("https://ntombii.tech"),
  title: { default: "Website Design in Newcastle & Pretoria | Ntombii Tech", template: "%s | Ntombii Tech" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }, { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
  verification: { google: "B06mCRBoqWCGnFg93jN7ghc3dO-6hQvvoDtp2ulNBNs" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#253744" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-ZA"><head><link rel="preload" href="/fonts/aeonik-regular.woff" as="font" type="font/woff" crossOrigin="anonymous" /></head><body><StructuredData data={businessSchema} />{children}<SiteAnalytics /><CookieConsent /><SiteMotion /></body></html>;
}
