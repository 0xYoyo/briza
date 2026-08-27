One-line: the fixed bottom bar carrying the WhatsApp conversion button and a click-to-call button; it stays hidden over the hero and slides in once the reader scrolls past it.

```jsx
<WhatsAppBar />                              {/* reveals after the hero */}
<WhatsAppBar revealAfter="always" />         {/* pinned from the top */}
<WhatsAppBar visible={false} />              {/* hidden while a lightbox is open */}
```

Notes
- The reveal exists so the green never appears twice at once: the hero owns the CTA above the fold, the bar owns it below.
- `WHATSAPP_LINK` already includes the prefilled Hebrew greeting; reuse it rather than composing a new wa.me URL.
- Leave ~110px of page padding below the footer so nothing hides behind the bar.
- Never add a third button. The call button is `iconOnly` with a Hebrew `label`.
