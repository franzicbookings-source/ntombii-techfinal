import { awardStory, laRazaStory, type ArticleSummary } from "./article-summaries";
import { awardVerificationUrl } from "./web-design-award";
export type Article = ArticleSummary & {
  sections: readonly {
    id: string;
    heading: string;
    paragraphs: readonly string[];
    bullets?: readonly string[];
  }[];
  sources: readonly { label: string; url: string }[];
  relatedprojectIDs: readonly string[];
  proofLink?: { href: string; label: string };
  relatedServicePath?: string; serviceLinkLabel?: string;
  inquiryMessage?: string; relatedArticleSlug?: string;
};
export const articles: readonly Article[] = [
  {
    ...awardStory,
    proofLink: { href: awardVerificationUrl, label: "Verify the award" },
    sections: [
      {
        id: "the-award",
        heading: "How the award is judged",
        paragraphs: [
          "Web-Design.co.za is a South African web design directory that runs its own awards. Its judges look at one page, the homepage on a site’s own domain, and score it in three areas. A site needs a total of 90% or more to win.",
        ],
        bullets: [
          "Design (55%): colour, spacing, sharp images and the overall impression.",
          "Ease of use (30%): whether buttons are easy to find, the layout makes sense and the pages feel connected.",
          "Speed (15%): how quickly the site loads, including for people on slower connections.",
        ],
      },
      {
        id: "what-it-took",
        heading: "What it took to qualify",
        paragraphs: [
          "A site isn’t scored at all unless it clears two hurdles first. Its code has to pass the W3C Markup Validator, the web’s official HTML checker, without a single error. And the design has to be original, so sites built on a bought template or theme don’t qualify. We built ntombii.tech from scratch.",
          "Design carries most of the mark, so we kept the same colours, typeface and spacing on every page. Someone moving from our work to our prices should never feel they’ve landed on a different site.",
          "For ease of use, the homepage opens with two buttons, “Discuss your website” and “See our work”, because most visitors come for one or the other. Our prices have a page of their own, where you can compare the three packages side by side. When you’re ready to ask for a quote, the form writes a WhatsApp message for you to check and send.",
          "Speed counts for the least, but the judges make a fair point: not everyone has a fast connection. Plenty of South Africans browse on prepaid mobile data, so the project videos on our site only load when you scroll to them, and they stay paused if your phone is set to save data.",
          "To confirm the award, open the Web-Design.co.za awards checker and enter www.ntombii.tech.",
        ],
      },
      {
        id: "real-work-examples",
        heading: "The same standard on client work",
        paragraphs: [
          "The award was for our own website, but the same three questions shape our client work: does it look right, is it easy to use and does it load quickly? Each project also starts with the main thing a visitor has come to do.",
          "La Raza, a new restaurant and cocktail lounge in Newcastle, needed to hire staff before opening. On its launch page, the open roles sit beside the application form, so someone can read about a job and upload a CV from their phone.",
          "Moyandi Scents, a home-fragrance brand in Durban, wanted gift-buying to be simple. Shoppers choose the scents for a gift box and check out as a guest, with no account to create.",
        ],
      },
      {
        id: "phone-check",
        heading: "Check your own website on a phone",
        paragraphs: [
          "You don’t need to enter an award to use its criteria. Open your homepage on your phone, on mobile data rather than Wi-Fi. Does it load quickly enough that you’d wait for it? Does it still look tidy on a small screen?",
          "Then test ease of use, the part business owners find hardest to judge because they already know where everything is. Pick the one thing you most want a customer to do, such as asking for a quote or checking whether you deliver to their area. Hand your phone to someone who has never used your website and ask them to do it, without helping. Wherever they hesitate is the page, link or button to fix first.",
        ],
      },
    ],
    sources: [{ label: "Web-Design.co.za judging criteria and award checker", url: awardVerificationUrl }],
    relatedprojectIDs: ["la-raza", "moyandi-scents"],
    relatedArticleSlug: "website-design-newcastle-business-guide",
  },
  {
    ...laRazaStory,
    "sections": [
      {
        "id": "why-phases",
        "heading": "Why build a website in phases",
        "paragraphs": [
          "A new restaurant needs attention before it needs a full website. People want to know what's coming and when, and the owners need to hire a team before the doors open.",
          "So we're building La Raza's website in two phases. Phase one went live quickly with just what the business needs before opening. Phase two, the full website with online ordering, is being built properly behind it, without holding up the launch."
        ]
      },
      {
        "id": "phase-one",
        "heading": "Phase one: the launch page (live now)",
        "paragraphs": [
          "The launch page at laraza.co.za does a few jobs, and nothing else:"
        ],
        "bullets": [
          "A countdown to La Raza's big announcement.",
          "One sign-up box for news and specials, by email or WhatsApp.",
          "A hiring page for four roles: Manager, Barman, Hostess and General Workers.",
          "A job application form with a CV upload and optional references.",
          "Links to La Raza on Instagram and Facebook."
        ]
      },
      {
        "id": "email-or-whatsapp",
        "heading": "Email or WhatsApp: let people choose",
        "paragraphs": [
          "Many people in Newcastle would rather hear from a business on WhatsApp than by email. So the sign-up has a single box that takes either an email address or a WhatsApp number. Visitors don't have to think about which one to use, and La Raza builds one list of people who want news and specials."
        ]
      },
      {
        "id": "hiring",
        "heading": "Hiring through the website",
        "paragraphs": [
          "Opening a restaurant means hiring a whole team. Instead of collecting CVs by hand, the launch page invites applications. The vacancies appear on an invitation card rising out of an envelope, in keeping with La Raza's look.",
          "Applicants choose a role, add their name, email and WhatsApp number, and attach a CV as a PDF, a Word document or a photo, up to 4 MB. Accepting a photo matters: someone with a printed CV can apply straight from their phone. The form also tells applicants that their details are only used for hiring at La Raza."
        ]
      },
      {
        "id": "phase-two",
        "heading": "Phase two: the full website (next)",
        "paragraphs": [
          "Next, we're building La Raza's full website from the plan we agreed in our proposal. Guests will be able to order online and see their orders.",
          "The launch page keeps working while we build. When phase two is ready, it replaces the launch page at the same address, so nobody loses the link."
        ]
      },
      {
        "id": "real-work-examples",
        "heading": "See the work",
        "paragraphs": [
          "The project page shows the launch page on a computer and a phone, with a short video of the live site. For an online shop we've already built, see Moyandi Scents."
        ]
      },
      {
        "id": "for-your-business",
        "heading": "Should your business launch in phases?",
        "paragraphs": [
          "A phased website can make sense if:"
        ],
        "bullets": [
          "You're opening soon and want to start collecting interest now.",
          "You need to hire before you open.",
          "Your full list of features will take time to build properly.",
          "You want to start simply and add online orders, bookings or a shop later."
        ]
      }
    ],
    "sources": [
      {
        "label": "La Raza launch page",
        "url": "https://laraza.co.za/"
      },
      {
        "label": "Ntombii Tech website packages",
        "url": "https://ntombii.tech/pricing"
      }
    ],
    "relatedprojectIDs": [
      "la-raza",
      "moyandi-scents"
    ],
    "relatedArticleSlug": "moyandi-scents-ecommerce-website-durban"
  },
  {
    "slug": "moyandi-scents-ecommerce-website-durban",
    "title": "Building an online shop for a Durban candle brand: Moyandi Scents",
    "seoTitle": "E-commerce Website for a Durban Candle Brand | Moyandi",
    "description": "How we built the Moyandi Scents e-commerce website in Durban: shopping by scent, a gift box builder, two-step guest checkout, courier delivery and a private store dashboard.",
    "category": "E-commerce",
    "summary": "Moyandi Scents sells candles, reed diffusers, linen sprays and car diffusers from Durban. Here’s what went into its online shop, and what other small product brands can take from it.",
    "datePublished": "2026-11-20",
    "author": "Ntombii Tech",
    "image": "/images/work-new/moyandi-scents-detail.webp",
    "imageAlt": "Moyandi Scents gift box builder with gift combinations, prices and scent choices",
    "imageProjectID": "moyandi-scents",
    "imageWidth": 1440,
    "imageHeight": 1000,
    "readingMinutes": 4,
    "sections": [
      {
        "id": "the-brand",
        "heading": "A brand built on a family name",
        "paragraphs": [
          "Moyandi Scents is a home-fragrance brand from Durban, founded by Nokwanda Cele. The name comes from her great-grandfather, Umoya Omnandi, whose name means “pleasant air”. The range covers soy wax candles, reed diffusers, linen sprays, car diffusers and gift sets.",
          "Smell doesn’t travel through a screen, so the website has to do the next best thing: show the products well, make each scent easy to choose, and make buying simple. We built the site around those three jobs."
        ]
      },
      {
        "id": "shop-by-scent",
        "heading": "Make every scent easy to find",
        "paragraphs": [
          "The shop groups the range by product type: candles, reed diffusers, car diffusers, linen sprays and gift sets. Every product card shows the price and how many scents it comes in, so shoppers know what to expect before they open a page. Shoppers can also sort by price.",
          "On a product page, the scents sit beside the price as simple buttons. The reed diffuser also lets shoppers choose a bottle style. Stock is tracked for every scent separately, so the shop knows exactly which option is available."
        ]
      },
      {
        "id": "gift-box",
        "heading": "A gift box builder instead of a long list",
        "paragraphs": [
          "Gifts are a big part of a fragrance business, so they have their own page. Shoppers choose one of three combinations, then pick a scent for each item. The gift box total updates as they choose, and the whole box goes into the cart as one item.",
          "This saves people from adding three products separately and hoping they go together. It also gives the brand a clear way to sell its red gift box."
        ],
        "bullets": [
          "Candle and linen spray gift set: R350",
          "Diffuser and linen spray gift set: R300",
          "Candle, diffuser and linen spray gift set: R450"
        ]
      },
      {
        "id": "checkout",
        "heading": "A short checkout, with no account needed",
        "paragraphs": [
          "The checkout has two steps: your details, then delivery and payment. Shoppers don’t need to create an account to place an order. Delivery is calculated at checkout based on where the order is going.",
          "Orders are delivered across South Africa with The Courier Guy. The shipping page explains that handmade candles take one to three business days to prepare, and that tracking details are sent once an order has been dispatched. Clear delivery information answers questions before a customer has to ask them.",
          "The checkout is built for Paystack, a South African payment provider. Card details are handled by Paystack rather than stored on the website, and an order is only marked as paid once the payment is confirmed with Paystack."
        ]
      },
      {
        "id": "store-dashboard",
        "heading": "A dashboard the owner can run herself",
        "paragraphs": [
          "Behind the shop is a private dashboard. From there, the owner can add and edit products, change prices, update stock for each scent, follow orders, add tracking details, create discount codes and set delivery options. She doesn’t need a developer to make everyday changes.",
          "A custom dashboard like this is more than most small businesses need on day one. If you sell a handful of products, our Shopify e-commerce package is often a better start: it uses Shopify’s own dashboard for products, stock and orders. Custom dashboards are quoted separately."
        ]
      },
      {
        "id": "real-work-examples",
        "heading": "See the finished website",
        "paragraphs": [
          "The project page shows the homepage, the gift box builder and the phone layout, with a short video of the live site. You can also visit the shop yourself."
        ]
      },
      {
        "id": "for-your-shop",
        "heading": "What other product brands can take from it",
        "paragraphs": [
          "If you’re planning an online shop, these choices from the Moyandi build are worth borrowing:"
        ],
        "bullets": [
          "Show the price and the number of options on every product card.",
          "Let people choose options, like scent or size, with buttons instead of drop-down menus.",
          "If you sell gifts, let shoppers build the gift in one place.",
          "Let people check out without making an account.",
          "Explain delivery times and costs before checkout, not after.",
          "Make sure you can update products and stock yourself."
        ]
      }
    ],
    "sources": [
      {
        "label": "Moyandi Scents: shop",
        "url": "https://moyandiscents.co.za/shop"
      },
      {
        "label": "Moyandi Scents: shipping and delivery",
        "url": "https://moyandiscents.co.za/policies/shipping"
      },
      {
        "label": "Paystack: accept payments in South Africa",
        "url": "https://paystack.com/za"
      },
      {
        "label": "The Courier Guy",
        "url": "https://www.thecourierguy.co.za/"
      }
    ],
    "relatedprojectIDs": [
      "moyandi-scents",
      "legend-black-jesus"
    ],
    "relatedArticleSlug": "website-design-newcastle-business-guide"
  },
  {
    "slug": "website-design-newcastle-business-guide",
    "title": "Website design in Newcastle, KZN: pages, features and quotes",
    "description": "Website design for Newcastle, Osizweni and Madadeni businesses in KZN. See useful pages, WhatsApp enquiries, mobile features and what to ask in a quote.",
    "category": "Web development",
    "summary": "Planning a business website in Newcastle, Osizweni or Madadeni? Here’s how to choose the pages and features you need, prepare your content and compare quotes.",
    "sections": [
      {
        "id": "start-with-customer",
        "heading": "Start with what your customer needs to do",
        "paragraphs": [
          "Start with what customers need: your services, examples of your work and a way to contact you. A shop may need product browsing and orders. A contractor may need a quote form. Choose features that help people use your business.",
          "Before choosing colours or animations, finish this sentence: “When someone visits our website, we want them to…” Use the answer to decide which pages, photos and buttons you need."
        ]
      },
      {
        "id": "real-work-examples",
        "heading": "Different businesses need different websites",
        "paragraphs": [
          "Our work shows why one layout cannot do every job. The Legend Black Jesus website helps visitors browse products and continue their order on WhatsApp. A clear product photo and an easy order path matter more there than a long company introduction.",
          "For Snesenzo Security Group, visitors need to understand the available security services and reach the business to discuss a quote.",
          "Choose features for your customers rather than copying a website built for a different kind of business."
        ]
      },
      {
        "id": "useful-pages",
        "heading": "Put the important information where people can find it",
        "paragraphs": [
          "Someone arriving on your homepage should quickly understand your service, the people you help and how to reach you. Use simple English. “We install and maintain…” is easier to understand than a slogan that never names the service.",
          "Most small business websites need these basics:"
        ],
        "bullets": [
          "A clear introduction and a short explanation of your services or products.",
          "Real photographs, examples of work or genuine customer feedback.",
          "Your correct contact details and the areas you serve.",
          "A contact form, WhatsApp link or booking option that fits the business.",
          "Answers to common questions, such as what is included and how to get a quote."
        ]
      },
      {
        "id": "mobile",
        "heading": "Make the phone experience easy",
        "paragraphs": [
          "Check how the site works on a small screen before treating it as finished. Text should be comfortable to read. A visitor should be able to tap the main button without hunting for it, and a form should not ask for information the business does not need.",
          "Large photographs can slow a page down. Crowded sections can bury the contact button. Keep images useful, use enough space between elements and make links clear. Also consider people using a keyboard or assistive technology: buttons need understandable labels, and important information needs to be actual text."
        ]
      },
      {
        "id": "osizweni-madadeni-websites",
        "heading": "Website requests from Osizweni and Madadeni",
        "paragraphs": [
          "A shop, service business or contractor in Osizweni or Madadeni needs a website that explains the work and how to enquire. State the actual area you serve, show genuine photographs or completed jobs, and make your phone number or WhatsApp button easy to find. If customers need directions, publish accurate location details.",
          "We plan and review websites over WhatsApp and online calls from Newcastle, KZN, and Pretoria, Gauteng. Send your location, services and what customers should be able to do on the site. Use your real service area and contact details."
        ]
      },
      {
        "id": "compare-quotes",
        "heading": "Compare what is included in the quote",
        "paragraphs": [
          "Compare what each quote includes, not just the price. A business information site and an e-commerce website need different features. A low starting price may not cover everything you need.",
          "Get clear answers to these questions:"
        ],
        "bullets": [
          "How many pages are included, and who supplies the wording and photographs?",
          "Are the domain, hosting and future renewal costs included or charged separately?",
          "Does the price cover forms, WhatsApp, bookings or online payments?",
          "Who controls the domain and can request changes after launch?",
          "What ongoing support is included, and what do later updates cost?"
        ]
      },
      {
        "id": "content-checklist",
        "heading": "Prepare your information before the build",
        "paragraphs": [
          "Send your logo, contact details, services, approved prices and photos you have permission to use. Include your business name as it should appear and explain what customers should be able to do on the site.",
          "If you already have a website, list what is confusing or outdated. If you are starting fresh, collect the questions customers ask on the phone or on WhatsApp. Those questions often make useful website content because they come from real conversations."
        ]
      },
      {
        "id": "social-vs-website",
        "heading": "Do you still need a website if you have social media?",
        "paragraphs": [
          "Social media can introduce people to your business and keep them updated. Your website gives you a place to explain services, organise your work and share a direct link to the right information. The two can work together.",
          "For example, a social post can send someone to a service page instead of asking them to scroll through months of posts. That page can answer their question and give them a clear way to contact you."
        ]
      },
      {
        "id": "after-launch",
        "heading": "Keep the website useful after it goes live",
        "paragraphs": [
          "Launching the site is the beginning of looking after it. Update changed contact details, prices and services. Check that forms and WhatsApp links still work. Add real projects when you have useful work to show.",
          "Google also needs to be able to discover and understand your pages. Clear page titles, readable text and links between related pages help. Search visibility takes ongoing work; a website launch does not guarantee first place on Google."
        ]
      },
      {
        "id": "next-step",
        "heading": "Tell us what your website needs to do",
        "paragraphs": [
          "We build websites from Newcastle, KZN, and Pretoria, Gauteng, for businesses across South Africa. Send your services, logo and contact details so we can discuss the pages, features and quote.",
          "If you’re unsure where to start, look through our work and tell us which features would help your customers."
        ]
      }
    ],
    "sources": [
      {
        "label": "Google Search Central: SEO Starter Guide",
        "url": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
      }
    ],
    "relatedprojectIDs": [
      "legend-black-jesus",
      "snesenzo-security",

    ],
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
    "sections": [
      {
        "id": "direct-answer",
        "heading": "Start with your service and your real location",
        "paragraphs": [
          "Local SEO helps people find businesses offering a nearby service. Name what you do, explain where you work and make contacting you easy. Accurate location details and examples of your work help people and search engines understand your business.",
          "No trick guarantees first place. Results vary with the search, the customer’s location and the competition. Focus on helping people find the service they need."
        ]
      },
      {
        "id": "keywords",
        "heading": "Are keywords outdated?",
        "paragraphs": [
          "The words your customers use still matter. Someone searching for website design in Newcastle needs to recognise that service and location on a relevant page. Use clear, natural language in your title, headings and explanation.",
          "What does not help is repeating the same phrase everywhere or adding a hidden list of keywords. Google does not use the meta-keywords tag, and keyword stuffing is against its spam policies. Its systems can understand related words and meaning, so you do not need a separate page for every small variation."
        ]
      },
      {
        "id": "ai-changes",
        "heading": "What has changed with AI search?",
        "paragraphs": [
          "Google's AI Overviews and AI Mode can show answers with links to supporting websites. They can run several related searches while working through a question. A useful page may help answer part of a wider question even when it does not repeat the person's exact wording.",
          "Google's newer guidance puts particular weight on content that offers something useful beyond a familiar summary. A clear explanation from your own work can add more value than another generic list of tips. Your page still needs to be discoverable, indexed and eligible to show a search snippet. Inclusion is never guaranteed."
        ]
      },
      {
        "id": "real-proof",
        "heading": "Show what your work actually involves",
        "paragraphs": [
          "Instead of only writing “professional websites”, show a real website and explain what it lets a visitor do. On Legend Black Jesus, the product browsing and WhatsApp order path are useful things to explain. On Snesenzo Security Group, a visitor's route from services to a quote enquiry is a different example.",
          "A project page can name the business, show an accurate screenshot and describe the visible features. It should not claim more sales, leads or traffic unless you have measured evidence. Genuine customer feedback also helps people assess your work; keep its wording and attribution accurate."
        ]
      },
      {
        "id": "customer-questions",
        "heading": "Answer the questions people ask before they buy",
        "paragraphs": [
          "Use the questions customers ask you: What does the quote include? Can I order on WhatsApp? Who updates the site? What do you need from me? Answering these helps someone decide whether to get in touch.",
          "Use those questions to improve your service pages and choose article topics. Keep each page useful on its own, then link to relevant services and examples of work. Avoid publishing copies of the same page with different town names."
        ]
      },
      {
        "id": "local",
        "heading": "Google visibility in Newcastle, Osizweni and Madadeni",
        "paragraphs": [
          "If your business is eligible for a Google Business Profile, verify it and keep the category, contact details, hours and services correct. Use the same business identity on your website. Add genuine photographs and ask customers for honest reviews of completed work.",
          "Local results mainly depend on relevance, distance and prominence. A search in Osizweni or Madadeni can produce different results from the same search in central Newcastle because the searcher’s location matters. Explain the areas you genuinely serve, but only publish a branch address or create another business profile when it represents a real eligible location. Google says there is no way to request or pay for a better local ranking."
        ]
      },
      {
        "id": "local-service-searches",
        "heading": "Match the page to the service someone is searching for",
        "paragraphs": [
          "A person searching for “toner in Newcastle KZN” needs printer supplies, not a general company introduction. A useful toner page explains how to send the printer model, cartridge code and required colour. A signage page should show suitable examples and explain measurements, artwork and how to get a quote.",
          "If you genuinely take printing enquiries from Madadeni or signage enquiries from Osizweni, say so in readable text and explain what the customer should send. These details belong on the relevant service page or guide. Copying one article for every town adds little value; a shared page can explain regional enquiries while keeping the business location accurate.",
          "Review the searches that bring people to your site in Search Console. Improve the relevant page when real enquiries reveal a missing answer, such as the information needed for T-shirt sizes or whether collection can be arranged. Use the results to decide what to improve next."
        ]
      },
      {
        "id": "website-basics",
        "heading": "Help Google reach the useful pages",
        "paragraphs": [
          "Important information should be actual readable text, not only words inside a poster or screenshot. Give each main page a descriptive title. Make the articles and work pages reachable through normal links, and keep those links working.",
          "A sitemap helps Google discover URLs. Check for accidental indexing blocks, broken pages and confusing duplicate addresses. On phones, keep the layout readable and the main action easy to use. Article structured data can describe the author, title and date. It helps Google understand the article; rankings still depend on relevance and other factors."
        ]
      },
      {
        "id": "measure-2026",
        "heading": "Use the newer Search Console tools",
        "paragraphs": [
          "Google's 2026 Search Console tools include a Search generative AI setting. Check that your property includes its links and content in those features; inclusion is the default. This makes the site eligible, but does not move it ahead of other businesses.",
          "There is also a Generative AI performance report showing impressions from AI Overviews and AI Mode. It may not appear until the site receives enough impressions. Read that alongside ordinary search performance, and watch the enquiries that matter to your business."
        ]
      },
      {
        "id": "avoid-hacks",
        "heading": "Spend time on useful work, not search hacks",
        "paragraphs": [
          "Google says you do not need special AI text files, forced tiny content chunks or special AI schema to appear in its generative search features. Avoid fake reviews, bought mentions and articles that exist only to repeat search phrases.",
          "Start with service information, examples of your work and answers to customer questions. From Newcastle and Pretoria, we help businesses improve their content and search basics. Tell us which services and areas matter to your business."
        ]
      }
    ],
    "sources": [
      {
        "label": "Google Search Central: Optimizing your website for generative AI features",
        "url": "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide"
      },
      {
        "label": "Google Search Central: Creating helpful, reliable, people-first content",
        "url": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
      },
      {
        "label": "Google Search Central: SEO Starter Guide",
        "url": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
      },
      {
        "label": "Google Business Profile: Tips to improve your local ranking",
        "url": "https://support.google.com/business/answer/7091"
      },
      {
        "label": "Google Search Console: Search generative AI control",
        "url": "https://support.google.com/webmasters/answer/16908024"
      },
      {
        "label": "Google Search Console: Generative AI performance report",
        "url": "https://support.google.com/webmasters/answer/16984139"
      },
      {
        "label": "Google Search Central: Article structured data",
        "url": "https://developers.google.com/search/docs/appearance/structured-data/article"
      }
    ],
    "relatedprojectIDs": [
      "legend-black-jesus",
      "snesenzo-security"
    ],
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
    "sections": [
      {
        "id": "start-with-purpose",
        "heading": "Shop, office and directional signage",
        "paragraphs": [
          "A business sign should help people recognise your business, find the entrance or understand the service. An outdoor shop sign, reception sign and direction sign have different jobs. Start with where customers will see it and what they need to notice first.",
          "Our Newcastle team helps with signage artwork and production. Send the sign’s purpose, measurements and location so we can discuss materials, fitting and a quote."
        ]
      },
      {
        "id": "where-sign-will-go",
        "heading": "Measure the space and photograph the position",
        "paragraphs": [
          "Send the width and height of the available space, with the units clearly stated. Include a photograph of the proposed position and one showing the surrounding area. A photograph cannot replace measurements, especially for a sign above a doorway or on a wall.",
          "Say whether the sign will be indoors or outdoors and how far away customers need to read it. Rain, sun, wind and the mounting surface affect the suitable options. Include whether the sign is temporary or intended for longer use."
        ]
      },
      {
        "id": "keep-message-readable",
        "heading": "Keep the important wording readable",
        "paragraphs": [
          "Choose a clear order: business name, main service, then the contact detail or direction customers need. A small sign cannot carry every service and social media account comfortably. Use the space for the information that helps someone recognise the business or take the next step.",
          "Send the original logo file if available and the exact approved wording. Low-resolution screenshots can become blurred when enlarged. Check how the proposed layout reads at the size and distance where the finished sign will be seen."
        ]
      },
      {
        "id": "local-signage-request",
        "heading": "Signage requests from Osizweni and Madadeni",
        "paragraphs": [
          "For a business in Osizweni or Madadeni, include the address or a clear landmark with your measurements. Say whether you need only the sign produced or also want fitting assessed. For a sign on a building, send the mounting position, surface and access details so the practical requirements can be checked.",
          "We are based in Newcastle, KZN. Customers elsewhere in the province can send the same brief with their town. Collection, transport and any on-site work are confirmed for the request before you order."
        ]
      },
      {
        "id": "quote-checklist",
        "heading": "What to send for a signage quote",
        "paragraphs": [
          "Include these details so we can prepare a quote:"
        ],
        "bullets": [
          "The type of sign, its purpose and the quantity.",
          "Width and height, plus photographs of the position.",
          "Your logo, exact wording and any existing artwork.",
          "Indoor or outdoor use, your business location and required date.",
          "Whether you need collection, transport or fitting assessed."
        ]
      },
      {
        "id": "artwork-and-production",
        "heading": "Check the proof and what the quote includes",
        "paragraphs": [
          "Before production, check the spelling, phone number, website, address and final dimensions on the proof. Confirm the artwork, material and output covered by the quote. Ask which changes are included and what happens after approval.",
          "Sign production and installation are separate parts of a job. Check whether fixings, travel, access equipment or removal of an old sign are included. Confirm any required permission with the property owner or relevant municipality before production."
        ]
      }
    ],
    "sources": [
      {
        "label": "Ntombii Tech: branding, print and signage services",
        "url": "https://ntombii.tech/services/branding-print"
      }
    ],
    "datePublished": "2026-10-12",
    "author": "Ntombii Tech",
    "image": "/images/signage-shopfront-mockup.webp",
    "imageAlt": "Ntombii Tech shop-sign and pavement-sign design mockup on a business frontage",
    "imageCaption": "Business signage design mockup using the Ntombii Tech logo.",
    "imageWidth": 1536,
    "imageHeight": 1024,
    "relatedprojectIDs": [],
    "relatedServicePath": "/services/signage",
    "serviceLinkLabel": "Request a signage quote",
    "inquiryMessage": "Hi Ntombii Tech, I need a signage quote in KZN. My town or area is: ",
    "relatedArticleSlug": "business-printing-newcastle-kzn-guide",
    "readingMinutes": 3
  },
  {
    "slug": "business-printing-newcastle-kzn-guide",
    "title": "Printing in Newcastle, KZN: business cards, flyers and T-shirts",
    "seoTitle": "Business Printing Guide for Newcastle, KZN",
    "description": "Business cards, flyers and T-shirt printing in Newcastle, KZN. Ntombii Tech welcomes Osizweni and Madadeni enquiries. Send artwork and quantities for a quote.",
    "category": "Printing",
    "summary": "A guide to ordering business cards, flyers and branded T-shirts: quantities, artwork, finishes and the details that affect your quote.",
    "sections": [
      {
        "id": "choose-the-use",
        "heading": "Business-card, flyer and T-shirt printing",
        "paragraphs": [
          "Printed items do different jobs. A business card helps someone contact you later. A flyer explains a service or offer. Branded T-shirts help identify a team at work or an event. Decide how the item will be used before choosing the design and quantity.",
          "Our Newcastle team helps with design, artwork preparation and printing. Your quote depends on the item, quantity, material and finish."
        ]
      },
      {
        "id": "business-cards",
        "heading": "Business cards: clear contact details first",
        "paragraphs": [
          "Include the business name, the person’s name or role where useful, and the number or channel customers should use. Add your website when it gives people useful information. Keep the wording readable on the finished card, rather than filling every corner.",
          "Confirm the number of cards, finished size, one-sided or two-sided printing and preferred paper or finish. Test any QR code before approval and keep a readable contact detail alongside it."
        ]
      },
      {
        "id": "flyers",
        "heading": "Flyers: make the service or offer easy to spot",
        "paragraphs": [
          "A service flyer needs a clear service name, contact number and the area covered. An event flyer needs the approved date, place and booking details. Check that these details stand out before adding extra wording.",
          "Send the finished size, number of copies, printing sides and paper preference. A design that looks readable on a phone can have very small text when printed. Check the proof at the intended finished size."
        ]
      },
      {
        "id": "tshirts",
        "heading": "Branded T-shirts: sizes, colours and print positions",
        "paragraphs": [
          "Send the number of shirts, each size and the garment colours. Explain whether you need the shirts supplied or already have them. Mark every print position: a chest logo, a back design and sleeve branding are separate parts of the request.",
          "The garment material and artwork affect the suitable print method. Ask what is proposed, what the care instructions are and whether a sample or proof is available. Confirm the size breakdown before approving the order."
        ]
      },
      {
        "id": "local-printing-request",
        "heading": "Printing requests from Osizweni and Madadeni",
        "paragraphs": [
          "If your business, team or event is in Osizweni or Madadeni, send your area and the date the printed items are needed. For an event, give the event date as well as your preferred collection date. This helps us check production timing before the work is agreed.",
          "We’re based in Newcastle and take enquiries from across KZN. Include your town so we can confirm production timing and collection or transport."
        ]
      },
      {
        "id": "print-quote-checklist",
        "heading": "What to send for a printing quote",
        "paragraphs": [
          "Share the original artwork where possible, rather than a small screenshot. Include these details:"
        ],
        "bullets": [
          "The printed item, finished size and quantity.",
          "Printing sides, paper or finish for cards and flyers.",
          "Shirt sizes, colours and print positions for T-shirts.",
          "Your logo, exact wording and any existing design.",
          "Your town or area and required date."
        ]
      },
      {
        "id": "artwork-proof",
        "heading": "Approve the artwork before production",
        "paragraphs": [
          "Check the spelling, names, numbers, prices and website on the final proof. Make sure any logos and photographs are yours to use. Confirm whether the quote includes design, artwork preparation, production and transport.",
          "Compare quotes using the same quantity and specification. A screen preview helps check layout and wording, but is not an exact promise of printed colour. If colour matching is important, ask about a sample before approving the full job."
        ]
      }
    ],
    "sources": [
      {
        "label": "Ntombii Tech: business printing and branding services",
        "url": "https://ntombii.tech/services/branding-print"
      }
    ],
    "datePublished": "2026-10-12",
    "author": "Ntombii Tech",
    "image": "/images/business-printing-mockup.webp",
    "imageAlt": "Ntombii Tech branded business cards, flyers and a white T-shirt in a print design mockup",
    "imageCaption": "Business-card, flyer and branded T-shirt design mockup.",
    "imageWidth": 1536,
    "imageHeight": 1024,
    "relatedprojectIDs": [],
    "relatedServicePath": "/services/printing",
    "serviceLinkLabel": "Request a printing quote",
    "inquiryMessage": "Hi Ntombii Tech, I need a printing quote in KZN. My town or area is: ",
    "relatedArticleSlug": "printer-toner-ink-newcastle-kzn-guide",
    "readingMinutes": 3
  },
  {
    "slug": "printer-toner-ink-newcastle-kzn-guide",
    "title": "Toner and ink in Newcastle, KZN: printer cartridges and orders",
    "seoTitle": "Toner & Ink in Newcastle, KZN | Printer Cartridges",
    "description": "Need toner or ink in Newcastle, Osizweni or Madadeni, KZN? Send your printer model and cartridge code to Ntombii Tech for an availability check and quote.",
    "category": "Ink & toner",
    "summary": "Find your printer model and cartridge code, check ink and toner options, and know what to confirm before ordering a replacement.",
    "sections": [
      {
        "id": "identify-before-ordering",
        "heading": "Start with the complete printer model",
        "paragraphs": [
          "Send the full printer model and the code on your existing cartridge or packaging. A brand name alone isn’t enough. Even similar model names can use different cartridges.",
          "We check supplies against those details before quoting. Clear photos of the printer and cartridge labels help us avoid missing letters or numbers."
        ]
      },
      {
        "id": "ink-or-toner",
        "heading": "Ink, toner and printer parts are different",
        "paragraphs": [
          "Inkjet printers use liquid ink; laser printers use toner powder. Some inkjet printers use cartridges and others use specified refill bottles. Check the information for the exact printer rather than choosing a product because it looks similar.",
          "Some laser printers have a separate drum. If the screen says the drum needs replacing, buying toner may not solve the warning. Send a photograph of the message if you are unsure which supply or part is needed."
        ]
      },
      {
        "id": "original-and-compatible",
        "heading": "Check whether the quote is original or compatible",
        "paragraphs": [
          "An original cartridge is sold under the printer manufacturer’s brand. A compatible option is made by another supplier for specified models. If both are available, ask which one is quoted and whether it has been checked against your exact printer.",
          "Cartridge chips, printer software and settings can affect some alternatives. Ask about the supplier’s return conditions and what happens if a confirmed option is not recognised. Price alone does not establish compatibility."
        ]
      },
      {
        "id": "colour-capacity",
        "heading": "Confirm the colour and quantity",
        "paragraphs": [
          "State whether you need black, one colour or a full set. Some colour printers use separate cartridges and others combine colours. Send the relevant cartridge code rather than assume every cartridge from the range fits your printer.",
          "Standard and higher-capacity options may be available for some models. Compare the quoted capacity as well as the price. Page yield is an estimate under test conditions; photographs and heavy colour coverage use more supply than light text documents."
        ]
      },
      {
        "id": "local-toner-request",
        "heading": "Toner and ink enquiries from Osizweni and Madadeni",
        "paragraphs": [
          "For an office, school or business in Osizweni or Madadeni, send your printer details, quantity and area in one message. Tell us when you need the supplies so availability and timing can be checked before you make plans.",
          "We are based in Newcastle, KZN, and welcome enquiries from elsewhere in the province. The quote confirms suitable supply options, expected timing and collection or transport arrangements for the request. For T-shirt printing ink, include the printing method and required ink type so that it is checked separately from ordinary printer supplies."
        ]
      },
      {
        "id": "order-checklist",
        "heading": "What to send for a toner or ink quote",
        "paragraphs": [
          "Send these details for a quote:"
        ],
        "bullets": [
          "Printer brand and complete model number.",
          "Cartridge or bottle code, where available.",
          "Required colour and quantity.",
          "Clear label photographs or the printer warning message if needed.",
          "Your town or area, required date and preferred original or compatible option."
        ]
      },
      {
        "id": "availability-before-ordering",
        "heading": "Confirm the details before ordering",
        "paragraphs": [
          "Check the quoted product, model compatibility, quantity, price and availability before approving the order. If the printer was bought in another country, mention that: some supplies have regional differences that need checking.",
          "Send the printer and cartridge details first. We’ll check options and prices before you order."
        ]
      }
    ],
    "sources": [
      {
        "label": "Ntombii Tech: ink and toner order assistance",
        "url": "https://ntombii.tech/services/branding-print"
      },
      {
        "label": "HP Support: identify your printer and find its product information",
        "url": "https://support.hp.com/us-en/printer"
      }
    ],
    "datePublished": "2026-10-12",
    "author": "Ntombii Tech",
    "image": "/images/ink-toner-product-illustration.webp",
    "imageAlt": "Illustrative toner cartridge, ink cartridge and ink bottles for a guide to printer supply enquiries",
    "imageCaption": "Product illustration. Supply type, stock and compatibility are checked for each enquiry.",
    "imageWidth": 1536,
    "imageHeight": 1024,
    "imagePresentation": "product",
    "relatedprojectIDs": [],
    "relatedServicePath": "/services/ink-toner",
    "serviceLinkLabel": "Check toner and ink availability",
    "inquiryMessage": "Hi Ntombii Tech, I need toner or ink in KZN. My town or area is: ",
    "relatedArticleSlug": "signage-newcastle-kzn-quote-guide",
    "readingMinutes": 3
  }
];
export function getArticle(slug: string) { return articles.find(article => article.slug === slug); }
