One-line: renders "בריזה" in the display face with the storefront sign's ice-blue glow — this is the brand mark; there is no logo file.

```jsx
<Wordmark size="hero" as="h1" />          {/* over the storefront photo */}
<Wordmark size="sm" tone="dark" glow={false} />  {/* on cream */}
```

Notes
- Glow belongs only on dark backgrounds; on cream use `tone="dark" glow={false}`.
- Never letterspace beyond `--track-sign`, never outline, never rotate, never place on a busy mid-tone photo area without a scrim.
- Do not attempt to redraw the physical sign as vector art — the type treatment is the approved stand-in.
