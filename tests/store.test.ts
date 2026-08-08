import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { STORE_NAME } from "../src/constants";

describe("store constants", () => {
  it("exports the Hebrew store name", () => {
    expect(STORE_NAME).toBe("בריזה");
  });

  it("is displayed by the placeholder page in Hebrew RTL", () => {
    const page = readFileSync(
      new URL("../src/pages/index.astro", import.meta.url),
      "utf8",
    );
    expect(page).toContain(STORE_NAME);
    expect(page).toContain('lang="he"');
    expect(page).toContain('dir="rtl"');
  });
});
