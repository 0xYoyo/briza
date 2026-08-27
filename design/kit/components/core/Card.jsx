import React from "react";

/** Warm white card on cream: hairline border, soft warm shadow, 20px radius. */
export function Card({ children, tone = "light", interactive = false, padding = "var(--space-6)", style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const light = tone === "light";
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: light ? "var(--surface-card)" : "var(--surface-inverse-2)",
        color: light ? "var(--text-body)" : "var(--text-on-inverse)",
        border: light ? "1px solid var(--border-hairline)" : "1px solid var(--border-on-inverse)",
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: light ? (hover ? "var(--shadow-card-hover)" : "var(--shadow-card)") : "none",
        transform: hover ? "translateY(-2px)" : "none",
        transition: "var(--transition-interactive)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
