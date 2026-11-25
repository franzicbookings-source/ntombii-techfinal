import { portfolioSchema, pageMetadata } from "@/components/site-seo";
import { WorkPage } from "@/components/inner-pages";
import { StructuredData } from "@/components/structured-data";
export const metadata = pageMetadata({ title: "Website Portfolio & Completed Projects", description: "Explore websites we built for South African businesses, from La Raza’s restaurant launch page to Moyandi Scents’ e-commerce website. See the designs and project details.", path: "/work" });
export default function Page() { return <><StructuredData data={portfolioSchema("/work")} /><WorkPage /></>; }
