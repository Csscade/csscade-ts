/**
 * Detects the HTML mistakes that swallow the following markup with no visible
 * signal (unlike a missing close tag, which the parser silently recovers from):
 * an unterminated tag, an unclosed attribute quote, or an unclosed comment.
 * Only a `<` that actually starts a tag is inspected, so a literal `<` in text
 * (e.g. "a < b") never triggers a false positive.
 * Returns a French message, or `null` when no such error is present.
 */

const UNCLOSED_COMMENT = "commentaire <!-- … --> non fermé.";

const unterminatedTag = (tagName: string) =>
  `balise <${tagName}> non terminée (« > » manquant).`;

const unclosedAttributeQuote = (quote: string, tagName: string) =>
  `guillemet d'attribut ${quote}…${quote} non fermé dans la balise <${tagName}>.`;

const isTagNameStart = (char: string | undefined) =>
  char !== undefined &&
  ((char >= "a" && char <= "z") ||
    (char >= "A" && char <= "Z") ||
    char === "/" ||
    char === "!" ||
    char === "?");

const isTagNameChar = (char: string) =>
  (char >= "a" && char <= "z") ||
  (char >= "A" && char <= "Z") ||
  (char >= "0" && char <= "9") ||
  char === "-";

const isQuote = (char: string) => char === '"' || char === "'";

const beginsComment = (html: string, index: number) =>
  html.startsWith("<!--", index);

/** True when the `<` at `index` opens a tag rather than being literal text. */
const opensTag = (html: string, index: number) =>
  html[index] === "<" && isTagNameStart(html[index + 1]);

/** Where a skipped construct ends, and whether it was properly closed. */
type Cursor = { readonly next: number; readonly closed: boolean };

/** Advances past a `<!-- … -->` comment, starting on its opening `<`. */
const skipComment = (html: string, start: number): Cursor => {
  const end = html.indexOf("-->", start + 4);
  if (end === -1) return { next: html.length, closed: false };
  return { next: end + 3, closed: true };
};

/** Reads the tag name that follows the opening `<` (skipping a leading `/`). */
const readTagName = (html: string, start: number): string => {
  let index = html[start + 1] === "/" ? start + 2 : start + 1;
  let name = "";
  while (index < html.length && isTagNameChar(html[index])) {
    name += html[index];
    index += 1;
  }
  return name;
};

/** Advances past a quoted attribute value, starting on its opening quote. */
const skipAttributeValue = (html: string, start: number): Cursor => {
  const quote = html[start];
  let index = start + 1;
  while (index < html.length && html[index] !== quote) index += 1;
  if (index >= html.length) return { next: index, closed: false };
  return { next: index + 1, closed: true };
};

type TagScan = {
  readonly next: number;
  readonly closed: boolean;
  readonly unclosedQuote: string | null;
};

/** Scans from the opening `<` to the matching `>`, stepping over quoted values. */
const scanTag = (html: string, start: number): TagScan => {
  let index = start + 1;

  while (index < html.length && html[index] !== ">") {
    if (isQuote(html[index])) {
      const value = skipAttributeValue(html, index);
      if (!value.closed) {
        return { next: value.next, closed: false, unclosedQuote: html[index] };
      }
      index = value.next;
      continue;
    }
    index += 1;
  }

  if (index >= html.length) {
    return { next: index, closed: false, unclosedQuote: null };
  }
  return { next: index + 1, closed: true, unclosedQuote: null };
};

export const findHtmlError = (html: string): string | null => {
  let index = 0;

  while (index < html.length) {
    if (html[index] !== "<") {
      index += 1;
      continue;
    }

    if (beginsComment(html, index)) {
      const comment = skipComment(html, index);
      if (!comment.closed) return UNCLOSED_COMMENT;
      index = comment.next;
      continue;
    }

    if (!opensTag(html, index)) {
      index += 1;
      continue;
    }

    const tagName = readTagName(html, index);
    const tag = scanTag(html, index);

    if (tag.unclosedQuote) {
      return unclosedAttributeQuote(tag.unclosedQuote, tagName);
    }
    if (!tag.closed) return unterminatedTag(tagName);

    index = tag.next;
  }

  return null;
};
