"use client";
import { packagePriceSummary, shopifyPackage, shopifyCosts } from "./website-packages";
import { studioLocation, studioIntroduction, meetingInformation, regionalWebsiteLinks } from "./locations";
import { trackQuoteHandoff } from "./analytics";
import { testimonials } from "./testimonials";
import { FloatingContact } from "./floating-contact";
import { serviceNavigationLinks } from "./navigation-links";
import { PricingComparison } from "./pricing-comparison";
import { WorkNavigation } from "./work-navigation";
import { NewsletterSection, SocialLinks } from "./studio-sections";
import { AdditionalServices, ServiceChapters } from "./service-chapters";
import { WorkShowcase } from "./work-showcase";
import { ArticlesSection } from "./article-cards";
import { CookieSettingsLink } from "./cookie-consent";
import { useEffect, useRef, useState, type FormEvent } from "react";
const wa = (message = "Hi Ntombii Tech, I'd like to discuss a website project.") => `https://wa.me/27812360230?text=${encodeURIComponent(message)}`;
const faqs = [
  ["How much will my website cost?", `${packagePriceSummary} These are one-time design and setup fees. The final quote depends on your pages, content and features. Subscriptions and other ongoing costs are confirmed separately.`],
  ["What do you need from me to get started?", "Tell us what your business does and what you need from the website. Send your logo, photos, any existing content and examples you like. We'll help you plan the pages."],
  ["How long does a website take?", "It depends on the pages, features and how much content is ready. We'll agree on a timeline before starting and keep you updated."],
  ["Can you redesign my existing website?", "Yes. Send the link and tell us what isn't working for you. We'll review the layout, content and how it works on phones, then quote for the changes."],
  ["Do you build e-commerce websites?", `Yes. Our Shopify e-commerce package starts at ${shopifyPackage.price}, with up to 10 initial products, payment-provider integration and standard delivery settings. ${shopifyCosts}`],
  ["Can I update the website myself?", "The Business package includes a content management system (CMS) to update services, projects, photos and contact details, with handover training. Portfolio websites are static, with changes quoted separately. Shopify has its own dashboard for products, inventory and orders. Custom operational dashboards are quoted separately."],
  ["Where do you work, and can we meet?", meetingInformation],
  ["Will my website work on phones and show up on Google?", "Yes, we build for phones and include basic search engine optimisation (SEO) setup. We also offer local SEO in Newcastle, KZN, Pretoria and Centurion. We can't guarantee a particular search position."],
  ["What happens after my website launches?", "Every website package includes 14 days of support after launch. Later updates, new pages and ongoing maintenance are quoted separately."],
];
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" className={`arrow ${diagonal ? "diagonal" : ""}`} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Logo({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? "brand-light" : ""}`} href="/" aria-label="Ntombii Tech home"><img src={`/brand/ntombii-logo-${light ? "light" : "dark"}.svg`} width="1200" height="200" alt="Ntombii Tech" /></a>;
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
    <h2 className="eyebrow" id="tools-title">Our toolkit</h2>
    <p className="sr-only">Tools in our toolkit: {designTools.map(tool => tool.name).join(", ")}.</p>
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
    <div className="section-heading" data-reveal><div><h2 id="testimonials-title">Reviews</h2></div><a href="/reviews" className="testimonial-view-all">View all</a></div>
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
    <label>What can we help with?<select name="service" defaultValue="" required><option value="" disabled>Select your project</option><optgroup label="Web development">{["New website", "Website redesign", "E-commerce website", "Website maintenance & support", "Search engine optimisation (SEO)"].map(service => <option key={service}>{service}</option>)}</optgroup><optgroup label="Additional services · availability on request"><option>Additional service enquiry</option></optgroup></select></label>
    <label>Tell us a little more<textarea name="message" placeholder="Tell us about your business and the website you have in mind." rows={4} maxLength={2000} required /></label>
    <button className="button button-blue form-submit" type="submit">Continue to WhatsApp <Arrow diagonal /></button>
    {messageUrl && <div className="form-note"><p role="status">Your message is ready. Review it in WhatsApp and tap Send.</p><a className="text-link" href="https://wa.me/27812360230" target="_blank" rel="noreferrer" onClick={event => { event.preventDefault(); event.stopPropagation(); window.open(messageUrl, "_blank", "noopener,noreferrer"); }}>Open your WhatsApp message</a></div>}
  </form>;
}
export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") { setMenuOpen(false); setServicesOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab" && menuOpen && mobileMenu.current) {
        const links = Array.from(mobileMenu.current.querySelectorAll<HTMLAnchorElement>("a"));
        const last = links[links.length - 1];
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); menuButton.current?.focus(); }
        if (event.shiftKey && document.activeElement === menuButton.current) { event.preventDefault(); last?.focus(); }
      }
    }
    function outside(event: MouseEvent) { if (dropdown.current && !dropdown.current.contains(event.target as Node)) setServicesOpen(false); }
    document.addEventListener("keydown", key); document.addEventListener("click", outside);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("click", outside); document.body.style.overflow = ""; };
  }, [menuOpen]);
  return <div id="top">
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="hero-shell home-header-shell">
      <header className="site-header wrap"><Logo light />
        <nav className="desktop-nav" aria-label="Main navigation"><a href="/" aria-current="page">Home</a><a href="/about">About</a><div className="nav-dropdown" ref={dropdown}><button type="button" aria-expanded={servicesOpen} aria-controls="service-menu" onClick={() => setServicesOpen(!servicesOpen)}>Services <span className={`chevron ${servicesOpen ? "up" : ""}`} /></button><div id="service-menu" className="dropdown-panel" hidden={!servicesOpen}>{serviceNavigationLinks.map(({ label, href }) => <a href={href} key={href} onClick={() => setServicesOpen(false)}>{label}</a>)}</div></div><WorkNavigation /><a href="/articles">Articles</a><a href="/pricing">Pricing</a><a href="/contact">Contact</a></nav>
        <a className="button button-blue header-cta" href={wa()} target="_blank" rel="noreferrer">Get a quote <Arrow diagonal /></a>
        <button ref={menuButton} className={`menu-toggle ${menuOpen ? "open" : ""}`} type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>
      <div className="mobile-menu" id="mobile-menu" ref={mobileMenu} hidden={!menuOpen}><nav aria-label="Mobile navigation">{[["Home", "/"], ["Web development", "/services/websites"], ["Our work", "/work"], ["Graphic design", "/graphics"], ["Articles", "/articles"], ["Website pricing", "/pricing"], ["About", "/about"], ["Contact", "/contact"], ["Additional services", "/services#additional-services"]].map(([label, href]) => <a key={href} href={href} aria-current={href === "/" ? "page" : undefined} className={label === "Additional services" ? "mobile-secondary-link" : undefined} onClick={() => setMenuOpen(false)}>{label}<Arrow diagonal /></a>)}<a className="mobile-whatsapp" href={wa()} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Ask for a quote</a></nav><p>{studioLocation}</p></div>
    </div>
    <main id="main"><div className="hero-shell home-hero-content">
      <section className="hero wrap" aria-labelledby="hero-title"><div className="hero-copy"><h1 id="hero-title">Websites that work.<br /><span className="outlined-word">Built for your business.<i /><i /><i /><i /></span></h1><p className="hero-description">{studioIntroduction}</p><div className="hero-actions"><a className="button button-white" href={wa()} target="_blank" rel="noreferrer">Discuss your website <Arrow diagonal /></a><a className="button button-glass" href="/work">See our work <Arrow /></a></div><div className="hero-credentials" role="group" aria-label="Business credentials"><img src="/images/cipc.webp" width="1536" height="1152" alt="CIPC registered" /><img src="/images/sars.webp" width="1536" height="1152" alt="SARS tax compliant" /><img src="/images/bbbee.webp" width="1536" height="1152" alt="B-BBEE compliant" /></div></div><div className="hero-form"><div className="project-seal" aria-hidden="true"><svg viewBox="0 0 100 100"><defs><path id="seal-circle" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" /></defs><text><textPath href="#seal-circle" textLength="213">LET'S BUILD SOMETHING · LET'S BUILD SOMETHING · </textPath></text></svg><Arrow diagonal /></div><QuoteForm /></div></section>
    </div>
      <ToolMarquee />
      <ServiceChapters />
      <section id="about" className="about-section section wrap"><div className="about-copy" data-reveal><h2>Hi, I'm Sabelo.<br />I build websites.</h2><p>I'm a self-taught digital product developer and the founder of Ntombii Tech.</p><p>Before tech, I managed artists and bookings in the music industry. I started experimenting with AI tools, taught myself web development and began building websites for businesses.</p><p>I work directly with you on your website, from planning the pages to reviewing the finished build.</p><a className="text-link" href={wa("Hi Sabelo, I'd like to talk about a project.")} target="_blank" rel="noreferrer">Tell me about your business <Arrow diagonal /></a><SocialLinks /></div><figure className="founder-photo" data-reveal><img src="/images/sabelo-portrait.webp" width="1536" height="1536" alt="Sabelo Ndlovu, founder of Ntombii Tech" loading="lazy" /><figcaption><div><strong>Sabelo Ndlovu</strong><span>Founder & Digital Product Developer</span></div></figcaption></figure></section>
      <WorkShowcase />
      <section id="pricing" className="pricing-section section"><div className="wrap"><div className="section-heading" data-reveal><div><h2>Website packages.</h2></div><p>Compare the packages below.<br />Your final quote covers the pages and features you need.</p></div><PricingComparison /></div></section>
      <Testimonials />
      <section id="faq" className="faq-section section"><div className="wrap faq-layout"><div data-reveal><h2>Frequently asked questions.</h2><a className="button button-blue" href={wa("Hi Ntombii Tech, I have a question about working with you.")} target="_blank" rel="noreferrer">Ask on WhatsApp <Arrow diagonal /></a></div><div className="faq-list" data-reveal>{faqs.map(([question, answer], index) => <div className={`faq-item ${activeFaq === index ? "faq-open" : ""}`} key={question}><h3><button type="button" aria-expanded={activeFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>{question}<span aria-hidden="true">{activeFaq === index ? "−" : "+"}</span></button></h3><div id={`faq-answer-${index}`} hidden={activeFaq !== index}><p>{answer}</p></div></div>)}</div></div></section>
      <AdditionalServices />
      <ArticlesSection />
      <NewsletterSection />
      <section id="contact" className="contact-section"><div className="wrap contact-layout"><div data-reveal><h2>Let’s build<br />your website.</h2><p>Need a new website, a redesign or an e-commerce website? Tell us what you have in mind.</p><a className="button button-white" href={wa()} target="_blank" rel="noreferrer">Chat on WhatsApp <Arrow diagonal /></a></div><div className="contact-details" data-reveal><a href="https://wa.me/27812360230" target="_blank" rel="noreferrer"><span>WhatsApp</span>081 236 0230<Arrow diagonal /></a><a href="mailto:hello@ntombii.tech"><span>Email</span>hello@ntombii.tech<Arrow diagonal /></a><div><span>{studioLocation}</span><p>Meetings by appointment · Working across South Africa.<br />Monday–Friday · 09:00–17:00 SAST</p></div></div></div></section>
    </main>
    <footer className="site-footer wrap"><div className="footer-top"><Logo /><nav aria-label="Footer navigation"><a href="/about">About</a><a href="/services">Services</a><a href="/work">Our work</a><a href="/graphics">Graphic design</a><a href="/articles">Articles</a><a href="/pricing">Pricing</a><a href="/services#additional-services">Additional services</a><a href="/#faq">FAQs</a>{regionalWebsiteLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav><a className="back-top" href="#top">Back to top <Arrow diagonal /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ntombii Tech</span><span>{studioLocation}</span><a href="mailto:hello@ntombii.tech">hello@ntombii.tech</a><a href="/privacy">Privacy</a><CookieSettingsLink /></div></footer>
    <FloatingContact href={wa()} />
  </div>;
}
