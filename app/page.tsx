import { HomePage } from "@/components/home-page";
import { portfolioSchema } from "@/components/site-seo";
import { StructuredData } from "@/components/structured-data";

export default function Page() {
  return <><StructuredData data={portfolioSchema("/")} /><HomePage /></>;
}

