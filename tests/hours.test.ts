import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { HOURS, type Hours } from "../src/constants";
import {
  formatStatusLine,
  formatTime,
  getStatus,
  hoursRows,
  localNow,
} from "../src/hours";

const TZ = "Asia/Jerusalem";
const OPEN = "פתוח עכשיו · אירית עונה בוואטסאפ";

/**
 * Fixed UTC instants. Israel is UTC+3 in July (IDT) and UTC+2 in January (IST).
 * 2026-07-14 and 2026-01-13 are Tuesdays.
 */
const JULY = {
  tueNoon: new Date("2026-07-14T09:00:00Z"), // Tue 12:00 IDT
  tue0800: new Date("2026-07-14T05:00:00Z"), // Tue 08:00 IDT
  tue0930: new Date("2026-07-14T06:30:00Z"), // Tue 09:30:00 IDT
  tue1859: new Date("2026-07-14T15:59:59Z"), // Tue 18:59:59 IDT
  thu1900: new Date("2026-07-16T16:00:00Z"), // Thu 19:00:00 IDT
  fri1500: new Date("2026-07-17T12:00:00Z"), // Fri 15:00 IDT
  fri1359: new Date("2026-07-17T10:59:00Z"), // Fri 13:59 IDT
  sat1200: new Date("2026-07-18T09:00:00Z"), // Sat 12:00 IDT
};
const JANUARY = {
  tueNoon: new Date("2026-01-13T10:00:00Z"), // Tue 12:00 IST
  tue0800: new Date("2026-01-13T06:00:00Z"), // Tue 08:00 IST
  sat1200: new Date("2026-01-17T10:00:00Z"), // Sat 12:00 IST
};

function line(date: Date): string {
  return formatStatusLine(getStatus(date, HOURS));
}

function matrix() {
  it("Tuesday 12:00 → open", () => {
    expect(getStatus(JULY.tueNoon, HOURS)).toEqual({ open: true });
    expect(line(JULY.tueNoon)).toBe(OPEN);
  });

  it("Tuesday 08:00 → opens today at 9:30", () => {
    expect(line(JULY.tue0800)).toBe("סגור עכשיו · נפתח היום ב־9:30");
  });

  it("Tuesday 09:30:00 → open (interval is closed at the start)", () => {
    expect(getStatus(JULY.tue0930, HOURS).open).toBe(true);
    expect(getStatus(JULY.tue1859, HOURS).open).toBe(true);
  });

  it("Thursday 19:00:00 → closed (interval is open at the end), opens tomorrow", () => {
    const status = getStatus(JULY.thu1900, HOURS);
    expect(status.open).toBe(false);
    expect(line(JULY.thu1900)).toBe("סגור עכשיו · נפתח מחר ב־9:30");
  });

  it("Friday 15:00 → opens Sunday (Friday-afternoon wrap)", () => {
    expect(getStatus(JULY.fri1359, HOURS).open).toBe(true);
    expect(line(JULY.fri1500)).toBe("סגור עכשיו · נפתח ביום ראשון ב־9:30");
    const status = getStatus(JULY.fri1500, HOURS);
    expect(status.open === false && status.next).toEqual({
      weekday: 0,
      time: "09:30",
      relation: "weekday",
    });
  });

  it("Saturday 12:00 → opens Sunday (Saturday→Sunday wrap)", () => {
    expect(line(JULY.sat1200)).toBe("סגור עכשיו · נפתח ביום ראשון ב־9:30");
  });

  it("January (UTC+2) and July (UTC+3) classify the same local wall time identically", () => {
    expect(localNow(JANUARY.tueNoon, TZ)).toEqual(localNow(JULY.tueNoon, TZ));
    expect(localNow(JANUARY.tue0800, TZ)).toEqual(localNow(JULY.tue0800, TZ));
    expect(line(JANUARY.tueNoon)).toBe(line(JULY.tueNoon));
    expect(line(JANUARY.tue0800)).toBe(line(JULY.tue0800));
    expect(line(JANUARY.sat1200)).toBe(line(JULY.sat1200));
  });
}

describe("hours (process TZ untouched)", () => {
  it("localNow reports Israel wall time from a UTC instant", () => {
    expect(localNow(JULY.tueNoon, TZ)).toEqual({
      weekday: 2,
      minutes: 12 * 60,
    });
    expect(localNow(JANUARY.tueNoon, TZ)).toEqual({
      weekday: 2,
      minutes: 12 * 60,
    });
  });
  matrix();
});

describe("hours with process TZ = America/New_York", () => {
  const original = process.env.TZ;
  beforeAll(() => {
    process.env.TZ = "America/New_York";
  });
  afterAll(() => {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  });

  it("the machine zone really changed", () => {
    expect(JULY.tueNoon.getTimezoneOffset()).toBe(240);
  });
  matrix();
});

describe("formatting", () => {
  it("prints times without a leading zero", () => {
    expect(formatTime("09:30")).toBe("9:30");
    expect(formatTime("19:00")).toBe("19:00");
  });

  it("formats every relation", () => {
    expect(
      formatStatusLine({
        open: false,
        next: { weekday: 3, time: "09:30", relation: "today" },
      }),
    ).toBe("סגור עכשיו · נפתח היום ב־9:30");
    expect(
      formatStatusLine({
        open: false,
        next: { weekday: 3, time: "09:30", relation: "tomorrow" },
      }),
    ).toBe("סגור עכשיו · נפתח מחר ב־9:30");
    expect(
      formatStatusLine({
        open: false,
        next: { weekday: 5, time: "09:30", relation: "weekday" },
      }),
    ).toBe("סגור עכשיו · נפתח ביום שישי ב־9:30");
  });

  it("hoursRows merges consecutive identical days", () => {
    expect(hoursRows(HOURS)).toEqual([
      { days: "ראשון–חמישי", time: "9:30–19:00" },
      { days: "שישי", time: "9:30–14:00" },
      { days: "שבת", time: "סגור" },
    ]);
  });

  it("hoursRows keeps single days and closed runs apart", () => {
    const mixed: Hours = {
      timeZone: "Asia/Jerusalem",
      days: [
        { open: "10:00", close: "18:00" },
        null,
        null,
        { open: "10:00", close: "18:00" },
        { open: "10:00", close: "18:00" },
        { open: "09:00", close: "13:00" },
        null,
      ],
    };
    expect(hoursRows(mixed)).toEqual([
      { days: "ראשון", time: "10:00–18:00" },
      { days: "שני–שלישי", time: "סגור" },
      { days: "רביעי–חמישי", time: "10:00–18:00" },
      { days: "שישי", time: "9:00–13:00" },
      { days: "שבת", time: "סגור" },
    ]);
  });
});
