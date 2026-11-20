import { portfolioPackage } from "./website-packages";
import { ContentIllustration, illustrationFor } from "./content-illustration";
import "./additional-service-icons.css";
import { WebDevelopmentShowcase } from "./web-development-showcase";

export const universities = [
  "Cape Peninsula University of Technology", "Central University of Technology", "Durban University of Technology",
  "Mangosuthu University of Technology", "Nelson Mandela University", "North-West University", "Rhodes University",
  "Sefako Makgatho Health Sciences University", "Sol Plaatje University", "Stellenbosch University",
  "Tshwane University of Technology", "University of Cape Town", "University of Fort Hare", "University of Johannesburg",
  "University of KwaZulu-Natal", "University of Limpopo", "University of Mpumalanga", "University of Pretoria",
  "University of South Africa", "University of the Free State", "University of the Western Cape",
  "University of the Witwatersrand", "Vaal University of Technology", "University of Zululand",
  "Walter Sisulu University", "University of Venda",
];

const chapters = [
  {
    id: "websites",
    label: "Business & e-commerce websites",
    title: "A better home for your business online.",
    description: "We design and build business and e-commerce websites that make it easier for people to find you, understand your work and get in touch.",
    details: "Website design · development · e-commerce websites · SEO · ongoing support",
    price: `Portfolio websites from ${portfolioPackage.price} · custom work quoted according to project requirements`,
    image: "/images/service-websites.webp",
    alt: "Figma workspace with the Legend Black Jesus website filling the laptop display",
    message: "Hi Ntombii Tech, I'd like a quote for a business or e-commerce website.",
  },
  {
    id: "business-setup",
    label: "Company registration",
    title: "Get your business moving.",
    description: "Company registration assistance, CSD supplier profiles and business administration.",
    details: "CIPC registration · CSD · tax and B-BBEE admin support",
    price: "Company registration assistance from R499, plus official fees",
    image: "/images/service-registration.webp",
    alt: "BizPortal services page mockup filling a laptop display",
    message: "Hi Ntombii Tech, I need help with business registration or business paperwork.",
  },
  {
    id: "tenders",
    label: "Tender application support",
    title: "Find the right opportunity. Put your best foot forward.",
    description: "We help you search for relevant tenders, check what is required, prepare supporting documents and work through submission forms.",
    details: "Tender searches · document preparation · SBD forms · submissions",
    price: "Tender searches from R399 · response support quoted according to project requirements",
    image: "/images/service-tenders.webp",
    alt: "South African eTender portal mockup filling a laptop display",
    message: "Hi Ntombii Tech, I need help finding or preparing a tender application.",
  },
  {
    id: "applications",
    label: "University, college & NSFAS applications",
    title: "Your next step deserves a clear start.",
    description: "Applying to university or for NSFAS? We can help you understand the steps, check your documents and complete your application.",
    details: "University applications · NSFAS application assistance",
    price: "NSFAS assistance R70 · single application R50 · bundles from R120, excluding institution fees",
    image: "/images/service-applications.webp",
    alt: "Student at a laptop showing a University of Pretoria online application mockup",
    message: "Hi Ntombii Tech, I need help with a university or NSFAS application.",
  },
  {
    id: "branding",
    label: "Branding & print",
    title: "Make every introduction count.",
    description: "Logo design, business graphics, printing, signage, printer supplies and branded corporate gifts.",
    details: "Graphic design · logos · printing · signage · ink and toner · corporate gifts",
    price: "Designs from R250 · logos from R650 · printing quoted by quantity",
    image: "/images/service-branding.webp",
    alt: "Printed business materials being reviewed by hand at a print workspace",
    message: "Hi Ntombii Tech, I'd like a quote for branding, printing, ink and toner or corporate gifts.",
  },
  {
    id: "ai-services",
    label: "AI training & automation",
    title: "Put new tools to work in your business.",
    description: "We introduce your business to useful AI tools, show you how they fit into everyday work and help set them up. Online across South Africa, with meetings in Newcastle, Pretoria and Centurion by appointment.",
    details: "Customer replies · content · research · websites · everyday admin · automation",
    price: "Consultations from R950 · setup quoted according to project requirements",
    image: "/images/service-ai.webp",
    alt: "A shop owner and adviser reviewing a customer enquiry workflow on a laptop and phone",
    message: "Hi Ntombii Tech, I'd like help introducing AI tools into my business.",
  },
];

export function ServiceChapters() {
  return <WebDevelopmentShowcase />;
}

const summaries: Record<string, string> = {
  "business-setup": "Company registration, CSD supplier profiles and business administration.",
  tenders: "Tender searches and help preparing submission documents.",
  applications: "University and NSFAS application assistance.",
  branding: "Printing, signage, ink and toner. Logos and business graphics.",
  "ai-services": "ChatGPT training, digital workflows and automation setup.",
};

export function AdditionalServices() {
  return <section id="additional-services" className="additional-services-section wrap" aria-labelledby="additional-services-title">
    <div className="additional-services-heading">
      <p className="eyebrow">On request</p>
      <h2 id="additional-services-title">Additional services</h2>
      <p>We mainly build websites. We also offer the services below on request. Ask us about availability.</p>
    </div>
    <div className="additional-services-grid">{chapters.slice(1).map(chapter => <a id={chapter.id} key={chapter.id} href={`/services/${chapter.id === "applications" ? "opportunities-applications" : chapter.id === "branding" ? "branding-print" : chapter.id === "ai-services" ? "ai-digital-tools" : chapter.id}`}>
      <div><h3 className="additional-service-title"><ContentIllustration kind={illustrationFor(chapter.details)} /><span>{chapter.label}</span></h3><p>{summaries[chapter.id]}</p></div><span aria-hidden="true">↗</span>
    </a>)}</div>
    <a className="text-link additional-print-link" href="/printing-signage-toner-kzn">Printing, signage and toner in KZN <span aria-hidden="true">↗</span></a>
  </section>;
}
