import Link from "next/link";
import { InnerPage } from "@/components/inner-pages";
import { GraphicsGallery } from "@/components/graphics-gallery";
import { WorkCategories } from "@/components/work-categories";
import { pageMetadata, businessId, siteUrl } from "@/components/site-seo";
import { StructuredData } from "@/components/structured-data";
import works from "@/components/graphic-works.json";
import "./graphics.css";

export const metadata = pageMetadata({
  title: "Graphic Design Portfolio",
  description: "Selected social media graphics for Ntombii Tech and other businesses, featuring products, real website work, photography and brand mockups.",
  path: "/graphics",
  image: works[0].full,
  imageAlt: works[0].alt,
});

export default function GraphicsPage() {
  return <InnerPage>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${siteUrl}/graphics#portfolio`, name: "Ntombii Tech graphic design portfolio", url: `${siteUrl}/graphics`, description: "Selected social media graphics and campaign artwork created for Ntombii Tech and other businesses.", publisher: { "@id": businessId }, hasPart: works.map(work => ({ "@type": "ImageObject", name: work.title, description: work.description, contentUrl: `${siteUrl}${work.full}`, thumbnailUrl: `${siteUrl}${work.thumbnail}`, url: `${siteUrl}/graphics#${work.slug}` })) }} />
    <WorkCategories active="graphics" />
    <section className="editorial-heading graphics-heading wrap">

      <h1>Graphic design portfolio.</h1>
      <p>Social posts, campaign artwork and brand mockups for Ntombii Tech and other businesses.</p>

    </section>
    <GraphicsGallery />
    <section className="graphics-contact"><div className="wrap"><div><h2>Graphics for your business.</h2><p>Tell us what the design needs to say and where you’ll use it: on social media, in print or on your website.</p></div><div className="graphics-contact-actions"><a className="button button-white" href="https://wa.me/27812360230?text=Hi%20Ntombii%20Tech%2C%20I%27d%20like%20to%20discuss%20social%20media%20graphics%20for%20my%20business." target="_blank" rel="noreferrer">Discuss a design <span aria-hidden="true">↗</span></a><Link className="text-link" href="/services/branding-print">Branding & print services <span aria-hidden="true">↗</span></Link></div></div></section>
  </InnerPage>;
}
