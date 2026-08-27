/** Launch photography (PRD §2.1: photos are content, not inventory). Served from /public/photos. */
export type Photo = {
  readonly src: string;
  /** Descriptive Hebrew alt text — describes only what is visible, no claims. */
  readonly alt: string;
};

export const PHOTOS: readonly Photo[] = [
  {
    src: "/photos/01-storefront-sign.jpg",
    alt: "חזית החנות עם שלט בריזה מואר, דלתות זכוכית ובובות תצוגה בחולצות צבעוניות ומכנסיים",
  },
  {
    src: "/photos/02-window-display-mannequins.jpg",
    alt: "חלון הראווה של החנות מהמעבר בקניון, שורת בובות תצוגה בחולצות מודפסות ומכנסיים",
  },
  {
    src: "/photos/03-interior-rack-black-tee.jpg",
    alt: "מתלה ברזל בתוך החנות עם חולצות שחורות, ומאחוריו מוטות תלייה עמוסים בבגדים",
  },
  {
    src: "/photos/04-poppy-print-knit-top.jpg",
    alt: "חולצת סריג לבנה עם הדפס פרגים אדומים ודמות אישה, תלויה על קולב עץ",
  },
  {
    src: "/photos/05-hand-black-tee-figures-print.jpg",
    alt: "יד מחזיקה קולב אדום עם חולצה שחורה ועליה הדפס של שלוש דמויות נשים בכובעים",
  },
  {
    src: "/photos/06-rack-black-white-plaid-tops.jpg",
    alt: "מוט תלייה מתחת למדף עץ עם חולצות שחורות בפסי לבן, חולצות משבצות אדומות וחולצות צבעוניות",
  },
  {
    src: "/photos/07-bag-folded-tees-counter.jpg",
    alt: "שקית נייר צהובה של גן העיר על דלפק זכוכית ולידה חולצות מקופלות בהדפס כחול-צהוב",
  },
  {
    src: "/photos/08-pink-bag-green-cat-tee.jpg",
    alt: "שקית נייר ורודה עם הכיתוב בריזה גן העיר, חולצה ירוקה עם הדפס חתול פרחוני וחולצת משבצות אדומה מקופלת",
  },
  {
    src: "/photos/09-pink-bag-hanging-black-top.jpg",
    alt: "שקית נייר ורודה של בריזה תלויה על מתלה ברזל מול חולצה שחורה, מעליה מדף עץ עם עציץ וחולצות משבצות מקופלות",
  },
  {
    src: "/photos/10-hand-green-cat-tee.jpg",
    alt: "יד מחזיקה קולב עם חולצת טי ירוקה ועליה הדפס חתול פרחוני, על רקע מוט תלייה עמוס בבגדים",
  },
  {
    src: "/photos/11-bag-folded-tees-flower-print.jpg",
    alt: "שלוש חולצות מקופלות בירוק, צהוב ותכלת עם הדפס פרחוני, לצד שקית נייר אדומה של גן העיר",
  },
];
