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

test("photo mosaic shape and image attributes (AC-7) [not-catalog]", async ({
  page,
}, testInfo) => {
  const grid = page.locator("main ul").filter({ has: page.locator("img") });
  await expect(grid).toHaveCount(1);
  const imgs = grid.locator("img");
  await expect(imgs).toHaveCount(4);
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
  const shape = await grid.evaluate((el) => {
    const cs = getComputedStyle(el);
    const cells = Array.from(el.children).map((li) =>
      li.getBoundingClientRect(),
    );
    const unit = Math.min(...cells.map((c) => c.height));
    const single = cells.find((c) => c.height === unit);
    return {
      columns: cs.gridTemplateColumns.trim().split(/\s+/).length,
      rows: cs.gridTemplateRows.trim().split(/\s+/).length,
      // frames taller than one row: the two that span two rows
      tall: cells.filter((c) => c.height > unit * 1.5).length,
      widths: new Set(cells.map((c) => Math.round(c.width))).size,
      // one seam width everywhere: column and row gaps are the same value
      gaps: new Set([cs.columnGap, cs.rowGap]).size,
      cellRatio: single ? single.width / single.height : 0,
      bleed: Math.round(el.getBoundingClientRect().width),
      viewport: window.innerWidth,
    };
  });
  const mobile = testInfo.project.name === "mobile";
  expect(shape.columns).toBe(mobile ? 2 : 3);
  expect(shape.rows).toBe(mobile ? 3 : 2);
  // two frames run two rows tall; the rest are single 4:5 cells
  expect(shape.tall).toBe(2);
  // one tile shape: every cell is the same width, on an even seam
  expect(shape.widths).toBe(1);
  // full-bleed: the mosaic runs to the viewport edge
  expect(shape.bleed).toBe(shape.viewport);
  // uniform 4:5 cells (the tall ones are two of those plus a seam)
  expect(shape.cellRatio).toBeCloseTo(0.8, 1);
  expect(shape.gaps).toBe(1);
});

/*
 * [one-cta] the rule is what the reader sees, not a fixed distance: no two
 * join pills may share a screen. Panels are sized from the large viewport so
 * a collapsing mobile URL bar cannot pull two of them together.
 */
test("no two join pills can share a screen (AC-6) [one-cta]", async ({
  page,
}) => {
  const pills = await page.locator("a.btn--primary").evaluateAll((els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY };
    }),
  );
  // hero, Offer, Visit — the three and only primary pills on the page
  expect(pills.length).toBe(3);
  const vh = await page.evaluate(() => window.innerHeight);
  for (let i = 1; i < pills.length; i++) {
    expect(
      pills[i].top - pills[i - 1].bottom,
      `pill ${i} vs ${i - 1}`,
    ).toBeGreaterThanOrEqual(vh);
  }
});

/*
 * Every panel below the hero is roughly half photograph at =900px — the one
 * idea this redesign applies everywhere. Below 900px the panels stack, photo
 * over text, and the photo still runs edge to edge.
 */
test("each split panel is half photograph and alternates sides", async ({
  page,
}, testInfo) => {
  const panels = await page.locator(".panel").evaluateAll((els) =>
    els.map((el) => {
      const photo = el.querySelector(".panel__photo");
      if (!photo) throw new Error("panel has no photograph");
      const p = photo.getBoundingClientRect();
      const s = el.getBoundingClientRect();
      return {
        widthShare: p.width / s.width,
        heightShare: p.height / s.height,
        photoStart: Math.round(p.left) === Math.round(s.left),
      };
    }),
  );
  // Offer, Story, Visit
  expect(panels.length).toBe(3);
  for (const panel of panels) {
    if (testInfo.project.name === "mobile") {
      expect(panel.widthShare).toBeCloseTo(1, 1);
    } else {
      expect(panel.widthShare).toBeCloseTo(0.5, 1);
      expect(panel.heightShare).toBeCloseTo(1, 1);
    }
  }
  if (testInfo.project.name !== "mobile") {
    // the photograph swaps sides from panel to panel
    expect(panels[0].photoStart).not.toBe(panels[1].photoStart);
    expect(panels[1].photoStart).not.toBe(panels[2].photoStart);
  }
});

test("at most one green pill is visible at any scroll position (AC-6) [one-cta]", async ({
  page,
}) => {
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
  // the eleven launch photographs, each rendered exactly once
  expect(sizes.size).toBe(11);
  expect(bytes).toBeLessThanOrEqual(1_000_000);
});

/*
 * [one-viewport] every major section is exactly one viewport tall at ≥900px.
 * Taller and the next section peeks in under it; shorter and its neighbour's
 * ground continues beside a full-height photograph at half width.
 */
test("every major section is exactly one viewport tall [one-viewport]", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "the lock is a ≥900px rule");
  const vh = await page.evaluate(() => window.innerHeight);
  const sections = await page
    .locator("[data-locked], .hero")
    .evaluateAll((els) =>
      els.map((el) => ({
        shot: el.getAttribute("data-shot"),
        height: el.getBoundingClientRect().height,
      })),
    );
  expect(sections.map((s) => s.shot)).toEqual([
    "hero",
    "offer",
    "howitworks",
    "story",
    "visit",
  ]);
  for (const section of sections) {
    expect(section.height, `${section.shot} height`).toBeCloseTo(vh, 0);
  }
});

/*
 * No section may bleed into, or fall short of, its neighbour: the sections
 * tile the document exactly, so no boundary shows a strip of the previous
 * section's ground and nothing overlaps the section below it.
 */
test("sections tile the page with no gap and no overlap [one-viewport]", async ({
  page,
}) => {
  const boxes = await page.locator("[data-shot]").evaluateAll((els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        shot: el.getAttribute("data-shot"),
        top: r.top + window.scrollY,
        bottom: r.bottom + window.scrollY,
      };
    }),
  );
  expect(boxes[0].top).toBe(0);
  for (let i = 1; i < boxes.length; i++) {
    expect(
      boxes[i].top - boxes[i - 1].bottom,
      `${boxes[i].shot} starts flush under ${boxes[i - 1].shot}`,
    ).toBeCloseTo(0, 0);
  }
  const docHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  // the last section ends the document (the phone reserves the sticky bar)
  expect(docHeight - boxes[boxes.length - 1].bottom).toBeLessThanOrEqual(96);
});

/*
 * Nothing overflows a locked section: a photograph is clipped by its own
 * column and a heading is never cut by the section's edge.
 */
test("no locked section overflows its own box [one-viewport]", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "the lock is a ≥900px rule");
  const overflow = await page.locator("[data-locked]").evaluateAll((els) =>
    els.flatMap((el) => {
      const box = el.getBoundingClientRect();
      return Array.from(el.querySelectorAll("h2, p, img, a, table")).flatMap(
        (child) => {
          const r = child.getBoundingClientRect();
          if (r.height === 0) return [];
          const over = Math.max(box.top - r.top, r.bottom - box.bottom);
          return over > 1
            ? [
                {
                  shot: el.getAttribute("data-shot"),
                  tag: child.tagName,
                  over: Math.round(over),
                },
              ]
            : [];
        },
      );
    }),
  );
  expect(overflow).toEqual([]);
});

/*
 * [photo-used-once] every photograph is cast into exactly one role, so a
 * reader never meets the same picture twice on the way down the page.
 */
test("no photograph appears twice on the page [photo-used-once]", async ({
  page,
}) => {
  const files = await page.locator("img").evaluateAll((els) =>
    els.map((el) => {
      const src = el.getAttribute("src") ?? "";
      // /_astro/<name>.<content hash>_<variant hash>.webp
      return (src.split("/").pop() ?? "").split(".")[0];
    }),
  );
  expect(files.length).toBe(11);
  expect(new Set(files).size).toBe(files.length);
});
