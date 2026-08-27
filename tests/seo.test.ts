import { describe, expect, it } from "vitest";
import {
  ADDRESS,
  FACEBOOK_URL,
  GEO,
  HOURS,
  type Hours,
  INSTAGRAM_URL,
  META_DESCRIPTION,
  SITE_URL,
  TIKTOK_URL,
} from "../src/constants";
import {
  ADDRESS_LINE,
  clothingStoreJsonLd,
  jsonLdString,
  openingHoursSpecification,
  PAGE_TITLE,
} from "../src/seo";

describe("openingHoursSpecification", () => {
  it("merges Sun–Thu, keeps Friday, omits Saturday", () => {
    expect(openingHoursSpecification(HOURS)).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:30",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "09:30",
        closes: "14:00",
      },
    ]);
  });

  it("starts a new entry after a closed day even when hours repeat", () => {
    const hours: Hours = {
      timeZone: "Asia/Jerusalem",
      days: [
        { open: "10:00", close: "18:00" },
        null,
        { open: "10:00", close: "18:00" },
        { open: "10:00", close: "18:00" },
        null,
        null,
        null,
      ],
    };
    expect(openingHoursSpecification(hours).map((e) => e.dayOfWeek)).toEqual([
      ["Sunday"],
      ["Tuesday", "Wednesday"],
    ]);
  });
});

describe("clothingStoreJsonLd", () => {
  const image = `${SITE_URL}/_astro/hero.webp`;
  const data = clothingStoreJsonLd(image);

  it("is a ClothingStore with both phones, address, geo and hours", () => {
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("ClothingStore");
    expect(data.name).toBe("בריזה");
    expect(data.url).toBe(SITE_URL);
    expect(data.image).toBe(image);
    expect(data.telephone).toEqual(["+972524381666", "+97235279187"]);
    expect(data.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressCountry: "IL",
    });
    expect(data.geo).toEqual({
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    });
    expect(data.geo.latitude).toBe(32.0866);
    expect(data.openingHoursSpecification).toEqual(
      openingHoursSpecification(HOURS),
    );
    expect(data.priceRange).toBe("₪79–₪400");
  });

  it("sameAs reflects the non-empty social constants", () => {
    const expected = [TIKTOK_URL, INSTAGRAM_URL, FACEBOOK_URL].filter(
      (u) => u !== "",
    );
    expect(expected).toEqual([TIKTOK_URL]);
    expect(data.sameAs).toEqual(expected);
  });

  it("serialises without a closing-tag hazard", () => {
    const text = jsonLdString({ a: "</script>" });
    expect(text).not.toContain("</script>");
    expect(JSON.parse(text)).toEqual({ a: "</script>" });
  });
});

describe("page strings [hebrew-only]", () => {
  it("title, description and address line are the PRD strings", () => {
    expect(PAGE_TITLE).toBe("בריזה — בגדי נשים, גן העיר תל אביב");
    expect(ADDRESS_LINE).toBe("אבן גבירול 71, קניון גן העיר, תל אביב");
    expect(META_DESCRIPTION.startsWith("בריזה — חנות בגדי נשים")).toBe(true);
    for (const s of [PAGE_TITLE, ADDRESS_LINE, META_DESCRIPTION]) {
      expect(/[A-Za-z]/.test(s)).toBe(false);
    }
  });
});
