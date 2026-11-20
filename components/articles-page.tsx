import Link from "next/link";
import { InnerPage } from "./inner-pages";
import { ArticleCard } from "./article-cards";
import { articleSummaries } from "./article-summaries";
import type { Article } from "./article-content";
import { portfolioProjects } from "./portfolio-projects";
import { StructuredData } from "./structured-data";
import { businessId, siteUrl } from "./site-seo";

const publishedDate = (date: string) => new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date + "T12:00:00Z"));

export function ArticlesPage() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${siteUrl}/articles#collection`, name: "Ntombii Tech articles", url: `${siteUrl}/articles`, description: "Practical website and SEO advice from Ntombii Tech in Newcastle and Pretoria, plus guides to signage, business printing and printer supplies in KZN.", isPartOf: { "@id": `${siteUrl}/#website` }, publisher: { "@id": businessId }, mainEntity: { "@type": "ItemList", itemListElement: articleSummaries.map((article, index) => ({ "@type": "ListItem", position: index + 1, url: `${siteUrl}/articles/${article.slug}`, name: article.title })) } };
  return <InnerPage><StructuredData data={schema} /><section className="editorial-heading wrap"><h1>Business guides.</h1><p>Advice on planning a website, getting found on Google and ordering print or signage in KZN. Read what to prepare, what to ask and what to check before paying.</p><Link className="text-link" href="/printing-signage-toner-kzn">Printing, signage or toner enquiries in KZN <span aria-hidden="true">↗</span></Link></section><section className="article-index wrap" aria-label="Articles"><div className="article-card-grid">{articleSummaries.map(article => <ArticleCard key={article.slug} article={article} headingLevel={2} />)}</div></section><section className="inner-next"><div className="wrap"><h2>Let’s talk about what you need.</h2><Link className="button button-white" href="/contact">Tell us about your project <span aria-hidden="true">↗</span></Link></div></section></InnerPage>;
}

export function ArticlePage({ article }: { article: Article }) {
  const url = `${siteUrl}/articles/${article.slug}`;
  const project = portfolioProjects.find(project => project.id === article.imageProjectID);
  const other = articleSummaries.find(other => other.slug === article.relatedArticleSlug) ?? articleSummaries.find(other => other.slug !== article.slug)!;
  const servicePath = article.relatedServicePath ?? "/services/websites";
  const serviceLabel = article.serviceLinkLabel ?? "Website design and SEO";
  const enquiryUrl = article.inquiryMessage ? `https://wa.me/27812360230?text=${encodeURIComponent(article.inquiryMessage)}` : "/contact";
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BlogPosting", "@id": `${url}#article`, headline: article.title, description: article.description, url, mainEntityOfPage: { "@type": "WebPage", "@id": url }, image: [`${siteUrl}${article.image}`], datePublished: article.datePublished, dateModified: article.datePublished, inLanguage: "en-ZA", author: { "@type": "Organization", "@id": businessId, name: article.author, url: `${siteUrl}/about` }, publisher: { "@id": businessId }, articleSection: article.category, isPartOf: { "@id": `${siteUrl}/#website` } },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Articles", item: `${siteUrl}/articles` }, { "@type": "ListItem", position: 3, name: article.title, item: url }] },
  ] };
  return <InnerPage><StructuredData data={schema} />
    <nav className="project-breadcrumbs wrap" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/articles">Articles</Link><span aria-hidden="true">/</span><span aria-current="page">{article.category}</span></nav>
    <article className="reading-page">
      <header className="article-heading wrap"><p className="eyebrow">{article.category}</p><h1>{article.title}</h1><p className="article-summary">{article.summary}</p><div className="article-byline"><Link href="/about">By {article.author}</Link><time dateTime={article.datePublished}>{publishedDate(article.datePublished)}</time><span>{article.readingMinutes} min read</span></div></header>
      <div className="reading-layout wrap">
        <aside className="article-contents"><details><summary>In this article</summary><nav aria-label="In this article"><ol>{article.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol></nav></details><Link href={servicePath}>{serviceLabel} <span aria-hidden="true">↗</span></Link></aside>
        <div className="article-body">
          <figure className={`article-proof${article.imagePresentation === "product" ? " article-proof-product" : ""}`}><img src={article.image} alt={article.imageAlt} width={article.imageWidth ?? 1440} height={article.imageHeight ?? 1000} /><figcaption>{project ? <>From our work: <Link href={project.caseStudyUrl!}>{project.previewName}</Link>.</> : article.imageCaption}</figcaption></figure>
          {article.sections.map(section => <section id={section.id} key={section.id} className="reading-section"><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}{section.id === "real-work-examples" || section.id === "real-proof" ? <div className="reading-project-links">{article.relatedprojectIDs.map(id => { const item = portfolioProjects.find(project => project.id === id)!; return <Link key={id} href={item.caseStudyUrl!}>{item.previewName} website story <span aria-hidden="true">↗</span></Link>; })}</div> : null}</section>)}
          <section className="article-sources" aria-labelledby="article-sources-title"><h2 id="article-sources-title">Sources and further reading</h2><p>References checked on {publishedDate(article.datePublished)}.</p><ul>{article.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a></li>)}</ul></section>
          <div className="article-help"><h2>{article.relatedServicePath ? "Need a quote?" : "Planning a website?"}</h2><p>{article.relatedServicePath ? "Send your town and order details. We’ll check availability and confirm the price, timing and collection or delivery." : "Tell us about your business and the website you need. We’ll discuss the pages, features and quote."}</p><div className="editorial-actions">{article.inquiryMessage ? <a className="button button-blue" href={enquiryUrl} target="_blank" rel="noreferrer">Ask for a quote</a> : <Link className="button button-blue" href={enquiryUrl}>Discuss your website</Link>}<Link className="text-link" href={servicePath}>{serviceLabel}</Link>{article.relatedServicePath ? <Link className="text-link" href="/printing-signage-toner-kzn">Enquire from your KZN town</Link> : <Link className="text-link" href="/pricing">Website prices</Link>}</div></div>
          <nav className="article-next-read" aria-label="Related article"><p>Keep reading</p><Link href={`/articles/${other.slug}`}>{other.title} <span aria-hidden="true">↗</span></Link></nav>
        </div>
      </div>
    </article>
  </InnerPage>;
}
