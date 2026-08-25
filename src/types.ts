export type TabId = "home" | "projects" | "repos" | "resume";
export type Theme = "dark" | "light";

export interface Project {
  name: string;
  repository: string;
  href: string;
  description: string;
  technologies: string[];
}

export interface Repository {
  full_name: string;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface ResumeEntry {
  role: string;
  organization: string;
  period: string;
  location: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}
