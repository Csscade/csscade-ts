import { chromium, test } from "@playwright/test";
import { playAudit } from "playwright-lighthouse";

// Requires a production build: run `pnpm build && pnpm start` before this suite.
const baseUrl = "http://localhost:3000";

const thresholds = {
  performance: 80,
  accessibility: 90,
  "best-practices": 90,
  seo: 90,
};

const pages = [
  { name: "homepage", slug: "home", path: "/" },
  { name: "about page", slug: "a-propos", path: "/a-propos" },
  {
    name: "legal mentions page",
    slug: "mentions-legales",
    path: "/mentions-legales",
  },
  { name: "search page", slug: "recherche", path: "/recherche" },
  { name: "articles list page", slug: "articles", path: "/articles" },
  { name: "authors list page", slug: "authors", path: "/authors" },
  { name: "talks list page", slug: "talks", path: "/talks" },
  { name: "tips list page", slug: "tips", path: "/tips" },
];

test.describe("Lighthouse", () => {
  for (const { name, slug, path } of pages) {
    // biome-ignore lint/correctness/noEmptyPattern: Playwright requires the fixtures object destructure here
    test(`${name} should meet Lighthouse score thresholds`, async ({}, testInfo) => {
      const port = 9222 + testInfo.parallelIndex;
      const browser = await chromium.launch({
        args: [`--remote-debugging-port=${port}`],
      });

      try {
        const page = await browser.newPage();
        await page.goto(`${baseUrl}${path}`);

        await playAudit({
          page,
          port,
          thresholds,
          reports: {
            formats: { html: true, json: true },
            directory: "lighthouse-report",
            name: slug,
          },
        });
      } finally {
        await browser.close();
      }
    });
  }
});
