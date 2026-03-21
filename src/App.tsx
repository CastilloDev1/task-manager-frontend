import { useEffect, useState } from "react";
import TaskPage from "./pages/TaskPage";
import type { Theme } from "./types/theme";

const THEME_STORAGE_KEY = "tasks-manager:theme:v1";

export default function App() {

  const [theme, setTheme] = useState<Theme>(()=>{
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme as Theme || "dark";
  });

  useEffect(()=>{
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  },[theme]);

  function handleToggleTheme(): void {
    setTheme( (prevTheme) => prevTheme === "light" ? "dark" : "light");
  }
  
  return (
    <main className="app-container">
      <section className="app-card">
        <div className="app-header">
          <h1 className="app-title">Task Manager</h1>
          <button className="theme-button" onClick={handleToggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
          </button>
        </div>
        <TaskPage />
      </section>
    </main>
  );
}