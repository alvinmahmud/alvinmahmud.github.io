// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-news",
          title: "News",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Some of the things I’ve been building. Check out my projects and what went into them.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repos",
          title: "Repos",
          description: "A mix of side projects, WIPs, and finished apps. Take a look under the hood!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-resume",
          title: "Resume",
          description: "Hit the PDF button to download my resume!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/resume/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather.html";
            },},{id: "news-personal-site-has-been-created",
          title: 'Personal site has been created!',
          description: "",
          section: "News",},{id: "news-my-first-announcement",
          title: 'My First Announcement',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2.html";
            },},{id: "news-just-wrapped-up-most-of-the-initial-setup-and-customization-of-my-portfolio-big-thanks-to-the-intuitive-al-folio-theme",
          title: 'Just wrapped up most of the initial setup and customization of my portfolio....',
          description: "",
          section: "News",},{id: "news-revisited-my-portfolio-after-a-long-time-working-on-some-overhauls",
          title: 'Revisited my portfolio after a long time! Working on some overhauls…',
          description: "",
          section: "News",},{id: "projects-reactdex",
          title: 'ReactDex',
          description: "A sleek, React-driven Pokédex",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project.html";
            },},{id: "projects-loggy",
          title: 'LoGGy',
          description: "A way to manage your backlog of games, movies, and TV shows!",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project.html";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%6C%76%69%6E.%6D%61%68%6D%75%64@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/alvinmahmud", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/alvin-mahmud", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
