import { Moon, Sun } from "lucide-react";
import type { KeyboardEvent } from "react";
import type { TabId, Theme } from "../types";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "work", label: "Projects" },
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
  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    const nextTab = tabs[nextIndex];
    onTabChange(nextTab.id);
    document.getElementById(`tab-${nextTab.id}`)?.focus();
  };

  return (
    <header className="site-header">
      <nav className="navigation" aria-label="Portfolio navigation">
        <button
          className="brand"
          type="button"
          onClick={() => onTabChange("home")}
          aria-label="Alvin Mahmud, home"
        >
          <span aria-hidden="true" />
          <strong>Alvin Mahmud</strong>
        </button>

        <div className="nav-actions">
          <div
            className="tabs no-scrollbar"
            role="tablist"
            aria-label="Sections"
          >
            {tabs.map((tab, index) => (
              <button
                className={`tab ${activeTab === tab.id ? "is-active" : ""}`}
                id={`tab-${tab.id}`}
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => onTabChange(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            className="theme-toggle"
            type="button"
            onClick={onThemeChange}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
