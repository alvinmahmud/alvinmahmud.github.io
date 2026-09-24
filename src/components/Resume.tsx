import { Download } from "lucide-react";
import { education, experience, profile, skillGroups } from "../data";

export function Resume() {
  return (
    <section
      className="resume-page"
      id="panel-resume"
      role="tabpanel"
      aria-labelledby="tab-resume"
    >
      <header className="resume-document-heading">
        <div>
          <h1>Resume</h1>
          <p className="contact-line">
            {profile.location} · {profile.email} · {profile.phone}
          </p>
        </div>
        <a
          className="button resume-download"
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Download size={14} /> My Resume
        </a>
      </header>

      <section className="resume-section" aria-labelledby="experience-heading">
        <h2 className="content-label" id="experience-heading">
          Experience
        </h2>
        <div className="resume-list">
          {experience.map((entry) => (
            <article
              className="resume-entry"
              key={`${entry.role}-${entry.period}`}
            >
              <h3>
                {entry.role} <span>· {entry.organization}</span>
              </h3>
              <p>
                {entry.period} · {entry.location}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section" aria-labelledby="education-heading">
        <h2 className="content-label" id="education-heading">
          Education
        </h2>
        <div className="resume-list">
          {education.map((entry) => (
            <article
              className="resume-entry education-entry"
              key={`${entry.role}-${entry.period}`}
            >
              <div>
                <h3>{entry.organization}</h3>
                <p>{entry.role}</p>
              </div>
              <p>
                {entry.period} · {entry.location}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="resume-section skills-section"
        aria-labelledby="skills-heading"
      >
        <h2 className="content-label" id="skills-heading">
          Skills
        </h2>
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
