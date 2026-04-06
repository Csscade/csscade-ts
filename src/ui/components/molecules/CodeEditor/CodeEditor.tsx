import Editor, { type EditorProps } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import "./CodeEditor.css";

export interface CodeEditorProps extends EditorProps {
  containerClassName?: string;
}

export const CodeEditor = ({
  height = "300px",
  defaultLanguage = "typescript",
  defaultValue = "",
  theme,
  containerClassName = "",
  options = {},
  ...props
}: CodeEditorProps) => {
  const [currentTheme, setCurrentTheme] = useState<string>("vs-dark");

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
      return;
    }

    const updateFromElement = (el: HTMLElement) => {
      const dataTheme = el.getAttribute("data-theme");
      if (dataTheme === "dark") {
        setCurrentTheme("vs-dark");
      } else if (dataTheme === "light") {
        setCurrentTheme("light");
      } else {
        // Fallback to media query if data-theme is not set
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        setCurrentTheme(mql.matches ? "vs-dark" : "light");
      }
    };

    const targetNode = document.documentElement;
    updateFromElement(targetNode);

    const observer = new MutationObserver(() => {
      updateFromElement(targetNode);
    });

    observer.observe(targetNode, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (!targetNode.getAttribute("data-theme")) {
        setCurrentTheme(e.matches ? "vs-dark" : "light");
      }
    };
    mql.addEventListener("change", handleMediaChange);

    return () => {
      observer.disconnect();
      mql.removeEventListener("change", handleMediaChange);
    };
  }, [theme]);

  return (
    <div className={`code-editor-container ${containerClassName}`}>
      <Editor
        height={height}
        defaultLanguage={defaultLanguage}
        defaultValue={defaultValue}
        theme={currentTheme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-mono)",
          fontLigatures: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          ...options,
        }}
        {...props}
      />
    </div>
  );
};
