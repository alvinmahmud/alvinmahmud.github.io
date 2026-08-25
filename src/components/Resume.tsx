import { Download } from "lucide-react";
import { education, experience, skillGroups } from "../data";
import type { ResumeEntry } from "../types";

function ResumeList({ entries }: { entries: ResumeEntry[] }) {
  return (
    <ul className="resume-list">
      {entries.map((entry) => (
        <li className="resume-item" key={`${entry.role}-${entry.period}`}>
          <div>
            <h3>
              {entry.role} <span>· {entry.organization}</span>
            </h3>
          </div>
          <p>
            <span>{entry.period}</span>
            <span>· {entry.location}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export function Resume() {
  return (
    <section
      className="panel"
      id="panel-resume"
      role="tabpanel"
      aria-labelledby="tab-resume"
    >
      <header className="page-header resume-header">
        <div>
          <h1>Resume</h1>
          <p>New York, NY · alvin.mahmud@gmail.com · (917) 572-0010</p>
        </div>
        <a
          className="download-button"
          href="/assets/alvin_mahmud_resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <Download size={15} /> Download PDF
        </a>
      </header>

      <div className="resume-sections">
        <section>
          <h2>Experience</h2>
          <ResumeList entries={experience} />
        </section>
        <section>
          <h2>Education</h2>
          <ResumeList entries={education} />
        </section>
        <section>
          <h2>Skills</h2>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul className="tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
