import type { ImageMetadata } from "astro";
import p01 from "./assets/photos/01-storefront-sign.jpg";
import p02 from "./assets/photos/02-window-display-mannequins.jpg";
import p03 from "./assets/photos/03-interior-rack-black-tee.jpg";
import p04 from "./assets/photos/04-poppy-print-knit-top.jpg";
import p05 from "./assets/photos/05-hand-black-tee-figures-print.jpg";
import p06 from "./assets/photos/06-rack-black-white-plaid-tops.jpg";
import p07 from "./assets/photos/07-bag-folded-tees-counter.jpg";
import p08 from "./assets/photos/08-pink-bag-green-cat-tee.jpg";
import p09 from "./assets/photos/09-pink-bag-hanging-black-top.jpg";
import p10 from "./assets/photos/10-hand-green-cat-tee.jpg";
import p11 from "./assets/photos/11-bag-folded-tees-flower-print.jpg";

/** Launch photography (PRD §2.1: photos are content, not inventory). Processed by `astro:assets`. */
export type Photo = {
  readonly src: ImageMetadata;
  /** Descriptive Hebrew alt text — describes only what is visible, no claims. */
  readonly alt: string;
  /**
   * `object-position` for the section crop, as `"x% y%"`. Photographs are
   * never pre-cropped to the layout (DESIGN §2.8); each role names the part
   * of the frame that must survive its crop.
   */
  readonly position?: string;
};

/** The storefront; the hero only. Its lit sign is the site's wordmark (DESIGN §1). */
export const HERO_PHOTO: Photo = {
  src: p01,
  alt: "חזית החנות עם שלט בריזה מואר, דלתות זכוכית ובובות תצוגה בחולצות צבעוניות ומכנסיים",
  // the sign band sits in the top ~15% of the frame and must never be cropped away
  position: "50% 0%",
};

/** Offer panel — the hand holding the green cat tee. */
export const OFFER_PHOTO: Photo = {
  src: p10,
  alt: "יד מחזיקה קולב עם חולצת טי ירוקה ועליה הדפס חתול פרחוני, על רקע מוט תלייה עמוס בבגדים",
  position: "50% 30%",
};

/** How it works — one 4:3 crop per step, in step order. */
export const STEP_PHOTOS: readonly Photo[] = [
  {
    src: p07,
    alt: "שקית נייר צהובה של גן העיר על דלפק זכוכית ולידה חולצות מקופלות בהדפס כחול-צהוב",
    position: "50% 45%",
  },
  {
    src: p05,
    alt: "יד מחזיקה קולב אדום עם חולצה שחורה ועליה הדפס של שלוש דמויות נשים בכובעים",
    position: "50% 22%",
  },
  {
    src: p03,
    alt: "מתלה ברזל בתוך החנות עם חולצות שחורות, ומאחוריו מוטות תלייה עמוסים בבגדים",
    position: "50% 45%",
  },
];

/** Story panel — the poppy-print knit top. */
export const STORY_PHOTO: Photo = {
  src: p04,
  alt: "חולצת סריג לבנה עם הדפס פרגים אדומים ודמות אישה, תלויה על קולב עץ",
  position: "50% 45%",
};

/**
 * Visit panel — the shopfront seen from the mall corridor, so the address
 * reads next to what the visitor will actually walk past. Cropped towards
 * the store's own window (the neighbour's signage stays out of frame).
 */
export const VISIT_PHOTO: Photo = {
  src: p02,
  alt: "חלון הראווה של החנות ממסדרון הקניון, עם בובות תצוגה בחולצות צהובות, שחורות וצבעוניות",
  position: "28% 50%",
};

/**
 * The mosaic (PRD §3.1, 6–10 launch photos), filename order. Photos carrying
 * a section panel above — 04 (Story) and 07 (How it works) — are not repeated
 * here. `02-window-display-mannequins.jpg` carries the Visit panel, where the
 * mall corridor is the point; below the hero the mosaic is clothes and hands
 * only ([photos-of-clothes]).
 */
export const PHOTOS: readonly Photo[] = [
  {
    src: p03,
    alt: "מתלה ברזל בתוך החנות עם חולצות שחורות, ומאחוריו מוטות תלייה עמוסים בבגדים",
  },
  {
    src: p05,
    alt: "יד מחזיקה קולב אדום עם חולצה שחורה ועליה הדפס של שלוש דמויות נשים בכובעים",
  },
  {
    src: p06,
    alt: "מוט תלייה מתחת למדף עץ עם חולצות שחורות בפסי לבן, חולצות משבצות אדומות וחולצות צבעוניות",
  },
  {
    src: p08,
    alt: "שקית נייר ורודה עם הכיתוב בריזה גן העיר, חולצה ירוקה עם הדפס חתול פרחוני וחולצת משבצות אדומה מקופלת",
  },
  {
    src: p09,
    alt: "שקית נייר ורודה של בריזה תלויה על מתלה ברזל מול חולצה שחורה, מעליה מדף עץ עם עציץ וחולצות משבצות מקופלות",
  },
  {
    src: p10,
    alt: "יד מחזיקה קולב עם חולצת טי ירוקה ועליה הדפס חתול פרחוני, על רקע מוט תלייה עמוס בבגדים",
  },
  {
    src: p11,
    alt: "שלוש חולצות מקופלות בירוק, צהוב ותכלת עם הדפס פרחוני, לצד שקית נייר אדומה של גן העיר",
  },
];
