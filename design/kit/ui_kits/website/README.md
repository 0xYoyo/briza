# UI kit — Briza one-page site

Recreation of the v1 site described in `docs/PRD.md` §3 and §5. Mobile-first;
open `index.html` at ~430px wide for the intended experience, and widen past
900px to see the desktop layout.

Section order (PRD §5): hero → story → what you'll find → gallery → visit →
footer, with the sticky WhatsApp bar always present.

Interactions that work
- Two hero directions: `index.html` (photo-dominant) and `index.html?hero=type`
  (type-dominant). `hero-review.html` shows both at 430px side by side.
- The hero WhatsApp button is the only green above the fold; the sticky bar
  slides in after the hero scrolls away.
- WhatsApp button and sticky bar open the real `wa.me/972524381666` deep link
  with the prefilled Hebrew greeting.
- Phone row and call button use `tel:+972524381666`.
- Gallery tiles open a lightbox; the sticky bar slides out while it is open.
- Hours table marks ראשון–חמישי as "היום" (static — the real site should compute it).
- Address and "נווטו לחנות" open Google Maps for קניון גן העיר.

Standing in / not real yet
- Only three owner photographs exist, so the gallery shows three tiles; the PRD
  expects 6–10 after the photo shoot. Add them to the `PHOTOS` array in
  `Site.jsx` — no layout change needed.
- The WhatsApp group link is a placeholder (`chat.whatsapp.com/`) until the
  group is created.
- Social links point to `#`; TikTok is intentionally left without an `href` to
  demonstrate that missing profiles simply disappear.
- The Google Maps embed needs network access; offline it renders as an empty
  cream panel.
- Story copy is drafted from the PRD and still needs the owner's approval
  (PRD §12).
