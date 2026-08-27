One-line: pill action button in four variants; the green WhatsApp variant is the site's single conversion action and appears once per section at most.

```jsx
<Button variant="whatsapp" size="lg" icon="whatsapp" href="https://wa.me/972524381666?text=...">
  דברו איתנו בוואטסאפ
</Button>
```

Notes
- `variant="whatsapp"` carries the WhatsApp green (`--whatsapp-500`) and a green-tinted shadow; never use that green for anything else.
- `variant="dark"` (navy) is for call and navigation actions; `outline` for tertiary links on cream; `ghostOnDark` for buttons sitting on the hero photograph.
- Sizes map to tap targets: `lg` = 64px, `md` = 56px. Do not override `minHeight` downward — the audience is 50+ on phones.
- Use `fullWidth` on mobile for the hero and sticky-bar buttons.
- Hebrew labels only, imperative plural and warm: "דברו איתנו בוואטסאפ", "התקשרו אלינו", "נווטו לחנות".
