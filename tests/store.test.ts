import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { STORE_NAME } from "../src/constants";

describe("store constants", () => {
  it("exports the Hebrew store name", () => {
    expect(STORE_NAME).toBe("בריזה");
  });

  it("is the document title of the Hebrew RTL layout", () => {
    const layout = readFileSync(
      new URL("../src/layouts/Layout.astro", import.meta.url),
      "utf8",
    );
    expect(layout).toContain('import { STORE_NAME } from "../constants"');
    expect(layout).toContain("<title>{STORE_NAME}</title>");
    expect(layout).toContain('lang="he"');
    expect(layout).toContain('dir="rtl"');
  });
});
