import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { AnimatedText, ProjectCard } from "./ReferenceUI";
import { projects, type Project } from "./content";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="project-detail content-width">
      <a className="back-link" href="#/projects">
        <ArrowLeft size={17} />
        All projects
      </a>
      <p className="eyebrow">
        {project.category}
        {project.year && ` / ${project.year}`}
      </p>
      <h1 tabIndex={-1}>
        <AnimatedText text={project.name} />
      </h1>
      <p className="detail-intro">{project.description}</p>
      <img className="detail-image" src={project.image} alt="" />
      <div className="detail-columns">
        <div>
          <h2>The challenge</h2>
          <p>{project.challenge}</p>
        </div>
        <div>
          <h2>The approach</h2>
          <p>{project.approach}</p>
        </div>
      </div>
      {project.github && (
        <a className="detail-contact" href={project.github} target="_blank" rel="noopener noreferrer">
          GitHub repository <ArrowUpRight size={18} />
        </a>
      )}
      {project.live && (
        <a className="detail-contact" href={project.live} target="_blank" rel="noopener noreferrer">
          Live site <ArrowUpRight size={18} />
        </a>
      )}
      <a className="detail-contact" href="#contact">
        Have a project in mind? Let’s talk <ArrowUpRight size={18} />
      </a>
      <div className="related-projects">
        <div className="related-heading">
          <h2>Related projects</h2>
          <a href="#/projects">
            View all projects <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="project-grid">
          {projects
            .filter((item) => item.id !== project.id)
            .slice(0, 2)
            .map((item) => <ProjectCard key={item.id} project={item} />)}
        </div>
      </div>
    </article>
  );
}
