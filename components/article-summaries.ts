export type ArticleSummary = {
  slug: string; title: string; seoTitle: string; description: string; category: string;
  summary: string; datePublished: string; author: string; readingMinutes: number;
  image: string; imageAlt: string; imageProjectID?: string;
  imageCaption?: string; imageWidth?: number; imageHeight?: number;
  imagePresentation?: "product";
};

export const articleSummaries: readonly ArticleSummary[] = [
  {
    "slug": "website-design-newcastle-business-guide",
    "title": "Website design in Newcastle, KZN: pages, features and quotes",
    "description": "Website design for Newcastle, Osizweni and Madadeni businesses in KZN. See useful pages, WhatsApp enquiries, mobile features and what to ask in a quote.",
    "category": "Web development",
    "summary": "Planning a business website in Newcastle, Osizweni or Madadeni? Here’s how to choose the pages and features you need, prepare your content and compare quotes.",
    "datePublished": "2026-10-12",
    "author": "Ntombii Tech",
    "image": "/images/work-security-desktop.jpg",
    "imageAlt": "Snesenzo Security Group website built by Ntombii Tech, with service information and a quote enquiry path",
    "imageProjectID": "snesenzo-security",
    "seoTitle": "Website Design in Newcastle, KZN | Pages & Quotes",
    "readingMinutes": 5
  },
  {
    "slug": "get-found-google-ai-search",
    "title": "Local SEO in Newcastle, KZN: Google and AI search",
    "description": "Local SEO for Newcastle, Osizweni and Madadeni businesses in KZN. Improve service pages, Google Business details and useful content for Google and AI search.",
    "category": "SEO",
    "summary": "How service pages, accurate location details and examples of your work help customers find your business on Google and understand what you offer.",
    "datePublished": "2026-10-12",
    "author": "Ntombii Tech",
    "image": "/images/web-demo-home.jpg",
    "imageAlt": "Legend Black Jesus website built by Ntombii Tech, showing the clothing collection and clear product browsing",
    "imageProjectID": "legend-black-jesus",
    "seoTitle": "Local SEO in Newcastle, KZN | Google & AI Search",
    "readingMinutes": 4
  },
  {
    "slug": "signage-newcastle-kzn-quote-guide",
    "title": "Signage in Newcastle, KZN: shop signs, artwork and quotes",
    "seoTitle": "Signage in Newcastle, KZN | Shop Signs & Quotes",
    "description": "Signage in Newcastle, KZN. Ntombii Tech welcomes Osizweni and Madadeni business enquiries. Send measurements, artwork and location details for a quote.",
    "category": "Signage & branding",
    "summary": "Ordering a sign for your shop or office? Here’s what to measure, what artwork to send and what to check before approving a quote.",
    "datePublished": "2026-10-12",
    "author": "Ntombii Tech",
    "image": "/images/signage-shopfront-mockup.webp",
    "imageAlt": "Ntombii Tech shop-sign and pavement-sign design mockup on a business frontage",
    "imageCaption": "Business signage design mockup using the Ntombii Tech logo.",
    "imageWidth": 1536,
    "imageHeight": 1024,
    "readingMinutes": 3
  },
  {
    "slug": "business-printing-newcastle-kzn-guide",
    "title": "Printing in Newcastle, KZN: business cards, flyers and T-shirts",
    "seoTitle": "Business Printing Guide for Newcastle, KZN",
    "description": "Business cards, flyers and T-shirt printing in Newcastle, KZN. Ntombii Tech welcomes Osizweni and Madadeni enquiries. Send artwork and quantities for a quote.",
    "category": "Printing",
    "summary": "A guide to ordering business cards, flyers and branded T-shirts: quantities, artwork, finishes and the details that affect your quote.",
    "datePublished": "2026-10-12",
    "author": "Ntombii Tech",
    "image": "/images/business-printing-mockup.webp",
    "imageAlt": "Ntombii Tech branded business cards, flyers and a white T-shirt in a print design mockup",
    "imageCaption": "Business-card, flyer and branded T-shirt design mockup.",
    "imageWidth": 1536,
    "imageHeight": 1024,
    "readingMinutes": 3
  },
  {
    "slug": "printer-toner-ink-newcastle-kzn-guide",
    "title": "Toner and ink in Newcastle, KZN: printer cartridges and orders",
    "seoTitle": "Toner & Ink in Newcastle, KZN | Printer Cartridges",
    "description": "Need toner or ink in Newcastle, Osizweni or Madadeni, KZN? Send your printer model and cartridge code to Ntombii Tech for an availability check and quote.",
    "category": "Ink & toner",
    "summary": "Find your printer model and cartridge code, check ink and toner options, and know what to confirm before ordering a replacement.",
    "datePublished": "2026-10-12",
    "author": "Ntombii Tech",
    "image": "/images/ink-toner-product-illustration.webp",
    "imageAlt": "Illustrative toner cartridge, ink cartridge and ink bottles for a guide to printer supply enquiries",
    "imageCaption": "Product illustration. Supply type, stock and compatibility are checked for each enquiry.",
    "imageWidth": 1536,
    "imageHeight": 1024,
    "imagePresentation": "product",
    "readingMinutes": 3
  }
];
