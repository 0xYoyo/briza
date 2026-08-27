/* @ds-bundle: {"format":4,"namespace":"BrizaDesignSystem_ff3119","components":[{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"HoursTable","sourcePath":"components/site/HoursTable.jsx"},{"name":"InfoRow","sourcePath":"components/site/InfoRow.jsx"},{"name":"PhotoGrid","sourcePath":"components/site/PhotoGrid.jsx"},{"name":"PhotoHero","sourcePath":"components/site/PhotoHero.jsx"},{"name":"SocialRow","sourcePath":"components/site/SocialRow.jsx"},{"name":"WHATSAPP_LINK","sourcePath":"components/site/WhatsAppBar.jsx"},{"name":"WhatsAppBar","sourcePath":"components/site/WhatsAppBar.jsx"}],"sourceHashes":{"components/brand/Wordmark.jsx":"48ba4210b729","components/core/Badge.jsx":"10e1fdca2fb9","components/core/Button.jsx":"85c5da0aae24","components/core/Card.jsx":"acc3d59ec19e","components/core/Icon.jsx":"1c6edaa85175","components/core/SectionHeading.jsx":"66a30ca13828","components/site/HoursTable.jsx":"1960371e7084","components/site/InfoRow.jsx":"3061335c2818","components/site/PhotoGrid.jsx":"7d54e3bcdaa5","components/site/PhotoHero.jsx":"4d3ca653a11d","components/site/SocialRow.jsx":"9ab5370b424d","components/site/WhatsAppBar.jsx":"52a4e4cb59d3","ui_kits/website/Site.jsx":"65d2ce29d6be"},"inlinedExternals":[],"unexposedExports":[{"name":"brizaHours","sourcePath":"components/site/HoursTable.jsx"}]} */

(() => {

const __ds_ns = (window.BrizaDesignSystem_ff3119 = window.BrizaDesignSystem_ff3119 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 28,
  md: 44,
  lg: 72,
  hero: "clamp(56px,15vw,116px)"
};

/**
 * The store name set in the display face with the sign's ice-blue glow.
 * Briza has no separate logo — this typographic treatment is the mark.
 */
function Wordmark({
  size = "md",
  glow = true,
  tone = "light",
  as = "span",
  style,
  ...rest
}) {
  const Tag = as;
  const fontSize = typeof sizes[size] === "number" ? `${sizes[size]}px` : sizes[size] || sizes.md;
  const onDark = tone === "light";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: "var(--font-display)",
      fontSize,
      lineHeight: 1,
      letterSpacing: "var(--track-sign)",
      color: onDark ? "var(--ice-100)" : "var(--navy-900)",
      textShadow: glow && onDark ? "var(--glow-sign)" : "none",
      display: "inline-block",
      ...style
    }
  }, rest), "\u05D1\u05E8\u05D9\u05D6\u05D4");
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  sand: {
    background: "var(--surface-sand)",
    color: "var(--stone-900)",
    border: "1px solid var(--sand-300)"
  },
  navy: {
    background: "var(--navy-900)",
    color: "var(--ice-100)",
    border: "1px solid var(--navy-900)"
  },
  ice: {
    background: "var(--ice-200)",
    color: "var(--blue-700)",
    border: "1px solid var(--ice-300)"
  },
  coral: {
    background: "var(--coral-600)",
    color: "var(--white)",
    border: "1px solid var(--coral-600)"
  },
  outline: {
    background: "transparent",
    color: "var(--stone-700)",
    border: "1px solid var(--border-hairline)"
  }
};

/** Small factual label: size ranges, price-from, "מבחר חדש". Never a link. */
function Badge({
  children,
  tone = "sand",
  icon,
  style,
  ...rest
}) {
  const t = tones[tone] || tones.sand;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      borderRadius: "var(--radius-pill)",
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-semibold)",
      lineHeight: 1.2,
      ...t,
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement(IconGlyph, {
    name: icon
  }) : null, children);
}
function IconGlyph({
  name
}) {
  const base = typeof window !== "undefined" && window.BRIZA_ICON_BASE || (() => {
    const tag = typeof document !== "undefined" && document.querySelector('script[src$="_ds_bundle.js"]');
    if (!tag) return "assets/icons";
    const url = new URL(tag.getAttribute("src"), document.baseURI);
    url.pathname = url.pathname.replace(/_ds_bundle\.js$/, "assets/icons");
    return url.href;
  })();
  const url = `${base}/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      backgroundColor: "currentColor",
      WebkitMaskImage: `url(${url})`,
      maskImage: `url(${url})`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  });
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Warm white card on cream: hairline border, soft warm shadow, 20px radius. */
function Card({
  children,
  tone = "light",
  interactive = false,
  padding = "var(--space-6)",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const light = tone === "light";
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: light ? "var(--surface-card)" : "var(--surface-inverse-2)",
      color: light ? "var(--text-body)" : "var(--text-on-inverse)",
      border: light ? "1px solid var(--border-hairline)" : "1px solid var(--border-on-inverse)",
      borderRadius: "var(--radius-lg)",
      padding,
      boxShadow: light ? hover ? "var(--shadow-card-hover)" : "var(--shadow-card)" : "none",
      transform: hover ? "translateY(-2px)" : "none",
      transition: "var(--transition-interactive)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Icon({
  name,
  size = 24,
  color = "currentColor",
  base,
  style,
  ...rest
}) {
  const url = `${base || resolveBase()}/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: {
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
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const variants = {
  whatsapp: {
    background: "var(--action-primary)",
    color: "var(--action-primary-text)",
    border: "2px solid transparent",
    hover: "var(--action-primary-hover)",
    press: "var(--action-primary-press)"
  },
  dark: {
    background: "var(--action-secondary)",
    color: "var(--action-secondary-text)",
    border: "2px solid transparent",
    hover: "var(--action-secondary-hover)",
    press: "var(--navy-600)"
  },
  outline: {
    background: "transparent",
    color: "var(--action-quiet-text)",
    border: "2px solid var(--action-quiet-border)",
    hover: "var(--surface-sand)",
    press: "var(--sand-300)"
  },
  ghostOnDark: {
    background: "rgba(240,247,252,.08)",
    color: "var(--text-on-inverse)",
    border: "2px solid var(--border-on-inverse)",
    hover: "rgba(240,247,252,.16)",
    press: "rgba(240,247,252,.24)"
  }
};
const sizes = {
  lg: {
    minHeight: "var(--tap-lg)",
    fontSize: "var(--text-lead)",
    padding: "0 28px",
    gap: "12px",
    icon: 28
  },
  md: {
    minHeight: "var(--tap-min)",
    fontSize: "var(--text-body-lg)",
    padding: "0 22px",
    gap: "10px",
    icon: 24
  }
};
/** Primary action. WhatsApp variant is the site's conversion button. */
function Button({
  children,
  variant = "whatsapp",
  size = "lg",
  icon,
  href,
  fullWidth = false,
  disabled = false,
  iconOnly = false,
  label,
  onClick,
  style,
  ...rest
}) {
  const v = variants[variant] || variants.whatsapp;
  const s = sizes[size] || sizes.lg;
  const [state, setState] = React.useState("rest");
  const bg = disabled ? "var(--stone-300)" : state === "press" ? v.press : state === "hover" ? v.hover : v.background;
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: disabled ? undefined : href,
    onClick: disabled ? undefined : onClick,
    "aria-disabled": disabled || undefined,
    "aria-label": label || undefined,
    onMouseEnter: () => setState("hover"),
    onMouseLeave: () => setState("rest"),
    onMouseDown: () => setState("press"),
    onMouseUp: () => setState("hover"),
    style: {
      display: fullWidth ? "flex" : "inline-flex",
      flex: "0 0 auto",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      minHeight: s.minHeight,
      width: iconOnly ? s.minHeight : fullWidth ? "100%" : undefined,
      padding: iconOnly ? 0 : s.padding,
      fontFamily: "var(--font-body)",
      fontSize: s.fontSize,
      fontWeight: "var(--weight-bold)",
      lineHeight: 1,
      textDecoration: "none",
      borderRadius: "var(--radius-pill)",
      border: v.border,
      background: bg,
      color: disabled ? "var(--stone-500)" : v.color,
      cursor: disabled ? "not-allowed" : "pointer",
      transform: state === "press" && !disabled ? "scale(var(--press-scale))" : "none",
      transition: "var(--transition-interactive)",
      boxShadow: variant === "whatsapp" && !disabled ? "0 4px 14px rgba(20,128,63,.18)" : "none",
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }) : null, iconOnly ? null : /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Section opener: optional small eyebrow above a display-font heading. */
function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "start",
  tone = "light",
  style,
  ...rest
}) {
  const dark = tone === "dark";
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align === "center" ? "center" : "start",
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--track-label)",
      color: dark ? "var(--ice-400)" : "var(--blue-700)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 28,
      height: 2,
      flex: "0 0 auto",
      background: dark ? "var(--ice-400)" : "var(--blue-700)"
    }
  }), eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-h2)",
      fontWeight: "var(--weight-regular)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--track-display)",
      color: dark ? "var(--text-on-inverse)" : "var(--text-body)",
      margin: 0
    }
  }, title), lead ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-lead)",
      lineHeight: "var(--leading-body)",
      color: dark ? "var(--text-on-inverse-muted)" : "var(--text-muted)",
      maxWidth: "var(--measure-wide)"
    }
  }, lead) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/site/HoursTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const brizaHours = [{
  day: "ראשון–חמישי",
  hours: "9:30–19:00"
}, {
  day: "שישי",
  hours: "9:30–14:00"
}, {
  day: "שבת",
  hours: "סגור",
  closed: true
}];

/** Opening hours, one row per day group. Today's row is emphasised. */
function HoursTable({
  rows = brizaHours,
  todayIndex,
  tone = "light",
  style,
  ...rest
}) {
  const dark = tone === "dark";
  return /*#__PURE__*/React.createElement("dl", _extends({
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      rowGap: 0,
      columnGap: "var(--space-5)",
      margin: 0,
      fontSize: "var(--text-body-lg)",
      ...style
    }
  }, rest), rows.map((r, i) => {
    const today = i === todayIndex;
    const border = `1px solid ${dark ? "var(--border-on-inverse)" : "var(--border-hairline)"}`;
    const cell = {
      padding: "var(--space-4) 0",
      borderBottom: i === rows.length - 1 ? "none" : border,
      color: r.closed ? dark ? "var(--ice-400)" : "var(--text-subtle)" : dark ? "var(--text-on-inverse)" : "var(--text-body)",
      fontWeight: today ? "var(--weight-bold)" : "var(--weight-regular)",
      margin: 0
    };
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: r.day
    }, /*#__PURE__*/React.createElement("dt", {
      style: cell
    }, r.day, today ? /*#__PURE__*/React.createElement("span", {
      style: {
        marginInlineStart: "var(--space-3)",
        fontSize: "var(--text-label)",
        fontWeight: "var(--weight-semibold)",
        color: dark ? "var(--ice-400)" : "var(--blue-700)"
      }
    }, "\u05D4\u05D9\u05D5\u05DD") : null), /*#__PURE__*/React.createElement("dd", {
      style: {
        ...cell,
        fontVariantNumeric: "tabular-nums",
        textAlign: "end"
      }
    }, r.hours));
  }));
}
Object.assign(__ds_scope, { brizaHours, HoursTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/HoursTable.jsx", error: String((e && e.message) || e) }); }

// components/site/InfoRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Icon + label + value row for address, phone, hours. Optionally a link. */
function InfoRow({
  icon,
  label,
  value,
  href,
  tone = "light",
  style,
  ...rest
}) {
  const dark = tone === "dark";
  const [hover, setHover] = React.useState(false);
  const Tag = href ? "a" : "div";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--space-4)",
      minHeight: "var(--tap-min)",
      padding: "var(--space-3) 0",
      textDecoration: "none",
      color: "inherit",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "grid",
      placeItems: "center",
      width: 44,
      height: 44,
      flex: "0 0 auto",
      borderRadius: "var(--radius-pill)",
      background: dark ? "rgba(240,247,252,.1)" : "var(--ice-200)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24,
    color: dark ? "var(--ice-300)" : "var(--blue-700)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-semibold)",
      color: dark ? "var(--ice-400)" : "var(--text-subtle)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body-lg)",
      fontWeight: "var(--weight-semibold)",
      lineHeight: "var(--leading-snug)",
      color: dark ? "var(--text-on-inverse)" : "var(--text-body)",
      textDecoration: href && hover ? "underline" : "none",
      textUnderlineOffset: "3px"
    }
  }, value)));
}
Object.assign(__ds_scope, { InfoRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/InfoRow.jsx", error: String((e && e.message) || e) }); }

// components/site/PhotoGrid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Photo grid for the gallery section. Fed by a plain array so photos can be
 * swapped without touching layout (PRD §3.5).
 */
function PhotoGrid({
  photos = [],
  columns = 2,
  ratio = "3 / 4",
  gap = "var(--space-3)",
  onSelect,
  className,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("ul", _extends({
    className: className,
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`,
      gap,
      listStyle: "none",
      margin: 0,
      padding: 0,
      ...style
    }
  }, rest), photos.map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: p.src + i,
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSelect ? () => onSelect(i) : undefined,
    style: {
      display: "block",
      width: "100%",
      padding: 0,
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      background: "var(--surface-raised)",
      cursor: onSelect ? "zoom-in" : "default"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.src,
    alt: p.alt,
    loading: "lazy",
    style: {
      width: "100%",
      aspectRatio: ratio,
      objectFit: "cover",
      display: "block"
    }
  })))));
}
Object.assign(__ds_scope, { PhotoGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/PhotoGrid.jsx", error: String((e && e.message) || e) }); }

// components/site/PhotoHero.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Full-bleed storefront photo with a bottom scrim, wordmark, and one action. */
function PhotoHero({
  image,
  alt = "",
  tagline,
  children,
  minHeight = "78svh",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      position: "relative",
      minHeight,
      display: "flex",
      alignItems: "flex-end",
      overflow: "hidden",
      background: "var(--surface-inverse)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: alt,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-bottom)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "var(--space-5)",
      padding: "var(--space-10) var(--gutter) var(--space-12)",
      width: "100%",
      maxWidth: "var(--content-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: "hero",
    as: "h1"
  }), tagline ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-lead)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-on-inverse)",
      maxWidth: "var(--measure-prose)",
      margin: 0
    }
  }, tagline) : null, children));
}
Object.assign(__ds_scope, { PhotoHero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/PhotoHero.jsx", error: String((e && e.message) || e) }); }

// components/site/SocialRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const labels = {
  instagram: "אינסטגרם",
  facebook: "פייסבוק",
  tiktok: "טיקטוק",
  whatsapp: "וואטסאפ"
};

/** Social links. Items without an href are hidden (PRD §3.7). */
function SocialRow({
  links = [],
  tone = "dark",
  size = 28,
  style,
  ...rest
}) {
  const dark = tone === "dark";
  const visible = links.filter(l => l.href);
  return /*#__PURE__*/React.createElement("ul", _extends({
    style: {
      display: "flex",
      gap: "var(--space-3)",
      listStyle: "none",
      margin: 0,
      padding: 0,
      ...style
    }
  }, rest), visible.map(l => /*#__PURE__*/React.createElement("li", {
    key: l.network
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href,
    "aria-label": l.label || labels[l.network] || l.network,
    style: {
      display: "grid",
      placeItems: "center",
      width: "var(--tap-min)",
      height: "var(--tap-min)",
      borderRadius: "var(--radius-pill)",
      border: `1px solid ${dark ? "var(--border-on-inverse)" : "var(--border-hairline)"}`,
      background: dark ? "rgba(240,247,252,.06)" : "var(--surface-card)",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: l.network,
    size: size,
    color: dark ? "var(--ice-100)" : "var(--navy-900)"
  })))));
}
Object.assign(__ds_scope, { SocialRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SocialRow.jsx", error: String((e && e.message) || e) }); }

// components/site/WhatsAppBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const WHATSAPP_LINK = "https://wa.me/972524381666?text=" + encodeURIComponent("שלום, ראיתי את האתר של בריזה ואשמח לשמוע על המבחר");

/**
 * Fixed bottom bar: the WhatsApp action plus click-to-call. It stays hidden
 * over the hero — where the hero's own CTA is doing the work — and slides in
 * once the reader scrolls past it, so the green never appears twice at once.
 */
function WhatsAppBar({
  whatsappHref = WHATSAPP_LINK,
  telHref = "tel:+972524381666",
  label = "דברו איתנו",
  visible = true,
  revealAfter = "hero",
  style,
  ...rest
}) {
  const [past, setPast] = React.useState(revealAfter === "always");
  React.useEffect(() => {
    if (revealAfter === "always") return undefined;
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealAfter]);
  const shown = visible && past;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "fixed",
      insetInline: 0,
      bottom: 0,
      zIndex: 50,
      display: "flex",
      gap: "var(--space-3)",
      padding: "var(--space-3) var(--gutter) calc(var(--space-3) + env(safe-area-inset-bottom,0px))",
      background: "rgba(11,16,32,.94)",
      backdropFilter: "var(--blur-glass)",
      WebkitBackdropFilter: "var(--blur-glass)",
      borderTop: "1px solid var(--border-on-inverse)",
      boxShadow: "var(--shadow-float)",
      transform: shown ? "none" : "translateY(115%)",
      transition: "transform var(--dur-slow) var(--ease-out)",
      pointerEvents: shown ? "auto" : "none",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "whatsapp",
    size: "md",
    icon: "whatsapp",
    href: whatsappHref,
    fullWidth: true,
    style: {
      flex: 1
    }
  }, label), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghostOnDark",
    size: "md",
    icon: "phone",
    href: telHref,
    label: "\u05D4\u05EA\u05E7\u05E9\u05E8\u05D5 \u05D0\u05DC\u05D9\u05E0\u05D5",
    iconOnly: true
  }));
}
Object.assign(__ds_scope, { WHATSAPP_LINK, WhatsAppBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/WhatsAppBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
/* global React */
const {
  Button,
  Badge,
  Card,
  Icon,
  SectionHeading,
  Wordmark,
  InfoRow,
  HoursTable,
  PhotoGrid,
  SocialRow,
  WhatsAppBar,
  PhotoHero,
  brizaHours,
  WHATSAPP_LINK
} = window.BrizaDesignSystem_ff3119;
const PHOTOS = [{
  src: "../../assets/photos/window-display.png",
  alt: "חלון הראווה של בריזה עם דוגמניות בלבוש קיצי"
}, {
  src: "../../assets/photos/interior-rack.png",
  alt: "מתלה חולצות שחורות עם הדפס בתוך החנות"
}, {
  src: "../../assets/photos/storefront-sign.png",
  alt: "חזית החנות בקניון גן העיר עם השלט המואר"
}];
const GROUP_LINK = "https://chat.whatsapp.com/";
const MAP_QUERY = "קניון גן העיר אבן גבירול 71 תל אביב";
const MAP_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}`;
const TAGLINE = "בגדי נשים מיובאים בגן העיר. מבחר שמתחדש כל שבוע, ויחס אישי כבר ארבעים שנה.";
function HeroCta() {
  return /*#__PURE__*/React.createElement(Button, {
    variant: "whatsapp",
    size: "lg",
    icon: "whatsapp",
    href: WHATSAPP_LINK
  }, "\u05D3\u05D1\u05E8\u05D5 \u05D0\u05D9\u05EA\u05E0\u05D5 \u05D1\u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4");
}

/** A: photo-dominant — the storefront fills the screen, text rides the scrim. */
function HeroPhoto() {
  return /*#__PURE__*/React.createElement(PhotoHero, {
    image: PHOTOS[2].src,
    alt: PHOTOS[2].alt,
    tagline: TAGLINE,
    minHeight: "88svh"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heroline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rule"
  }), "\u05D1\u05D2\u05DF \u05D4\u05E2\u05D9\u05E8, \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1 \xB7 \u05DE\u05BE1986"), /*#__PURE__*/React.createElement(HeroCta, null));
}

/** B: type-dominant — the sign reproduced on navy, photo as a band beneath. */
function HeroType() {
  return /*#__PURE__*/React.createElement("section", {
    className: "herotype"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap herotypeinner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heroline light"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rule"
  }), "\u05D1\u05D2\u05DF \u05D4\u05E2\u05D9\u05E8, \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1 \xB7 \u05DE\u05BE1986"), /*#__PURE__*/React.createElement(Wordmark, {
    size: "hero",
    as: "h1"
  }), /*#__PURE__*/React.createElement("p", {
    className: "herotag"
  }, TAGLINE), /*#__PURE__*/React.createElement(HeroCta, null)), /*#__PURE__*/React.createElement("img", {
    className: "heroband",
    src: PHOTOS[0].src,
    alt: PHOTOS[0].alt
  }));
}
function Story() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "story"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap story"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "\u05D4\u05E1\u05D9\u05E4\u05D5\u05E8 \u05E9\u05DC\u05E0\u05D5",
    title: "\u05D0\u05E8\u05D1\u05E2\u05D9\u05DD \u05E9\u05E0\u05D4 \u05D1\u05D0\u05D5\u05EA\u05D4 \u05E4\u05D9\u05E0\u05D4",
    lead: "\u05D4\u05D7\u05E0\u05D5\u05EA \u05E0\u05E4\u05EA\u05D7\u05D4 \u05DB\u05D0\u05DF \u05D1\u05BE1986, \u05D5\u05DE\u05D0\u05D6 \u05DC\u05D0 \u05D6\u05D6\u05D4. \u05D4\u05D9\u05D5\u05DD \u05D0\u05D9\u05E8\u05D9\u05EA \u05DE\u05E0\u05D4\u05DC\u05EA \u05D0\u05D5\u05EA\u05D4, \u05E2\u05DD \u05D7\u05DC\u05E7 \u05DE\u05D0\u05D5\u05EA\u05DF \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA \u05DE\u05D4\u05E9\u05E0\u05D9\u05DD \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D5\u05EA."
  }), /*#__PURE__*/React.createElement("div", {
    className: "prose"
  }, /*#__PURE__*/React.createElement("p", null, "\u05D0\u05E0\u05D7\u05E0\u05D5 \u05D1\u05D5\u05D7\u05E8\u05D5\u05EA \u05DB\u05DC \u05E4\u05E8\u05D9\u05D8 \u05D1\u05E2\u05E6\u05DE\u05E0\u05D5 \u05DE\u05D4\u05D9\u05D1\u05D5\u05D0\u05E0\u05D9\u05DD, \u05D1\u05DB\u05DE\u05D5\u05D9\u05D5\u05EA \u05E7\u05D8\u05E0\u05D5\u05EA, \u05DB\u05DA \u05E9\u05DC\u05D0 \u05EA\u05E4\u05D2\u05E9\u05D5 \u05D0\u05EA \u05D0\u05D5\u05EA\u05D4 \u05D7\u05D5\u05DC\u05E6\u05D4 \u05E2\u05DC \u05DB\u05DC \u05DE\u05D9 \u05E9\u05E2\u05D5\u05D1\u05E8\u05EA \u05D1\u05E8\u05D7\u05D5\u05D1."), /*#__PURE__*/React.createElement("p", null, "\u05D0\u05E6\u05DC\u05E0\u05D5 \u05DC\u05D0 \u05DE\u05DE\u05D4\u05E8\u05D9\u05DD. \u05E0\u05E9\u05DE\u05D7 \u05DC\u05E9\u05DE\u05D5\u05E2 \u05DE\u05D4 \u05D0\u05EA \u05DE\u05D7\u05E4\u05E9\u05EA, \u05DC\u05D4\u05D1\u05D9\u05D0 \u05DE\u05D9\u05D3\u05D5\u05EA \u05E0\u05D5\u05E1\u05E4\u05D5\u05EA \u05DE\u05D4\u05DE\u05D7\u05E1\u05DF, \u05D5\u05DC\u05D4\u05D2\u05D9\u05D3 \u05D1\u05DB\u05D9\u05D5\u05D5\u05DF \u05D0\u05DD \u05DE\u05E9\u05D4\u05D5 \u05E4\u05D7\u05D5\u05EA \u05DE\u05D7\u05DE\u05D9\u05D0.")), /*#__PURE__*/React.createElement("blockquote", {
    className: "pull"
  }, /*#__PURE__*/React.createElement("p", null, "\u05F4\u05D4\u05E8\u05D1\u05D4 \u05E0\u05E9\u05D9\u05DD \u05E0\u05DB\u05E0\u05E1\u05D5\u05EA \u05E8\u05E7 \u05DC\u05D4\u05D2\u05D9\u05D3 \u05E9\u05DC\u05D5\u05DD. \u05D7\u05DC\u05E7 \u05DE\u05D4\u05DF \u05D9\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05DD \u05E9\u05DE\u05DC\u05D4.\u05F4"), /*#__PURE__*/React.createElement("footer", null, "\u05D0\u05D9\u05E8\u05D9\u05EA, \u05D1\u05E2\u05DC\u05EA \u05D4\u05D7\u05E0\u05D5\u05EA"))));
}
const OFFERINGS = [{
  icon: "shirt",
  title: "יבוא אישי",
  body: "מבחר מיובא שנבחר פריט־פריט, מתחדש בכל שבוע.",
  badge: "מבחר חדש כל שבוע",
  badgeIcon: "sparkles"
}, {
  icon: "ruler",
  title: "מידות 38–54",
  body: "כולל מידות גדולות, עם התאמה במקום.",
  badge: "38–54",
  badgeIcon: "ruler"
}, {
  icon: "tag",
  title: "מחירים הוגנים",
  body: "רוב הפריטים בין ₪79 ל־₪390, בלי הפתעות בקופה.",
  badge: "מ־₪79",
  badgeIcon: "tag"
}];
function Offering() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section raised",
    id: "offering"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "\u05DE\u05D4 \u05EA\u05DE\u05E6\u05D0\u05D5 \u05D0\u05E6\u05DC\u05E0\u05D5",
    title: "\u05DE\u05D1\u05D7\u05E8 \u05E7\u05D8\u05DF \u05D5\u05DE\u05D3\u05D5\u05D9\u05E7, \u05DC\u05D0 \u05E7\u05D8\u05DC\u05D5\u05D2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cards"
  }, OFFERINGS.map(o => /*#__PURE__*/React.createElement(Card, {
    key: o.title
  }, /*#__PURE__*/React.createElement("div", {
    className: "cardin"
  }, /*#__PURE__*/React.createElement("span", {
    className: "iconpad"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: o.icon,
    size: 28,
    color: "var(--blue-700)"
  })), /*#__PURE__*/React.createElement("h3", null, o.title), /*#__PURE__*/React.createElement("p", null, o.body), /*#__PURE__*/React.createElement(Badge, {
    tone: "ice",
    icon: o.badgeIcon
  }, o.badge)))))));
}
function Gallery({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section inverse",
    id: "gallery"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    tone: "dark",
    eyebrow: "\u05DE\u05D4\u05D7\u05E0\u05D5\u05EA",
    title: "\u05DB\u05DB\u05D4 \u05D6\u05D4 \u05E0\u05E8\u05D0\u05D4 \u05D0\u05E6\u05DC\u05E0\u05D5",
    lead: "\u05EA\u05DE\u05D5\u05E0\u05D5\u05EA \u05DE\u05D4\u05D7\u05E0\u05D5\u05EA \u05D1\u05D2\u05DF \u05D4\u05E2\u05D9\u05E8. \u05DC\u05D7\u05E6\u05D5 \u05DC\u05D4\u05D2\u05D3\u05DC\u05D4."
  }), /*#__PURE__*/React.createElement(PhotoGrid, {
    columns: 2,
    photos: PHOTOS,
    onSelect: onOpen,
    style: {
      marginTop: 24
    },
    className: "gallery"
  })));
}
function Visit() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "visit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "\u05DC\u05D1\u05E7\u05E8 \u05D0\u05E6\u05DC\u05E0\u05D5",
    title: "\u05D2\u05DF \u05D4\u05E2\u05D9\u05E8, \u05E7\u05D5\u05DE\u05EA \u05DB\u05E0\u05D9\u05E1\u05D4"
  }), /*#__PURE__*/React.createElement("div", {
    className: "visit"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(InfoRow, {
    icon: "map-pin",
    label: "\u05DB\u05EA\u05D5\u05D1\u05EA",
    value: "\u05D0\u05D1\u05DF \u05D2\u05D1\u05D9\u05E8\u05D5\u05DC 71, \u05E7\u05E0\u05D9\u05D5\u05DF \u05D2\u05DF \u05D4\u05E2\u05D9\u05E8, \u05E7\u05D5\u05DE\u05EA \u05DB\u05E0\u05D9\u05E1\u05D4",
    href: MAP_URL
  }), /*#__PURE__*/React.createElement("div", {
    className: "hairline"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "phone",
    label: "\u05D8\u05DC\u05E4\u05D5\u05DF",
    value: /*#__PURE__*/React.createElement("span", {
      dir: "ltr"
    }, "052-4381666"),
    href: "tel:+972524381666"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hairline"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "users",
    label: "\u05E7\u05D1\u05D5\u05E6\u05EA \u05D4\u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4",
    value: "\u05E2\u05D3\u05DB\u05D5\u05E0\u05D9\u05DD \u05E2\u05DC \u05DE\u05D1\u05D7\u05E8 \u05D7\u05D3\u05E9",
    href: GROUP_LINK
  }), /*#__PURE__*/React.createElement("div", {
    className: "visitactions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    size: "md",
    icon: "navigation",
    href: MAP_URL
  }, "\u05E0\u05D5\u05D5\u05D8\u05D5 \u05DC\u05D7\u05E0\u05D5\u05EA"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "md",
    icon: "users",
    href: GROUP_LINK
  }, "\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05DC\u05E7\u05D1\u05D5\u05E6\u05D4"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
    className: "cardtitle"
  }, "\u05E9\u05E2\u05D5\u05EA \u05E4\u05EA\u05D9\u05D7\u05D4"), /*#__PURE__*/React.createElement(HoursTable, {
    rows: brizaHours,
    todayIndex: 0
  }))), /*#__PURE__*/React.createElement("div", {
    className: "map"
  }, /*#__PURE__*/React.createElement("iframe", {
    title: "\u05DE\u05E4\u05EA \u05D4\u05D7\u05E0\u05D5\u05EA \u05D1\u05E7\u05E0\u05D9\u05D5\u05DF \u05D2\u05DF \u05D4\u05E2\u05D9\u05E8",
    src: `${MAP_URL}&output=embed&hl=iw`,
    loading: "lazy"
  }))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "section inverse footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap footerinner"
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: "md"
  }), /*#__PURE__*/React.createElement("p", {
    className: "footermeta"
  }, "\u05D0\u05D1\u05DF \u05D2\u05D1\u05D9\u05E8\u05D5\u05DC 71, \u05E7\u05E0\u05D9\u05D5\u05DF \u05D2\u05DF \u05D4\u05E2\u05D9\u05E8, \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1 \xB7 ", /*#__PURE__*/React.createElement("span", {
    dir: "ltr"
  }, "052-4381666")), /*#__PURE__*/React.createElement(SocialRow, {
    links: [{
      network: "instagram",
      href: "#"
    }, {
      network: "facebook",
      href: "#"
    }, {
      network: "tiktok"
    }]
  }), /*#__PURE__*/React.createElement("p", {
    className: "footerfine"
  }, "\u05D1\u05E8\u05D9\u05D6\u05D4 \xB7 \u05D1\u05D2\u05D3\u05D9 \u05E0\u05E9\u05D9\u05DD \u05D1\u05D2\u05DF \u05D4\u05E2\u05D9\u05E8 \u05DE\u05BE1986")));
}
function Lightbox({
  index,
  onClose
}) {
  if (index === null) return null;
  const p = PHOTOS[index];
  return /*#__PURE__*/React.createElement("div", {
    className: "lightbox",
    onClick: onClose,
    role: "dialog",
    "aria-label": "\u05EA\u05DE\u05D5\u05E0\u05D4 \u05DE\u05D5\u05D2\u05D3\u05DC\u05EA"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lbclose",
    "aria-label": "\u05E1\u05D2\u05D9\u05E8\u05EA \u05D4\u05EA\u05DE\u05D5\u05E0\u05D4",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 28,
    color: "var(--ice-100)"
  })), /*#__PURE__*/React.createElement("img", {
    src: p.src,
    alt: p.alt
  }));
}
function Site({
  hero = "photo"
}) {
  const [open, setOpen] = React.useState(null);
  return /*#__PURE__*/React.createElement(React.Fragment, null, hero === "type" ? /*#__PURE__*/React.createElement(HeroType, null) : /*#__PURE__*/React.createElement(HeroPhoto, null), /*#__PURE__*/React.createElement(Story, null), /*#__PURE__*/React.createElement(Offering, null), /*#__PURE__*/React.createElement(Gallery, {
    onOpen: setOpen
  }), /*#__PURE__*/React.createElement(Visit, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(WhatsAppBar, {
    visible: open === null
  }), /*#__PURE__*/React.createElement(Lightbox, {
    index: open,
    onClose: () => setOpen(null)
  }));
}
Object.assign(window, {
  Site,
  HeroPhoto,
  HeroType,
  Story,
  Offering,
  Gallery,
  Visit,
  Footer,
  Lightbox,
  PHOTOS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.HoursTable = __ds_scope.HoursTable;

__ds_ns.InfoRow = __ds_scope.InfoRow;

__ds_ns.PhotoGrid = __ds_scope.PhotoGrid;

__ds_ns.PhotoHero = __ds_scope.PhotoHero;

__ds_ns.SocialRow = __ds_scope.SocialRow;

__ds_ns.WHATSAPP_LINK = __ds_scope.WHATSAPP_LINK;

__ds_ns.WhatsAppBar = __ds_scope.WhatsAppBar;

})();
