import { AxeBuilder } from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

const baseUrl = "http://localhost:3000";

type Theme = "light" | "dark";

const runAxe = async (page: Page, theme: Theme, path: string) => {
  await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${baseUrl}${path}`);
  await page.waitForLoadState("networkidle");
  return new AxeBuilder({ page })
    .withTags([
      "wcag2a",
      "wcag2aa",
      "wcag2aaa",
      "wcag21a",
      "wcag21aa",
      "wcag22aa",
      "best-practice",
      "RGAAv4",
    ])
    .analyze();
};

const staticPages = [
  { name: "homepage", path: "/" },
  { name: "about page", path: "/a-propos" },
  { name: "legal mentions page", path: "/mentions-legales" },
  { name: "search page", path: "/recherche" },
];

const entityListPages = [
  { name: "articles list page", path: "/articles" },
  { name: "authors list page", path: "/authors" },
  { name: "talks list page", path: "/talks" },
  { name: "tips list page", path: "/tips" },
];

for (const theme of ["light", "dark"] as const satisfies Theme[]) {
  test.describe(`Accessibility (${theme} theme)`, () => {
    test.describe("Static pages", () => {
      for (const { name, path } of staticPages) {
        test(`${name} should not have any automatically detectable accessibility violations`, async ({
          page,
        }) => {
          const results = await runAxe(page, theme, path);

          expect(results.violations).toEqual([]);
        });
      }
    });

    test.describe("Entity list pages", () => {
      for (const { name, path } of entityListPages) {
        test(`${name} should not have any automatically detectable accessibility violations`, async ({
          page,
        }) => {
          const results = await runAxe(page, theme, path);

          expect(results.violations).toEqual([]);
        });
      }
    });
  });
}
