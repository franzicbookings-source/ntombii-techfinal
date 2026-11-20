import Link from "next/link";
import { WorkCategories } from "./work-categories";
import { portfolioProjects } from "./portfolio-projects";
import { ProjectMotion } from "./project-motion";

export function PortfolioIndex() {
  return <>
    <WorkCategories active="websites" />
    <section className="editorial-heading wrap">

      <h1>Website projects.</h1>
      <p>Real websites we’ve built for South African businesses. Open any project to see how it works.</p>
    </section>
    <section className="portfolio-list wrap" aria-label="Websites built by Ntombii Tech">
      {portfolioProjects.map(project => <article className="portfolio-case" key={project.id} id={project.id}>
        <ProjectMotion project={project} />
        <div className="portfolio-case-copy">
          <p className="editorial-category">{project.category} · {project.kind}</p>
          <h2><Link href={(project.caseStudyUrl ?? project.url)}>{project.previewName}</Link></h2>
          <p>{project.description}</p>
          <ul className="portfolio-scope" aria-label="Project scope">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          <div className="editorial-actions">{project.caseStudyUrl && <Link className="button button-blue" href={project.caseStudyUrl}>View project <span aria-hidden="true">↗</span></Link>}<a className="text-link" href={project.url} target="_blank" rel="noreferrer">Visit the live site</a></div>
        </div>
      </article>)}
    </section>
    <section className="portfolio-reading wrap"><div><h2>Planning your website?</h2></div><Link href="/articles/website-design-newcastle-business-guide">What your business website actually needs <span aria-hidden="true">↗</span></Link></section>
  </>;
}
