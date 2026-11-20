import { pageMetadata } from "@/components/site-seo";
import { ServiceDetailPage, services } from "@/components/inner-pages";
export const metadata = pageMetadata({ title: "Tender Research & Application Support in Newcastle, KZN", description: "Find relevant tenders, fill SBD forms and prepare submission documents. Newcastle-based help for Osizweni, Madadeni and KZN businesses, subject to availability.", path: "/services/tenders" });
export default function Page() { return <ServiceDetailPage service={services[2]} />; }
