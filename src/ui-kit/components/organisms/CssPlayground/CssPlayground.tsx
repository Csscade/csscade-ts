"use client";

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { CodeEditor } from "@/ui-kit/components/organisms/CodeEditor/CodeEditor";
import { findPreviewError } from "./previewErrors";
import { useIsDarkTheme } from "./useIsDarkTheme";

import "./CssPlayground.css";

export interface CssPlaygroundProps {
  /** Initial HTML markup shown in the preview and the HTML editor. */
  html?: string;
  /** Initial CSS applied to the preview and shown in the CSS editor. */
  css?: string;

  javascript?: string;
  /**
   * Human-readable name of the example (e.g. "Flexbox space-between").
   * Rendered as the figure caption and used to build a meaningful, unique
   * accessible name for the preview iframe.
   */
  label?: string;
  /** Accessible label for the HTML editor. */
  htmlLabel?: string;
  /** Accessible label for the CSS editor. */
  cssLabel?: string;
  /** Accessible label for the Javascript editor. */
  javascriptLabel?: string;
  /** Overrides the accessible title of the preview iframe. */
  previewTitle?: string;
  /** Give the editors a fixed height with an inner scroll. */
  fixedHeight?: boolean;
}

// The iframe document has no access to the site's CSS custom properties
// (theme/_variables.css, _light.css, _dark.css), so the tokens articles are
// expected to reference (e.g. var(--color-primary-strong)) are duplicated
// here rather than relying on the browser's own dark-mode default
// (Canvas/CanvasText), which doesn't match the brand palette.
const BASE_TOKENS = `
  --blackPearl: #081930;
  --oxford-blue: #3d495a;
  --white: #fff;
  --seashell-peach: #fff6f1;
  --shakespeare: #59b7d3;
  --color-dark: var(--blackPearl);
  --color-dark-muted: var(--oxford-blue);
  --color-light: var(--white);
  --color-light-muted: var(--seashell-peach);
  --color-primary: var(--shakespeare);
`;

const THEME_TOKENS = {
  light: `
    --font-color: var(--color-dark);
    --font-color-muted: var(--color-dark-muted);
    --color-primary-strong: var(--color-dark-muted);
    --background-primary: var(--color-light-muted);
    --border-color: var(--color-dark);
  `,
  dark: `
    --font-color: var(--color-light);
    --font-color-muted: var(--color-light-muted);
    --color-primary-strong: var(--color-primary);
    --background-primary: var(--color-dark);
    --border-color: var(--color-light);
  `,
} as const;

const buildDocument = (
  html: string,
  css: string,
  javascript: string,
  colorScheme: "light" | "dark",
) => {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root {
        color-scheme: ${colorScheme};
        ${BASE_TOKENS}
        ${THEME_TOKENS[colorScheme]}
      }
      *, *::before, *::after { box-sizing: border-box; }
      html, body { margin: 0; background-color: var(--background-primary); color: var(--font-color); }
      body { padding: 1rem; font-family: system-ui, sans-serif; }
    </style>
    <style>${css}</style>
  </head>
  <body>${html}</body>
  <script type="text/javascript">${javascript}</script>
</html>`;
};

export const CssPlayground = ({
  html = "",
  css = "",
  javascript = "",
  label,
  htmlLabel = "Éditeur HTML",
  cssLabel = "Éditeur CSS",
  javascriptLabel = "Éditeur Javascript",
  previewTitle,
  fixedHeight = false,
}: CssPlaygroundProps) => {
  const isDarkTheme = useIsDarkTheme();
  const colorScheme = isDarkTheme ? "dark" : "light";
  const [htmlCode, setHtmlCode] = useState(html);
  const [cssCode, setCssCode] = useState(css);
  const [javascriptCode, setJavascriptCode] = useState(javascript);
  const [srcDoc, setSrcDoc] = useState(() =>
    buildDocument(html, css, javascript, colorScheme),
  );
  const [previewError, setPreviewError] = useState<string | null>(() =>
    findPreviewError(html, css),
  );

  const iframeTitle =
    previewTitle ?? (label ? `Aperçu HTML/CSS : ${label}` : "Aperçu HTML/CSS");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(buildDocument(htmlCode, cssCode, javascriptCode, colorScheme));
      setPreviewError(findPreviewError(htmlCode, cssCode));
    }, 250);
    return () => clearTimeout(timeout);
    // colorScheme must stay a dependency: otherwise this timeout's closure
    // goes stale on a theme change and later overwrites the corrected
    // srcDoc below with the old scheme once it fires.
  }, [htmlCode, cssCode, javascriptCode, colorScheme]);

  // Theme toggles are a discrete action, not typing: reflect them
  // immediately instead of waiting on the input debounce above.
  // biome-ignore lint/correctness/useExhaustiveDependencies: htmlCode/cssCode read for their current value only, not watched
  useEffect(() => {
    setSrcDoc(buildDocument(htmlCode, cssCode, javascriptCode, colorScheme));
  }, [colorScheme]);

  return (
    <figure className="css-playground">
      {label && (
        <figcaption className="css-playground__caption">{label}</figcaption>
      )}

      <div className="css-playground__body">
        <div className="css-playground__editors">
          <div className="css-playground__panel">
            <span className="css-playground__label">HTML</span>
            <CodeEditor
              defaultLanguage="html"
              value={htmlCode}
              onChange={(value) => setHtmlCode(value ?? "")}
              label={htmlLabel}
              fixedHeight={fixedHeight}
              containerClassName="css-playground__editor"
            />
          </div>
          <div className="css-playground__panel">
            <span className="css-playground__label">CSS</span>
            <CodeEditor
              defaultLanguage="css"
              value={cssCode}
              onChange={(value) => setCssCode(value ?? "")}
              label={cssLabel}
              fixedHeight={fixedHeight}
              containerClassName="css-playground__editor"
            />
          </div>
          {javascript !== "" && (
            <div className="css-playground__panel">
              <span className="css-playground__label">Javascript</span>
              <CodeEditor
                defaultLanguage="js"
                value={javascriptCode}
                onChange={(value) => setJavascriptCode(value ?? "")}
                label={javascriptLabel}
                fixedHeight={fixedHeight}
                containerClassName="css-playground__editor"
              />
            </div>
          )}
        </div>

        <div className="css-playground__panel">
          <span className="css-playground__label">Rendu</span>
          <div className="css-playground__preview-wrapper">
            <iframe
              className="css-playground__preview"
              title={iframeTitle}
              sandbox="allow-scripts allow-modals"
              srcDoc={srcDoc}
            />
            <p role="status" className="css-playground__error">
              {previewError && (
                <>
                  <FontAwesomeIcon icon={faTriangleExclamation} aria-hidden />
                  <span>{previewError}</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
};
