export const STORE_NAME = "בריזה";

/** Canonical production origin (PRD §7). No trailing slash. */
export const SITE_URL = "https://briza-tlv.com";

/** Owner's WhatsApp / mobile number in E.164 digits (for `wa.me` and `tel:` links). */
export const WHATSAPP_NUMBER = "972524381666";
/** Same number, as displayed on the page. */
export const PHONE_DISPLAY = "052-4381666";
/** Store landline in E.164 digits — JSON-LD only, never rendered (PRD §3.4). */
export const LANDLINE_NUMBER = "97235279187";

/** Gan Ha'Ir mall, Ibn Gabirol 71 — building-level accuracy, chosen 2026-08-27. */
export const GEO = { latitude: 32.0866, longitude: 34.7815 } as const;

/** Postal address (PRD §3.4); the page renders `street, locality`. */
export const ADDRESS = {
  street: "אבן גבירול 71, קניון גן העיר",
  locality: "תל אביב",
  country: "IL",
} as const;

export const META_DESCRIPTION =
  "בריזה — חנות בגדי נשים בקניון גן העיר, תל אביב. בגדים מיובאים, נבחרים ביד, במידות 38–54, ממחיר ₪79. הצטרפו לקבוצת העדכונים בוואטסאפ ל־10% הנחה על הקנייה הראשונה.";

/**
 * WhatsApp group invite link. Empty until the group exists — while empty the
 * join button falls back to a chat with the owner (PRD §3.2).
 */
export const GROUP_INVITE_URL = "";

export const GBP_WRITE_REVIEW_URL = "https://g.page/r/CdIzewCEJR_XEBM/review";
export const MAPS_URL = "https://share.google/z2mgH77LVrraBBrqF";
export const GBP_REVIEWS_URL = MAPS_URL;

/** Socials — each rendered only when non-empty (PRD §3.2). */
export const TIKTOK_URL = "https://www.tiktok.com/@irit027";
export const INSTAGRAM_URL = "";
export const FACEBOOK_URL = "";

/** Day of week as returned by `Date.prototype.getDay()` / `Intl` (0 = Sunday). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Opening interval for one day, "HH:MM" 24h local time; `null` = closed all day. */
export type DayHours = { readonly open: string; readonly close: string } | null;

export type Hours = {
  readonly timeZone: "Asia/Jerusalem";
  /** Indexed by `Weekday`, Sunday first. */
  readonly days: readonly [
    DayHours,
    DayHours,
    DayHours,
    DayHours,
    DayHours,
    DayHours,
    DayHours,
  ];
};

const WEEKDAY: DayHours = { open: "09:30", close: "19:00" };
const FRIDAY: DayHours = { open: "09:30", close: "14:00" };

/**
 * Store hours (PRD §3.4): Sun–Thu 09:30–19:00, Fri 09:30–14:00, Sat closed.
 * Single source for the hours table, JSON-LD and the computed open/closed line.
 */
export const HOURS: Hours = {
  timeZone: "Asia/Jerusalem",
  days: [WEEKDAY, WEEKDAY, WEEKDAY, WEEKDAY, WEEKDAY, FRIDAY, null],
};
