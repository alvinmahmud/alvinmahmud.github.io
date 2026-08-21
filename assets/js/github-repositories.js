const repositoryContainer = document.querySelector(
  ".repositories[data-github-owner]",
);

const formatGitHubDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const refreshRepositories = async () => {
  if (!repositoryContainer) return;

  const { githubOwner } = repositoryContainer.dataset;

  try {
    const response = await fetch(
      `https://api.github.com/users/${githubOwner}/repos?per_page=100&sort=updated`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!response.ok) return;

    const repositories = await response.json();
    const metadataByName = new Map(
      repositories.map((repository) => [
        repository.full_name.toLowerCase(),
        repository,
      ]),
    );
    const cards = [...repositoryContainer.querySelectorAll(".repo")];

    cards.forEach((card) => {
      const metadata = metadataByName.get(
        card.dataset.githubRepository.toLowerCase(),
      );

      if (!metadata) return;

      card.href = metadata.html_url;
      card.dataset.updatedAt = metadata.updated_at;
      card.dataset.githubMetadata = "live";
      card.querySelector(".repo-name").textContent = metadata.name;
      card.querySelector(".repo-description").textContent =
        metadata.description || "No description provided.";
      card.querySelector("[data-repo-stars]").textContent =
        metadata.stargazers_count;
      card.querySelector("[data-repo-forks]").textContent =
        metadata.forks_count;

      const language = card.querySelector("[data-repo-language]");
      language.textContent = metadata.language || "Repository";
      language.classList.toggle("is-empty", !metadata.language);

      const updated = card.querySelector("[data-repo-updated]");
      updated.dateTime = metadata.updated_at;
      updated.textContent = `Updated ${formatGitHubDate(metadata.updated_at)}`;
    });

    cards
      .sort(
        (a, b) =>
          new Date(b.dataset.updatedAt || 0) -
          new Date(a.dataset.updatedAt || 0),
      )
      .forEach((card) => repositoryContainer.append(card));
  } catch {
    // Keep the build-time repository links if GitHub is unavailable.
  }
};

refreshRepositories();
