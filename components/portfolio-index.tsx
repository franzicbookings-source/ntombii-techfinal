import Link from "next/link";
import { portfolioProjects, type PortfolioProject } from "./portfolio-projects";
import { ProjectMotion } from "./project-motion";
import { WorkCategories } from "./work-categories";
import "./portfolio-index.css";

function ProjectCaption({ project }: { project: PortfolioProject }) {
  return <div className="work-edition-caption">
    <div>
      <h2><Link href={project.caseStudyUrl ?? project.url}>{project.previewName}<span className="sr-only"> project</span></Link></h2>
      <p>{project.category}</p>
    </div>
    <a className="work-edition-visit" href={project.url} target="_blank" rel="noreferrer">
      Live site<span className="sr-only"> for {project.previewName}</span>
    </a>
  </div>;
}

export function PortfolioIndex() {
  const [lead, ...projects] = portfolioProjects;

  return <div className="work-edition wrap">
    <header className="work-edition-masthead">
      <h1>Website projects.</h1>
      <WorkCategories active="websites" />
    </header>

    <section id="portfolio" aria-label="Website projects by Ntombii Tech">
      <article className="work-edition-feature" id={lead.id}>
        <div className="work-edition-diptych">
          <ProjectMotion project={lead} priority />
          <div className="work-edition-detail">
            <img src={lead.detail.src} alt={lead.id === "la-raza" ? "The cream hiring invitation from the La Raza website, tucked into an open envelope" : lead.detail.alt} loading="lazy" decoding="async" />
          </div>
        </div>
        <ProjectCaption project={lead} />
      </article>

      <div className="work-edition-collection">
        {projects.map(project => <article className="work-edition-entry" key={project.id} id={project.id}>
          <ProjectMotion project={project} />
          <ProjectCaption project={project} />
        </article>)}
      </div>
    </section>

    <aside className="work-edition-reading" aria-label="Website planning guide">
      <Link href="/articles/website-design-newcastle-business-guide">Read our website planning guide</Link>
    </aside>
  </div>;
}
