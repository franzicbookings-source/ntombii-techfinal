import { shopifyCosts } from "./website-packages";
import { meetingInformation } from "./locations";
import { ContentIllustration, illustrationFor } from "./content-illustration";
import Link from "next/link";

type ServiceDetail = {
  heading: string;
  paragraphs: readonly string[];
  points: readonly { title: string; body: string }[];
  questions: readonly { question: string; answer: string }[];
};

const serviceDetail: Record<string, ServiceDetail> = {
  websites: {
    heading: "Plan the pages around your customers.",
    paragraphs: [
      "What should a visitor know before contacting you? We use that question to plan the pages, wording and images. For a service business, that may mean service details and a quote form. For a shop, it means products, prices and a way to order.",
      "The Legend Black Jesus store lets shoppers browse clothing, choose a size and colour, and order on WhatsApp. Snesenzo Security Group’s site explains its services and invites quote enquiries. You can explore both in our portfolio.",
    ],
    points: [
      { title: "Business websites", body: "Explain your services, show past work and let customers request a quote." },
      { title: "E-commerce websites", body: "Show products, prices and options, with an ordering process that suits your business." },
      { title: "Website maintenance", body: "Updates, new pages, technical fixes and ongoing maintenance, quoted as needed." },
    ],
    questions: [
      { question: "Do I need to have all the words and photos ready?", answer: "Bring what you have. We’ll help organise it and point out what’s missing. Use your own business photos where possible. Extra writing, photography or paid images are agreed in the quote." },
      { question: "Will you buy the domain and hosting for me?", answer: "We can help you choose and set them up. The provider, ownership, ongoing costs and any subscriptions are confirmed before purchase or launch." },
      { question: "Can you help with local SEO too?", answer: "Yes. Search engine optimisation (SEO) helps search engines understand your website. We can review its structure, page titles, location details and Google Business Profile, then quote for any further work. Search rankings cannot be guaranteed." },
    ],
  },
  "business-setup": {
    heading: "Company records and supplier profiles.",
    paragraphs: [
      "CIPC registration, a tax profile and a CSD supplier profile serve different purposes. Tell us what you need to do so we can check which steps apply.",
      "We can help gather the information for a CSD profile or work through an update to existing company records. We explain what we can help with before asking you to send supporting documents.",
    ],
    points: [
      { title: "Company registration", body: "Help with the application details and documents needed to register a company." },
      { title: "CSD supplier registration", body: "CSD profile assistance and a check of the information you need for supplier applications." },
      { title: "Business administration", body: "Administrative help with relevant certificates, tax information and changes to business details." },
    ],
    questions: [
      { question: "Are government fees included?", answer: "No. Our listed price is for assistance. We explain any official fees separately before you decide to proceed." },
      { question: "Can you guarantee registration or a certificate?", answer: "The relevant authority makes the decision and issues the official record. We help you prepare and complete the process carefully." },
    ],
  },
  tenders: {
    heading: "Check the tender before preparing a bid.",
    paragraphs: [
      "We check what the buyer needs, where the work is, the deadline and the required documents. You can then decide whether the tender fits your business.",
      "If you decide to bid, we help organise documents, complete SBD forms and check the submission requirements. You review the response before it is sent and remain responsible for the accuracy of your business information.",
    ],
    points: [
      { title: "Search", body: "Find notices relevant to the goods or services you provide and the areas you can serve." },
      { title: "Prepare", body: "Make sense of mandatory documents, declarations, forms and submission instructions." },
      { title: "Review", body: "Check the assembled response and the closing time before it is submitted." },
    ],
    questions: [
      { question: "Will you find a tender I can win?", answer: "We can search for relevant notices and help you assess the requirements. We cannot promise that a suitable notice will be open or that a bid will be awarded." },
      { question: "Can you help if a deadline is close?", answer: "Send us the notice and deadline. We will first check whether there is enough time to do the work properly before agreeing to help." },
    ],
  },
  "opportunities-applications": {
    heading: "Forms, documents and deadlines.",
    paragraphs: [
      "We check the entry requirements and closing date for your chosen programme, then help prepare your results, identification and other documents for the application.",
      "We work through the online forms with you and review the details before submission. NSFAS assistance is optional: you can apply directly through its official channels for free.",
    ],
    points: [
      { title: "Choose your route", body: "Tell us which institution, programme or funding application you have in mind." },
      { title: "Prepare your documents", body: "Review the requested information and identify what is missing before you start." },
      { title: "Review and submit", body: "Work through the form together and review your answers before they are sent." },
    ],
    questions: [
      { question: "Do you decide whether I am accepted or funded?", answer: "No. Admissions and funding decisions belong to the university or funding body. We help with the application process only." },
      { question: "Is the NSFAS application itself paid?", answer: "No. Applying directly through NSFAS is free. Our price is for optional assistance with the process, not an NSFAS charge." },
    ],
  },
  "branding-print": {
    heading: "Logos, graphics and printed materials.",
    paragraphs: [
      "We design logos and graphics for the places you’ll use them: websites, social posts, business cards, uniforms and signs. Send your existing logo, or ask us about creating one.",
      "For print and branded gifts, we need the item, quantity and finish. For ink or toner, send your printer model or cartridge code. We check availability and confirm costs before you order.",
    ],
    points: [
      { title: "Brand identity design", body: "Logo options and a consistent approach to colour, type and everyday graphics." },
      { title: "Business materials", body: "Flyers, cards, social graphics, signage and branded corporate gifts." },
      { title: "Print production and supplies", body: "Artwork prepared for the chosen material; ink and toner sourced against your printer details." },
    ],
    questions: [
      { question: "Can you work with my existing logo?", answer: "Yes. Send us the files you have and show us where the logo needs to appear. We will let you know if a cleaner source file or redraw is needed." },
      { question: "Is printing included in the design price?", answer: "Printing is quoted separately by quantity and material. We will explain the full cost before anything is produced." },
      { question: "Can you help with ink, toner or corporate gifts?", answer: "Yes. Send your printer model or cartridge code for supplies, or tell us the quantity and branding you need for gifts. We will confirm options, costs and availability before you order." },
    ],
  },
  "ai-digital-tools": {
    heading: "Start with the task, then pick a tool.",
    paragraphs: [
      "Show us a task that takes your team time: writing product descriptions, organising information, researching a topic or answering the same customer questions. We’ll check whether an AI tool can help.",
      "We set up an example using your work and show your team how to use it. For customer replies, that means deciding what can be drafted in advance and what needs a personal answer. You learn how to check the results before using them.",
    ],
    points: [
      { title: "AI consultation", body: "A hands-on or online session based on the tasks your business handles." },
      { title: "Workflow setup", body: "A simple workflow, prompts or automation that your team can test on real work." },
      { title: "Team training", body: "Clear guidance on reviewing outputs, protecting information and knowing when to step in." },
    ],
    questions: [
      { question: "Do I need to subscribe to lots of tools?", answer: "No. We start with your needs and budget. Any tool subscription or usage cost is explained separately before setup." },
      { question: "Can you come to our business?", answer: meetingInformation },
    ],
  },
};

export function ServiceDepth({ slug }: { slug: string }) {
  const content=serviceDetail[slug];
  if (!content) return null;
  return <>
    <section className="depth-section wrap"><div className="depth-intro"><h2>{content.heading}</h2></div><div className="depth-prose">{content.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{slug === "websites" && <div className="website-context-links"><Link href="/work">Explore our website projects <span aria-hidden="true">↗</span></Link><Link href="/website-design-kzn">Website design across KwaZulu-Natal <span aria-hidden="true">↗</span></Link><Link href="/website-design-pretoria">Website design in Pretoria and Centurion <span aria-hidden="true">↗</span></Link></div>}</div></section>
    <section className="depth-points wrap" aria-label="Ways we can help">{content.points.map((point)=><article key={point.title}><ContentIllustration kind={illustrationFor(point.title)} /><h3>{point.title}</h3><p>{point.body}</p></article>)}</section>
    <section className="depth-faq wrap"><div><h2>A few practical answers.</h2></div><div>{content.questions.map(item=><details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>
  </>;
}

export function WorkDepth() {
  return <>
    <section className="depth-section wrap"><div className="depth-intro"><h2>Let the clothes lead. Give the story room.</h2></div><div className="depth-prose"><p>Legend Black Jesus is a South African clothing brand with a strong visual identity. The first screen puts the clothing front and centre, then offers a direct route to the shop and best sellers. Shoppers meet the products before they need to read about the brand.</p><p>We put the clothing into clear groups: tees, hoodies, activewear and accessories. Best sellers and new arrivals give returning visitors a quick way in. The separate About and “Our world” pages hold the brand's message and photographs of people wearing the pieces.</p></div></section>
    <section className="work-flow"><div className="wrap"><h2>From the first look<br />to the order.</h2><div className="work-flow-grid"><article><ContentIllustration kind="search" /><h3>Find a piece.</h3><p>Shop by category or explore the full collection. The shop can be filtered by product type, while the home page brings best sellers and new arrivals forward.</p></article><article><ContentIllustration kind="bag" /><h3>See it properly.</h3><p>A product page shows the piece on its own, on a model and in detail. Price, colour, size and delivery information sit beside the photographs, with related items below.</p></article><article><ContentIllustration kind="chat" /><h3>Take the order to WhatsApp.</h3><p>The customer chooses a size, adds the item to a bag and continues the order on WhatsApp. LBJ confirms availability, the courier and the final total directly.</p></article></div></div></section>
    <section className="depth-section wrap"><div className="depth-intro"><h2>Open the live pages.</h2></div><div className="depth-prose"><p>The collection, a product detail page and the community gallery each solve a different part of the browsing journey. You can see them on the finished site:</p><div className="work-proof-links"><a href="https://legendblackjesus.co.za/shop.html" target="_blank" rel="noreferrer">Shop and categories <span aria-hidden="true">↗</span></a><a href="https://legendblackjesus.co.za/products/signature-tee.html" target="_blank" rel="noreferrer">Signature Tee product page <span aria-hidden="true">↗</span></a><a href="https://legendblackjesus.co.za/world.html" target="_blank" rel="noreferrer">Out in the world gallery <span aria-hidden="true">↗</span></a></div></div></section>
    <section className="work-summary wrap"><h2>A place to discover, choose and enquire.</h2><p>Home, shop, individual product pages, brand story, community gallery and a WhatsApp ordering path form one connected website for Legend Black Jesus.</p><Link href="/services/websites">See how we build websites <span aria-hidden="true">↗</span></Link></section>
  </>;
}

export function AboutDepth() {
  return <section id="our-story" className="about-depth about-shared-story" aria-labelledby="our-story-title"><article className="wrap">
    <h2 id="our-story-title">Our story.</h2>
    <div className="about-shared-story-copy">
      <p>Sabelo Ndlovu worked in the music industry, managing artists and booking their shows. After discovering AI tools, he began experimenting with web development and learning through projects for businesses.</p>
      <p>His niece, Sthembile, joined him on the design side.</p>
      <p>Sthembile is 15 and in Grade 9. Sabelo introduced her to computers and AI, and she took an interest in page layouts and graphics. She now leads web and graphic design for the studio.</p>
      <p>They work together on business and e-commerce websites, reviewing the design and build as each project develops.</p>
    </div>
  </article></section>;
}

export function PricingDepth() {
  return <section className="pricing-depth wrap"><div><h2>What goes into your quote.</h2><p>The final price depends on your pages, content, products and any custom features. We agree on these with you before starting.</p></div><div className="pricing-depth-list"><div><h3>Planning the work</h3><p>We plan the pages, content, design and how customers will contact you or order. Your quote confirms the work and timeline.</p></div><div><h3>Costs to plan for</h3><p>Domain, hosting, content work and ongoing maintenance are confirmed in your quote where they apply. {shopifyCosts}</p></div><div><h3>Custom functionality</h3><p>Larger product catalogues, bookings, client portals and operational dashboards are quoted according to the functionality you need.</p></div></div></section>;
}

export function ContactDepth() {
  return <section className="contact-depth wrap"><div><h2>You don't need a perfect brief.</h2><p>Tell us what your business does and what you need help with. You can send your current website, examples you like or a list of pages you have in mind.</p></div><div><h3>What happens next</h3><ul className="illustrated-list" role="list"><li><ContentIllustration kind="chat" />We ask a few questions to understand the work.</li><li><ContentIllustration kind="document" />We explain what we can help with and what we need from you.</li><li><ContentIllustration kind="review" />We agree on price and the next steps before starting.</li></ul><p>{meetingInformation}</p></div></section>;
}

export function ServicesDepth() {
  return <section className="services-depth"><div className="wrap"><div><h2>From the first idea<br />to a live website.</h2></div><div><p>We plan the pages, content and features with you, then design and build the site. You review it with us on phones and desktops before launch.</p><p>The work, price and timeline are agreed before we start. We can also quote for updates and ongoing support. Our studio works from Newcastle, KZN, and Pretoria, Gauteng, and online across South Africa.</p><Link href="/pricing">Explore website packages <span aria-hidden="true">↗</span></Link></div></div></section>;
}
