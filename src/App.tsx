import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Projects } from "./components/Projects";
import { Repositories } from "./components/Repositories";
import { Resume } from "./components/Resume";
import { useGitHubRepositories } from "./hooks/useGitHubRepositories";
import type { TabId, Theme } from "./types";

const tabIds: TabId[] = ["home", "projects", "repos", "resume"];

const getTabFromHash = (): TabId => {
  const hash = window.location.hash.slice(1) as TabId;
  return tabIds.includes(hash) ? hash : "home";
};

const getInitialTheme = (): Theme =>
  localStorage.getItem("theme") === "light" ? "light" : "dark";

function App() {
  const [activeTab, setActiveTab] = useState<TabId>(getTabFromHash);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const repositories = useGitHubRepositories();

  useEffect(() => {
    const handleHistoryChange = () => setActiveTab(getTabFromHash());
    window.addEventListener("hashchange", handleHistoryChange);
    window.addEventListener("popstate", handleHistoryChange);
    return () => {
      window.removeEventListener("hashchange", handleHistoryChange);
      window.removeEventListener("popstate", handleHistoryChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#080d12" : "#f8f9fb");
  }, [theme]);

  const changeTab = (tab: TabId) => {
    setActiveTab(tab);
    const nextUrl =
      tab === "home"
        ? `${window.location.pathname}${window.location.search}`
        : `#${tab}`;
    window.history.pushState({ tab }, "", nextUrl);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <Header
        activeTab={activeTab}
        onTabChange={changeTab}
        theme={theme}
        onThemeChange={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />
      <main className="site-main">
        <div key={activeTab} className="panel-transition">
          {activeTab === "home" && <Home />}
          {activeTab === "projects" && <Projects repositories={repositories} />}
          {activeTab === "repos" && (
            <Repositories repositories={repositories} />
          )}
          {activeTab === "resume" && <Resume />}
        </div>
      </main>
    </>
  );
}

export default App;
