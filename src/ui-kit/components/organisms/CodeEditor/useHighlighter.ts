import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import type { EditorTheme } from "./useEditorTheme";

export const useHighlighter = (
  code: string,
  language: string,
  theme: EditorTheme,
) => {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const initHighlighter = async () => {
      const h = await createHighlighter({
        themes: ["github-dark", "github-light"],
        langs: ["typescript", "javascript", "css", "html", "markdown", "json"],
      });
      if (!cancelled) {
        setHighlighter(h);
      }
    };
    void initHighlighter();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (highlighter) {
      const html = highlighter.codeToHtml(code, {
        lang: language,
        theme,
      });
      setHighlightedCode(html);
    }
  }, [highlighter, code, language, theme]);

  return highlightedCode;
};
