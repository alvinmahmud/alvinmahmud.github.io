import { Menu, Moon, Sun, X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import type { TabId, Theme } from "../types";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "repos", label: "Repos" },
  { id: "resume", label: "Resume" },
];

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  theme: Theme;
  onThemeChange: () => void;
}

export function Header({
  activeTab,
  onTabChange,
  theme,
  onThemeChange,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const selectTab = (tab: TabId) => {
    onTabChange(tab);
    setMenuOpen(false);
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    }
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    selectTab(tabs[nextIndex].id);
    document.getElementById(`tab-${tabs[nextIndex].id}`)?.focus();
  };

  return (
    <header className="site-header">
      <nav className="navigation" aria-label="Portfolio navigation">
        <button
          className="brand"
          type="button"
          onClick={() => selectTab("home")}
          aria-label="Alvin Mahmud — Home"
        >
          <span className="brand-mark" aria-hidden="true" />
          <strong>Alvin</strong> Mahmud
        </button>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div
          className={`navigation-menu${menuOpen ? " is-open" : ""}`}
          id="site-navigation"
        >
          <div className="tabs" role="tablist" aria-label="Sections">
            {tabs.map((tab, index) => (
              <button
                className={`tab${activeTab === tab.id ? " is-active" : ""}`}
                id={`tab-${tab.id}`}
                key={tab.id}
                type="button"
                role="tab"
                aria-controls={`panel-${tab.id}`}
                aria-selected={activeTab === tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => selectTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            className="theme-toggle"
            type="button"
            onClick={onThemeChange}
            aria-label={`Switch to ${
              theme === "dark" ? "light" : "dark"
            } theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
