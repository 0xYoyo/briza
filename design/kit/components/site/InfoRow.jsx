import React from "react";
import { Icon } from "../core/Icon.jsx";

/** Icon + label + value row for address, phone, hours. Optionally a link. */
export function InfoRow({ icon, label, value, href, tone = "light", style, ...rest }) {
  const dark = tone === "dark";
  const [hover, setHover] = React.useState(false);
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-4)",
        minHeight: "var(--tap-min)",
        padding: "var(--space-3) 0",
        textDecoration: "none",
        color: "inherit",
        ...style,
      }}
      {...rest}
    >
      <span
        aria-hidden="true"
        style={{
          display: "grid",
          placeItems: "center",
          width: 44,
          height: 44,
          flex: "0 0 auto",
          borderRadius: "var(--radius-pill)",
          background: dark ? "rgba(240,247,252,.1)" : "var(--ice-200)",
        }}
      >
        <Icon name={icon} size={24} color={dark ? "var(--ice-300)" : "var(--blue-700)"} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span
          style={{
            fontSize: "var(--text-label)",
            fontWeight: "var(--weight-semibold)",
            color: dark ? "var(--ice-400)" : "var(--text-subtle)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: "var(--text-body-lg)",
            fontWeight: "var(--weight-semibold)",
            lineHeight: "var(--leading-snug)",
            color: dark ? "var(--text-on-inverse)" : "var(--text-body)",
            textDecoration: href && hover ? "underline" : "none",
            textUnderlineOffset: "3px",
          }}
        >
          {value}
        </span>
      </span>
    </Tag>
  );
}
