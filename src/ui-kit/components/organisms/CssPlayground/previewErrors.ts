import { findCssError } from "./cssErrors";
import { findHtmlError } from "./htmlErrors";

/** Builds the user-facing banner text for the first structural error found. */
export const findPreviewError = (html: string, css: string): string | null => {
  const htmlError = findHtmlError(html);
  if (htmlError) return `Erreur HTML : ${htmlError}`;

  const cssError = findCssError(css);
  if (cssError) return `Erreur CSS : ${cssError}`;

  return null;
};
