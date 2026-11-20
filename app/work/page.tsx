import { portfolioSchema, pageMetadata } from "@/components/site-seo";
import { WorkPage } from "@/components/inner-pages";
import { StructuredData } from "@/components/structured-data";
export const metadata = pageMetadata({ title: "Website Portfolio & Completed Projects", description: "Explore six websites built by Ntombii Tech, from clothing stores and artist sites to security and consulting businesses. See the designs and project details.", path: "/work" });
export default function Page() { return <><StructuredData data={portfolioSchema("/work")} /><WorkPage /></>; }
