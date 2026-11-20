import { portfolioSchema, pageMetadata } from "@/components/site-seo";
import { WorkPage } from "@/components/inner-pages";
import { StructuredData } from "@/components/structured-data";
export const metadata = pageMetadata({ title: "Website Portfolio & Completed Projects", description: "Explore seven websites built by Ntombii Tech, from online shops for fragrance and clothing brands to artist, security and consulting websites. See the designs and project details.", path: "/work" });
export default function Page() { return <><StructuredData data={portfolioSchema("/work")} /><WorkPage /></>; }
