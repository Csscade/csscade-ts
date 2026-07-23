import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import type { EditorTheme } from "./useEditorTheme";

// Shiki is meant to be used as a singleton. Creating one highlighter per editor spins up
// a separate WASM engine and re-loads every grammar and theme, which is slow and triggers
// Shiki's "N instances created" warning on playground-heavy pages. Cache a single shared
// instance as a promise so concurrent callers reuse the same in-flight initialization.
let highlighterPromise: Promise<Highlighter> | null = null;

export const getHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: ["typescript", "javascript", "css", "html", "markdown", "json"],
    });
  }
  return highlighterPromise;
};

export const useHighlighter = (
  code: string,
  language: string,
  theme: EditorTheme,
) => {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    void getHighlighter().then((h) => {
      if (!cancelled) {
        setHighlighter(h);
      }
    });
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
