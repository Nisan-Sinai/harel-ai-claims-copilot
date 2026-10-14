import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Claims Copilot quality gate", () => {
  test("homepage renders core product story", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/חברת ביטוח|Insurance Company/i).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /דיווח על תביעה|Report a claim/i }).first()).toBeVisible();
  });

  test("language control switches document direction", async ({ page }) => {
    await page.goto("/");
    const mobileMenu = page.getByRole("button", { name: /פתח תפריט|Open menu/i });
    if (await mobileMenu.isVisible()) await mobileMenu.click();
    const languageButton = page.getByRole("button", { name: /Switch to English|Switch to Hebrew/i });
    await expect(languageButton).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await languageButton.click();
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  });

  test("navigation pages are reachable", async ({ page }) => {
    for (const path of ["/dashboard", "/architecture", "/privacy", "/accessibility"]) {
      const response = await page.goto(path);
      expect(response?.ok(), `${path} should respond successfully`).toBeTruthy();
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("has no serious or critical accessibility violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""));
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });

  test("keyboard users can expose the skip link", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.locator(".skip-link")).toBeFocused();
  });
});
