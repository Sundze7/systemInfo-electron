import { test, expect } from "@playwright/test";

// let electronApp;

// test.beforeEach(async () => {
//   electronApp = await _electron.launch({
//     args: ["."],
//     env: { NODE_ENV: "development" },
//   });
//   const mainPage = await electronApp.firstWindow();
// });
test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/", { waitUntil: "domcontentloaded" });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/", { waitUntil: "domcontentloaded" });

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
