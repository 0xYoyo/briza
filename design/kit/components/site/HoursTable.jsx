import React from "react";

export const brizaHours = [
  { day: "ראשון–חמישי", hours: "9:30–19:00" },
  { day: "שישי", hours: "9:30–14:00" },
  { day: "שבת", hours: "סגור", closed: true },
];

/** Opening hours, one row per day group. Today's row is emphasised. */
export function HoursTable({ rows = brizaHours, todayIndex, tone = "light", style, ...rest }) {
  const dark = tone === "dark";
  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        rowGap: 0,
        columnGap: "var(--space-5)",
        margin: 0,
        fontSize: "var(--text-body-lg)",
        ...style,
      }}
      {...rest}
    >
      {rows.map((r, i) => {
        const today = i === todayIndex;
        const border = `1px solid ${dark ? "var(--border-on-inverse)" : "var(--border-hairline)"}`;
        const cell = {
          padding: "var(--space-4) 0",
          borderBottom: i === rows.length - 1 ? "none" : border,
          color: r.closed
            ? dark
              ? "var(--ice-400)"
              : "var(--text-subtle)"
            : dark
              ? "var(--text-on-inverse)"
              : "var(--text-body)",
          fontWeight: today ? "var(--weight-bold)" : "var(--weight-regular)",
          margin: 0,
        };
        return (
          <React.Fragment key={r.day}>
            <dt style={cell}>
              {r.day}
              {today ? (
                <span
                  style={{
                    marginInlineStart: "var(--space-3)",
                    fontSize: "var(--text-label)",
                    fontWeight: "var(--weight-semibold)",
                    color: dark ? "var(--ice-400)" : "var(--blue-700)",
                  }}
                >
                  היום
                </span>
              ) : null}
            </dt>
            <dd style={{ ...cell, fontVariantNumeric: "tabular-nums", textAlign: "end" }}>{r.hours}</dd>
          </React.Fragment>
        );
      })}
    </dl>
  );
}
