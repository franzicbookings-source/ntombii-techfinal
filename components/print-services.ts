export type PrintService = {
  slug: string; name: string; title: string; seoTitle: string; description: string;
  intro: string; summary: string; paragraphs: readonly string[]; offering: readonly string[];
  checklist: readonly string[]; articleSlug: string;
  localHeading: string; localIntro: string; quoteLabel: string; guideLabel: string;
  image: string; imageAlt: string; imageCaption: string; imageWidth: number; imageHeight: number;
  message: string;
};

export const printServices: readonly PrintService[] = [
  {
    slug: "signage", name: "Signage", title: "Signage in Newcastle, KZN.",
    seoTitle: "Signage in Newcastle, KZN | Shop & Business Signs",
    description: "Business signage in Newcastle, Osizweni and Madadeni, KZN. Ask Ntombii Tech for shop-sign artwork, production options and a quote for your premises.",
    intro: "Signs for shops, entrances and business premises in Newcastle, Osizweni, Madadeni and wider KZN. Send your logo, sign dimensions and location. We’ll discuss the artwork, materials and production costs.",
    summary: "Shop signs, entrance signs and business signage. We help with the artwork, suitable production options and a quote for your premises.",
    paragraphs: ["A shopfront sign needs to be readable from the road. A reception sign is seen closer up. Tell us where the sign will go and what people need to notice first.", "Send a photograph of the sign position and its width and height. We use those details to discuss the layout, indoor or outdoor use and suitable materials. You approve the wording and artwork before production. If you need fitting, include the surface and access details so installation, travel and any permissions can be checked in the quote."],
    offering: ["Shop and business-sign artwork", "Entrance and reception-sign layouts", "Logo, wording and size preparation", "Indoor and outdoor production options", "Fitting arrangements assessed on request"],
    checklist: ["What the sign is for and how many you need", "Width and height, including the measurement units", "Photographs of the proposed position", "Your logo and exact wording", "Your town, required date and any fitting needs"],
    articleSlug: "signage-newcastle-kzn-quote-guide", image: "/images/signage-shopfront-mockup.webp",
    localHeading: "Signage for Osizweni and Madadeni businesses.",
    localIntro: "Send your street or area, a photo of the premises and the date you need the sign. Our Newcastle team will check production, fitting and transport options. We take enquiries from across KZN.",
    quoteLabel: "Get a signage quote", guideLabel: "Read the signage guide",
    imageAlt: "Ntombii Tech shop-sign and pavement-sign design mockup on a business frontage",
    imageCaption: "Business signage design mockup using the Ntombii Tech logo.", imageWidth: 1536, imageHeight: 1024,
    message: "Hi Ntombii Tech, I need a signage quote. My town is: ",
  },
  {
    slug: "printing", name: "Business printing", title: "Printing in Newcastle, KZN.",
    seoTitle: "Printing in Newcastle, KZN | Cards, Flyers & T-shirts",
    description: "Business cards, flyers and T-shirt printing for Newcastle, Osizweni and Madadeni businesses in KZN. Send your artwork and quantity to Ntombii Tech for a quote.",
    intro: "Business-card printing, flyers and branded T-shirts for Newcastle, Osizweni and Madadeni businesses. We prepare your artwork and arrange printing, with the quantity, finish and cost agreed before production.",
    summary: "Business cards, flyers and branded T-shirts. Send the artwork, quantity and required date for a design and printing quote.",
    paragraphs: ["We design and arrange printing for business cards, flyers and branded T-shirts. Tell us what you need, how many and when you need them. You approve the artwork before printing.", "For business cards and flyers, send the finished size, quantity, print sides and preferred paper or finish. For T-shirt printing, send garment colours, sizes and print positions. Share your original logo and exact wording; you approve the artwork before printing. The quote confirms production timing and collection or transport."],
    offering: ["Business-card design and printing", "Flyer printing for businesses and events", "Branded T-shirt and uniform printing enquiries", "Logo, wording and print-ready artwork", "Paper, finish and quantity quotations"],
    checklist: ["The item, finished size and quantity", "Paper/finish, print sides or T-shirt print positions", "T-shirt colours and size breakdown, where relevant", "Your logo, wording and any existing artwork", "Your town and required date"],
    articleSlug: "business-printing-newcastle-kzn-guide", image: "/images/business-printing-mockup.webp",
    localHeading: "Printing for Osizweni and Madadeni businesses.",
    localIntro: "Send your artwork, quantity, required date and town. Our Newcastle team will confirm collection or transport before you order. Enquiries are welcome from elsewhere in KZN too.",
    quoteLabel: "Get a print quote", guideLabel: "Read the printing guide",
    imageAlt: "Ntombii Tech branded business cards, flyers and a white T-shirt in a print design mockup",
    imageCaption: "Business-card, flyer and branded T-shirt design mockup.", imageWidth: 1536, imageHeight: 1024,
    message: "Hi Ntombii Tech, I need a printing quote. My town is: ",
  },
  {
    slug: "ink-toner", name: "Ink & toner", title: "Printer ink and toner in Newcastle, KZN.",
    seoTitle: "Printer Ink & Toner in Newcastle, KZN | Cartridges & Supplies",
    description: "Need toner or printer ink in Newcastle, Osizweni or Madadeni, KZN? Ntombii Tech checks cartridges, compatibility, price and availability for your printer model.",
    intro: "Printer ink cartridges, laser-printer toner and ink bottles for homes and businesses in Newcastle, Osizweni and Madadeni, KZN. Send your printer model so we can check the correct supply, price and availability.",
    summary: "Ink cartridges, toner cartridges and printer ink bottles. We check the exact printer model, suitable supplies, price and availability.",
    paragraphs: ["Laser printers use toner; inkjet printers use ink cartridges or ink bottles. The right supply depends on the exact printer model, not just its brand. Send every letter and number in the model, the cartridge code if you have it, and the colour and quantity you need. Clear photographs of the labels help us check the match.", "Tell us whether you want an original cartridge or would like a suitable compatible option considered. We confirm the supply type, availability and price before you order. Collection or transport is included in that discussion. For T-shirt printing ink, send the printing method and ink type so we can check that request separately."],
    offering: ["Ink cartridges for inkjet printers", "Toner cartridges for laser printers", "Printer ink bottles and model checks", "Original or suitable compatible supplies, where available", "T-shirt printing ink enquiries"],
    checklist: ["Printer brand and complete model number", "Cartridge or bottle code, if available", "Colour and quantity", "Photographs of labels or a printer message if needed", "Your town, required date and preferred supply type"],
    articleSlug: "printer-toner-ink-newcastle-kzn-guide", image: "/images/ink-toner-product-illustration.webp",
    localHeading: "Toner and printer ink for Osizweni and Madadeni.",
    localIntro: "Send your printer model, cartridge code and town to our Newcastle team. We check compatibility and stock, then confirm the price and collection or transport. We take enquiries from across KZN.",
    quoteLabel: "Check ink & toner options", guideLabel: "Find the right ink or toner",
    imageAlt: "Illustrative toner cartridge, ink cartridge and ink bottles for printer-supply enquiries",
    imageCaption: "Product illustration. Stock and compatibility are confirmed for your request.", imageWidth: 1536, imageHeight: 1024,
    message: "Hi Ntombii Tech, I need ink or toner. My printer model is: ",
  },
];
