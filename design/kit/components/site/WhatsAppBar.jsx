import React from "react";
import { Button } from "../core/Button.jsx";

export const WHATSAPP_LINK =
  "https://wa.me/972524381666?text=" + encodeURIComponent("שלום, ראיתי את האתר של בריזה ואשמח לשמוע על המבחר");

/**
 * Fixed bottom bar: the WhatsApp action plus click-to-call. It stays hidden
 * over the hero — where the hero's own CTA is doing the work — and slides in
 * once the reader scrolls past it, so the green never appears twice at once.
 */
export function WhatsAppBar({
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealAfter]);
  const shown = visible && past;
  return (
    <div
      style={{
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
        ...style,
      }}
      {...rest}
    >
      <Button variant="whatsapp" size="md" icon="whatsapp" href={whatsappHref} fullWidth style={{ flex: 1 }}>
        {label}
      </Button>
      <Button variant="ghostOnDark" size="md" icon="phone" href={telHref} label="התקשרו אלינו" iconOnly />
    </div>
  );
}
