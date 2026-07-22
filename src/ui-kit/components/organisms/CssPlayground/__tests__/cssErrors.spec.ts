import { describe, expect, it } from "vitest";
import { findCssError } from "../cssErrors";

describe("findCssError", () => {
  it("accepts structurally sound CSS", () => {
    expect(findCssError(".a { color: red; }")).toBeNull();
  });

  it("ignores braces inside strings", () => {
    expect(findCssError('.a::after { content: "}"; }')).toBeNull();
  });

  it("ignores braces inside comments", () => {
    expect(findCssError(".a { color: red; } /* } { */")).toBeNull();
  });

  it("accepts nested at-rules", () => {
    expect(
      findCssError("@media (min-width: 1px) { .a { color: red; } }"),
    ).toBeNull();
  });

  it("flags an unclosed opening brace", () => {
    expect(findCssError(".a { color: red")).toMatch(/non fermée/);
  });

  it("flags an extra closing brace", () => {
    expect(findCssError(".a {} }")).toMatch(/sans accolade ouvrante/);
  });

  it("flags an unclosed comment", () => {
    expect(findCssError(".a { color: red } /* oops")).toMatch(/Commentaire/);
  });

  it("flags an unclosed string", () => {
    expect(findCssError('.a { content: "oops')).toMatch(/Chaîne/);
  });

  it("accepts an empty string", () => {
    expect(findCssError("")).toBeNull();
  });

  it("ignores an escaped quote inside a string", () => {
    expect(findCssError('.a::after { content: "a\\"b"; }')).toBeNull();
  });

  it("ignores a brace inside a single-quoted string", () => {
    expect(findCssError(".a::after { content: '{'; }")).toBeNull();
  });

  it("accepts several levels of balanced nesting", () => {
    expect(
      findCssError("@supports (display: grid) { @media screen { .a {} } }"),
    ).toBeNull();
  });
});
