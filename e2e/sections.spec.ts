import { expect, test } from "@playwright/test";

const GREEN = "rgb(37, 211, 102)";
const STEPS = [
  "אירית מעלה לקבוצה תמונות של סחורה חדשה, עם מידות ומחיר.",
  "ראיתן משהו? כתבו לה ״שמרי לי״ — והיא שומרת לכן אותו בחנות.",
  "באות למדוד בנחת, בלי התחייבות.",
];
const HEADINGS = [
  "10% הנחה על הקנייה הראשונה",
  "איך זה עובד",
  "בריזה",
  "מהמדפים שלנו",
  "גן העיר, קומת כניסה",
  "מה אומרות עלינו",
];

/** Elements painted WhatsApp green that intersect the viewport right now. */
async function greenInViewport(
  page: import("@playwright/test").Page,
): Promise<number> {
  return page.evaluate((green) => {
    const vh = window.innerHeight;
    return Array.from(document.querySelectorAll("*")).filter((el) => {
      const cs = getComputedStyle(el);
      if (cs.backgroundColor !== green || cs.visibility === "hidden")
        return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < vh;
    }).length;
  }, GREEN);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("section headings follow the h1 in document order (AC-7)", async ({
  page,
}) => {
  const texts = await page
    .locator("h1, h2")
    .evaluateAll((els) =>
      els.map((el) => el.textContent?.replace(/\s+/g, " ").trim()),
    );
  expect(texts).toEqual(["בריזה", ...HEADINGS]);
});

test("how-it-works is an ordered list of the three steps (AC-7)", async ({
  page,
}) => {
  const items = page.locator("main ol li");
  await expect(items).toHaveCount(3);
  for (const [i, text] of STEPS.entries()) {
    await expect(items.nth(i)).toHaveText(text);
  }
});

test("the story paragraph is set in Frank Ruhl Libre (AC-7)", async ({
  page,
}) => {
  const story = page.locator("main p", { hasText: "את בריזה פתח" });
  await expect(story).toHaveCount(1);
  const family = await story.evaluate((el) => getComputedStyle(el).fontFamily);
  expect(family.startsWith('"Frank Ruhl Libre"')).toBe(true);
});

test("photos grid shape and image attributes (AC-7) [not-catalog]", async ({
  page,
}, testInfo) => {
  const grid = page.locator("main ul").filter({ has: page.locator("img") });
  await expect(grid).toHaveCount(1);
  const imgs = grid.locator("img");
  await expect(imgs).toHaveCount(9);
  const attrs = await imgs.evaluateAll((els) =>
    els.map((el) => ({
      alt: el.getAttribute("alt"),
      loading: el.getAttribute("loading"),
      width: el.getAttribute("width"),
      height: el.getAttribute("height"),
      srcset: el.getAttribute("srcset") ?? "",
      linked: el.closest("a") !== null,
    })),
  );
  for (const a of attrs) {
    expect(a.alt?.trim()).toBeTruthy();
    expect(a.loading).toBe("lazy");
    expect(a.width).toBeTruthy();
    expect(a.height).toBeTruthy();
    expect(a.srcset).toContain(".webp");
    expect(a.linked).toBe(false);
  }
  const tracks = await grid.evaluate(
    (el) => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length,
  );
  expect(tracks).toBe(testInfo.project.name === "mobile" ? 2 : 3);
});

test("consecutive primary pills sit ≥1 viewport apart (AC-6) [one-cta]", async ({
  page,
}) => {
  const tops = await page
    .locator("a.btn--primary")
    .evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().top + window.scrollY),
    );
  // hero, Offer, Visit — the three and only primary pills on the page
  expect(tops.length).toBe(3);
  const vh = await page.evaluate(() => window.innerHeight);
  for (let i = 1; i < tops.length; i++) {
    expect(
      tops[i] - tops[i - 1],
      `pill ${i} vs ${i - 1}`,
    ).toBeGreaterThanOrEqual(vh);
  }
});

test("at most one green pill is visible at any scroll position (AC-6) [one-cta]", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile sweep");
  const { vh, total } = await page.evaluate(() => ({
    vh: window.innerHeight,
    total: document.documentElement.scrollHeight,
  }));
  const step = Math.floor(vh / 2);
  for (let y = 0; y <= total; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    expect(await greenInViewport(page), `at scrollY=${y}`).toBeLessThanOrEqual(
      1,
    );
  }
});

test("image transfer for the whole page is ≤ 1 MB (AC-8)", async ({
  browser,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile budget");
  // A fresh context so nothing is served from this worker's cache.
  const context = await browser.newContext(testInfo.project.use);
  const page = await context.newPage();
  const sizes = new Map<string, number>();
  page.on("response", async (res) => {
    const type = res.headers()["content-type"] ?? "";
    if (!type.startsWith("image/")) return;
    sizes.set(res.url(), (await res.body()).length);
  });
  await page.goto("/", { waitUntil: "networkidle" });
  const { vh, total } = await page.evaluate(() => ({
    vh: window.innerHeight,
    total: document.documentElement.scrollHeight,
  }));
  for (let y = 0; y <= total; y += Math.floor(vh / 2)) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForLoadState("networkidle");
  }
  await page.waitForLoadState("networkidle");
  await context.close();
  const bytes = Array.from(sizes.values()).reduce((a, b) => a + b, 0);
  expect(sizes.size).toBe(10);
  expect(bytes).toBeLessThanOrEqual(1_000_000);
});
