export const profile = {
  name: "Alvin Mahmud",
  role: "Software Engineer",
  location: "New York, NY",
  email: "alvin.mahmud@gmail.com",
  phone: "(917) 572-0010",
  github: "https://github.com/alvinmahmud",
  linkedin: "https://www.linkedin.com/in/alvin-mahmud/",
  resumeUrl: "/assets/alvin_mahmud_resume.pdf",
  status: "Available to connect",
  tagline: "Full stack engineer building products from frontend to backend.",
} as const;

export const stack = [
  { title: "Frontend", items: ["React", "TypeScript", "HTML", "CSS"] },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Java", "Python", "Spring Boot"],
  },
  {
    title: "Cloud & DevOps",
    items: ["GCP", "Docker", "Kubernetes"],
  },
] as const;

export const metrics = [
  { label: "Years Experience", value: "4+" },
  { label: "Public Repos", value: "20+" },
] as const;

// Identifiers only: displayed names and languages always come from GitHub.
export const featuredRepos = [
  "LoGGy",
  "ReactDex",
  "Jobbo",
  "neetcode-submissions",
] as const;

export const experience = [
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
] as const;

export const education = [
  {
    role: "B.S. in Computer Information Systems",
    organization: "Stony Brook University",
    period: "2017 — 2021",
    location: "Stony Brook, NY",
  },
] as const;

export const skillGroups = [
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
] as const;
