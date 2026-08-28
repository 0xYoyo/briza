import { expect, test } from "@playwright/test";
import { TIKTOK_URL } from "../src/constants";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

/*
 * [wordmark-is-photo] the photographed sign is the wordmark. The name is
 * still live text for assistive technology and search engines, but while the
 * hero photograph renders nothing in the hero paints the name a second time.
 */
test("the hero's only wordmark is the photograph [wordmark-is-photo]", async ({
  page,
}) => {
  const h1 = page.locator("h1");
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText("בריזה");
  expect(await h1.evaluate((el) => el.closest("section")?.className)).toContain(
    "hero",
  );
  // clipped to 1px, not display:none — it must stay in the accessibility tree
  const box = await h1.boundingBox();
  expect(box?.width ?? 0).toBeLessThanOrEqual(1);
  expect(box?.height ?? 0).toBeLessThanOrEqual(1);

  const heroPhoto = page.locator(".hero img");
  await expect(heroPhoto).toHaveCount(1);
  await expect(heroPhoto).toBeVisible();
  expect(
    await heroPhoto.evaluate((el: HTMLImageElement) => el.naturalWidth),
  ).toBeGreaterThan(0);

  // no painted text inside the hero reads as the store name
  const painted = await page.evaluate(() => {
    const hero = document.querySelector(".hero");
    if (!hero) throw new Error("hero not found");
    return Array.from(hero.querySelectorAll("*")).filter((el) => {
      if (el.textContent?.trim() !== "בריזה") return false;
      const r = el.getBoundingClientRect();
      return r.width > 2 && r.height > 2;
    }).length;
  });
  expect(painted).toBe(0);
});

/*
 * [story-owns-38-54] one display size band, one owner: the Story title. Any
 * other text that grows into 38-54px is a second wordmark competing with the
 * sign, which is exactly what this redesign removed.
 */
test("only the Story title renders at 38-54px [story-owns-38-54]", async ({
  page,
}) => {
  const offenders = await page.evaluate(() => {
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
      if (size >= 38 && size <= 54 && !el.closest(".story__title")) {
        out.push(`${el.tagName} ${size}px "${n.textContent.trim()}"`);
      }
    }
    return out;
  });
  expect(offenders).toEqual([]);
  const title = page.locator(".story__title");
  await expect(title).toHaveText("בריזה");
  const size = await title.evaluate((el) =>
    Number.parseFloat(getComputedStyle(el).fontSize),
  );
  expect(size).toBeGreaterThanOrEqual(38);
  expect(size).toBeLessThanOrEqual(54);
});

/*
 * [motion-on-entry] the reveal is progressive enhancement: the hidden state
 * only ever exists under the class the script adds, and every block ends up
 * visible. Nothing above the fold is marked.
 */
test("every revealed block ends up visible [motion-on-entry]", async ({
  page,
}) => {
  const blocks = page.locator("[data-reveal]");
  expect(await blocks.count()).toBeGreaterThan(0);
  const hero = await page.evaluate(
    () => document.querySelector(".hero [data-reveal]") !== null,
  );
  expect(hero).toBe(false);

  const total = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  const vh = await page.evaluate(() => window.innerHeight);
  for (let y = 0; y <= total; y += Math.floor(vh / 2)) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    // one frame per step, the way a reader's scroll actually arrives
    await page.waitForTimeout(60);
  }
  await page.waitForFunction(
    () =>
      Array.from(document.querySelectorAll("[data-reveal]")).every(
        (el) => Number.parseFloat(getComputedStyle(el).opacity) === 1,
      ),
    undefined,
    { timeout: 5000 },
  );
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
