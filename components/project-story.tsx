import { ContentIllustration, illustrationFor } from "./content-illustration";
import Link from "next/link";
import { InnerPage } from "./inner-pages";
import { portfolioProjects } from "./portfolio-projects";
import { ProjectScreens, type ProjectScreen } from "./project-screens";
import { ProjectMotion } from "./project-motion";
import { businessId, pageMetadata, projectSchema, siteUrl } from "./site-seo";
import { StructuredData } from "./structured-data";

const stories = {
  "la-raza": {
    title: "La Raza Restaurant Launch Website",
    detailLabel: "Hiring", detailSize: [1440, 1000],
    description: "See the La Raza launch page built by Ntombii Tech for a new Newcastle restaurant and cocktail lounge: a countdown, email and WhatsApp sign-ups and CV applications, with online ordering planned for phase two.",
    heading: "La Raza.",
    introduction: "A new restaurant and cocktail lounge in Newcastle, KZN. We're building its website in phases: a launch page first, then the full website with online ordering.",
    purpose: "Start the guest list before the doors open.",
    paragraphs: [
      "A new restaurant doesn't need its full website on day one, but it does need a way to gather interest before opening. The launch page counts down to La Raza's big announcement, invites visitors to get news and specials by email or WhatsApp, and links to La Raza on Instagram and Facebook.",
      "La Raza is also hiring. We presented the vacancies as an invitation card rising out of an envelope, listing four roles: Manager, Barman, Hostess and General Workers. Applicants choose a role, add their details and attach a CV as a PDF, a Word document or a photo. Phase two, the full website where guests can order online and see their orders, is next.",
    ],
    features: ["Countdown to the big announcement", "Email or WhatsApp sign-up for news and specials", "Hiring invitation for four roles", "CV upload: PDF, Word or a photo, up to 4 MB", "Instagram and Facebook links", "Phase two (planned): online ordering and order history"],
    steps: [
      { title: "Lead with the countdown", body: "The logo, one line and a countdown to the big announcement open the page. The sign-up sits right below, so guests can leave an email address or a WhatsApp number in one step." },
      { title: "Make hiring feel like an invitation", body: "The vacancies appear on an invitation card rising from an envelope, beside a short form: the role, name, email, WhatsApp number, CV and optional references." },
      { title: "Apply from a phone", body: "On a phone, the countdown, sign-up and invitation stack in order. Applicants can choose a role with one tap and attach their CV straight from the phone, even as a photo of a printed copy." },
    ],
    summary: "Guests can follow the countdown and sign up for news by email or WhatsApp, and job seekers can apply with their CV. Phase two will add online ordering.",
  },
  "moyandi-scents": {
    title: "Moyandi Scents E-commerce Website",
    detailLabel: "Gift boxes", detailSize: [1440, 1000],
    description: "See the Moyandi Scents e-commerce website built by Ntombii Tech: candles, diffusers and linen sprays by scent, a gift box builder, two-step guest checkout and a private store dashboard.",
    heading: "Moyandi Scents.",
    introduction: "A home-fragrance brand from Durban, founded by Nokwanda Cele. We built an online shop for its candles, reed diffusers, linen sprays, car diffusers and gift boxes, with a dashboard for running the store.",
    purpose: "Make choosing a scent feel as easy as smelling one.",
    paragraphs: [
      "Moyandi takes its name from Umoya Omnandi, Nokwanda’s great-grandfather, whose name means “pleasant air”. The website leads with that idea: warm product photography, a short line, and a direct route into the collection. Each product card shows the price and how many scents it comes in, so shoppers know what to expect before they click.",
      "Gifts have their own page. Shoppers choose a combination, pick a scent for each item and see the total update before adding the whole gift box to the cart. Checkout takes two steps and needs no account. Behind the shop, the owner manages products, prices, stock for every scent, orders, discount codes and delivery from a private dashboard.",
    ],
    features: ["Shop by product type, with price and scent count on every card", "Product pages with a scent selector", "Gift box builder with live totals", "Two-step guest checkout", "Delivery with The Courier Guy, calculated at checkout", "Private dashboard for products, stock, orders, discounts and delivery"],
    steps: [
      { title: "Lead with the feeling, then the products", body: "The homepage opens on a full-width photograph of the collection and one line: “The art of pleasant air.” The collection follows straight away, with prices and the number of scents on each card." },
      { title: "Build a gift in one place", body: "The gift page lets shoppers choose a combination, then a scent for each item. The gift box total updates as they choose, and delivery is added at checkout." },
      { title: "Keep shopping comfortable on a phone", body: "On a phone, the photography stays front and centre, with the menu, search and cart in the header. A WhatsApp button stays within reach for questions about scents, orders or gifts." },
    ],
    summary: "Shoppers can find a scent, build a gift box and check out without an account, while the owner runs the shop from her own dashboard.",
  },
  "legend-black-jesus": {
    title: "Legend Black Jesus E-commerce Website",
    detailLabel: "Product page", detailSize: [1440,1000],
    description: "See the Legend Black Jesus website built by Ntombii Tech: clothing collections, product pages, brand photographs and a WhatsApp ordering path.",
    heading: "Legend Black Jesus.",
    introduction: "An e-commerce website for a South African clothing brand. Shoppers can browse the collections, choose a size and colour, and continue their order on WhatsApp.",
    purpose: "Let the clothes lead. Give the story room.",
    paragraphs: [
      "A clothing store needs to make the range easy to browse and each product choice clear before an order starts. For Legend Black Jesus, we built the site around clothing categories, product pages and a shopping cart that prepares a WhatsApp order. Tees, hoodies, activewear and accessories have their own routes into the collection.",
      "Each product has its own page with photographs, size and colour choices and delivery information. The About and ‘Our world’ pages give the brand’s story and community photographs their own space. Once someone has chosen a piece, the order continues on WhatsApp, where the brand confirms availability, courier details and the final total.",
    ],
    features: ["Homepage and clothing collections", "Individual product pages", "Size and colour choices", "Brand story and community gallery", "Shopping cart with WhatsApp ordering", "Layouts for phones and desktops"],
    steps: [
      { title: "See the clothing first", body: "The homepage leads with the clothing and a direct route into the collection. The navigation separates new arrivals, clothing, activewear and accessories, while the brand story has its own place." },
      { title: "Keep product choices together", body: "The product photograph sits beside its price, colour, size and quantity controls. These choices stay together, with product details and delivery information below. The customer chooses a size before adding the item to their bag." },
      { title: "Keep the collection in view", body: "On a phone, the collection uses two product columns, with names, prices and colour choices below the photographs. Filters and sorting sit above the range, while the menu and bag remain accessible in the header." },
    ],
    summary: "Shoppers can explore the clothing and brand story, choose a size and colour, then continue their order on WhatsApp.",
  },
  "snesenzo-security": {
    title: "Snesenzo Security Group Website Project",
    detailLabel: "Service page", detailSize: [1440,1000],
    description: "Explore the Snesenzo Security Group business website built by Ntombii Tech: company information, security service pages, coverage areas and quote enquiries.",
    heading: "Snesenzo Security Group.",
    introduction: "A security company serving KwaZulu-Natal, Mpumalanga and Gauteng. We built a website that explains its services, introduces the company and helps customers ask for a quote.",
    purpose: "Help customers understand the company and get in touch.",
    paragraphs: [
      "Visitors need to know what protection is offered, where the company works and how to ask for a quote. The company introduction, service pages and coverage information answer those questions, with contact options close by.",
      "The homepage introduces the business and provides a route to request a quote. The service pages give visitors more detail before they enquire. We arranged the pages for desktop and mobile use so customers can explore the company from whichever device they have.",
    ],
    features: ["Company introduction and business information", "Security service pages", "Coverage area information", "Quote enquiry path", "Layouts for phones and desktops"],
    steps: [
      { title: "Introduce the people doing the work", body: "The company’s team and vehicles lead the homepage. The quote and phone actions sit over that introduction, while the operating areas and company information are grouped below it. Visitors can see who they are contacting before exploring the services." },
      { title: "Answer the service questions together", body: "Each service pairs a photograph with an explanation, what is included and who it is for. A quote action follows that information, giving the visitor a next step while the service is still in view." },
      { title: "Keep contact within reach on phones", body: "The phone layout stacks the quote and call actions below the main introduction. Company and operating-area details follow in a compact grid, with the founder introduction below. The content keeps its reading order as the screen narrows." },
    ],
    summary: "Visitors can learn about the company, read the service details and request a quote. Explore the homepage, service page and phone screenshots, or open the live site.",
  },
  "penny-ntuli": {
    "title": "Penny Ntuli Partnerships Website Project",
    "description": "Penny Ntuli works across radio, television, events and brand partnerships. We built a website that gives potential partners a place to explore her career, review brand work and media coverage, and start a collaboration enquiry.",
    "heading": "Penny Ntuli.",
    "introduction": "Penny Ntuli works in radio, television, events and brand partnerships. We built a website where potential partners can explore her career, see past collaborations and get in touch.",
    "purpose": "A partnership enquiry starts with knowing the person.",
    "paragraphs": [
      "Penny’s name and portrait lead the homepage, with social and contact links alongside them. Career highlights, brand work and press coverage follow, giving potential partners a fuller picture of her experience.",
      "Radio and screen credits sit beside a collage of photographs. Collaborations have their own section, and press coverage links to published articles. Visitors can review the work before using the enquiry form, email or WhatsApp."
    ],
    "features": [
      "Portrait-led introduction",
      "Career and radio experience",
      "Brand partnerships and collaborations",
      "Social media channel links",
      "Press coverage links",
      "Collaboration enquiries"
    ],
    "steps": [
      {
        "title": "Make the introduction personal",
        "body": "Her portrait, name and a short introduction appear together. Social links and contact options sit alongside them, so visitors can explore her channels or make an enquiry from the opening screen."
      },
      {
        "title": "Put the experience behind the introduction",
        "body": "The career section pairs photographs with radio and screen credits. Brand collaborations and press coverage follow in separate sections, with links to read more."
      },
      {
        "title": "Make contact easy on phones",
        "body": "The portrait and introduction stay first on phones. The mobile menu links to career, brand work, social channels and contact details, with enquiry buttons sized for tapping."
      }
    ],
    "summary": "Potential partners can review Penny’s career, collaborations and press coverage before getting in touch about a campaign.",
    "detailLabel": "A closer look",
    "detailSize": [
      1300,
      845
    ]
  },
  "khuzani-blue-nation": {
    "title": "Khuzani Mpungose Blue Nation Website Project",
    "description": "Khuzani Mpungose’s website serves fans discovering the music and promoters looking for live information. We built dedicated places for his story, recordings, Blue Nation, achievements, gig guide and booking enquiries.",
    "heading": "Khuzani Mpungose.",
    "introduction": "A website for Maskandi artist Khuzani Mpungose, bringing his recordings, story and Blue Nation community together with live dates and booking information.",
    "purpose": "Give the music, the story and the stage their own place.",
    "paragraphs": [
      "Fans can find albums and listening links. Promoters can find live dates and booking information. We organised the site around these visits, with separate sections for Khuzani’s story, Blue Nation, achievements and festival information.",
      "The opening uses his portrait and Blue Nation’s blue, with links to his story and music. His Nkandla roots and Maskandi career are told through expandable chapters. Recordings, achievements and live information have their own sections."
    ],
    "features": [
      "Artist introduction and biography",
      "Music and listening destinations",
      "Achievements and recognition",
      "Blue Nation community pages",
      "Gig guide and festival information",
      "Booking enquiry destination"
    ],
    "steps": [
      {
        "title": "Offer a way to listen and a way to learn",
        "body": "His portrait introduces two choices: read his story or listen to his music. Bookings sit in the navigation for visitors planning an event."
      },
      {
        "title": "Let the biography unfold in chapters",
        "body": "The biography introduces his Nkandla roots and career beside a portrait. Expandable chapters let readers choose how much detail to explore."
      },
      {
        "title": "Keep the same destinations on a phone",
        "body": "The portrait and introduction fit the narrow screen. The mobile menu keeps the same links to music, story, Blue Nation, live information and bookings."
      }
    ],
    "summary": "Fans can explore the music and follow live dates, while promoters can find the information they need for a booking enquiry.",
    "detailLabel": "A closer look",
    "detailSize": [
      1440,
      1026
    ]
  },
  "fezile-security": {
    "title": "Fezile Security Services Website Project",
    "description": "Fezile Security Services provides guarding, response, monitoring and specialist protection. We built service pages and branch information around clear contact routes, helping visitors explore their options before requesting a quote or reaching the relevant office.",
    "heading": "Fezile Security Services.",
    "introduction": "Fezile Security Services offers guarding, response, monitoring and specialist protection. We built a website that explains those services, shows the people doing the work and separates quote enquiries, branch contacts and control-room calls.",
    "purpose": "Make the service clear. Make the right contact easy to find.",
    "paragraphs": [
      "Guarding, response and monitoring, VIP protection and crowd control each have a service page. Industry information helps visitors find the protection relevant to their property, business or event before asking for a quote.",
      "Photographs show the team, vehicles and control room. Quote enquiries, branch contacts and control-room calls are kept separate so visitors can reach the right people."
    ],
    "features": [
      "Company introduction and photographs",
      "Individual security service pages",
      "Industry information",
      "Branch and control-room contacts",
      "Quote enquiries",
      "Careers and company information"
    ],
    "steps": [
      {
        "title": "Show the company behind the service",
        "body": "Photographs of officers and vehicles introduce the company. Visitors can explore the services or request a quote from the opening screen."
      },
      {
        "title": "Let visitors choose the protection they need",
        "body": "Labelled photographs link to guarding, monitoring, VIP protection, crowd control and patrols. Each service has more detail on its own page."
      },
      {
        "title": "Keep service and contact choices usable on phones",
        "body": "On phones, the introduction and contact buttons stack in order. The mobile menu links to services, company information and branches."
      }
    ],
    "summary": "Customers can compare services, see the company at work and contact a branch or request a quote.",
    "detailLabel": "A closer look",
    "detailSize": [
      1440,
      1085
    ]
  },
  "friday-consulting": {
    "title": "Friday Consulting Website Project",
    "description": "Friday Consulting provides business advice and specialist project support across six service areas. We built a website that explains each area, presents project experience with the company’s role made clear, and helps visitors prepare a brief for the team.",
    "heading": "Friday Consulting.",
    "introduction": "Friday Consulting works across business advice, project management, property, GIS, environmental management, planning and supply. We organised its services and project experience so visitors can find the right support and send a project brief.",
    "purpose": "Make a broad consulting offer easy to understand.",
    "paragraphs": [
      "We grouped Friday’s work into six service areas: business advice and project management, property and land advisory, GIS, environmental management, town planning, and supply and delivery. Each has a short introduction and its own page.",
      "Project entries name the work and location, and distinguish direct work from subconsultant experience. The enquiry form asks for the service, project location, brief and timescales. It prepares an email draft for the visitor to review and send."
    ],
    "features": [
      "Six clearly separated service areas",
      "Individual service pages",
      "Selected project experience",
      "Team and company information",
      "Project location and brief fields",
      "Email draft and copy-enquiry options"
    ],
    "steps": [
      {
        "title": "Introduce the offer before asking for a brief",
        "body": "The opening explains Friday’s consulting work and links to a project enquiry. Services, project experience and company information are available in the navigation."
      },
      {
        "title": "Separate the six services",
        "body": "The six services appear in a list with short explanations and links to more detail. A planning enquiry leads to planning information; GIS and business support have their own pages."
      },
      {
        "title": "Prepare an enquiry on a phone",
        "body": "On phones, services and project information appear in sequence. The contact form keeps the brief and location together in an email draft the visitor can review before sending."
      }
    ],
    "summary": "Visitors can find a service, review project experience and prepare an enquiry with their project location, brief and requested support.",
    "detailLabel": "A closer look",
    "detailSize": [
      1440,
      973
    ]
  },
} as const;

export type ProjectStoryId = keyof typeof stories;

export function projectStoryMetadata(id: ProjectStoryId) {
  const project = portfolioProjects.find(project => project.id === id)!;
  const story = stories[id];
  return pageMetadata({ title: story.title, description: story.description, path: project.caseStudyUrl!, image: project.desktop.src, imageAlt: project.desktop.alt });
}

export function ProjectStory({ id }: { id: ProjectStoryId }) {
  const project = portfolioProjects.find(project => project.id === id)!;
  const story = stories[id];
  const pageUrl = `${siteUrl}${project.caseStudyUrl}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: story.heading, description: story.description, inLanguage: "en-ZA", isPartOf: { "@id": `${siteUrl}/#website` }, publisher: { "@id": businessId }, mainEntity: projectSchema(project), breadcrumb: { "@id": `${pageUrl}#breadcrumbs` } },
      { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumbs`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Our work", item: `${siteUrl}/work` },
        { "@type": "ListItem", position: 3, name: project.name, item: pageUrl },
      ] },
    ],
  };
  const screens: readonly ProjectScreen[] = [
    { id: "home", label: "Homepage", image: { ...project.desktop, width: 1440, height: 1000 }, title: story.steps[0].title, description: story.steps[0].body },
    { id: "detail", label: story.detailLabel, image: { ...project.detail, width: story.detailSize[0], height: story.detailSize[1] }, title: story.steps[1].title, description: story.steps[1].body },
    { id: "mobile", label: "On a phone", image: { ...project.mobile, width: 390, height: 844 }, title: story.steps[2].title, description: story.steps[2].body },
  ];
  return <InnerPage><div className="project-story-page">
    <StructuredData data={schema} />
    <nav className="project-breadcrumbs wrap" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/work">Our work</Link><span aria-hidden="true">/</span><span aria-current="page">{project.previewName}</span></nav>
    <section className="detail-hero"><div className="wrap detail-hero-grid">
      <div><h1>{story.heading}</h1><p className="detail-intro">{story.introduction}</p><a className="button button-white" href={project.url} target="_blank" rel="noreferrer">Visit the live website <span aria-hidden="true">↗</span></a></div>
      <ProjectMotion project={project} />
    </div></section>
    <dl className="project-facts wrap"><div><dt>Client</dt><dd>{project.previewName}</dd></div><div><dt>Sector</dt><dd>{project.category}</dd></div><div><dt>What we built</dt><dd>{project.kind}</dd></div></dl>
    <section className="depth-section wrap"><div className="depth-intro"><h2>{story.purpose}</h2></div><div className="depth-prose">{story.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section>
    <section className="detail-body wrap"><div className="detail-body-title"><h2>The pages and features.</h2></div><div className="detail-offering">{story.features.map((feature) => <div key={feature}><ContentIllustration kind={illustrationFor(feature)} /><h3>{feature}</h3></div>)}</div></section>
    <ProjectScreens projectId={id} screens={screens} />
    <section className="work-summary wrap"><h2>See the work for yourself.</h2><p>{story.summary}</p><div className="website-context-links"><Link href="/services/websites">Website design and development <span aria-hidden="true">↗</span></Link><Link href="/pricing">View website prices <span aria-hidden="true">↗</span></Link><Link href="/work">Explore our other projects <span aria-hidden="true">↗</span></Link>{id === "la-raza" ? <Link href="/articles/la-raza-restaurant-website-in-phases">How we&rsquo;re building La Raza in phases <span aria-hidden="true">↗</span></Link> : id === "moyandi-scents" ? <Link href="/articles/moyandi-scents-ecommerce-website-durban">How we built the Moyandi Scents shop <span aria-hidden="true">↗</span></Link> : <Link href="/articles/website-design-newcastle-business-guide">What your business website needs <span aria-hidden="true">↗</span></Link>}</div></section>
    <section className="inner-next"><div className="wrap"><h2>Need a website for your business?</h2><Link className="button button-white" href="/contact">Tell us what you need <span aria-hidden="true">↗</span></Link></div></section>
  </div></InnerPage>;
}
