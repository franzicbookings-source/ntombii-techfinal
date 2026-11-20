export type PortfolioProject = {
  id: string;
  name: string;
  previewName: string;
  kind: string;
  category: string;
  description: string;
  tags: readonly string[];
  tagDescriptions: readonly string[];
  url: string;
  caseStudyUrl?: string;
  desktop: { src: string; alt: string; label: string };
  detail: { src: string; alt: string; label: string };
  mobile: { src: string; alt: string };
};

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    "id": "friday-consulting",
    "caseStudyUrl": "/work/friday-consulting",
    "name": "Friday Consulting",
    "previewName": "Friday Consulting",
    "kind": "Business website",
    "category": "Consulting & project support · South Africa",
    "description": "Friday Consulting offers business advice and project support across six service areas. Its website explains each service, presents project experience with the company’s role identified, and helps visitors prepare an enquiry for the team.",
    "tags": [
      "Service pages",
      "Project experience",
      "Email enquiries"
    ],
    "tagDescriptions": [
      "Find the right specialist service.",
      "Explore selected project experience.",
      "Prepare a clear project brief."
    ],
    "url": "https://friday-consulting.vercel.app/",
    "desktop": {
      "src": "/images/work-new/friday-consulting-desktop.webp",
      "alt": "Friday Consulting homepage introducing consulting and project support",
      "label": "friday-consulting.vercel.app"
    },
    "detail": {
      "src": "/images/work-new/friday-consulting-detail.webp",
      "alt": "Friday Consulting service areas and specialist support",
      "label": "A closer look / Services"
    },
    "mobile": {
      "src": "/images/work-new/friday-consulting-mobile.webp",
      "alt": "Friday Consulting website adapted for a phone"
    }
  },
  {
    "id": "penny-ntuli",
    "caseStudyUrl": "/work/penny-ntuli",
    "name": "Penny Ntuli",
    "previewName": "Penny Ntuli",
    "kind": "Personal brand website",
    "category": "Radio & partnerships · South Africa",
    "description": "Penny Ntuli works across radio, television, events and brand partnerships. Her website brings together career highlights, collaborations and press coverage so potential partners can get to know her work before making contact.",
    "tags": [
      "Career & partnerships",
      "Social channels",
      "Enquiry flow"
    ],
    "tagDescriptions": [
      "Career & partnerships",
      "Social channels",
      "Enquiry flow"
    ],
    "url": "https://penny-ntuli-partnerships.vercel.app/",
    "desktop": {
      "src": "/images/work-new/penny-ntuli-desktop.webp",
      "alt": "Penny Ntuli website homepage",
      "label": "penny-ntuli-partnerships.vercel.app"
    },
    "detail": {
      "src": "/images/work-new/penny-ntuli-detail.webp",
      "alt": "Penny Ntuli website content and services",
      "label": "A closer look"
    },
    "mobile": {
      "src": "/images/work-new/penny-ntuli-mobile.webp",
      "alt": "Penny Ntuli website on a phone"
    }
  },
  {
    "id": "fezile-security",
    "caseStudyUrl": "/work/fezile-security",
    "name": "Fezile Security Services",
    "previewName": "Fezile Security Services",
    "kind": "Business website",
    "category": "Security services · South Africa",
    "description": "Fezile Security Services offers guarding, response, monitoring and specialist protection. We built service pages and branch information so visitors can find the protection they need, request a quote or contact the right office.",
    "tags": [
      "Service pages",
      "Branch contacts",
      "Quote enquiries"
    ],
    "tagDescriptions": [
      "Service pages",
      "Branch contacts",
      "Quote enquiries"
    ],
    "url": "https://fezile-security-services.vercel.app/",
    "desktop": {
      "src": "/images/work-new/fezile-security-desktop.webp",
      "alt": "Fezile Security Services website homepage",
      "label": "fezile-security-services.vercel.app"
    },
    "detail": {
      "src": "/images/work-new/fezile-security-detail.webp",
      "alt": "Fezile Security Services website content and services",
      "label": "A closer look"
    },
    "mobile": {
      "src": "/images/work-new/fezile-security-mobile.webp",
      "alt": "Fezile Security Services website on a phone"
    }
  },
  {
    id: "legend-black-jesus",
    name: "Legend Black Jesus",
    previewName: "Legend Black Jesus",
    kind: "E-commerce website",
    category: "Fashion & lifestyle · South Africa",
    description: "Legend Black Jesus is a South African clothing brand. We built a website where shoppers can explore the collections, choose a size and colour, and continue their order on WhatsApp.",
    tags: ["Web design", "Web development", "Responsive design"],
    tagDescriptions: ["Give the brand its own space.", "Bring the products into focus.", "Browse comfortably on a phone."],
    url: "https://legendblackjesus.co.za/",
    caseStudyUrl: "/work/legend-black-jesus",
    desktop: { src: "/images/web-demo-home.jpg", alt: "Legend Black Jesus homepage with its clothing collection and brand photography", label: "legendblackjesus.co.za" },
    detail: { src: "/images/web-demo-product.jpg", alt: "Signature Tee product page with photographs, size and colour choices", label: "A closer look / Signature Tee" },
    mobile: { src: "/images/web-demo-mobile.jpg", alt: "Legend Black Jesus collection adapted for a mobile screen" },
  },
  {
    id: "snesenzo-security",
    name: "Snesenzo Security Group",
    previewName: "Snesenzo Security Group",
    kind: "Business website",
    category: "Security services · South Africa",
    description: "Snesenzo Security Group provides protection services across KwaZulu-Natal, Mpumalanga and Gauteng. We built a website that introduces the company, explains its services and helps visitors request a quote.",
    tags: ["Business website", "Service pages", "Quote enquiries"],
    tagDescriptions: ["A clear first introduction.", "Show customers what you offer.", "Make the next conversation easy."],
    url: "https://www.snesenzosecuritygroup.co.za/",
    caseStudyUrl: "/work/snesenzo-security",
    desktop: { src: "/images/work-security-desktop.jpg", alt: "Snesenzo Security Group homepage showing its team, vehicles and quote request button", label: "snesenzosecuritygroup.co.za" },
    detail: { src: "/images/work-security-detail.jpg", alt: "Snesenzo Security Group service page presenting its protection services", label: "A closer look / Security services" },
    mobile: { src: "/images/work-security-mobile.jpg", alt: "Snesenzo Security Group homepage adapted for a phone" },
  },
  {
    "id": "khuzani-blue-nation",
    "caseStudyUrl": "/work/khuzani-blue-nation",
    "name": "Khuzani Mpungose",
    "previewName": "Khuzani Mpungose",
    "kind": "Artist website",
    "category": "Music & culture · South Africa",
    "description": "Khuzani Mpungose’s website brings together his music, story, Blue Nation community, achievements and gig guide. Fans can explore the recordings; promoters can find live information and enquire about bookings.",
    "tags": [
      "Artist story",
      "Music & live dates",
      "Bookings"
    ],
    "tagDescriptions": [
      "Artist story",
      "Music & live dates",
      "Bookings"
    ],
    "url": "https://khuzani-blue-nation.vercel.app/",
    "desktop": {
      "src": "/images/work-new/khuzani-blue-nation-desktop.webp",
      "alt": "Khuzani Mpungose website homepage",
      "label": "khuzani-blue-nation.vercel.app"
    },
    "detail": {
      "src": "/images/work-new/khuzani-blue-nation-detail.webp",
      "alt": "Khuzani Mpungose website content and services",
      "label": "A closer look"
    },
    "mobile": {
      "src": "/images/work-new/khuzani-blue-nation-mobile.webp",
      "alt": "Khuzani Mpungose website on a phone"
    }
  },
];
