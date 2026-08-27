import { expect, test } from "@playwright/test";
import { TIKTOK_URL } from "../src/constants";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has exactly one h1, the text wordmark [wordmark-is-text]", async ({
  page,
}) => {
  const h1 = page.locator("h1");
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText("בריזה");
});

test("exactly one visible WhatsApp-green element at initial scroll [one-cta]", async ({
  page,
}) => {
  // Visible = painted green and intersecting the viewport at scrollY 0; the
  // page has a second primary pill further down (Offer), ≥1 viewport away.
  const count = await page.evaluate(() => {
    const vh = window.innerHeight;
    return Array.from(document.querySelectorAll("*")).filter((el) => {
      const cs = getComputedStyle(el);
      if (cs.backgroundColor !== "rgb(37, 211, 102)") return false;
      const r = el.getBoundingClientRect();
      return (
        r.width > 0 &&
        r.height > 0 &&
        cs.visibility !== "hidden" &&
        r.bottom > 0 &&
        r.top < vh
      );
    }).length;
  });
  expect(count).toBe(1);
});

test("every link has a real href [no-dead-button]", async ({ page }) => {
  const hrefs = await page
    .locator("a")
    .evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    expect(href).toBeTruthy();
    expect(href).not.toBe("#");
  }
});

test("sticky bar is mobile-only and ≤80px [sticky-secondary]", async ({
  page,
}, testInfo) => {
  const bar = page.locator(".sticky-bar");
  await expect(bar).toHaveCount(1);
  if (testInfo.project.name === "mobile") {
    await expect(bar).toBeVisible();
    const box = await bar.boundingBox();
    expect(box).not.toBeNull();
    expect(box?.height ?? 0).toBeLessThanOrEqual(80);
    await expect(bar.locator("a")).toHaveCount(2);
    await expect(
      bar.getByRole("link", { name: "התקשרו לאירית" }),
    ).toHaveAttribute("href", "tel:+972524381666");
  } else {
    await expect(bar).toBeHidden();
  }
  // [no-overlay] the sticky bar is the only fixed element
  const fixed = await page.evaluate(
    () =>
      Array.from(document.querySelectorAll("body *")).filter(
        (el) => getComputedStyle(el).position === "fixed",
      ).length,
  );
  expect(fixed).toBe(1);
});

test("footer has exactly one social link, TikTok", async ({ page }) => {
  const social = page.locator("footer a[target='_blank']");
  await expect(social).toHaveCount(1);
  await expect(social).toHaveAttribute("href", TIKTOK_URL);
  await expect(social).toHaveAttribute("rel", "noopener");
});

test("every image declares width and height [no-layout-shift]", async ({
  page,
}) => {
  const imgs = page.locator("img");
  expect(await imgs.count()).toBeGreaterThan(0);
  const missing = await imgs.evaluateAll(
    (els) =>
      els.filter(
        (el) => !el.getAttribute("width") || !el.getAttribute("height"),
      ).length,
  );
  expect(missing).toBe(0);
});

test("no visible text renders below 19px [body-19]", async ({ page }) => {
  const small = await page.evaluate(() => {
    const out: string[] = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    );
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (!n.textContent?.trim()) continue;
      const el = n.parentElement;
      if (!el || el.getClientRects().length === 0) continue;
      const size = Number.parseFloat(getComputedStyle(el).fontSize);
      if (size < 19)
        out.push(`${el.tagName}: ${size}px "${n.textContent.trim()}"`);
    }
    return out;
  });
  expect(small).toEqual([]);
});
