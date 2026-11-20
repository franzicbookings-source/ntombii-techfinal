import { portfolioProjects } from "@/components/portfolio-projects";
import { articleSummaries } from "@/components/article-summaries";
import { printServices } from "@/components/print-services";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", "/services/websites", "/website-design-kzn", "/website-design-pretoria", "/services/business-setup", "/services/tenders", "/services/opportunities-applications", "/services/branding-print", "/services/ai-digital-tools", "/about", "/work", "/graphics", "/articles", ...articleSummaries.map(article => `/articles/${article.slug}`), "/pricing", "/contact", "/reviews", "/privacy"];
  paths.push(...portfolioProjects.flatMap(project => project.caseStudyUrl ? [project.caseStudyUrl] : []), "/printing-signage-toner-kzn", ...printServices.map(service => `/services/${service.slug}`));
  const articleDates = new Map(articleSummaries.map(article => [`/articles/${article.slug}`, article.datePublished]));
  return paths.map(path => ({
    url: `https://ntombii.tech${path === "/" ? "" : path}`,
    ...(articleDates.has(path) ? { lastModified: articleDates.get(path) } : {}),
  }));
}
