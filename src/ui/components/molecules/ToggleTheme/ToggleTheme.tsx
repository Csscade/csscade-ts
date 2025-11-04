"use client";

import "./ToggleTheme.css";
import { useEffect, useState } from "react";

export const ToggleTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
  }

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="theme-switch-wrapper">
      <label className="theme-switch" htmlFor="checkbox">
        <input
          checked={theme === "dark"}
          onChange={handleChange}
          type="checkbox"
          id="checkbox"
        />
        <div className="slider round"></div>
      </label>
    </div>
  );
};
