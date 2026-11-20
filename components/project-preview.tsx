import { ImageFrame } from "./image-frame";
import { portfolioProjects, type PortfolioProject } from "./portfolio-projects";

// Keep the service-page example independent of the portfolio display order.
const defaultPreviewProject = portfolioProjects.find(project => project.id === "legend-black-jesus")!;

type ProjectPreviewProps = { compact?: boolean; project?: PortfolioProject; showHints?: boolean };

function PreviewBar({ page, showHint }: { page: string; showHint: boolean }) {
  return <div className="project-preview-bar"><span className="project-preview-dots" aria-hidden="true"><i /><i /><i /></span><span>{page}</span>{showHint && <span aria-hidden="true">↗</span>}</div>;
}

/** Real project screens, composed in the same visual language as the workflow. */
export function ProjectPreview({ compact = false, project = defaultPreviewProject, showHints = true }: ProjectPreviewProps) {
  return <div className={`project-preview${compact ? " project-preview-compact" : ""}`} data-project={project.id}>
    <div className="project-preview-topline" aria-hidden="true"><span>{project.previewName} / {project.kind}</span><span>Desktop + mobile</span></div>
    <div className="project-preview-stage">
      <div className="project-preview-grid" aria-hidden="true" />
      <ImageFrame className="project-preview-desktop" before={<PreviewBar page={project.desktop.label} showHint={showHints} />} image={{ src: project.desktop.src, width: 1440, height: 1000, alt: project.desktop.alt, loading: "lazy" }} />
      <ImageFrame className="project-preview-product" before={<PreviewBar page={project.detail.label} showHint={showHints} />} image={{ src: project.detail.src, width: 1440, height: 1000, alt: project.detail.alt, loading: "lazy" }} />
      <ImageFrame className="project-preview-phone" before={<span className="project-preview-camera" aria-hidden="true" />} image={{ src: project.mobile.src, width: 390, height: 844, alt: project.mobile.alt, loading: "lazy" }} />
    </div>
    {showHints && <div className="project-preview-bottom" aria-hidden="true"><span><i />A real project. Built by Ntombii Tech.</span><span>Explore the work ↗</span></div>}
  </div>;
}
