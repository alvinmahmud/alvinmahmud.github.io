import { useEffect, useState } from "react";
import type { Repository } from "../types";

const GITHUB_REPOSITORIES_URL =
  "https://api.github.com/users/alvinmahmud/repos?per_page=100&sort=updated";

export function useGitHubRepositories() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepositories() {
      try {
        const response = await fetch(GITHUB_REPOSITORIES_URL, {
          cache: "no-store",
          headers: { Accept: "application/vnd.github+json" },
          signal: controller.signal,
        });

        if (!response.ok) return;
        setRepositories((await response.json()) as Repository[]);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.warn("GitHub metadata is temporarily unavailable.");
        }
      }
    }

    void loadRepositories();
    return () => controller.abort();
  }, []);

  return repositories;
}
