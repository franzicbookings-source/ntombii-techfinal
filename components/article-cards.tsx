import Link from "next/link";
import { articleSummaries, type ArticleSummary } from "./article-summaries";

export function ArticleCard({ article, headingLevel = 3, compact = false }: { article: ArticleSummary; headingLevel?: 2 | 3; compact?: boolean }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return <article className={`article-card${compact ? " article-card-compact" : ""}`}>
    <Link href={`/articles/${article.slug}`} className="article-card-image" aria-label={`Read ${article.title}`}><img src={article.image} alt={article.imageAlt} width={article.imageWidth ?? 1440} height={article.imageHeight ?? 1000} loading="lazy" /></Link>
    <div className="article-card-copy"><p className="editorial-category">{article.category} · {article.readingMinutes} min read</p><Heading><Link href={`/articles/${article.slug}`}>{article.title}</Link></Heading>{!compact && <p>{article.description}</p>}<Link className="text-link" href={`/articles/${article.slug}`}>Read article <span aria-hidden="true">↗</span></Link></div>
  </article>;
}

export function ArticlesSection() {
  const latestArticles = [...articleSummaries].reverse().sort((a, b) => b.datePublished.localeCompare(a.datePublished)).slice(0, 3);
  return <section className="articles-home section" aria-labelledby="home-articles-title"><div className="wrap">
    <div className="section-heading"><div><h2 id="home-articles-title">Latest articles.</h2></div></div>
    <p className="articles-home-intro">Practical guides to websites and local SEO, plus printing, signage and printer supplies in KZN.</p>
    <div className="article-card-grid">{latestArticles.map(article => <ArticleCard key={article.slug} article={article} compact />)}</div>
    <Link className="button button-white articles-home-more" href="/articles">Read more articles</Link>
  </div></section>;
}
