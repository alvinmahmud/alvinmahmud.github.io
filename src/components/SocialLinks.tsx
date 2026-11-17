import { Mail } from "lucide-react";
import { profile } from "../data";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

export function SocialLinks() {
  return (
    <div className="social-links" aria-label="Contact links">
      <a
        href={`mailto:${profile.email}`}
        aria-label="Email Alvin"
        title="Email"
      >
        <Mail size={17} />
      </a>
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        title="GitHub"
      >
        <GitHubIcon />
      </a>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <LinkedInIcon />
      </a>
    </div>
  );
}
