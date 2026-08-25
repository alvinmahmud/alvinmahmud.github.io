import type { Project, ResumeEntry, SkillGroup } from "./types";

export const projects: Project[] = [
  {
    name: "LoGGy",
    repository: "alvinmahmud/LoGGy",
    href: "https://github.com/alvinmahmud/LoGGy",
    description: "A way to manage your backlog of games, movies, and TV shows!",
    technologies: ["TypeScript", "React"],
  },
  {
    name: "ReactDex",
    repository: "alvinmahmud/ReactDex",
    href: "https://alvinmahmud.github.io/ReactDex/",
    description: "A sleek, React-driven Pokédex built on the PokéAPI.",
    technologies: ["TypeScript", "React", "REST API"],
  },
  {
    name: "Jobbo",
    repository: "alvinmahmud/Jobbo",
    href: "https://github.com/alvinmahmud/Jobbo",
    description:
      "A job-search companion that helps you find and track your next role.",
    technologies: ["Full stack"],
  },
  {
    name: "neetcode-submissions",
    repository: "alvinmahmud/neetcode-submissions",
    href: "https://github.com/alvinmahmud/neetcode-submissions",
    description:
      "NeetCode.io problem submissions synced and published in real time.",
    technologies: ["Python", "Automation"],
  },
];

export const featuredRepositories = [
  "alvinmahmud/alvinmahmud.github.io",
  "alvinmahmud/ReactDex",
  "alvinmahmud/LoGGy",
  "alvinmahmud/neetcode-submissions",
  "alvinmahmud/Jobbo",
  "alvinmahmud/alvinmahmud",
  "alvinmahmud/tiktok-trends",
  "alvinmahmud/imdb-searcher",
  "alvinmahmud/receipt-processor-challenge",
  "alvinmahmud/Nellies-Taqueria",
];

export const experience: ResumeEntry[] = [
  {
    role: "Software Engineer II",
    organization: "VCS Software",
    period: "Sep 2025 — Present",
    location: "Freehold, NJ",
  },
  {
    role: "Software Engineer",
    organization: "Fiserv (Clover)",
    period: "Jul 2022 — Dec 2024",
    location: "Berkeley Heights, NJ",
  },
  {
    role: "Software Engineer Research Assistant",
    organization: "Stony Brook University",
    period: "Jan 2021 — May 2021",
    location: "Stony Brook, NY",
  },
];

export const education: ResumeEntry[] = [
  {
    role: "Stony Brook University",
    organization: "B.S. in Computer Information Systems",
    period: "2017 — 2021",
    location: "Stony Brook, NY",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "Python", "SQL", "HTML/CSS"],
  },
  {
    title: "Frameworks & Technologies",
    items: [
      "React",
      "Node.js",
      "Express",
      "Spring Boot",
      "SQL Server",
      "REST APIs",
      "Kafka",
    ],
  },
  {
    title: "Tools",
    items: [
      "Git",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GCP",
      "Grafana",
      "Datadog",
      "GitHub Copilot",
      "Claude Code",
      "Cursor",
      "Codex",
    ],
  },
];
