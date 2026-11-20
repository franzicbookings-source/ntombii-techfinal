import { packagePriceSummary, portfolioPackage } from "@/components/website-packages";
import { pageMetadata } from "@/components/site-seo";
import { PricingPage } from "@/components/inner-pages";
export const metadata = pageMetadata({ title: `Website Prices in South Africa | From ${portfolioPackage.price}`, description: `${packagePriceSummary} Compare features and setup costs.`, path: "/pricing" });
export default function Page() { return <PricingPage />; }
