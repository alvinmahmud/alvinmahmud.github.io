import { ArrowUpRight } from "lucide-react";
import { projects } from "../data";
import type { Repository } from "../types";

interface ProjectsProps {
  repositories: Repository[];
}

export function Projects({ repositories }: ProjectsProps) {
  const metadata = new Map(
    repositories.map((repository) => [
      repository.full_name.toLowerCase(),
      repository,
    ]),
  );

  return (
    <section
      className="panel"
      id="panel-projects"
      role="tabpanel"
      aria-labelledby="tab-projects"
    >
      <header className="page-header">
        <h1>Projects</h1>
        <p>
          A few things I’ve built. Each one taught me something new about
          shipping software end to end.
        </p>
      </header>

      <div className="project-grid">
        {projects.map((project) => {
          const repository = metadata.get(project.repository.toLowerCase());
          return (
            <a
              className="project-card"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              key={project.repository}
              aria-label={`Open ${repository?.name ?? project.name}`}
            >
              <div className="card-heading">
                <h2>{repository?.name ?? project.name}</h2>
                <ArrowUpRight size={16} aria-hidden="true" />
              </div>
              <p>{repository?.description || project.description}</p>
              <ul className="tags" aria-label="Technologies">
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </a>
          );
        })}
      </div>
    </section>
  );
}
