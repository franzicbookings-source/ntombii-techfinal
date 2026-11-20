import { packagePriceSummary } from "@/components/website-packages";
import Link from "next/link";
import { ContentIllustration } from "@/components/content-illustration";
import { InnerPage } from "@/components/inner-pages";
import { meetingInformation, pretoriaAreas } from "@/components/locations";
import { ProjectPreview } from "@/components/project-preview";
import { businessId, pageMetadata, siteUrl } from "@/components/site-seo";
import { StructuredData } from "@/components/structured-data";

export const metadata = pageMetadata({
  title: "Website Design in Pretoria & Centurion",
  description: `${packagePriceSummary} Serving Pretoria and Centurion.`,
  path: "/website-design-pretoria",
});

const quote = "https://wa.me/27812360230?text=" + encodeURIComponent("Hi Ntombii Tech, I'd like a website quote for my business in Pretoria or Centurion. My area is: ");
const service = {
  "@context": "https://schema.org", "@type": "Service",
  "@id": `${siteUrl}/website-design-pretoria#service`,
  name: "Website design in Pretoria and Centurion",
  url: `${siteUrl}/website-design-pretoria`,
  provider: { "@id": businessId },
  serviceType: ["Business websites", "E-commerce websites", "Website redesigns", "Website maintenance", "Local SEO"],
  description: "Website design and digital support for businesses in Pretoria and Centurion, with meetings by appointment and remote planning, review and support.",
  areaServed: pretoriaAreas.map(name => ({ "@type": "Place", name })),
};

export default function PretoriaWebsiteDesignPage() {
  return <InnerPage>
    <StructuredData data={service} />
    <section className="detail-hero"><div className="wrap detail-hero-grid">
      <div>
        <Link className="inner-back" href="/services/websites">← Website services</Link>
        <h1>Website design in Pretoria and Centurion.</h1>
        <p className="detail-intro">We build business and e-commerce websites for Pretoria and Centurion. Show your services, share your work and let customers request a quote or place an order from their phones.</p>
        <a className="button button-white" href={quote} target="_blank" rel="noreferrer">Discuss your website <span aria-hidden="true">↗</span></a>
      </div>
      <ProjectPreview compact />
    </div></section>

    <section className="depth-section wrap"><div className="depth-intro"><h2>Work directly with our team.</h2></div><div className="depth-prose">
      <p>You work with the people designing and building your site. We plan the pages and content with you, agree on the price and timeline, then review the website together before launch.</p>
      <p>{meetingInformation} Send your business name, area and an example of the kind of website you need. If you already have a site, share the link and tell us what you’d like to improve.</p>
    </div></section>

    <section className="kzn-coverage wrap"><div><h2>Websites, stores and ongoing support.</h2></div><div>
      <p>We build service pages with work examples and quote forms, and e-commerce websites with product details and ordering options. If you already have a website, we can review its content, design and phone layout before quoting for a redesign.</p>
      <p>Updates, maintenance and local SEO are available too. We can improve page titles, service information and location details to help search engines understand your site. No particular search ranking is guaranteed.</p>
      <p>We take website enquiries across Pretoria and Centurion, including Pretoria East, Pretoria North, Hatfield, Brooklyn, Lynnwood and Menlyn, as well as Irene and Lyttelton. Tell us your area when you enquire so we can discuss any meeting arrangements.</p>
    </div></section>

    <section className="depth-points wrap" aria-label="Website project steps">
      <article><ContentIllustration kind="chat" /><h3>Plan the pages</h3><p>We ask what you offer, who your customers are and what they should do on the site. Bring your logo, photos and any existing content.</p></article>
      <article><ContentIllustration kind="review" /><h3>Agree on the work</h3><p>You receive a scope, price and timeline covering the pages, features and content. We confirm domain, hosting and third-party costs in the quote.</p></article>
      <article><ContentIllustration kind="browser" /><h3>Build, review and launch</h3><p>We review the site with you on phones and desktops, check the enquiry or ordering path, and prepare it to go live. Website packages include 14 days of support after launch.</p></article>
    </section>

    <section className="depth-section wrap"><div className="depth-intro"><h2>Some of our website work.</h2></div><div className="depth-prose">
      <p>Snesenzo Security Group’s site explains its services and collects quote enquiries. Legend Black Jesus lets shoppers choose clothing and order on WhatsApp. Friday Consulting presents six service areas and helps visitors prepare a project brief.</p>
      <div className="website-context-links">
        <Link href="/work/snesenzo-security">Snesenzo Security Group <span aria-hidden="true">↗</span></Link>
        <Link href="/work/legend-black-jesus">Legend Black Jesus <span aria-hidden="true">↗</span></Link>
        <Link href="/work/friday-consulting">Friday Consulting <span aria-hidden="true">↗</span></Link>
      </div>
    </div></section>

    <section className="depth-faq wrap"><div><h2>Before we start.</h2></div><div>
      <details><summary>What does a website cost?<span aria-hidden="true">+</span></summary><p>{packagePriceSummary} These are one-time design and setup fees. The final quote depends on the pages, content and features. Packages include two rounds of revisions per stage; domain, hosting and any third-party costs are confirmed in your quote. <Link href="/pricing">Compare website packages.</Link></p></details>
      <details><summary>Can we meet in Pretoria or Centurion?<span aria-hidden="true">+</span></summary><p>Yes, by appointment. Message us with your area and what you need so we can confirm a time and meeting arrangements. You can also handle the whole project over WhatsApp and online calls.</p></details>
      <details><summary>Can you help after the website launches?<span aria-hidden="true">+</span></summary><p>Website packages include 14 days of support after launch. We can quote separately for ongoing maintenance, content changes, new pages or local SEO as your business grows.</p></details>
      <details><summary>Do you offer digital tools and training too?<span aria-hidden="true">+</span></summary><p>Yes, on request. We can discuss practical ChatGPT training and digital workflows for your team, online or by appointment. We agree on the task, tools, subscriptions and scope before setup. <Link href="/services/ai-digital-tools">Explore digital tool support.</Link></p></details>
    </div></section>

    <section className="kzn-final"><div className="wrap"><h2>What should your website do?</h2><p>Send your business name, your area in Pretoria or Centurion and what you have in mind. We’ll discuss the pages, features and quote with you.</p><a className="button button-white" href={quote} target="_blank" rel="noreferrer">Ask for a website quote <span aria-hidden="true">↗</span></a><div className="website-context-links"><Link href="/website-design-kzn">Website design in KZN <span aria-hidden="true">↗</span></Link><Link href="/contact">Contact details <span aria-hidden="true">↗</span></Link></div></div></section>
  </InnerPage>;
}
