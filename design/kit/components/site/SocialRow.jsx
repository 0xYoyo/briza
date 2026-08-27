import React from "react";
import { Icon } from "../core/Icon.jsx";

const labels = { instagram: "אינסטגרם", facebook: "פייסבוק", tiktok: "טיקטוק", whatsapp: "וואטסאפ" };

/** Social links. Items without an href are hidden (PRD §3.7). */
export function SocialRow({ links = [], tone = "dark", size = 28, style, ...rest }) {
  const dark = tone === "dark";
  const visible = links.filter((l) => l.href);
  return (
    <ul style={{ display: "flex", gap: "var(--space-3)", listStyle: "none", margin: 0, padding: 0, ...style }} {...rest}>
      {visible.map((l) => (
        <li key={l.network}>
          <a
            href={l.href}
            aria-label={l.label || labels[l.network] || l.network}
            style={{
              display: "grid",
              placeItems: "center",
              width: "var(--tap-min)",
              height: "var(--tap-min)",
              borderRadius: "var(--radius-pill)",
              border: `1px solid ${dark ? "var(--border-on-inverse)" : "var(--border-hairline)"}`,
              background: dark ? "rgba(240,247,252,.06)" : "var(--surface-card)",
              textDecoration: "none",
            }}
          >
            <Icon name={l.network} size={size} color={dark ? "var(--ice-100)" : "var(--navy-900)"} />
          </a>
        </li>
      ))}
    </ul>
  );
}
