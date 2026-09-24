import { Mail } from "lucide-react";
import { metrics, profile, stack } from "../data";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

export function Home() {
  return (
    <section
      className="home-layout"
      id="panel-home"
      role="tabpanel"
      aria-labelledby="tab-home"
    >
      <div className="home-primary">
        <div className="hero-heading">
          <h1>
            Alvin
            <span>Mahmud</span>
          </h1>
        </div>

        <div className="hero-bottom">
          <p className="tagline">{profile.tagline}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              View Projects
            </a>
            <a
              className="button"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              My Resume
            </a>
          </div>
          <div className="code-block" aria-label="Profile details">
            <p>
              <span>01</span>
              <code>
                <b>const</b> name = <i>&quot;{profile.name}&quot;</i>;
              </code>
            </p>
            <p>
              <span>02</span>
              <code>
                <b>const</b> role = <i>&quot;{profile.role}&quot;</i>;
              </code>
            </p>
            <p>
              <span>03</span>
              <code>
                location: <i>&quot;{profile.location}&quot;</i>;
              </code>
            </p>
          </div>
        </div>
      </div>

      <aside className="home-sidebar">
        <section className="stack-section">
          <h2 className="section-heading">Core Stack</h2>
          <div className="stack-list">
            {stack.map((group) => (
              <div className="stack-group" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="sidebar-bottom">
          <section>
            <h2 className="section-heading">Activity Metrics</h2>
            <div className="metrics-grid">
              {metrics.map((metric) => (
                <div className="metric" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </section>

          <footer className="connection-row">
            <div className="social-links" aria-label="Contact links">
              <a href={`mailto:${profile.email}`} aria-label="Email Alvin">
                <Mail size={17} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
            <span>SECURED_CONNECTION_TLS_1.3</span>
          </footer>
        </div>
      </aside>
    </section>
  );
}
