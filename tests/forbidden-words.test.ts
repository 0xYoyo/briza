import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = new URL("../src/", import.meta.url).pathname;

/**
 * [caption-static] / PRD §3.4 — words that imply recency or schedule, or the
 * tailoring vocabulary the store never uses. Matched as whole Hebrew words:
 * the founder-approved copy "סחורה חדשה" (new merchandise) is not "חדש" as
 * a caption, so a neighbouring Hebrew letter on either side is not a hit.
 */
const FORBIDDEN = ["חדש", "השבוע", "שבועי", "התאמה", "תיקונים"];
const HEBREW = "א-ת";
const PATTERN = new RegExp(
  `(?<![${HEBREW}])(?:${FORBIDDEN.join("|")})(?![${HEBREW}])`,
  "g",
);

function sourceFiles(): string[] {
  return readdirSync(SRC, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile() && /\.(astro|ts)$/.test(e.name))
    .map((e) => join(e.parentPath, e.name));
}

describe("forbidden words", () => {
  it("scans the components and page", () => {
    const files = sourceFiles();
    expect(files.some((f) => f.endsWith("Offer.astro"))).toBe(true);
    expect(files.some((f) => f.endsWith("photos.ts"))).toBe(true);
  });

  it("the pattern matches the words but not the approved copy", () => {
    expect("סחורה חדשה".match(PATTERN)).toBeNull();
    expect("הגיע חדש".match(PATTERN)).not.toBeNull();
    expect("השבוע בחנות".match(PATTERN)).not.toBeNull();
    expect("עדכון שבועי".match(PATTERN)).not.toBeNull();
    expect("התאמה אישית".match(PATTERN)).not.toBeNull();
    expect("תיקונים".match(PATTERN)).not.toBeNull();
  });

  it("none of the words appears anywhere in src/", () => {
    const hits = sourceFiles().flatMap((file) =>
      Array.from(readFileSync(file, "utf8").matchAll(PATTERN)).map(
        (m) => `${file}: ${m[0]}`,
      ),
    );
    expect(hits).toEqual([]);
  });
});
