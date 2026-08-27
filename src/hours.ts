import type { DayHours, Hours, Weekday } from "./constants";

/**
 * Pure opening-hours logic (PRD §3.3). No DOM access: the same module feeds
 * the hours table at build time and the open/closed line in the browser.
 * All wall-clock maths happens in `hours.timeZone` via Intl, so DST is the
 * runtime's problem and the visitor's device zone never matters.
 */

export type LocalNow = { weekday: Weekday; minutes: number };

export type NextOpening = {
  weekday: Weekday;
  /** "HH:MM" as stored in HOURS. */
  time: string;
  relation: "today" | "tomorrow" | "weekday";
};

export type Status = { open: true } | { open: false; next: NextOpening };

export type HoursRow = { days: string; time: string };

/** Hebrew day names, Sunday first — indexed by `Weekday`. */
export const DAY_NAMES: readonly string[] = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שבת",
];

const WEEKDAY_INDEX: Record<string, Weekday> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const EN_DASH = "–";

/** Minutes since midnight for an "HH:MM" string. */
function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** "09:30" → "9:30" — times print without a leading zero ([rtl-numerals] handles direction). */
export function formatTime(time: string): string {
  const [h, m] = time.split(":");
  return `${Number(h)}:${m}`;
}

/** The wall clock in `timeZone` for a given instant. */
export function localNow(date: Date, timeZone: string): LocalNow {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = WEEKDAY_INDEX[get("weekday")];
  if (weekday === undefined) {
    throw new Error(`Unrecognised weekday from Intl: ${get("weekday")}`);
  }
  return {
    weekday,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/**
 * Open now, or the earliest future opening — scanning today (if not yet
 * open), tomorrow, then onward, so Friday afternoon and Saturday both land
 * on Sunday. A day's interval is half-open: open at `open`, closed at `close`.
 *
 * `relation` is "tomorrow" only when the next opening is the next calendar
 * day within the same week (Thu → Fri: "מחר"); an opening reached by
 * wrapping past Saturday is named by its day (Sat → Sun: "ביום ראשון"),
 * matching the PRD §3.3 matrix for the weekend wrap.
 */
export function getStatus(date: Date, hours: Hours): Status {
  const { weekday, minutes } = localNow(date, hours.timeZone);
  const today = hours.days[weekday];
  if (
    today &&
    minutes >= toMinutes(today.open) &&
    minutes < toMinutes(today.close)
  ) {
    return { open: true };
  }
  if (today && minutes < toMinutes(today.open)) {
    return {
      open: false,
      next: { weekday, time: today.open, relation: "today" },
    };
  }
  for (let offset = 1; offset <= 7; offset++) {
    const day = ((weekday + offset) % 7) as Weekday;
    const interval = hours.days[day];
    if (interval) {
      const wrapsWeek = weekday + offset > 6;
      return {
        open: false,
        next: {
          weekday: day,
          time: interval.open,
          relation: offset === 1 && !wrapsWeek ? "tomorrow" : "weekday",
        },
      };
    }
  }
  throw new Error("HOURS has no opening interval on any day");
}

export function formatStatusLine(status: Status): string {
  if (status.open) return "פתוח עכשיו · אירית עונה בוואטסאפ";
  const { next } = status;
  const at = `ב־${formatTime(next.time)}`;
  switch (next.relation) {
    case "today":
      return `סגור עכשיו · נפתח היום ${at}`;
    case "tomorrow":
      return `סגור עכשיו · נפתח מחר ${at}`;
    default:
      return `סגור עכשיו · נפתח ביום ${DAY_NAMES[next.weekday]} ${at}`;
  }
}

function sameInterval(a: DayHours, b: DayHours): boolean {
  if (a === null || b === null) return a === b;
  return a.open === b.open && a.close === b.close;
}

function formatInterval(interval: DayHours): string {
  if (interval === null) return "סגור";
  return `${formatTime(interval.open)}${EN_DASH}${formatTime(interval.close)}`;
}

/**
 * Rows for the hours table: consecutive days with identical hours are merged
 * into a range (`ראשון–חמישי`), so the table is always derived from HOURS.
 */
export function hoursRows(hours: Hours): HoursRow[] {
  const rows: HoursRow[] = [];
  let start = 0;
  for (let day = 1; day <= 7; day++) {
    if (day === 7 || !sameInterval(hours.days[start], hours.days[day])) {
      const end = day - 1;
      const days =
        start === end
          ? DAY_NAMES[start]
          : `${DAY_NAMES[start]}${EN_DASH}${DAY_NAMES[end]}`;
      rows.push({ days, time: formatInterval(hours.days[start]) });
      start = day;
    }
  }
  return rows;
}
