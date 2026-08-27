import { expect, test } from "@playwright/test";
import {
  GBP_REVIEWS_URL,
  GBP_WRITE_REVIEW_URL,
  MAPS_URL,
} from "../src/constants";

const STATUS =
  /^(פתוח עכשיו · אירית עונה בוואטסאפ|סגור עכשיו · נפתח (היום|מחר|ביום (ראשון|שני|שלישי|רביעי|חמישי|שישי)) ב־\d{1,2}:\d{2})$/;

const ROWS = [
  ["ראשון–חמישי", "9:30–19:00"],
  ["שישי", "9:30–14:00"],
  ["שבת", "סגור"],
];

/** Table top relative to the section heading — must not depend on JS. */
async function tableOffset(
  page: import("@playwright/test").Page,
): Promise<number> {
  return page.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll("h2")).find(
      (el) => el.textContent?.trim() === "גן העיר, קומת כניסה",
    );
    const table = document.querySelector("table");
    if (!h2 || !table) throw new Error("visit section not found");
    return table.getBoundingClientRect().y - h2.getBoundingClientRect().y;
  });
}

test.describe("Visit", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("the open/closed line is computed and shown (AC-7)", async ({
    page,
  }) => {
    const status = page.locator("[data-status]");
    await expect(status).toBeVisible();
    await expect(status).toHaveText(STATUS);
    // the page's only executing script (Astro inlines it as a module);
    // the JSON-LD block is data, not code
    await expect(
      page.locator('script:not([type="application/ld+json"])'),
    ).toHaveCount(1);
    await expect(page.locator('script[type="module"]')).toHaveCount(1);
  });

  test("the hours table has the three merged rows (AC-7) [rtl-numerals]", async ({
    page,
  }) => {
    const rows = page.locator("table tbody tr");
    await expect(rows).toHaveCount(3);
    for (const [i, [days, time]] of ROWS.entries()) {
      await expect(rows.nth(i).locator("td").nth(0)).toHaveText(days);
      await expect(rows.nth(i).locator("td").nth(1)).toHaveText(time);
      await expect(rows.nth(i).locator("td bdi")).toHaveText(time);
    }
  });

  test("navigate, call and join actions (AC-7)", async ({ page }) => {
    const navigate = page.getByRole("link", { name: "נווטו לחנות" });
    await expect(navigate).toHaveAttribute("href", MAPS_URL);
    await expect(navigate).toHaveAttribute("target", "_blank");
    await expect(navigate).toHaveAttribute("rel", "noopener");
    await expect(
      page.getByRole("link", { name: "התקשרו", exact: true }),
    ).toHaveAttribute("href", "tel:+972524381666");
    const primaries = page.locator("a.btn--primary");
    await expect(primaries).toHaveCount(3);
    await expect(primaries.last()).toHaveText("הצטרפו לקבוצת העדכונים");
  });

  test("review links point at Google (AC-7) [no-testimonial]", async ({
    page,
  }) => {
    const read = page.getByRole("link", { name: "לביקורות בגוגל" });
    const write = page.getByRole("link", { name: "כתבו לנו ביקורת" });
    await expect(read).toHaveAttribute("href", GBP_REVIEWS_URL);
    await expect(write).toHaveAttribute("href", GBP_WRITE_REVIEW_URL);
    for (const link of [read, write]) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener");
      expect(
        await link.evaluate((el) => getComputedStyle(el).textDecorationLine),
      ).toBe("underline");
    }
    await expect(page.locator("blockquote")).toHaveCount(0);
  });
});

test("without JavaScript the status is absent and the table does not move (AC-7) [no-js-state]", async ({
  browser,
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(page.locator("[data-status]")).toBeVisible();
  const withJs = await tableOffset(page);

  const context = await browser.newContext({
    ...testInfo.project.use,
    javaScriptEnabled: false,
  });
  const noJs = await context.newPage();
  await noJs.goto("/");
  await expect(noJs.locator("[data-status]")).toBeHidden();
  await expect(noJs.locator("[data-status]")).toHaveAttribute("hidden", "");
  expect(await tableOffset(noJs)).toBe(withJs);
  await context.close();
});
