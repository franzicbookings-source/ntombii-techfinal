import { pageMetadata } from "@/components/site-seo";
import { ServiceDetailPage, services } from "@/components/inner-pages";
export const metadata = pageMetadata({ title: "Company Registration Assistance in Newcastle, KZN", description: "CIPC company registration and CSD profile assistance for Newcastle, Osizweni, Madadeni and KZN businesses. Official fees separate; enquire about availability.", path: "/services/business-setup" });
export default function Page() { return <ServiceDetailPage service={services[1]} />; }
