import React from "react";

const tones = {
  sand: { background: "var(--surface-sand)", color: "var(--stone-900)", border: "1px solid var(--sand-300)" },
  navy: { background: "var(--navy-900)", color: "var(--ice-100)", border: "1px solid var(--navy-900)" },
  ice: { background: "var(--ice-200)", color: "var(--blue-700)", border: "1px solid var(--ice-300)" },
  coral: { background: "var(--coral-600)", color: "var(--white)", border: "1px solid var(--coral-600)" },
  outline: { background: "transparent", color: "var(--stone-700)", border: "1px solid var(--border-hairline)" },
};

/** Small factual label: size ranges, price-from, "מבחר חדש". Never a link. */
export function Badge({ children, tone = "sand", icon, style, ...rest }) {
  const t = tones[tone] || tones.sand;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        borderRadius: "var(--radius-pill)",
        fontSize: "var(--text-label)",
        fontWeight: "var(--weight-semibold)",
        lineHeight: 1.2,
        ...t,
        ...style,
      }}
      {...rest}
    >
      {icon ? <IconGlyph name={icon} /> : null}
      {children}
    </span>
  );
}

function IconGlyph({ name }) {
  const base =
    (typeof window !== "undefined" && window.BRIZA_ICON_BASE) ||
    (() => {
      const tag = typeof document !== "undefined" && document.querySelector('script[src$="_ds_bundle.js"]');
      if (!tag) return "assets/icons";
      const url = new URL(tag.getAttribute("src"), document.baseURI);
      url.pathname = url.pathname.replace(/_ds_bundle\.js$/, "assets/icons");
      return url.href;
    })();
  const url = `${base}/${name}.svg`;
  return (
    <span
      aria-hidden="true"
      style={{
        width: 20,
        height: 20,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
