import type { ImageMetadata } from "astro";
import p01 from "./assets/photos/01-storefront-sign.jpg";
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
};

/** The storefront; hero only (DESIGN §2.8). */
export const HERO_PHOTO: Photo = {
  src: p01,
  alt: "חזית החנות עם שלט בריזה מואר, דלתות זכוכית ובובות תצוגה בחולצות צבעוניות ומכנסיים",
};

/**
 * Photos grid, filename order. `02-window-display-mannequins.jpg` is kept on
 * disk but not shown: [photos-of-clothes] below the hero every photo shows
 * clothes or hands with clothes.
 */
export const PHOTOS: readonly Photo[] = [
  {
    src: p03,
    alt: "מתלה ברזל בתוך החנות עם חולצות שחורות, ומאחוריו מוטות תלייה עמוסים בבגדים",
  },
  {
    src: p04,
    alt: "חולצת סריג לבנה עם הדפס פרגים אדומים ודמות אישה, תלויה על קולב עץ",
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
    src: p07,
    alt: "שקית נייר צהובה של גן העיר על דלפק זכוכית ולידה חולצות מקופלות בהדפס כחול-צהוב",
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
