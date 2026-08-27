import {
  ADDRESS,
  FACEBOOK_URL,
  GEO,
  HOURS,
  type Hours,
  INSTAGRAM_URL,
  LANDLINE_NUMBER,
  SITE_URL,
  STORE_NAME,
  TIKTOK_URL,
  WHATSAPP_NUMBER,
} from "./constants";

/** Document title and the address line as rendered on the page (PRD §3.6). */
export const PAGE_TITLE = `${STORE_NAME} — בגדי נשים, גן העיר תל אביב`;
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.locality}`;

/** schema.org day names, Sunday first — indexed by `Weekday`. */
const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type OpeningHoursSpecification = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

/**
 * `OpeningHoursSpecification` entries derived from HOURS: consecutive days
 * with identical hours share one entry; closed days are omitted.
 */
export function openingHoursSpecification(
  hours: Hours,
): OpeningHoursSpecification[] {
  const entries: OpeningHoursSpecification[] = [];
  let current: OpeningHoursSpecification | null = null;
  hours.days.forEach((interval, day) => {
    if (interval === null) {
      current = null;
      return;
    }
    if (
      current &&
      current.opens === interval.open &&
      current.closes === interval.close
    ) {
      current.dayOfWeek.push(SCHEMA_DAYS[day]);
      return;
    }
    current = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [SCHEMA_DAYS[day]],
      opens: interval.open,
      closes: interval.close,
    };
    entries.push(current);
  });
  return entries;
}

export type ClothingStoreJsonLd = {
  "@context": "https://schema.org";
  "@type": "ClothingStore";
  name: string;
  url: string;
  image: string;
  telephone: string[];
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  geo: { "@type": "GeoCoordinates"; latitude: number; longitude: number };
  openingHoursSpecification: OpeningHoursSpecification[];
  priceRange: string;
  sameAs?: string[];
};

/**
 * The `ClothingStore` structured data (PRD §3.6). `image` is the absolute
 * URL of the optimised hero, known only at build time.
 */
export function clothingStoreJsonLd(image: string): ClothingStoreJsonLd {
  const sameAs = [TIKTOK_URL, INSTAGRAM_URL, FACEBOOK_URL].filter(
    (u) => u !== "",
  );
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: STORE_NAME,
    url: SITE_URL,
    image,
    telephone: [`+${WHATSAPP_NUMBER}`, `+${LANDLINE_NUMBER}`],
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressCountry: ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification: openingHoursSpecification(HOURS),
    priceRange: "₪79–₪400",
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Serialise for a `<script type="application/ld+json">` — `<` escaped so the block can never close itself. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
