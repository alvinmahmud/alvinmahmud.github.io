import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Home() {
  return (
    <section
      className="panel home-panel"
      id="panel-home"
      role="tabpanel"
      aria-labelledby="tab-home"
    >
      <header className="page-header home-header">
        <h1>Alvin Mahmud</h1>
      </header>

      <div className="home-grid">
        <div className="home-copy">
          <p>
            Hi! I’m Alvin, a software engineer based in Staten Island, NYC. I’m
            currently focused on building full stack apps, sharpening my
            programming skills and exploring new technologies.
          </p>
          <p>
            Outside of development, I’m really into basketball, hitting the gym,
            and playing video games. I’m a big fan of hip-hop and R&amp;B; Blxst
            is always in my rotation, along with artists like André 3000, Lil
            Tecca, and Frank Ocean.
          </p>
          <p>
            I’m always open to connect or collaborate! Feel free to reach out
            via <a href="mailto:alvin.mahmud@gmail.com">email</a> or check out
            some of my featured work here on the site.
          </p>
          <p>
            You can also find me on{" "}
            <a
              href="https://github.com/alvinmahmud"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>{" "}
            or{" "}
            <a
              href="https://www.linkedin.com/in/alvin-mahmud/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>{" "}
            where I share my code and progress to my network. Thanks for
            stopping by!
          </p>
        </div>

        <figure className="profile-card">
          <img src="/assets/prof_pic.jpg" alt="Alvin Mahmud at a waterfall" />
          <figcaption>Based in New York, NY</figcaption>
        </figure>
      </div>

      <div className="contact-strip">
        <div className="contact-links" aria-label="Contact links">
          <a href="mailto:alvin.mahmud@gmail.com" aria-label="Email">
            <Mail size={20} />
          </a>
          <a
            href="https://github.com/alvinmahmud"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/alvin-mahmud/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
        <p>
          The best way to reach me is by email, but use what works best for you!
        </p>
      </div>
    </section>
  );
}
