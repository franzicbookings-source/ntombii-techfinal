import { packagePriceSummary } from "@/components/website-packages";
import { pageMetadata } from "@/components/site-seo";
import { ServiceDetailPage, services } from "@/components/inner-pages";
export const metadata = pageMetadata({ title: "Business & E-commerce Websites", description: `${packagePriceSummary} Based in Newcastle and Pretoria.`, path: "/services/websites" });
export default function Page() { return <ServiceDetailPage service={services[0]} />; }
