import { pageMetadata } from "@/components/site-seo";
import { ServiceDetailPage, services } from "@/components/inner-pages";
export const metadata = pageMetadata({ title: "Printing, Signage, Ink & Toner in Newcastle, KZN", description: "Business printing, signage, ink and toner for Newcastle, Osizweni and Madadeni enquiries. Ask Ntombii Tech for a quote, with collection or delivery confirmed before ordering.", path: "/services/branding-print", image: "/images/business-printing-mockup.webp", imageAlt: "Business cards, flyers and a branded T-shirt design mockup" });
export default function Page() { return <ServiceDetailPage service={services[4]} />; }
