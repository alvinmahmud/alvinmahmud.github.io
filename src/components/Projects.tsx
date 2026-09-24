import { ArrowUpRight, GitFork, RefreshCw, Star } from "lucide-react";
import { featuredRepos, profile } from "../data";
import { useGitHubRepositories } from "../hooks/useGitHubRepositories";
import type { Repository } from "../types";

type RepositoryQuery = ReturnType<typeof useGitHubRepositories>;

interface ProjectsProps {
  query: RepositoryQuery;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

function LanguageBadge({ language }: { language: string | null }) {
  if (!language) return null;
  return <span className="language-badge">{language}</span>;
}

export function Projects({ query }: ProjectsProps) {
  const repositories = query.data ?? [];
  const featuredNames = new Set(
    featuredRepos.map((name) => name.toLocaleLowerCase()),
  );
  const featured = featuredRepos
    .map((name) =>
      repositories.find(
        (repository) =>
          repository.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
      ),
    )
    .filter((repository): repository is Repository => Boolean(repository));
  const remaining = repositories.filter(
    (repository) => !featuredNames.has(repository.name.toLocaleLowerCase()),
  );

  return (
    <section
      className="projects-page"
      id="panel-work"
      role="tabpanel"
      aria-labelledby="tab-work"
    >
      <header className="document-heading">
        <h1>Work</h1>
        <p>
          git remote — <a href={profile.github}>@alvinmahmud</a> · projects and
          repositories, sorted by last push
        </p>
      </header>

      {query.isPending && (
        <div className="featured-grid" aria-label="Loading repositories">
          {featuredRepos.map((name) => (
            <div
              className="featured-card skeleton"
              key={name}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>
          ))}
        </div>
      )}

      {query.isError && (
        <div className="query-error" role="alert">
          <div>
            <strong>GitHub connection interrupted.</strong>
            <span>Repository metadata could not be loaded.</span>
          </div>
          <button className="button" onClick={() => void query.refetch()}>
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {query.isSuccess && (
        <>
          <section aria-labelledby="featured-heading">
            <h2 className="content-label" id="featured-heading">
              Featured
            </h2>
            <div className="featured-grid">
              {featured.map((repository, index) => (
                <article className="featured-card" key={repository.id}>
                  <div className="featured-title">
                    <h3>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {repository.name}
                    </h3>
                    <a
                      href={repository.html_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${repository.name}`}
                    >
                      <ArrowUpRight size={17} />
                    </a>
                  </div>
                  <p>{repository.description ?? "No description provided."}</p>
                  <div className="card-footer">
                    <LanguageBadge language={repository.language} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className="all-repositories"
            aria-labelledby="all-repos-heading"
          >
            <h2 className="content-label" id="all-repos-heading">
              All Repositories
            </h2>
            <div className="repository-grid">
              {remaining.map((repository) => (
                <a
                  className="repository-card"
                  href={repository.html_url}
                  target="_blank"
                  rel="noreferrer"
                  key={repository.id}
                >
                  <div className="repository-title">
                    <h3>{repository.name}</h3>
                    <div aria-label="Repository statistics">
                      <span>
                        <Star size={13} /> {repository.stargazers_count}
                      </span>
                      <span>
                        <GitFork size={13} /> {repository.forks_count}
                      </span>
                    </div>
                  </div>
                  <p>{repository.description ?? "No description provided."}</p>
                  <div className="repository-footer">
                    <span>{repository.language ?? ""}</span>
                    <time dateTime={repository.updated_at}>
                      Updated {formatDate(repository.updated_at)}
                    </time>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  );
}
