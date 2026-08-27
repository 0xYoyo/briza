import { expect, test } from "@playwright/test";

test("page is Hebrew RTL with the store name as title", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('html[lang="he"][dir="rtl"]')).toHaveCount(1);
  await expect(page).toHaveTitle("בריזה — בגדי נשים, גן העיר תל אביב");
});

// AC-3: fonts and every other asset are self-hosted — no third-party requests.
test("every request while loading / is same-origin", async ({ page }) => {
  const urls: string[] = [];
  page.on("request", (req) => urls.push(req.url()));
  await page.goto("/", { waitUntil: "networkidle" });
  expect(urls.length).toBeGreaterThan(0);
  const foreign = urls.filter((u) => !u.startsWith("http://localhost:4321/"));
  expect(foreign).toEqual([]);
  const fonts = urls.filter((u) => u.endsWith(".woff2"));
  expect(fonts.length).toBeGreaterThan(0);
  for (const f of fonts) expect(f).toContain("/_astro/");
});
