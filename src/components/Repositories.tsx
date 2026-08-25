import { GitFork, Star } from "lucide-react";
import { featuredRepositories } from "../data";
import type { Repository } from "../types";

interface RepositoriesProps {
  repositories: Repository[];
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export function Repositories({ repositories }: RepositoriesProps) {
  const metadata = new Map(
    repositories.map((repository) => [
      repository.full_name.toLowerCase(),
      repository,
    ]),
  );

  const featured = featuredRepositories
    .map((fullName) => {
      const live = metadata.get(fullName.toLowerCase());
      return {
        full_name: fullName,
        name: fullName.split("/").at(-1) ?? fullName,
        html_url: `https://github.com/${fullName}`,
        description: "View this repository on GitHub.",
        stargazers_count: 0,
        forks_count: 0,
        language: null,
        updated_at: "",
        ...live,
      };
    })
    .sort((first, second) => {
      if (!first.updated_at || !second.updated_at) return 0;
      return Date.parse(second.updated_at) - Date.parse(first.updated_at);
    });

  return (
    <section
      className="panel"
      id="panel-repos"
      role="tabpanel"
      aria-labelledby="tab-repos"
    >
      <header className="page-header">
        <h1>Repos</h1>
        <p>
          Public repositories from @alvinmahmud, most recently updated first.
        </p>
      </header>

      <div className="repository-grid">
        {featured.map((repository) => (
          <a
            className="repository-card"
            href={repository.html_url}
            target="_blank"
            rel="noreferrer"
            key={repository.full_name}
          >
            <div className="card-heading">
              <h2>{repository.name}</h2>
              <div
                className="repository-counts"
                aria-label="Repository statistics"
              >
                <span title="Stars">
                  <Star size={13} /> {repository.stargazers_count}
                </span>
                <span title="Forks">
                  <GitFork size={13} /> {repository.forks_count}
                </span>
              </div>
            </div>
            <p>{repository.description || "No description provided."}</p>
            <div className="repository-meta">
              <span className="repository-language">
                <i aria-hidden="true" /> {repository.language || "Repository"}
              </span>
              {repository.updated_at && (
                <time dateTime={repository.updated_at}>
                  Updated {formatDate(repository.updated_at)}
                </time>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
