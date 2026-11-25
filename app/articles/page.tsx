import { ArticlesPage } from "@/components/articles-page";
import { pageMetadata } from "@/components/site-seo";
export const metadata = pageMetadata({ title: "Business Guides and Studio Notes", description: "Website design guides, project stories and studio news from Ntombii Tech in Newcastle and Pretoria, plus local SEO advice and print guides for KZN businesses.", path: "/articles" });
export default function Page() { return <ArticlesPage />; }
