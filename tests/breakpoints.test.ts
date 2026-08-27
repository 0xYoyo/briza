import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (rel: string) =>
  readFileSync(new URL(rel, import.meta.url), "utf8");
const globalCss = read("../src/styles/global.css");
const stickyBar = read("../src/components/StickyBar.astro");

/**
 * The body reserves the sticky bar's height below 900px and the bar hides at
 * ≥900px: both rules must share one exact boundary and one height token, so
 * no fractional viewport width can show the bar without reserved space.
 */
describe("sticky bar breakpoint", () => {
  it("no off-by-one max-width boundary remains", () => {
    expect(globalCss).not.toMatch(/max-width:\s*899/);
    expect(stickyBar).not.toMatch(/max-width:\s*899/);
  });

  it("both files use the 900px breakpoint", () => {
    expect(globalCss).toMatch(/@media \(width < 900px\)/);
    expect(stickyBar).toMatch(/@media \(min-width: 900px\)/);
  });

  it("both files read the same --sticky-bar-height token", () => {
    expect(globalCss).toMatch(/--sticky-bar-height:\s*80px/);
    expect(
      globalCss.match(/var\(--sticky-bar-height\)/g)?.length,
    ).toBeGreaterThanOrEqual(1);
    expect(stickyBar).toMatch(/var\(--sticky-bar-height\)/);
  });
});
