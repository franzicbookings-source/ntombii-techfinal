"use client";
import { awardArticlePath, awardVerificationUrl } from "./web-design-award";
import { packagePriceSummary, shopifyPackage, shopifyCosts, portfolioPackage } from "./website-packages";
import { studioIntroduction, meetingInformation } from "./locations";
import { trackQuoteHandoff } from "./analytics";
import { testimonials } from "./testimonials";
import { FloatingContact } from "./floating-contact";
import { InnerNavigation } from "./inner-navigation";
import { PricingComparison } from "./pricing-comparison";
import { NewsletterSection, SocialLinks } from "./studio-sections";
import { AdditionalServices } from "./service-chapters";
import { WorkShowcase } from "./work-showcase";
import { FounderIntro } from "./founder-intro";
import { ContentIllustration, type IllustrationKind } from "./content-illustration";
import { StudioFooter } from "./studio-footer";
import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
const wa = (message = "Hi Ntombii Tech, I'd like to discuss a website project.") => `https://wa.me/27812360230?text=${encodeURIComponent(message)}`;
const faqs = [
  ["How much does a website cost?", `${packagePriceSummary} You pay these once, for the design and setup. Your final quote depends on how many pages you need, your content and any extra features. Ongoing costs, such as hosting or a Shopify subscription, are separate and we confirm them in your quote.`],
  ["What do I need to get started?", "Tell us what your business does and what you want the website to do. Send your logo, photos and any words you already have, plus a few websites you like. We’ll help you plan the pages."],
  ["How long does a website take?", "It depends on the number of pages, the features and how much of your content is ready. We agree on a timeline before we start and keep you updated along the way."],
  ["Can you redesign my current website?", "Yes. Send us the link and tell us what isn’t working. We’ll look at the layout, the words and how it works on phones, then send you a quote for the changes."],
  ["Do you build e-commerce websites?", `Yes. Our Shopify e-commerce package starts at ${shopifyPackage.price}. It includes up to 10 products to start with, a payment provider so customers can pay online, and standard delivery settings. ${shopifyCosts}`],
  ["Can I update the website myself?", "With the Business package, yes. It includes a content management system (CMS): a simple editor where you change your services, projects, photos and contact details. We show you how to use it. Portfolio websites are static, so we quote for changes. Shopify has its own dashboard for products, stock and orders. Custom operational dashboards are quoted separately."],
  ["Where are you based, and can we meet?", meetingInformation],
  ["Will my website work on phones and show up on Google?", "Yes. Every website we build works on phones. We also set up basic search engine optimisation (SEO), which helps Google understand what your business does. We offer local SEO in Newcastle, KZN, Pretoria and Centurion too. Nobody can guarantee a top position on Google, so we don’t promise one."],
  ["What happens after my website launches?", "Every package includes 14 days of support after your website goes live. After that, updates, new pages and ongoing maintenance are quoted separately."],
];
const processSteps: { icon: IllustrationKind; title: string; body: string }[] = [
  { icon: "chat", title: "Tell us about your business", body: "Send us a WhatsApp message about what you do and what the website should help with. We agree on the pages, price and timeline before any work starts." },
  { icon: "palette", title: "We design and build it", body: "We plan the pages, shape the words and build the site. You review the work at each stage, with two rounds of changes per stage." },
  { icon: "phone", title: "We test it and go live", body: "We check every page, button and form on phones and computers, then publish your site. You get 14 days of support after launch." },
];
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" className={`arrow ${diagonal ? "diagonal" : ""}`} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
const designTools = [
  { name: "Codex", icon: "openai" },
  { name: "Paper", icon: null },
  { name: "Figma", icon: "figma" },
  { name: "Framer", icon: "framer" },
  { name: "Canva", icon: "canva" },
  { name: "Cursor", icon: "cursor" },
  { name: "Vercel", icon: "vercel" },
  { name: "Grokbot", icon: "grokbot" },
  { name: "Notion AI", icon: "notion" },
  { name: "Slack", icon: "slack" },
  { name: "Wispr Flow", icon: "wispr" },
  { name: "Claude", icon: "claude" },
  { name: "Make", icon: "make" },
  { name: "Perplexity", icon: "perplexity" },
];
function ToolMarquee() {
  const rows = [designTools.slice(0, 7), designTools.slice(7)];
  return <section className="tools-section" aria-labelledby="tools-title" data-reveal>
    <h2 className="tools-title" id="tools-title">The tools we design and build with</h2>
    <p className="sr-only">{designTools.map(tool => tool.name).join(", ")}.</p>
    <div className="tool-marquees" role="region" tabIndex={0} aria-label="Moving tool logos. Focus here to pause the animation.">
      {rows.map((row, index) => <div className={`tool-marquee ${index === 1 ? "tool-marquee-reverse" : ""}`} key={index} aria-hidden="true">
        <div className="tool-track">{[0, 1].map(copy => <div className="tool-group" key={copy}>
          {row.map(tool => <div className={`tool ${tool.name === "Paper" ? "paper-wordmark" : ""} ${tool.name === "Canva" ? "canva-wordmark" : ""}`} key={tool.name}>
            {tool.icon && <img src={`/tools/${tool.icon}.svg`} alt="" />}
            {tool.name !== "Canva" && <span>{tool.name}</span>}
          </div>)}
        </div>)}</div>
      </div>)}
    </div>
  </section>;
}
function ProcessSection() {
  return <section className="process-section section wrap" aria-labelledby="process-title">
    <div className="section-heading" data-reveal>
      <h2 id="process-title">We build websites.</h2>
      <div className="process-intro"><p>Business websites, e-commerce websites (online shops) and ongoing website maintenance.</p><a className="text-link" href="/pricing">Websites from {portfolioPackage.price} <Arrow diagonal /></a></div>
    </div>
    <ol className="process-steps" data-reveal>{processSteps.map((step, index) => <li key={step.title} style={{ "--i": index } as CSSProperties}>
      <ContentIllustration kind={step.icon} />
      <h3>{step.title}</h3>
      <p>{step.body}</p>
    </li>)}</ol>
  </section>;
}
// Discourage casual image saving without blocking scrolling or selecting reviews.
// Visible public images cannot be protected against screenshots or browser tools.
function TestimonialPhoto({ src, small = false }: { src: string; small?: boolean }) {
  return <div className={`testimonial-photo${small ? " testimonial-photo-small" : ""}`} onContextMenu={event => event.preventDefault()} onDragStart={event => event.preventDefault()}>
    <img src={src} alt="" loading="lazy" width={small ? 30 : 80} height={small ? 30 : 80} draggable={false} />
  </div>;
}
export function Testimonials() {
  const stories = testimonials;
  const rows = [stories.filter((_, i) => i % 2 === 0), stories.filter((_, i) => i % 2 === 1)];
  return <section className="testimonials-section section" aria-labelledby="testimonials-title"><div className="wrap">
    <div className="section-heading" data-reveal><h2 id="testimonials-title">What our clients say.</h2><a href="/reviews" className="testimonial-view-all">Read all reviews</a></div>
  </div><div className="testimonial-rows" id="review-cards" role="group" aria-label="Client testimonials">{rows.map((row, index) => <div className={`testimonial-lane ${index ? "testimonial-lane-reverse" : ""}`} key={index} role="region" tabIndex={0} aria-label={`Client reviews, row ${index + 1}`}><div className="testimonial-track">{[0, 1].map(copy => <div className="testimonial-set" key={copy} aria-hidden={copy === 1}>{row.map(story => <figure className="testimonial" key={story.name}>
      <figcaption><TestimonialPhoto src={story.image} /><span><strong>{story.name}</strong><small>{story.context}</small></span></figcaption>
      <blockquote><p>{story.quote}</p></blockquote>
    </figure>)}</div>)}</div></div>)}</div><div className="testimonial-bottom"><div className="testimonial-avatars" aria-hidden="true">{stories.slice(0, 3).map(story => <TestimonialPhoto key={story.name} src={story.image} small />)}</div><a href={wa("Hi Ntombii Tech, I'd like to request a quote.")} target="_blank" rel="noreferrer">Request a quote <Arrow diagonal /></a></div></section>;
}
export function QuoteForm() {
  const [messageUrl, setMessageUrl] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const business = String(data.get("business") ?? "").trim();
    const text = `Hi Ntombii Tech, I'd like a quote.\n\nName: ${String(data.get("name")).trim()}${business ? `\nBusiness: ${business}` : ""}\nService: ${data.get("service")}\n\n${String(data.get("message")).trim()}`;
    const url = wa(text);
    setMessageUrl(url);
    trackQuoteHandoff("website_quote");
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return <form className="quote-form" aria-label="Website quote" onSubmit={submit}>
    <div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="First and last name" maxLength={100} required /></label><label>Business name (if any)<input name="business" autoComplete="organization" placeholder="Your business" maxLength={150} /></label></div>
    <label>What do you need?<select name="service" defaultValue="" required><option value="" disabled>Choose one</option><optgroup label="Web development">{["New website", "Website redesign", "E-commerce website", "Website maintenance & support", "Search engine optimisation (SEO)"].map(service => <option key={service}>{service}</option>)}</optgroup><optgroup label="Additional services · availability on request"><option>Additional service enquiry</option></optgroup></select></label>
    <label>Tell us about your project<textarea name="message" placeholder="What does your business do, and what should the website help with?" rows={4} maxLength={2000} required /></label>
    <button className="button button-blue form-submit" type="submit">Continue to WhatsApp <Arrow diagonal /></button>
    {messageUrl && <div className="form-note"><p role="status">Your message is ready. Check it in WhatsApp and tap Send.</p><a className="text-link" href="https://wa.me/27812360230" target="_blank" rel="noreferrer" onClick={event => { event.preventDefault(); event.stopPropagation(); window.open(messageUrl, "_blank", "noopener,noreferrer"); }}>Open your WhatsApp message</a></div>}
  </form>;
}
export function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;
    elements.forEach(el => {
      if (el.getBoundingClientRect().top >= window.innerHeight) el.classList.add("reveal-ready");
    });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("reveal-ready");
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    elements.forEach(el => observer.observe(el));
    return () => {
      observer.disconnect();
      elements.forEach(el => el.classList.remove("reveal-ready"));
    };
  }, []);
  return <div id="top">
    <a className="skip-link" href="#main">Skip to content</a>
    <InnerNavigation />
    <main id="main"><div className="hero-shell">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title"><span className="hero-line">Websites that work.</span><br /><span className="hero-line hero-accent">Built for your business.</span></h1>
          <p className="hero-description">{studioIntroduction}</p>
          <div className="hero-actions">
            <a className="button button-white" href={wa()} target="_blank" rel="noreferrer">Discuss your website <Arrow diagonal /></a>
            <a className="button button-glass" href="/work">See our work <Arrow /></a>
          </div>
          <div className="hero-badges" role="group" aria-label="Design badges">
            <span className="hero-badge-plaque">
              <img src="/images/badges/web-guru-awards.svg" width="186" height="100" alt="Web Guru Awards" />
            </span>
            <img src="/images/badges/guru-of-the-year.webp" width="442" height="418" alt="Web Guru Awards – Guru of the Year" />
            <span className="hero-badge-plaque">
              <img src="/images/badges/web-design-nominee.png" width="314" height="138" alt="Web-Design.co.za award nominee" />
            </span>
            <a className="hero-badge-plaque" href={awardVerificationUrl}>
              <img src="/images/badges/web-design-winner-2026.png" width="315" height="191" alt="2026 Web Design Award winner – verify the award" />
            </a>
          </div>
        </div>
        <div className="hero-form"><QuoteForm /></div>
      </section>
    </div>
      <ToolMarquee />
      <ProcessSection />
      <section id="about" className="about-section section wrap"><div className="about-copy" data-reveal><h2>Hi, I'm Sabelo.<br />I build websites.</h2><p>I'm a self-taught digital product developer and the founder of Ntombii Tech.</p><p>Before tech, I managed artists and bookings in the music industry. I started experimenting with AI tools, taught myself web development and began building websites for businesses.</p><p>You work directly with me, from planning the pages to checking the finished website. You can see some of those decisions in <a className="award-story-link" href={awardArticlePath}>the story behind our 2026 Web Design Award</a>.</p><a className="text-link" href={wa("Hi Sabelo, I'd like to talk about a project.")} target="_blank" rel="noreferrer">Tell me about your business <Arrow diagonal /></a><SocialLinks /></div><FounderIntro /></section>
      <WorkShowcase />
      <section id="pricing" className="pricing-section section"><div className="wrap"><div className="section-heading" data-reveal><h2>Website packages.</h2><a className="text-link" href="/pricing">Compare in detail <Arrow diagonal /></a></div><PricingComparison /></div></section>
      <Testimonials />
      <section id="faq" className="faq-section section"><div className="wrap faq-layout"><div data-reveal><h2>Frequently asked questions.</h2><a className="button button-blue" href={wa("Hi Ntombii Tech, I have a question about working with you.")} target="_blank" rel="noreferrer">Ask on WhatsApp <Arrow diagonal /></a></div><div className="faq-list" data-reveal>{faqs.map(([question, answer], index) => <div className={`faq-item ${activeFaq === index ? "faq-open" : ""}`} key={question}><h3><button type="button" aria-expanded={activeFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>{question}<span className="faq-icon" aria-hidden="true" /></button></h3><div id={`faq-answer-${index}`} hidden={activeFaq !== index}><p>{answer}</p></div></div>)}</div></div></section>
      <AdditionalServices />
      <NewsletterSection />
    </main>
    <StudioFooter enquiry={{ title: "Let’s talk websites.", whatsappHref: wa() }} showHours />
    <FloatingContact href={wa()} />
  </div>;
}
