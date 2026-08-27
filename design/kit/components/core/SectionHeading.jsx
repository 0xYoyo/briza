import React from "react";

/** Section opener: optional small eyebrow above a display-font heading. */
export function SectionHeading({ eyebrow, title, lead, align = "start", tone = "light", style, ...rest }) {
  const dark = tone === "dark";
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align === "center" ? "center" : "start",
        ...style,
      }}
      {...rest}
    >
      {eyebrow ? (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "var(--text-label)",
            fontWeight: "var(--weight-bold)",
            letterSpacing: "var(--track-label)",
            color: dark ? "var(--ice-400)" : "var(--blue-700)",
          }}
        >
          <span
            aria-hidden="true"
            style={{ width: 28, height: 2, flex: "0 0 auto", background: dark ? "var(--ice-400)" : "var(--blue-700)" }}
          />
          {eyebrow}
        </span>
      ) : null}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h2)",
          fontWeight: "var(--weight-regular)",
          lineHeight: "var(--leading-tight)",
          letterSpacing: "var(--track-display)",
          color: dark ? "var(--text-on-inverse)" : "var(--text-body)",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          style={{
            fontSize: "var(--text-lead)",
            lineHeight: "var(--leading-body)",
            color: dark ? "var(--text-on-inverse-muted)" : "var(--text-muted)",
            maxWidth: "var(--measure-wide)",
          }}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
