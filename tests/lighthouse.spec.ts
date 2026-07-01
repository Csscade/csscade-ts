import { existsSync } from "node:fs";
import { test as base, chromium } from "@playwright/test";
import { playAudit } from "playwright-lighthouse";

// Requires a production build: run `pnpm build && pnpm start` before this suite.
const baseUrl = "http://localhost:3000";
const reportDir = "lighthouse-report";

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

type LighthouseFixtures = {
  runLighthouseAudit: (page: { path: string; slug: string }) => Promise<void>;
};

const test = base.extend<LighthouseFixtures>({
  // biome-ignore lint/correctness/noEmptyPattern: Playwright requires the fixtures object destructure here
  runLighthouseAudit: async ({}, use, testInfo) => {
    const port = 9222 + testInfo.parallelIndex;
    const browser = await chromium.launch({
      args: [`--remote-debugging-port=${port}`],
    });

    await use(async ({ path, slug }) => {
      const reportPath = `${reportDir}/${slug}.html`;

      try {
        const page = await browser.newPage();
        await page.goto(`${baseUrl}${path}`);

        await playAudit({
          page,
          port,
          thresholds,
          reports: {
            formats: { html: true, json: true },
            directory: reportDir,
            name: slug,
          },
        });
      } finally {
        if (existsSync(reportPath)) {
          await testInfo.attach(`${slug} lighthouse report`, {
            path: reportPath,
            contentType: "text/html",
          });
        }
      }
    });

    await browser.close();
  },
});

test.describe("Lighthouse", () => {
  for (const { name, slug, path } of pages) {
    test(`${name} should meet Lighthouse score thresholds`, async ({
      runLighthouseAudit,
    }) => {
      await runLighthouseAudit({ path, slug });
    });
  }
});
