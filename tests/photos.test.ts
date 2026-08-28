import { describe, expect, it } from "vitest";
import {
  HERO_PHOTO,
  OFFER_PHOTO,
  PHOTOS,
  STEP_PHOTOS,
  STORY_PHOTO,
  VISIT_PHOTO,
} from "../src/photos";

const LATIN = /[A-Za-z]/;

describe("photos", () => {
  /*
   * The mosaic is placed cell by cell at two breakpoints (Photos.astro), so
   * its length is a layout invariant, not a free-form list: seven frames fill
   * 2x5 on phones and 3x3 at =900px with the two tall frames spanning.
   */
  it("exports exactly seven mosaic photos, in filename order", () => {
    expect(PHOTOS.length).toBe(7);
    const names = PHOTOS.map((p) => p.src.src.split("/").pop() ?? "");
    expect(names.map((n) => n.slice(0, 2))).toEqual([
      "03",
      "05",
      "06",
      "08",
      "09",
      "10",
      "11",
    ]);
  });

  it("gives every section panel its own photo and crop", () => {
    const panels = [HERO_PHOTO, OFFER_PHOTO, STORY_PHOTO, VISIT_PHOTO];
    expect(STEP_PHOTOS.length).toBe(3);
    for (const p of [...panels, ...STEP_PHOTOS]) {
      expect(p.position, p.alt).toMatch(/^\d+% \d+%$/);
    }
    // the Story and How-it-works panels are not repeated in the mosaic
    const mosaic = PHOTOS.map((p) => p.src.src);
    expect(mosaic).not.toContain(STORY_PHOTO.src.src);
    expect(mosaic).not.toContain(STEP_PHOTOS[0].src.src);
  });

  it("imports every photo as ImageMetadata with dimensions", () => {
    for (const p of [
      HERO_PHOTO,
      OFFER_PHOTO,
      STORY_PHOTO,
      VISIT_PHOTO,
      ...STEP_PHOTOS,
      ...PHOTOS,
    ]) {
      expect(typeof p.src.src).toBe("string");
      expect(p.src.width).toBeGreaterThan(0);
      expect(p.src.height).toBeGreaterThan(0);
      expect(p.src.format).toBe("jpg");
    }
  });

  it("has non-empty Hebrew alt text with no Latin letters", () => {
    for (const p of [
      HERO_PHOTO,
      OFFER_PHOTO,
      STORY_PHOTO,
      VISIT_PHOTO,
      ...STEP_PHOTOS,
      ...PHOTOS,
    ]) {
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
