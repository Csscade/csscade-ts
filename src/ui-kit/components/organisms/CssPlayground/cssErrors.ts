/**
 * Detects structural CSS errors the browser would otherwise swallow silently
 * (everything after an unbalanced brace is dropped without any message).
 * Comments and strings are skipped so valid CSS never triggers a false positive.
 * Returns a French message, or `null` when the CSS is structurally sound.
 */

const UNCLOSED_COMMENT = "Commentaire /* … */ non fermé.";
const UNMATCHED_CLOSING_BRACE =
  "Accolade fermante « } » sans accolade ouvrante correspondante.";
const UNCLOSED_OPENING_BRACE = "Accolade ouvrante « { » non fermée.";

const unclosedString = (quote: string) =>
  `Chaîne de caractères ${quote}…${quote} non fermée.`;

/** Where a skipped construct ends, and whether it was properly closed. */
type Cursor = { readonly next: number; readonly closed: boolean };

const beginsComment = (css: string, index: number) =>
  css[index] === "/" && css[index + 1] === "*";

const beginsString = (char: string) => char === '"' || char === "'";

const opensBlock = (char: string) => char === "{";

const closesBlock = (char: string) => char === "}";

/** Advances past a `/* … *\/` comment, starting on its opening slash. */
const skipComment = (css: string, start: number): Cursor => {
  const end = css.indexOf("*/", start + 2);
  if (end === -1) return { next: css.length, closed: false };
  return { next: end + 2, closed: true };
};

/** Advances past a quoted string, honouring backslash escapes. */
const skipString = (css: string, start: number): Cursor => {
  const quote = css[start];
  let index = start + 1;
  while (index < css.length && css[index] !== quote) {
    const isEscape = css[index] === "\\";
    index += isEscape ? 2 : 1;
  }
  if (index >= css.length) return { next: index, closed: false };
  return { next: index + 1, closed: true };
};

export const findCssError = (css: string): string | null => {
  let openBlocks = 0;
  let index = 0;

  while (index < css.length) {
    const char = css[index];

    if (beginsComment(css, index)) {
      const comment = skipComment(css, index);
      if (!comment.closed) return UNCLOSED_COMMENT;
      index = comment.next;
      continue;
    }

    if (beginsString(char)) {
      const string = skipString(css, index);
      if (!string.closed) return unclosedString(char);
      index = string.next;
      continue;
    }

    if (opensBlock(char)) openBlocks += 1;

    if (closesBlock(char)) {
      openBlocks -= 1;
      if (openBlocks < 0) return UNMATCHED_CLOSING_BRACE;
    }

    index += 1;
  }

  if (openBlocks > 0) return UNCLOSED_OPENING_BRACE;
  return null;
};
