const refreshProjectMetadata = async (card) => {
  const repository = card.dataset.githubRepo;

  if (!repository) return;

  try {
    const response = await fetch(`https://api.github.com/repos/${repository}`, {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) return;

    const metadata = await response.json();
    const title = card.querySelector(".card-title");
    const description = card.querySelector(".card-text");

    if (title && metadata.name) title.textContent = metadata.name;
    if (description && metadata.description) {
      description.textContent = metadata.description;
    }

    card.dataset.githubMetadata = "live";
  } catch {
    // Keep the build-time fallback when GitHub is unavailable or rate-limited.
  }
};

document
  .querySelectorAll(".projects [data-github-repo]")
  .forEach(refreshProjectMetadata);
