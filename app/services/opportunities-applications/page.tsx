import { pageMetadata } from "@/components/site-seo";
import { ServiceDetailPage, services } from "@/components/inner-pages";
export const metadata = pageMetadata({ title: "University & NSFAS Application Assistance in Newcastle, KZN", description: "University, college and NSFAS help for Newcastle, Osizweni and Madadeni students in KZN. Assistance from R50; direct NSFAS applications are free.", path: "/services/opportunities-applications" });
export default function Page() { return <ServiceDetailPage service={services[3]} />; }
