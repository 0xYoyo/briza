import React from "react";

/** Icons live next to the design system, so derive the path from the bundle. */
function resolveBase() {
  if (typeof window === "undefined") return "assets/icons";
  if (window.BRIZA_ICON_BASE) return window.BRIZA_ICON_BASE;
  const tag = document.querySelector('script[src$="_ds_bundle.js"]');
  if (tag) {
    const url = new URL(tag.getAttribute("src"), document.baseURI);
    url.pathname = url.pathname.replace(/_ds_bundle\.js$/, "assets/icons");
    return url.href;
  }
  return "assets/icons";
}

/** Monochrome icon rendered as a CSS mask so it inherits any brand color. */
export function Icon({ name, size = 24, color = "currentColor", base, style, ...rest }) {
  const url = `${base || resolveBase()}/${name}.svg`;
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        flex: "0 0 auto",
        backgroundColor: color,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
      {...rest}
    />
  );
}
