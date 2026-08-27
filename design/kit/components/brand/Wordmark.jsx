import React from "react";

const sizes = { sm: 28, md: 44, lg: 72, hero: "clamp(56px,15vw,116px)" };

/**
 * The store name set in the display face with the sign's ice-blue glow.
 * Briza has no separate logo — this typographic treatment is the mark.
 */
export function Wordmark({ size = "md", glow = true, tone = "light", as = "span", style, ...rest }) {
  const Tag = as;
  const fontSize = typeof sizes[size] === "number" ? `${sizes[size]}px` : sizes[size] || sizes.md;
  const onDark = tone === "light";
  return (
    <Tag
      style={{
        fontFamily: "var(--font-display)",
        fontSize,
        lineHeight: 1,
        letterSpacing: "var(--track-sign)",
        color: onDark ? "var(--ice-100)" : "var(--navy-900)",
        textShadow: glow && onDark ? "var(--glow-sign)" : "none",
        display: "inline-block",
        ...style,
      }}
      {...rest}
    >
      בריזה
    </Tag>
  );
}
