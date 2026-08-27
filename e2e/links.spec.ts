import { expect, test } from "@playwright/test";
import {
  GBP_REVIEWS_URL,
  GBP_WRITE_REVIEW_URL,
  MAPS_URL,
  TIKTOK_URL,
} from "../src/constants";
import {
  callHref,
  JOIN_FALLBACK_MESSAGE,
  joinHref,
  WRITE_MESSAGE,
  writeHref,
} from "../src/links";

type Link = { href: string; target: string | null; rel: string | null };

test("every link on the page is one of the known actions (AC-5) [no-dead-button]", async ({
  page,
}) => {
  await page.goto("/");
  const links: Link[] = await page.locator("a").evaluateAll((els) =>
    els.map((el) => ({
      href: el.getAttribute("href") ?? "",
      target: el.getAttribute("target"),
      rel: el.getAttribute("rel"),
    })),
  );
  await expect(page.locator("a:not([href])")).toHaveCount(0);
  await expect(page.locator("button")).toHaveCount(0);

  const hrefs = links.map((l) => l.href);
  const count = (h: string) => hrefs.filter((x) => x === h).length;
  expect(count(joinHref())).toBe(3);
  expect(count(writeHref())).toBe(2);
  expect(count(callHref())).toBe(3);
  expect(new Set(hrefs)).toEqual(
    new Set([
      joinHref(),
      writeHref(),
      callHref(),
      MAPS_URL,
      GBP_REVIEWS_URL,
      GBP_WRITE_REVIEW_URL,
      TIKTOK_URL,
    ]),
  );

  for (const link of links) {
    expect(link.href).not.toBe("");
    expect(link.href).not.toBe("#");
    expect(link.href.startsWith("javascript:")).toBe(false);
    expect(link.href.startsWith("mailto:")).toBe(false);
    if (link.href.startsWith("https://wa.me/")) {
      const text = new URL(link.href).searchParams.get("text");
      expect([JOIN_FALLBACK_MESSAGE, WRITE_MESSAGE]).toContain(text);
    } else if (/^https?:/.test(link.href)) {
      expect(link.target, link.href).toBe("_blank");
      expect(link.rel ?? "", link.href).toContain("noopener");
    }
  }
});
