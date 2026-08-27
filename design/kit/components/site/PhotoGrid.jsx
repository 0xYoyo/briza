import React from "react";

/**
 * Photo grid for the gallery section. Fed by a plain array so photos can be
 * swapped without touching layout (PRD §3.5).
 */
export function PhotoGrid({ photos = [], columns = 2, ratio = "3 / 4", gap = "var(--space-3)", onSelect, className, style, ...rest }) {
  return (
    <ul
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`,
        gap,
        listStyle: "none",
        margin: 0,
        padding: 0,
        ...style,
      }}
      {...rest}
    >
      {photos.map((p, i) => (
        <li key={p.src + i} style={{ margin: 0 }}>
          <button
            type="button"
            onClick={onSelect ? () => onSelect(i) : undefined}
            style={{
              display: "block",
              width: "100%",
              padding: 0,
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              background: "var(--surface-raised)",
              cursor: onSelect ? "zoom-in" : "default",
            }}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              style={{ width: "100%", aspectRatio: ratio, objectFit: "cover", display: "block" }}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
