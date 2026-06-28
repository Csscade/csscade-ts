import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const baseUrl = "http://localhost:3000";

test.describe("Accessibility", () => {
  test("homepage should not have any automatically detectable accessibility violations", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(baseUrl);
    await page.waitForLoadState("networkidle");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
