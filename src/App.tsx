import { useEffect, useState } from "react";
import { EditorFrame } from "./components/EditorFrame";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Projects } from "./components/Projects";
import { Resume } from "./components/Resume";
import { useGitHubRepositories } from "./hooks/useGitHubRepositories";
import type { TabId, Theme } from "./types";

const tabDetails: Record<
  TabId,
  { filename: string; meta?: string; bodyClassName?: string }
> = {
  home: { filename: "index.tsx", bodyClassName: "home-editor-body" },
  work: { filename: "work.tsx" },
  resume: { filename: "resume.md", meta: "UTF-8  READ ONLY" },
};

function getTabFromHash(): TabId {
  const hash = window.location.hash.slice(1).toLowerCase();
  if (hash === "work" || hash === "resume") return hash;
  if (hash === "projects" || hash === "repos") return "work";
  return "home";
}

function getInitialTheme(): Theme {
  return localStorage.getItem("theme") === "light" ? "light" : "dark";
}

function App() {
  const [activeTab, setActiveTab] = useState<TabId>(getTabFromHash);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const repositories = useGitHubRepositories();

  useEffect(() => {
    const handleHashChange = () => setActiveTab(getTabFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#08090c" : "#f5f7f8");
  }, [theme]);

  const changeTab = (tab: TabId) => {
    setActiveTab(tab);
    const hash = tab === "home" ? "" : `#${tab}`;
    window.history.replaceState(null, "", `${window.location.pathname}${hash}`);
  };

  const details =
    activeTab === "work"
      ? {
          ...tabDetails.work,
          meta: repositories.isPending
            ? "UTF-8  FETCHING…"
            : `UTF-8  ${repositories.data?.length ?? 0} REPOS`,
        }
      : tabDetails[activeTab];

  return (
    <div className="app-shell">
      <Header
        activeTab={activeTab}
        onTabChange={changeTab}
        theme={theme}
        onThemeChange={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />

      <main className="site-main">
        <div className="frame-wrap">
          <EditorFrame {...details}>
            <div className="tab-enter" key={activeTab}>
              {activeTab === "home" && <Home />}
              {activeTab === "work" && <Projects query={repositories} />}
              {activeTab === "resume" && <Resume />}
            </div>
          </EditorFrame>
        </div>
      </main>
    </div>
  );
}

export default App;
