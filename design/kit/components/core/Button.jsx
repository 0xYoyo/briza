import React from "react";
import { Icon } from "./Icon.jsx";

const variants = {
  whatsapp: {
    background: "var(--action-primary)",
    color: "var(--action-primary-text)",
    border: "2px solid transparent",
    hover: "var(--action-primary-hover)",
    press: "var(--action-primary-press)",
  },
  dark: {
    background: "var(--action-secondary)",
    color: "var(--action-secondary-text)",
    border: "2px solid transparent",
    hover: "var(--action-secondary-hover)",
    press: "var(--navy-600)",
  },
  outline: {
    background: "transparent",
    color: "var(--action-quiet-text)",
    border: "2px solid var(--action-quiet-border)",
    hover: "var(--surface-sand)",
    press: "var(--sand-300)",
  },
  ghostOnDark: {
    background: "rgba(240,247,252,.08)",
    color: "var(--text-on-inverse)",
    border: "2px solid var(--border-on-inverse)",
    hover: "rgba(240,247,252,.16)",
    press: "rgba(240,247,252,.24)",
  },
};

const sizes = {
  lg: { minHeight: "var(--tap-lg)", fontSize: "var(--text-lead)", padding: "0 28px", gap: "12px", icon: 28 },
  md: { minHeight: "var(--tap-min)", fontSize: "var(--text-body-lg)", padding: "0 22px", gap: "10px", icon: 24 },
};
/** Primary action. WhatsApp variant is the site's conversion button. */
export function Button({
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
  return (
    <Tag
      href={disabled ? undefined : href}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      aria-label={label || undefined}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("rest")}
      onMouseDown={() => setState("press")}
      onMouseUp={() => setState("hover")}
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {icon ? <Icon name={icon} size={s.icon} /> : null}
      {iconOnly ? null : <span>{children}</span>}
    </Tag>
  );
}
