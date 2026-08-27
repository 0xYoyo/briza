import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = new URL("../src/", import.meta.url).pathname;

// [logical-props] physical properties/values are forbidden in authored CSS.
const PHYSICAL =
  /margin-left|margin-right|padding-left|padding-right|left:|right:|text-align:\s*(left|right)|border-left|border-right/;

type Sheet = { file: string; css: string };

/** Comments may cite the invariants by name; only rules are scanned. */
function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function authoredStyles(): Sheet[] {
  const sheets: Sheet[] = [];
  for (const entry of readdirSync(SRC, {
    recursive: true,
    withFileTypes: true,
  })) {
    if (!entry.isFile()) continue;
    const file = join(entry.parentPath, entry.name);
    if (entry.name.endsWith(".css")) {
      sheets.push({ file, css: stripComments(readFileSync(file, "utf8")) });
    } else if (entry.name.endsWith(".astro")) {
      const source = readFileSync(file, "utf8");
      for (const m of source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
        sheets.push({ file, css: stripComments(m[1]) });
      }
    }
  }
  return sheets;
}

describe("authored CSS", () => {
  const sheets = authoredStyles();

  it("scans the global stylesheet and every component style block", () => {
    expect(sheets.some((s) => s.file.endsWith("styles/global.css"))).toBe(true);
    expect(sheets.some((s) => s.file.endsWith(".astro"))).toBe(true);
  });

  it("uses logical properties only [logical-props]", () => {
    const offenders = sheets
      .map((s) => ({ file: s.file, hit: s.css.match(PHYSICAL) }))
      .filter((s) => s.hit !== null)
      .map((s) => `${s.file}: ${s.hit?.[0]}`);
    expect(offenders).toEqual([]);
  });

  it("has a single fixed theme [not-dark-mode]", () => {
    for (const s of sheets) {
      expect(s.css.includes("prefers-color-scheme")).toBe(false);
    }
  });
});
