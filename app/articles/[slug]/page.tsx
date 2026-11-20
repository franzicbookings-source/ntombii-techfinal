import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/articles-page";
import { articles, getArticle } from "@/components/article-content";
import { pageMetadata, siteUrl } from "@/components/site-seo";

export function generateStaticParams() { return articles.map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const metadata = pageMetadata({ title: article.seoTitle, description: article.description, path: `/articles/${article.slug}`, image: article.image, imageAlt: article.imageAlt });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: article.datePublished, modifiedTime: article.datePublished, authors: [`${siteUrl}/about`], section: article.category } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
