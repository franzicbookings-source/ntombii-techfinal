import { ImageFrame } from "./image-frame";
import Link from "next/link";
import { WorkCategories } from "./work-categories";
import { portfolioProjects } from "./portfolio-projects";

export function PortfolioIndex() {
  return <>
    <WorkCategories active="websites" />
    <section className="editorial-heading wrap">

      <h1>Website projects.</h1>
      <p>Explore the websites we’ve built, with screenshots and project details.</p>
    </section>
    <section className="portfolio-list wrap" aria-label="Websites built by Ntombii Tech">
      {portfolioProjects.map(project => <article className="portfolio-case" key={project.id} id={project.id}>
        <ImageFrame as="link" href={project.caseStudyUrl ?? project.url} className="portfolio-case-image" label={`Explore ${project.name}`} image={{ src: project.desktop.src, alt: project.desktop.alt, width: 1440, height: 1000, loading: "lazy" }} />
        <div className="portfolio-case-copy">
          <p className="editorial-category">{project.category} · {project.kind}</p>
          <h2><Link href={(project.caseStudyUrl ?? project.url)}>{project.previewName}</Link></h2>
          <p>{project.description}</p>
          <ul className="portfolio-scope" aria-label="Project scope">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          <div className="editorial-actions">{project.caseStudyUrl && <Link className="button button-blue" href={project.caseStudyUrl}>Read the project story <span aria-hidden="true">↗</span></Link>}<a className="text-link" href={project.url} target="_blank" rel="noreferrer">Visit website</a></div>
        </div>
      </article>)}
    </section>
    <section className="portfolio-reading wrap"><div><h2>Planning your website?</h2></div><Link href="/articles/website-design-newcastle-business-guide">What your business website actually needs <span aria-hidden="true">↗</span></Link></section>
  </>;
}
