import { expect, test } from "@playwright/test";

test("placeholder page is Hebrew RTL and shows the store name", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator('html[lang="he"][dir="rtl"]')).toHaveCount(1);
  await expect(page.getByText("בריזה")).toBeVisible();
});
