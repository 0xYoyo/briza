import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(
  new URL("../src/styles/global.css", import.meta.url),
  "utf8",
);

function tokenValue(name: string): string {
  const m = css.match(new RegExp(`${name}:\\s*([^;]+);`));
  expect(m, `${name} is defined`).not.toBeNull();
  return (m?.[1] ?? "").replace(/\s+/g, " ").trim();
}

// DESIGN.md §2.2–§2.6 — exact names and values (AC-1)
const EXPECTED: Record<string, string> = {
  "--surface-page": "var(--cream-50)",
  "--cream-50": "#fdfaf5",
  "--action-primary": "var(--whatsapp-500)",
  "--whatsapp-500": "#25d366",
  "--focus-ring": "var(--ice-500)",
  "--ice-500": "#4e93c2",
  "--text-body-size": "19px",
  "--text-label": "19px",
  "--section-y": "64px",
  "--section-y-lg": "96px",
  "--content-max": "1100px",
  "--measure-wide": "52ch",
  "--measure-prose": "34ch",
  "--gutter": "20px",
  "--gutter-wide": "40px",
  "--tap-min": "56px",
  "--tap-lg": "64px",
  "--radius-pill": "999px",
  "--radius-md": "12px",
  "--radius-lg": "20px",
  "--press-scale": "0.985",
  "--space-1": "4px",
  "--space-2": "8px",
  "--space-3": "12px",
  "--space-4": "16px",
  "--space-5": "20px",
  "--space-6": "24px",
  "--space-8": "32px",
  "--space-10": "40px",
  "--space-12": "48px",
  "--space-16": "64px",
  "--space-20": "80px",
  "--space-24": "96px",
  "--text-hero": "clamp(40px, 11vw, 72px)",
  "--text-h1": "clamp(32px, 7.5vw, 48px)",
  "--text-h2": "clamp(26px, 6vw, 34px)",
  "--text-h3": "22px",
  "--text-lead": "clamp(20px, 4.8vw, 24px)",
  "--text-body-lg": "21px",
};

describe("design tokens", () => {
  it.each(Object.entries(EXPECTED))("%s is %s", (name, value) => {
    expect(tokenValue(name)).toBe(value);
  });

  it("defines the glow and scrim", () => {
    expect(tokenValue("--glow-sign")).toContain("rgba(175, 213, 236, 0.75)");
    expect(tokenValue("--scrim-bottom")).toContain("to top");
  });

  it("self-hosted family tokens carry the Arial Hebrew / system-ui fallback", () => {
    expect(tokenValue("--font-display")).toBe(
      '"Secular One", "Arial Hebrew", system-ui',
    );
    expect(tokenValue("--font-body")).toBe(
      '"Assistant", "Arial Hebrew", system-ui',
    );
    expect(tokenValue("--font-quote")).toBe(
      '"Frank Ruhl Libre", "Arial Hebrew", system-ui',
    );
  });

  it("zeroes motion under prefers-reduced-motion [reduced-motion]", () => {
    const block =
      css.match(
        /@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n\}/,
      )?.[1] ?? "";
    expect(block).toContain("--dur-fast: 0ms");
    expect(block).toContain("--dur-base: 0ms");
    expect(block).toContain("--dur-slow: 0ms");
    expect(block).toContain("--press-scale: 1;");
  });
});
