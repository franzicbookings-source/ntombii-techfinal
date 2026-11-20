import { pageMetadata } from "@/components/site-seo";
import { PrintServicePage } from "@/components/print-service-pages";
import { printServices } from "@/components/print-services";
const service = printServices[1];
export const metadata = pageMetadata({ title: service.seoTitle, description: service.description, path: "/services/printing", image: service.image, imageAlt: service.imageAlt });
export default function Page() { return <PrintServicePage service={service} />; }
