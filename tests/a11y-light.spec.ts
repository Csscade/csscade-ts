import { AxeBuilder } from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

const baseUrl = "http://localhost:3000";

const runAxe = async (page: Page, path: string) => {
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
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

test.describe("Accessibility", () => {
  test.describe("Static pages", () => {
    test("homepage should not have any automatically detectable accessibility violations", async ({
      page,
    }) => {
      const results = await runAxe(page, "/");

      expect(results.violations).toEqual([]);
    });

    test("about page should not have any automatically detectable accessibility violations", async ({
      page,
    }) => {
      const results = await runAxe(page, "/a-propos");

      expect(results.violations).toEqual([]);
    });

    test("legal mentions page should not have any automatically detectable accessibility violations", async ({
      page,
    }) => {
      const results = await runAxe(page, "/mentions-legales");

      expect(results.violations).toEqual([]);
    });

    test("search page should not have any automatically detectable accessibility violations", async ({
      page,
    }) => {
      const results = await runAxe(page, "/recherche");

      expect(results.violations).toEqual([]);
    });
  });

  test.describe("Entity list pages", () => {
    test("articles list page should not have any automatically detectable accessibility violations", async ({
      page,
    }) => {
      const results = await runAxe(page, "/articles");

      expect(results.violations).toEqual([]);
    });

    test("authors list page should not have any automatically detectable accessibility violations", async ({
      page,
    }) => {
      const results = await runAxe(page, "/authors");

      expect(results.violations).toEqual([]);
    });

    test("talks list page should not have any automatically detectable accessibility violations", async ({
      page,
    }) => {
      const results = await runAxe(page, "/talks");

      expect(results.violations).toEqual([]);
    });

    test("tips list page should not have any automatically detectable accessibility violations", async ({
      page,
    }) => {
      const results = await runAxe(page, "/tips");

      expect(results.violations).toEqual([]);
    });
  });
});
