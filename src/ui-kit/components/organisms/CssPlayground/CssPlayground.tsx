import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { CodeEditor } from "@/ui-kit/components/organisms/CodeEditor/CodeEditor";
import { findPreviewError } from "./previewErrors";

import "./CssPlayground.css";

export interface CssPlaygroundProps {
  /** Initial HTML markup shown in the preview and the HTML editor. */
  html?: string;
  /** Initial CSS applied to the preview and shown in the CSS editor. */
  css?: string;
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
  /** Overrides the accessible title of the preview iframe. */
  previewTitle?: string;
  /** Give the editors a fixed height with an inner scroll. */
  fixedHeight?: boolean;
}

const buildDocument = (html: string, css: string) => `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      *, *::before, *::after { box-sizing: border-box; }
      html, body { margin: 0; }
      body { padding: 1rem; font-family: system-ui, sans-serif; }
    </style>
    <style>${css}</style>
  </head>
  <body>${html}</body>
</html>`;

export const CssPlayground = ({
  html = "",
  css = "",
  label,
  htmlLabel = "Éditeur HTML",
  cssLabel = "Éditeur CSS",
  previewTitle,
  fixedHeight = false,
}: CssPlaygroundProps) => {
  const [htmlCode, setHtmlCode] = useState(html);
  const [cssCode, setCssCode] = useState(css);
  const [srcDoc, setSrcDoc] = useState(() => buildDocument(html, css));
  const [previewError, setPreviewError] = useState<string | null>(() =>
    findPreviewError(html, css),
  );

  const iframeTitle =
    previewTitle ?? (label ? `Aperçu HTML/CSS : ${label}` : "Aperçu HTML/CSS");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(buildDocument(htmlCode, cssCode));
      setPreviewError(findPreviewError(htmlCode, cssCode));
    }, 250);
    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode]);

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
        </div>

        <div className="css-playground__panel">
          <span className="css-playground__label">Rendu</span>
          <div className="css-playground__preview-wrapper">
            <iframe
              className="css-playground__preview"
              title={iframeTitle}
              sandbox=""
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
