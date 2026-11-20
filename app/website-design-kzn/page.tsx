import { packagePriceSummary } from "@/components/website-packages";
import { ContentIllustration } from "@/components/content-illustration";
import { pageMetadata } from "@/components/site-seo";
import Link from "next/link";
import { ProjectPreview } from "@/components/project-preview";
import { InnerPage } from "@/components/inner-pages";

export const metadata = pageMetadata({
  title: "Website Design in KZN | Newcastle, Osizweni & Madadeni",
  description: "Business and e-commerce websites for Newcastle, Osizweni, Madadeni and businesses across KZN. View Ntombii Tech's real projects, prices and remote website design process.",
  path: "/website-design-kzn",
});

const quote = "https://wa.me/27812360230?text=" + encodeURIComponent("Hi Ntombii Tech, I'd like a quote for a website for my business in KZN.");

export default function KznWebsiteDesignPage() {
  return <InnerPage>
    <section className="detail-hero"><div className="wrap detail-hero-grid">
      <div>
        <Link className="inner-back" href="/services/websites">← Website services</Link>
        <p className="eyebrow">Based in Newcastle · Working across KZN</p>
        <h1>Website design for businesses across KwaZulu-Natal.</h1>
        <p className="detail-intro">We build business and e-commerce websites for Newcastle, Osizweni, Madadeni and the rest of KZN. Show your services or products and give customers a way to enquire or order from their phones.</p>
        <a className="button button-white" href={quote} target="_blank" rel="noreferrer">Ask for a website quote <span aria-hidden="true">↗</span></a>
      </div>
      <ProjectPreview compact />
    </div></section>

    <section className="depth-section wrap"><div className="depth-intro"><h2>Plan and review your website with us.</h2></div><div className="depth-prose"><p>We work from Newcastle, KZN, and Pretoria, Gauteng, and handle projects across KwaZulu-Natal over WhatsApp and online calls. Meetings near Newcastle are by appointment.</p><p>Whether it’s your first site, a redesign or an e-commerce website, we agree on the pages, features, price and timeline before starting. You review the site with us on phones and desktops before launch.</p></div></section>

    <section className="kzn-coverage wrap"><div><h2>Website design in your part of KZN.</h2></div><div><p>A shop may need product pages and orders; a contractor may need service details and a quote form. Tell us about your customers and the work you do so we can recommend the pages you need.</p><p>Businesses in Durban, Pietermaritzburg and other KZN towns can follow the whole process online. Send your town, business details and photos. We’ll plan and review the site with you without you needing to travel to Newcastle.</p></div></section>

    <section className="depth-points wrap" aria-label="Website project steps">
      <article><ContentIllustration kind="chat" /><h3>Tell us what you need</h3><p>Share what your business does, your location and what the website should help people do.</p></article>
      <article><ContentIllustration kind="review" /><h3>Agree on a quote</h3><p>We plan the pages and features together. {packagePriceSummary} The final price depends on the scope.</p></article>
      <article><ContentIllustration kind="browser" /><h3>Build and review</h3><p>We create the site, check it with you on phones and desktops, then prepare it to launch.</p></article>
    </section>

    <section className="depth-section wrap"><div className="depth-intro"><h2>See the work for yourself.</h2></div><div className="depth-prose"><p>The Legend Black Jesus store lets shoppers browse clothing and order on WhatsApp. Snesenzo Security Group’s website explains its services and helps visitors request a quote. Explore the projects below.</p><div className="website-context-links"><Link href="/work">Explore our website projects <span aria-hidden="true">↗</span></Link><Link href="/work/snesenzo-security">Security company website <span aria-hidden="true">↗</span></Link><Link href="/website-design-pretoria">Website design in Pretoria and Centurion <span aria-hidden="true">↗</span></Link><Link href="/pricing">View website packages <span aria-hidden="true">↗</span></Link></div></div></section>

    <section className="kzn-final"><div className="wrap"><h2>Tell us about your business.</h2><p>Send us your town, what you do and the kind of website you have in mind. We’ll discuss the pages and quote with you.</p><a className="button button-white" href={quote} target="_blank" rel="noreferrer">Request a website quote <span aria-hidden="true">↗</span></a></div></section>
  </InnerPage>;
}
