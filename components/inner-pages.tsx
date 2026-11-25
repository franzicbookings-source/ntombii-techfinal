import { packagePriceSummary, shopifyCosts } from "./website-packages";
import { studioLocation, meetingInformation, regionalWebsiteLinks } from "./locations";
import { FloatingContact } from "./floating-contact";
import { ContentIllustration, illustrationFor } from "./content-illustration";
import Link from "next/link";
import { PricingComparison } from "./pricing-comparison";
import { AboutTeam } from "./about-team";
import type { ReactNode } from "react";
import { StudioFooter, type FooterEnquiry } from "./studio-footer";
import { AdditionalServices, universities } from "./service-chapters";
import { AboutDepth, ContactDepth, PricingDepth, ServiceDepth, ServicesDepth } from "./page-depth";
import { InnerNavigation } from "./inner-navigation";
import { PortfolioIndex } from "./portfolio-index";
import { PrintServiceLinks } from "./print-service-links";
import { ProjectMotion } from "./project-motion";
import { projectById } from "./portfolio-projects";
import { serviceSchema } from "./site-seo";
import { StructuredData } from "./structured-data";
import { QuoteForm, Testimonials } from "./home-page";

const whatsapp = (message = "Hi Ntombii Tech, I'd like to discuss a website project.") => `https://wa.me/27812360230?text=${encodeURIComponent(message)}`;

export const services = [
  {
    slug: "websites", name: "Web development", short: "Websites", image: "/images/web-demo-shop.jpg",
    title: "Website design in Newcastle and Pretoria.", intro: "Business websites, e-commerce websites and redesigns for Newcastle, KZN, Pretoria and Centurion. We help customers find your services, see your work and contact you. We also work online across South Africa.",
    offering: ["Portfolio and business websites", "Shopify e-commerce websites (online shops)", "Content management systems (CMS) so you can edit a Business website yourself", "Responsive web design that works on phones and computers", "Search engine optimisation (SEO), including local search", "Website maintenance and support after launch"],
    steps: ["Tell us what your business does and what the site needs to do.", "We agree on pages, content, features, price and timing.", "We design, build and review the site with you before launch."],
    price: `${packagePriceSummary} Custom development is quoted per project.`,
    note: `Portfolio and Business domain and hosting costs are confirmed in your quote. ${shopifyCosts}`,
    message: "Hi Ntombii Tech, I'd like a quote for a business or e-commerce website.",
  },
  {
    slug: "business-setup", name: "Company registration", short: "Company registration", image: "/images/service-registration.webp",
    title: "Company registration assistance in Newcastle, KZN.", intro: "Need to register a company or set up a CSD supplier profile? We help with the forms and supporting paperwork. Based in Newcastle, we assist business owners in Osizweni, Madadeni and across KZN.",
    offering: ["CIPC company registration assistance", "CSD supplier profile setup", "Tax registration admin support", "B-BBEE documentation assistance", "Guidance on the documents you need"],
    steps: ["Tell us which registration or business record you need help with.", "We check the documents and explain our fee and any official fees.", "We help complete and review the forms, then share any documents issued."],
    price: "Company registration assistance from R499, plus official fees.",
    note: "Registration and compliance decisions are made by the relevant authorities. We confirm official fees before work begins.",
    message: "Hi Ntombii Tech, I need help with company registration or business administration.",
  },
  {
    slug: "tenders", name: "Tender application support", short: "Tenders", image: "/images/service-tenders.webp",
    title: "Tender research and application support in Newcastle, KZN.", intro: "We help businesses in Newcastle, Osizweni, Madadeni and across KZN find relevant tenders and prepare their documents. Send an existing tender, or tell us what you supply and where you work so we can search.",
    offering: ["Finding tenders that match your goods or services", "Checking eligibility, deadlines and required documents", "Filling SBD and tender forms with your information", "Organising supporting documents", "Checking the required submission steps"],
    steps: ["Tell us what your business supplies and where you operate.", "We look at relevant notices, deadlines and submission requirements.", "We help prepare and check your documents before submission."],
    price: "Tender searches from R399. Response support is quoted according to project requirements.",
    note: "Tender awards are decided by the issuing institution. We do not promise an award or a particular outcome.",
    message: "Hi Ntombii Tech, I need help with a tender search or submission.",
  },
  {
    slug: "opportunities-applications", name: "University, college & NSFAS applications", short: "Applications", image: "/images/service-applications.webp",
    title: "University, college and NSFAS application assistance in Newcastle.", intro: "We help students in Newcastle, Osizweni, Madadeni and across KZN with university, college and NSFAS applications. We check the requirements, complete the forms with you and help upload your documents. The institution decides on admission or funding.",
    offering: ["University application assistance", "College and TVET application assistance", "NSFAS application assistance", "Document uploads and online form guidance", "Submission references and application confirmation checks"],
    steps: ["Tell us which university, college, programme or NSFAS application you need help with.", "We check the current deadline, requirements and documents you already have.", "We complete and review the application with you, then keep any submission confirmation."],
    price: "One university or college application: R50. NSFAS assistance: R70.",
    note: "These are Ntombii Tech's optional assistance fees. Applying directly to NSFAS is free. Institution and CAO fees, where applicable, are separate. Application confirmation means the application was submitted; it does not mean admission or funding has been approved.",
    message: "Hi Ntombii Tech, I need help with a university, college or NSFAS application.",
  },
  {
    slug: "branding-print", name: "Branding & print", short: "Branding & print", image: "/images/service-branding.webp",
    title: "Printing, signage and supplies in Newcastle, KZN.", intro: "Business cards, flyers, branded T-shirts, signage, ink and toner for Newcastle, Osizweni, Madadeni and wider KZN. Send what you need, the quantity and your town. We confirm the price and collection or delivery before you order.",
    offering: ["Logo and brand design", "Social media and business graphics", "Flyers and business cards", "Signage, branded T-shirts and uniforms", "Print preparation and production", "Ink cartridges and toner orders", "Branded corporate gifts"],
    steps: ["Show us what you need and any existing brand materials.", "We agree on the design direction, quantities and quote.", "We prepare the artwork and arrange the final output with you."],
    price: "Designs from R250. Logos from R650. Printing is quoted by quantity.",
    note: "Print, ink, toner and gift costs and turnaround depend on quantity, specifications and supplier availability.",
    message: "Hi Ntombii Tech, I'd like a quote for branding, printing, ink and toner or corporate gifts.",
  },
  {
    slug: "ai-digital-tools", name: "AI training & automation", short: "AI & automation", image: "/images/service-ai.webp",
    title: "ChatGPT training and AI workflow setup in Newcastle and Pretoria.", intro: "Learn to use ChatGPT and other AI tools for customer replies, website content, research and admin. We offer setup and training in Newcastle, KZN, Pretoria and Centurion, with online sessions across South Africa. Meetings are by appointment.",
    offering: ["ChatGPT introductions and team training", "Customer enquiry and WhatsApp workflows", "Content drafting and research workflows", "AI agent and administrative workflow planning", "Automation setup and training"],
    steps: ["We start with the tasks your team handles every day.", "We choose tools that fit the work and explain their costs and limits.", "We set up a practical workflow and show you how to review its output."],
    price: "Consultations from R950. Setup is quoted according to project requirements.",
    note: "Tools may require separate subscriptions. We agree on the tools and costs before setup.",
    message: "Hi Ntombii Tech, I'd like help introducing AI tools into my business.",
  },
] as const;

export type Service = typeof services[number];



const applicationPackages = [
  { name: "NSFAS only", scope: "One NSFAS application", price: "R70" },
  { name: "Single application", scope: "One university or college application", price: "R50" },
  { name: "Small bundle", scope: "Up to three university or college applications", price: "R120" },
  { name: "Main bundle", scope: "One NSFAS application plus up to six university or college applications", price: "R250" },
  { name: "Bigger bundle", scope: "One NSFAS application plus up to ten university or college applications", price: "R350" },
] as const;

const localServiceHelp: Record<Service["slug"], { heading: string; brief: string; question: string; answer: string }> = {
  websites: {
    heading: "Tell us what your website needs to do.",
    brief: "Send your business name, town and current website, if you have one. Do you need quote requests, bookings or product orders? Tell us so we can plan the pages and price the work.",
    question: "Can we meet in Newcastle, Pretoria or Centurion?",
    answer: "Yes, by appointment. Message us with your area to arrange a meeting. We can also plan, review and support your website over WhatsApp and online calls.",
  },
  "business-setup": {
    heading: "Which registration do you need?",
    brief: "Tell us whether you’re starting a company, setting up a CSD profile or updating existing records. We’ll explain which information and documents you need.",
    question: "Can Osizweni and Madadeni business owners get registration help?",
    answer: "Yes. We assist businesses across KZN with online paperwork from Newcastle. Message us with the registration you need. We’ll confirm our fee, official fees and any meeting arrangements. The authority processes the application.",
  },
  tenders: {
    heading: "Send us the tender notice.",
    brief: "Send the notice, documents and closing date. If you need us to search, describe what you supply and where you can deliver. Allow time for any required site visit or physical submission.",
    question: "Do you help Osizweni and Madadeni businesses find and fill tenders?",
    answer: "Yes, if the deadline allows enough time. We can search for notices, help with forms and organise the documents for your review. We search in areas where your business can deliver, including beyond Newcastle.",
  },
  "opportunities-applications": {
    heading: "Start with the institution and programme.",
    brief: "Send the institution, programme and closing date. Let us know if you also need NSFAS help. We’ll check the application steps and which documents you need.",
    question: "Can students in Osizweni and Madadeni get application help?",
    answer: "Yes. We help students across KZN online with forms and document uploads. We share any submission confirmation the portal provides. That confirms receipt of the application, not admission or funding.",
  },
  "branding-print": {
    heading: "Tell us what you need made.",
    brief: "Send the item, quantity, size and artwork. For ink or toner, send your printer model or cartridge code. Include your town and the date you need it.",
    question: "Can I request printing or supplies from Osizweni or Madadeni?",
    answer: "Yes. Send your town and order details to our Newcastle team. We’ll check availability and price, then confirm collection, delivery and any sign fitting before you order.",
  },
  "ai-digital-tools": {
    heading: "Show us a task your team repeats.",
    brief: "It could be answering customer questions, writing product descriptions or preparing a weekly report. We’ll work through an example with your team and show what the tool can do and what you need to check.",
    question: "Can you train teams in Newcastle, Pretoria and Centurion to use AI?",
    answer: "Yes. Sessions are available online or by appointment in Newcastle, Pretoria and Centurion. We agree on the task, tools, subscriptions and any travel costs first. Your team learns how to use the tools and check the results.",
  },
};

function LocalServiceHelp({ service }: { service: Service }) {
  const help = localServiceHelp[service.slug];
  return <section className="detail-extra wrap" aria-label={`${service.name} local enquiries`}>
    <div><h2>{help.heading}</h2><p>{help.brief}</p></div>
    <details><summary>{help.question}<span aria-hidden="true">+</span></summary><p>{help.answer}</p></details>
  </section>;
}

function ApplicationPackages() {
  return <section className="detail-extra wrap" aria-label="Application assistance packages">
    <div><h2>Choose the help you need.</h2><p>Document checks, online forms, uploads and submission confirmations are included. Institution and CAO application fees are separate. Ongoing status checks, appeals and extensive document preparation need an agreed scope.</p></div>
    <div className="detail-tool-list">{applicationPackages.map(pkg => <p key={pkg.name}><strong>{pkg.name} · {pkg.price}</strong><br />{pkg.scope}</p>)}<p>An extra institutional application added to a bundle is R30. Allowed course choices in one portal submission are included. One CAO submission counts as one application, even when its programme choices cover several institutions.</p></div>
  </section>;
}

function Arrow() { return <span aria-hidden="true">↗</span>; }

export function InnerPage({ children, enquiry }: { children: ReactNode; enquiry?: FooterEnquiry }) {
  return <div className="inner-site" id="top">
    <a className="skip-link" href="#main">Skip to content</a>
    <InnerNavigation />
    <main id="main">{children}</main>
    <StudioFooter enquiry={enquiry} />
    <FloatingContact />
  </div>;
}

export function ServicesPage() {
  const website = services[0];
  return <InnerPage enquiry={{ title: "Let’s talk websites.", whatsappHref: whatsapp() }}>
    <section className="inner-hero-band"><div className="wrap inner-hero-split"><div>
      <h1>Website design<br />in Newcastle and Pretoria.</h1>
      <p>Business and e-commerce websites, redesigns and website maintenance. We work from Newcastle, KZN, and Pretoria, Gauteng, with clients in Centurion and across South Africa.</p>
      <a className="button button-white" href="/services/websites">Explore web development <Arrow /></a>
    </div><ProjectMotion project={projectById("legend-black-jesus")} /></div></section>
    <section id="all-services" className="inner-service-list wrap" aria-label="Web development"><Link className="inner-service-link" href="/services/websites"><ContentIllustration kind="browser" className="service-illustration" /><div><h2>{website.name}</h2><p>{website.intro}</p></div><img src={website.image} alt="" loading="lazy" /><span className="inner-service-arrow" aria-hidden="true">↗</span></Link></section>
    <ServicesDepth /><AdditionalServices />
  </InnerPage>;
}

export function ServiceDetailPage({ service }: { service: Service }) {
  const schema = <StructuredData data={serviceSchema(service)} />;
  const related=services.filter(item=>item.slug!==service.slug).slice(0,3);
  return <InnerPage enquiry={{ title: service.slug === "websites" ? "Let’s talk websites." : "Ask about availability.", whatsappHref: whatsapp(service.message) }}>{schema}<div className="detail-hero"><div className="wrap detail-hero-grid"><div><Link className="inner-back" href="/services">← All services</Link><h1>{service.title}</h1><p className="detail-intro">{service.intro}</p>{service.slug !== "websites" && <p className="additional-availability">Available on request. We confirm availability and the work involved before you book.</p>}<a className="button button-white" href={whatsapp(service.message)} target="_blank" rel="noreferrer">Ask for a quote <Arrow /></a></div>{service.slug === "websites" ? <ProjectMotion project={projectById("legend-black-jesus")} /> : <img src={service.image} alt={`${service.name} at Ntombii Tech`} />}</div></div><section className="detail-body wrap"><div className="detail-body-title"><h2>What we can<br />help with.</h2></div><div className="detail-offering">{service.offering.map((item)=><div key={item}><ContentIllustration kind={illustrationFor(item)} /><h3>{item}</h3></div>)}</div></section><LocalServiceHelp service={service} /><ServiceDepth slug={service.slug} />{service.slug === "branding-print" && <PrintServiceLinks />}<section className="detail-method"><div className="wrap"><h2>From your first message.</h2><div className="detail-method-grid">{service.steps.map((step)=><div key={step}><ContentIllustration kind={illustrationFor(step)} /><p>{step}</p></div>)}</div></div></section>{service.slug === "opportunities-applications" && <section className="detail-extra wrap"><div><h2>Choose an institution, then check the requirements.</h2><p>Tell us the institution and programme you want to apply for. We’ll check the steps, requirements and deadline with you. The list below does not show which institutions currently have applications open.</p></div><details><summary>See universities <span aria-hidden="true">+</span></summary><ul>{universities.map(name=><li key={name}>{name}</li>)}</ul></details></section>}{service.slug === "ai-digital-tools" && <section className="detail-extra wrap"><div><h2>See the tool doing real work.</h2><p>We demonstrate a task from your business and explain what the tool does, what you need to provide and what your team must check.</p></div><div className="detail-tool-list"><p><strong>ChatGPT</strong><br />Draft a reply to a customer enquiry, turn your notes into website text or organise product information. Your team reviews the facts and tone before using it.</p><p><strong>AI agents</strong><br />Plan a multi-step research or admin task and test it with your team. We check the chosen platform's capabilities, access and permission limits before agreeing on setup.</p><p><strong>Make or Zapier</strong><br />Connect supported business tools for an agreed workflow, such as sending a contact form enquiry into your records. We confirm subscriptions, access and any approval steps first.</p></div></section>}{service.slug === "opportunities-applications" && <ApplicationPackages />}<section className="detail-price wrap"><div><h2>{service.price}</h2><p>{service.note}</p></div><a className="button button-blue" href={whatsapp(service.message)} target="_blank" rel="noreferrer">Get a quote <Arrow /></a></section>{service.slug === "websites" ? <p className="website-secondary-note wrap"><Link href="/services#additional-services">View additional services available on request <Arrow /></Link></p> : <section className="inner-related wrap"><h2>Other services.</h2><div>{related.map(item=><Link href={`/services/${item.slug}`} key={item.slug}>{item.name}<Arrow /></Link>)}</div></section>}</InnerPage>;
}

export function AboutPage() {
  return <InnerPage enquiry={{ title: "Let’s talk about your project.", whatsappHref: whatsapp() }}><div className="about-team-page">
    <section className="about-team-hero"><div className="wrap about-team-hero-grid">
      <h1>An uncle, his niece,<br /><span>and a laptop.</span></h1>
      <div className="about-team-intro"><p>We’re a web and design studio serving businesses in Newcastle, Pretoria and across South Africa. Sabelo builds the websites; Sthembile designs the layouts and graphics.</p>
        <div className="about-team-actions"><a className="button button-blue" href={whatsapp("Hi Ntombii Tech, I'd like to tell you about my business.")} target="_blank" rel="noreferrer">Talk to our team <Arrow /></a><a className="about-team-jump" href="#team">Meet the team <span aria-hidden="true">↓</span></a></div>
      </div>
    </div></section>
    <AboutTeam />
    <AboutDepth />
    <Testimonials />
  </div></InnerPage>;
}

export function WorkPage() {
  return <InnerPage enquiry={{ title: "What do you have in mind?", whatsappHref: whatsapp("Hi Ntombii Tech, I'd like to discuss a website like one of your projects.") }}><PortfolioIndex /></InnerPage>;
}

export function PricingPage() {
  return <InnerPage enquiry={{ title: "Have a pricing question?", whatsappHref: whatsapp("Hi Ntombii Tech, I'd like help choosing a website package.") }}><section className="inner-hero-band"><div className="wrap inner-hero-split"><div><h1>Website packages.</h1><p>Compare what each package includes. We confirm what your website needs and send a final quote before any work starts.</p><a className="button button-white" href="#packages">Explore packages <Arrow /></a></div><ProjectMotion project={projectById("friday-consulting")} /></div></section><section id="packages" className="inner-pricing wrap"><h2 className="sr-only">Website packages</h2><PricingComparison headingLevel={2} /></section><p className="website-secondary-note wrap">Need another service? <Link href="/services#additional-services">View additional services <Arrow /></Link></p><PricingDepth /></InnerPage>;
}

export function ContactPage() {
  return <InnerPage><section className="inner-contact-hero wrap"><div><h1>Tell us about<br />your website.</h1><p>A new website, a redesign or an online shop? Fill in the form, and it opens a WhatsApp message for you to send.</p><a className="button button-blue" href={whatsapp("Hi Ntombii Tech, I would like to discuss a project.")} target="_blank" rel="noreferrer">Chat on WhatsApp <Arrow /></a></div><div className="inner-contact-form"><QuoteForm /></div></section><section className="inner-contact wrap"><div><h2>WhatsApp is the quickest way to reach us.</h2><p>Send your business name, location and what you need. A link to your current site or an example you like will help.</p><a className="button button-blue" href={whatsapp("Hi Ntombii Tech, I'd like to tell you about what I need.")} target="_blank" rel="noreferrer">Chat on WhatsApp <Arrow /></a></div><div className="inner-contact-lines"><a href="https://wa.me/27812360230" target="_blank" rel="noreferrer"><small>WhatsApp</small>081 236 0230 <Arrow /></a><a href="mailto:hello@ntombii.tech"><small>Email</small>hello@ntombii.tech <Arrow /></a><div><small>Based in</small>{studioLocation}<p>{meetingInformation}</p><div className="website-context-links">{regionalWebsiteLinks.map(link => <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">↗</span></Link>)}</div></div><div><small>Hours</small>Monday–Friday · 09:00–17:00 SAST</div></div></section><ContactDepth /></InnerPage>;
}
