One-line: masked SVG icon from `assets/icons` (Lucide line icons + Simple Icons brand glyphs) that takes on the current text color.

```jsx
<Icon name="map-pin" size={24} color="var(--blue-700)" />
```

Notes
- Set `window.BRIZA_ICON_BASE = "../../assets/icons"` once per page instead of passing `base` to every icon.
- Line icons (phone, clock, map-pin, ruler, tag, heart, shirt, sparkles, star, users, quote, navigation, chevrons, arrow-left, menu, x, hand-heart) are Lucide, 24px grid, 2px stroke — do not mix in other icon sets.
- Brand glyphs (whatsapp, tiktok, instagram, facebook, googlemaps) are solid Simple Icons; render them at 24–28px in `--ice-100` on navy or `--white` inside the WhatsApp button.
- Always decorative: the component is `aria-hidden`, so the adjacent text must carry the meaning.
