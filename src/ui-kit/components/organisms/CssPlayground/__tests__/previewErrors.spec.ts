import { describe, expect, it } from "vitest";
import { findPreviewError } from "../previewErrors";

describe("findPreviewError", () => {
  it("returns null when both HTML and CSS are sound", () => {
    expect(findPreviewError("<p>hi</p>", ".a { color: red; }")).toBeNull();
  });

  it("prefixes CSS errors", () => {
    expect(findPreviewError("<p>hi</p>", ".a { color: red")).toMatch(
      /^Erreur CSS :/,
    );
  });

  it("prefixes HTML errors", () => {
    expect(findPreviewError("<p>text <span", ".a { color: red; }")).toMatch(
      /^Erreur HTML :/,
    );
  });

  it("reports the HTML error first when both are present", () => {
    expect(findPreviewError("<p>text <span", ".a { color: red")).toMatch(
      /^Erreur HTML :/,
    );
  });

  it("returns null for empty inputs", () => {
    expect(findPreviewError("", "")).toBeNull();
  });
});
