import { describe, expect, it } from "vitest";
import { findHtmlError } from "../htmlErrors";

describe("findHtmlError", () => {
  it("accepts well-formed HTML", () => {
    expect(findHtmlError("<p class='x'>hi</p>")).toBeNull();
  });

  it("accepts void elements without a closing tag", () => {
    expect(findHtmlError("<p>a<br>b<img src='x.png' alt=''></p>")).toBeNull();
  });

  it("accepts optional closing tags", () => {
    expect(findHtmlError("<ul><li>a<li>b</ul>")).toBeNull();
  });

  it("does not flag an unclosed element the parser recovers from", () => {
    expect(findHtmlError("<div><b>gras</div>")).toBeNull();
  });

  it("does not treat a literal < in text as a tag", () => {
    expect(findHtmlError("5 < 10 est vrai")).toBeNull();
  });

  it("flags an unclosed attribute quote", () => {
    expect(findHtmlError('<div class="box>content</div>')).toMatch(
      /guillemet d'attribut/,
    );
  });

  it("flags an unterminated tag", () => {
    expect(findHtmlError("<p>text <span")).toMatch(/non terminée/);
  });

  it("flags an unclosed comment", () => {
    expect(findHtmlError("<p>x</p><!-- oops")).toMatch(/commentaire/);
  });

  it("accepts an empty string", () => {
    expect(findHtmlError("")).toBeNull();
  });

  it("accepts self-closing syntax", () => {
    expect(findHtmlError('<br/><input type="text" />')).toBeNull();
  });

  it("accepts a doctype declaration", () => {
    expect(findHtmlError("<!doctype html><p>x</p>")).toBeNull();
  });

  it("does not end the tag on a > inside a quoted attribute", () => {
    expect(findHtmlError('<a title="a > b">x</a>')).toBeNull();
  });

  it("flags an unclosed single-quoted attribute", () => {
    expect(findHtmlError("<div class='box>x</div>")).toMatch(
      /guillemet d'attribut/,
    );
  });

  it("names the offending tag in the message", () => {
    expect(findHtmlError("<section>text <article")).toMatch(/<article>/);
  });
});
