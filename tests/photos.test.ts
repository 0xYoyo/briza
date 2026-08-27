import { describe, expect, it } from "vitest";
import { HERO_PHOTO, PHOTOS } from "../src/photos";

const LATIN = /[A-Za-z]/;

describe("photos", () => {
  it("exports exactly nine grid photos (03–11)", () => {
    expect(PHOTOS.length).toBe(9);
    const names = PHOTOS.map((p) => p.src.src.split("/").pop() ?? "");
    for (const [i, name] of names.entries()) {
      expect(name.startsWith(String(i + 3).padStart(2, "0"))).toBe(true);
    }
  });

  it("imports every photo as ImageMetadata with dimensions", () => {
    for (const p of [HERO_PHOTO, ...PHOTOS]) {
      expect(typeof p.src.src).toBe("string");
      expect(p.src.width).toBeGreaterThan(0);
      expect(p.src.height).toBeGreaterThan(0);
      expect(p.src.format).toBe("jpg");
    }
  });

  it("has non-empty Hebrew alt text with no Latin letters", () => {
    for (const p of [HERO_PHOTO, ...PHOTOS]) {
      expect(p.alt.trim().length).toBeGreaterThan(0);
      expect(LATIN.test(p.alt)).toBe(false);
    }
  });

  it("keeps the hero photo out of the grid", () => {
    expect(HERO_PHOTO.src.src.includes("01-storefront-sign")).toBe(true);
    expect(PHOTOS.map((p) => p.src.src)).not.toContain(HERO_PHOTO.src.src);
    expect(PHOTOS.some((p) => p.src === HERO_PHOTO.src)).toBe(false);
  });
});
