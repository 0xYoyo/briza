import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { STORE_NAME } from "../src/constants";

describe("store constants", () => {
  it("exports the Hebrew store name", () => {
    expect(STORE_NAME).toBe("בריזה");
  });

  it("names the site in the Hebrew RTL layout head", () => {
    const layout = readFileSync(
      new URL("../src/layouts/Layout.astro", import.meta.url),
      "utf8",
    );
    expect(layout).toContain("<title>{PAGE_TITLE}</title>");
    expect(layout).toContain(
      '<meta property="og:site_name" content={STORE_NAME} />',
    );
    expect(layout).toContain('lang="he"');
    expect(layout).toContain('dir="rtl"');
  });
});
