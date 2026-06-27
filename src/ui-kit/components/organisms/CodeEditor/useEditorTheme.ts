import { useEffect, useState } from "react";

export type EditorTheme = "github-dark" | "github-light";

export const useEditorTheme = (explicitTheme?: EditorTheme): EditorTheme => {
  const [currentTheme, setCurrentTheme] = useState<EditorTheme>("github-dark");

  useEffect(() => {
    if (explicitTheme) {
      setCurrentTheme(explicitTheme);
      return;
    }

    const updateTheme = () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark" ||
        (!document.documentElement.hasAttribute("data-theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      setCurrentTheme(isDark ? "github-dark" : "github-light");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, [explicitTheme]);

  return currentTheme;
};
