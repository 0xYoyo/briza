import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Photos from "../src/components/Photos.astro";
import { PHOTOS } from "../src/photos";

describe("Photos component", () => {
  it("renders nothing for an empty list [empty-collapses]", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Photos, {
      props: { photos: [] },
    });
    expect(html.trim()).toBe("");
  });

  it("renders the heading and one <img> per photo for PHOTOS", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Photos, {
      props: { photos: PHOTOS },
    });
    expect(html).toContain("מהמדפים שלנו");
    expect(html.match(/<img/g)?.length).toBe(7);
    expect(html).toContain('loading="lazy"');
    expect(html).not.toContain("<a ");
    // every mosaic cell is placed by index, so each one must carry its class
    for (let i = 1; i <= 7; i++) {
      expect(html).toContain(`mosaic__cell--${i}`);
    }
  });
});
