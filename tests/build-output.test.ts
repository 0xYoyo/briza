import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

const ROOT = new URL("../", import.meta.url).pathname;
const DIST = join(ROOT, "dist");

describe("production build output (AC-8)", () => {
  beforeAll(() => {
    execSync("npx astro build", { cwd: ROOT, stdio: "ignore" });
  }, 120_000);

  it("emits the page, robots and sitemap files", () => {
    for (const f of [
      "index.html",
      "robots.txt",
      "sitemap-index.xml",
      "sitemap-0.xml",
    ]) {
      expect(existsSync(join(DIST, f)), f).toBe(true);
    }
    expect(readFileSync(join(DIST, "robots.txt"), "utf8")).toBe(
      "User-agent: *\nAllow: /\nSitemap: https://briza-tlv.com/sitemap-index.xml\n",
    );
    const sitemap = readFileSync(join(DIST, "sitemap-0.xml"), "utf8");
    expect(sitemap.match(/<loc>[^<]*<\/loc>/g)).toEqual([
      "<loc>https://briza-tlv.com/</loc>",
    ]);
  });

  it("ships optimised images and self-hosted fonts in _astro/", () => {
    const files = readdirSync(join(DIST, "_astro"));
    expect(files.some((f) => f.endsWith(".webp"))).toBe(true);
    expect(files.some((f) => f.endsWith(".woff2"))).toBe(true);
  });

  it("ships no .jpg larger than the optimised hero", () => {
    const dir = join(DIST, "_astro");
    const files = readdirSync(dir);
    const hero = files
      .filter((f) => f.startsWith("01-storefront-sign") && f.endsWith(".webp"))
      .map((f) => statSync(join(dir, f)).size);
    expect(hero.length).toBeGreaterThan(0);
    const heroSize = Math.max(...hero);
    const bigJpgs = files.filter(
      (f) => f.endsWith(".jpg") && statSync(join(dir, f)).size > heroSize,
    );
    expect(bigJpgs).toEqual([]);
  });
});
