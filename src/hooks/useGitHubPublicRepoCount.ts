import { useQuery } from "@tanstack/react-query";

async function fetchPublicRepoCount({
  signal,
}: {
  signal: AbortSignal;
}): Promise<number> {
  const response = await fetch("https://api.github.com/users/alvinmahmud", {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status}`);
  }

  const profile: { public_repos?: unknown } = await response.json();
  const count = profile.public_repos;

  if (typeof count !== "number" || !Number.isInteger(count) || count < 0) {
    throw new Error("GitHub returned an invalid public repository count");
  }

  return count;
}

export function useGitHubPublicRepoCount() {
  return useQuery({
    queryKey: ["github", "alvinmahmud", "public-repo-count"],
    queryFn: fetchPublicRepoCount,
    staleTime: 60_000,
    refetchInterval: 5 * 60_000,
    refetchOnWindowFocus: true,
    retry: 2,
  });
}
