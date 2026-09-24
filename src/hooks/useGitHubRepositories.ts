import { useQuery } from "@tanstack/react-query";
import type { Repository } from "../types";

const GITHUB_REPOSITORIES_URL =
  "https://api.github.com/users/alvinmahmud/repos?per_page=100&sort=updated";

async function fetchRepositories(): Promise<Repository[]> {
  const response = await fetch(GITHUB_REPOSITORIES_URL, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status}`);
  }

  return response.json() as Promise<Repository[]>;
}

export function useGitHubRepositories() {
  return useQuery({
    queryKey: ["github", "alvinmahmud", "repositories"],
    queryFn: fetchRepositories,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
    retry: 2,
  });
}
