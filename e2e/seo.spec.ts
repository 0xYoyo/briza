import { expect, test } from "@playwright/test";
import { META_DESCRIPTION } from "../src/constants";

const TITLE = "בריזה — בגדי נשים, גן העיר תל אביב";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("head carries title, description, canonical and Open Graph (AC-6)", async ({
  page,
}) => {
  await expect(page).toHaveTitle(TITLE);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    META_DESCRIPTION,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://briza-tlv.com/",
  );
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#0B1020",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    TITLE,
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "he_IL",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://briza-tlv.com/",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('html[lang="he"][dir="rtl"]')).toHaveCount(1);
});

test("og:image is an absolute 630px-tall webp whose meta matches the file (AC-6)", async ({
  page,
}) => {
  const og = page.locator('meta[property="og:image"]');
  const url = await og.getAttribute("content");
  expect(url?.startsWith("https://briza-tlv.com/_astro/")).toBe(true);
  expect(url?.endsWith(".webp")).toBe(true);
  // The source storefront photo is 1028px wide and astro:assets never upscales,
  // so the crop is 1028×630 (target 1200×630); the meta must match the real file.
  const width = Number(
    await page
      .locator('meta[property="og:image:width"]')
      .getAttribute("content"),
  );
  const height = Number(
    await page
      .locator('meta[property="og:image:height"]')
      .getAttribute("content"),
  );
  expect(height).toBe(630);
  expect(width).toBeGreaterThanOrEqual(1000);
  const natural = await page.evaluate(
    (src) =>
      new Promise<{ w: number; h: number }>((resolve, reject) => {
        const img = new Image();
        img.onload = () =>
          resolve({ w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = () => reject(new Error(`cannot load ${src}`));
        img.src = src;
      }),
    new URL(url ?? "").pathname,
  );
  expect(natural).toEqual({ w: width, h: height });
  const alt = await page
    .locator('meta[property="og:image:alt"]')
    .getAttribute("content");
  expect(alt?.trim()).toBeTruthy();
  expect(/[A-Za-z]/.test(alt ?? "")).toBe(false);
  // resolve against the preview server the page came from
  const res = await page.request.get(new URL(url ?? "").pathname);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/webp");
});

test("JSON-LD is a ClothingStore with hours and geo (AC-6)", async ({
  page,
}) => {
  const blocks = page.locator('script[type="application/ld+json"]');
  await expect(blocks).toHaveCount(1);
  const data = JSON.parse((await blocks.textContent()) ?? "null");
  expect(data["@type"]).toBe("ClothingStore");
  expect(data.openingHoursSpecification).toHaveLength(2);
  expect(data.geo.latitude).toBe(32.0866);
  expect(data.telephone).toEqual(["+972524381666", "+97235279187"]);
  expect(data.sameAs).toEqual(["https://www.tiktok.com/@irit027"]);
  // the landline is JSON-LD only, never visible (PRD §3.4)
  await expect(page.locator("body")).not.toContainText("03-5279187");
});

test("every image has Hebrew alt text (AC-6) [hebrew-only]", async ({
  page,
}) => {
  const bad = await page
    .locator("img")
    .evaluateAll(
      (els) =>
        els.filter(
          (el) =>
            !el.getAttribute("alt") ||
            /[A-Za-z]/.test(el.getAttribute("alt") ?? ""),
        ).length,
    );
  expect(await page.locator("img").count()).toBeGreaterThan(0);
  expect(bad).toBe(0);
});
