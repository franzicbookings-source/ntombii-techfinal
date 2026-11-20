import { pageMetadata } from "@/components/site-seo";
import { ServiceDetailPage, services } from "@/components/inner-pages";
export const metadata = pageMetadata({ title: "ChatGPT & AI Setup in Newcastle & Pretoria", description: "Practical ChatGPT training and digital workflow setup for Newcastle, Pretoria and Centurion businesses. Online sessions and meetings by appointment; scope agreed first.", path: "/services/ai-digital-tools" });
export default function Page() { return <ServiceDetailPage service={services[5]} />; }
