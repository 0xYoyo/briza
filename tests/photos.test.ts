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
   * its length is a layout invariant, not a free-form list: four frames fill
   * 2x3 on phones and 3x2 at =900px, the first two spanning two rows.
   */
  it("exports exactly four mosaic photos, tall frames first", () => {
    expect(PHOTOS.length).toBe(4);
    const names = PHOTOS.map((p) => p.src.src.split("/").pop() ?? "");
    expect(names.map((n) => n.slice(0, 2))).toEqual(["09", "05", "08", "11"]);
  });

  /*
   * [photo-used-once] a reader who has already seen a photograph reads a
   * second appearance as the page running out of material, so every file is
   * cast into exactly one role: no photograph appears twice on the page, in
   * any crop.
   */
  it("uses every photograph exactly once [photo-used-once]", () => {
    const used = [
      HERO_PHOTO,
      OFFER_PHOTO,
      STORY_PHOTO,
      VISIT_PHOTO,
      ...STEP_PHOTOS,
      ...PHOTOS,
    ].map((p) => p.src.src);
    expect(new Set(used).size).toBe(used.length);
    // every launch file is cast: seven roles plus the four mosaic frames
    expect(used.length).toBe(11);
  });

  it("gives every section panel and step its own crop", () => {
    const panels = [HERO_PHOTO, OFFER_PHOTO, STORY_PHOTO, VISIT_PHOTO];
    expect(STEP_PHOTOS.length).toBe(3);
    // every photograph names the crop its cell needs, the mosaic included
    for (const p of [...panels, ...STEP_PHOTOS, ...PHOTOS]) {
      expect(p.position, p.alt).toMatch(/^\d+% \d+%$/);
    }
  });

  it("casts the Offer panel to a full-bleed interior frame", () => {
    // a flat product shot cannot carry a full-bleed panel (DESIGN §2.8)
    expect(OFFER_PHOTO.src.src).toContain("06-rack-black-white-plaid-tops");
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
