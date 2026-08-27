# Briza — Design

Version: 1 · Date: 2026-08-27 · Authored by /yoyo-design from `docs/PRD.md` v2,
the repository, and the Claude Design kit at `design/kit/` (tokens only).

This file is the design bar. `/yoyo-review` judges `[DESIGN]` findings
against it: a must-fix cites an invariant by its bracketed name. It holds
rules that stay true while the UI changes; it never describes the current
UI.

**Case: owned pages.** Briza draws every pixel of its own single page on its
own domain; nothing is inherited from a host site, so the Direction system
below is real and load-bearing. Where this file and `design/kit/` disagree,
this file wins (`design/kit/readme.md`).

**Maintenance.** A design-affecting amendment to `docs/PRD.md` updates this
file in the same PR. Larger direction changes are made by re-running
`/yoyo-design`, which re-authors this file with the user present. There is
no other update path and no generation pipeline.

---

## 1. Invariants

Each rule is imperative, atomic, and checkable from a screenshot or the
diff. Cite by bracketed name.

### Floors

- **[contrast-aa]** Every text/background pair meets WCAG AA (4.5:1; 3:1 at
  ≥24px or ≥19px bold) in every state (rest, hover, press, focus, disabled)
  and over photography (measure against the scrim, not the raw photo).
- **[body-19]** No text on the page renders below 19px (`--text-body-size`);
  the sole exception is the JSON-LD/`<head>`, which has no rendering.
- **[tap-56]** Every interactive element has a hit area ≥56×56px, including
  icon-only controls (the call icon, social icons). The PRD's 56px floor
  overrides the kit's 44px icon target.
- **[reduced-motion]** Under `prefers-reduced-motion: reduce` all durations
  are 0 and `--press-scale` is 1; nothing on the page moves.
- **[focus-visible]** Every focusable element shows the 3px `--focus-ring`
  outline with 2px offset on `:focus-visible`; focus is never removed or
  hidden.
- **[logical-props]** Layout uses logical properties only
  (`margin-inline-start`, `padding-block`, `inset-inline-end`, `text-align:
  start`); no `left`/`right`/`margin-left`/`margin-right`/`text-align:
  right` anywhere in authored CSS.
- **[rtl-numerals]** Digits, prices, phone numbers and time ranges are
  isolated LTR runs inside RTL lines (`unicode-bidi: isolate` /
  `<bdi>` / `dir="ltr"` on the span), so `9:30–19:00`, `38–54`,
  `052-4381666` and `₪79` never reverse. `₪` precedes the number.
- **[hebrew-only]** No Latin-script UI text is visible on the page. Latin
  appears only in URLs, `alt`-less decorative assets, and the `<head>`.
- **[no-layout-shift]** Every image declares its aspect ratio (or width and
  height) so nothing reflows while photos or fonts load; webfonts load with
  `font-display: swap` and a metric-compatible fallback (`"Arial Hebrew",
  system-ui`).
- **[no-emoji]** No emoji anywhere on the page, in any state.

### States (every surface has a designed answer)

- **[loading-state]** Photos below the fold are `loading="lazy"` with a
  `--surface-raised` placeholder at the final aspect ratio; the hero photo
  is eager and has a `--navy-900` background so the scrim and wordmark are
  readable before the image arrives.
- **[no-js-state]** With JavaScript disabled or failed, the page is complete:
  the open/closed line is simply absent and the hours table stands alone.
  No spinner, no placeholder text, no reserved empty row.
- **[no-dead-button]** No button or link ever renders with an empty, `#`, or
  placeholder `href`. While `GROUP_INVITE_URL` is empty, every join button
  resolves to the WhatsApp fallback chat (PRD §3.2) with no visual
  difference from the real link.
- **[empty-collapses]** An empty configurable value hides its element
  entirely and its container closes the gap: an empty social URL removes
  that icon; an empty `PHOTOS` list removes the whole Photos section
  including its heading; no empty slot, ghost icon, or "coming soon".
- **[error-none]** The page performs no fetches; there is no error state to
  design and none may be invented (no toast, no banner, no retry UI).

### Footprint & attention

- **[one-cta]** Exactly one primary (WhatsApp-green) button is visible in
  any viewport at any scroll position. Primary buttons are stacked
  vertically ≥1 viewport-height apart, never side by side, never in the
  sticky bar.
- **[green-is-join]** WhatsApp green (`--whatsapp-*`) appears only on the
  "join the updates group" button. "Write to Irit", "call", "navigate" and
  review links are never green, even though two of them open WhatsApp.
- **[sticky-secondary]** The mobile sticky bar carries only the secondary
  "write to Irit" action and the call icon; it never contains the join
  button, never grows past 80px tall, and is hidden at ≥900px.
- **[no-overlay]** No modal, popup, cookie banner, lightbox, exit-intent,
  chat bubble, or floating widget of any kind. The sticky bar is the only
  fixed element.
- **[wordmark-once]** On viewports <900px the store name reads exactly once
  in the hero: the text wordmark is the `<h1>`, and the hero photo is cropped
  or positioned so the photographed sign is outside the frame or fully
  under the scrim. The photographed sign may be visible only at ≥900px,
  where the wordmark sits away from it.
- **[wordmark-is-text]** The store name is live text in `--font-display`,
  never an image, SVG or logo file.

### Content-as-design (from PRD §5.1, promoted to invariants)

- **[no-card-grid]** Offer and How-it-works are typographic: numbered lines
  and paragraphs on the section surface. No icon+title+text cards, no
  three-up feature tiles, no bordered boxes per item.
- **[no-testimonial]** No quote block, star row, review excerpt, avatar, or
  rating number anywhere. Social proof is two links.
- **[no-badge]** Sizes, prices and "40 years" appear only inline in running
  text; never as a badge, pill, chip, stat tile or big-number callout.
- **[photos-of-clothes]** Every photo below the hero shows clothes or hands
  with clothes; no ceilings, doorframes, empty interiors, or the owner.
- **[caption-static]** Photo and section captions never imply recency or
  schedule: no "new", "this week", "just in", "updated".

### Anti-patterns (must never look like)

- **[not-template]** No generic-SaaS tells: no gradient text, no glass
  cards with 1px white borders, no purple/indigo, no isometric or 3D
  illustration, no stock icon sets in circles, no "trusted by" rows.
- **[not-fast-fashion]** No urgency devices: no countdowns, "last items",
  strikethrough prices, sale tags, red discount stickers, or marquee text.
- **[not-catalog]** Photos are never accompanied by product names, prices,
  sizes or "shop" affordances; the grid has no hover overlay, no zoom, no
  per-photo link.
- **[not-dark-mode]** The page has exactly one theme. It does not respond
  to `prefers-color-scheme`; the palette below is fixed.
- **[no-auto-motion]** Nothing animates without a pointer or keyboard
  action: no scroll-reveal, parallax, autoplay carousel, pulsing glow,
  or animated gradient. (PRD §3.7: the only script is the open/closed
  line, so scroll-driven animation is out by construction.)

---

## 2. Direction system

**Case: owned pages** (stated above). One page, Hebrew RTL, fixed single
theme, mobile-first, readers ~50+. The direction is *the sign and the
shop*: the black fascia with its ice-blue glowing lettering supplies the
inverse surfaces and the wordmark; the cream, lit interior and wood rails
supply the reading surfaces; the clothes supply all colour. Source of
direction: `design/kit/` tokens (Claude Design, 2026-08-21), sampled from
the storefront photographs; compositions and copy from that kit are not
adopted.

### 2.1 Surfaces and rhythm

- **Navy bookends.** The page is cream with exactly two inverse (navy)
  surfaces: the hero and the footer. Every section between them is on
  `--surface-page` (cream-50), except the Offer, which sits on
  `--surface-sand` (cream-200) so it reads as lifted without a card.
- No section is white (`--white`); white is reserved for the sticky bar's
  glass tint and button text.
- Sections are separated by vertical rhythm (`--section-y` 64px on phones,
  `--section-y-lg` 96px at ≥900px), never by borders, dividers or angled
  edges. A hairline (`--border-hairline`, 1px) is used only inside the
  hours table and above the sticky bar.
- Single column throughout. Content max `--content-max` 1100px; prose
  measure ≤ `--measure-wide` 52ch, story and offer body ≤ `--measure-prose`
  34ch. Gutter `--gutter` 20px on phones, `--gutter-wide` 40px at ≥900px.
- Text on inverse surfaces is `--text-on-inverse` (ice-100), muted lines
  `--text-on-inverse-muted` (ice-300). Never white on navy.

### 2.2 Color roles

| Role | Token | Hex | Rule |
|---|---|---|---|
| Page surface | `--surface-page` | `#FDFAF5` | default section background |
| Lifted surface | `--surface-sand` | `#EFE5D3` | Offer section only |
| Placeholder | `--surface-raised` | `#F7F1E6` | image placeholders |
| Inverse surface | `--surface-inverse` | `#0B1020` | hero (under scrim), footer |
| Body text | `--text-body` | `#1A1A1A` | all running text on cream |
| Muted text | `--text-muted` | `#4A4A4A` | hours rows, address, meta |
| Accent text | `--text-accent` | `#1E4685` | eyebrows, numbered-step numerals, links |
| Text on inverse | `--text-on-inverse` | `#F0F7FC` | wordmark, hero line, footer |
| Muted on inverse | `--text-on-inverse-muted` | `#AFD5EC` | hero eyebrow, footer meta |
| Primary action | `--action-primary` | `#25D366` | join button surface only |
| Secondary action | `--action-secondary` | `#0B1020` | write / navigate / call buttons |
| Focus | `--focus-ring` | `#4E93C2` | focus outline |
| Hairline | `--border-hairline` | `#CFC9C0` | table rules, sticky-bar edge |
| Wood | `--wood-500/600` | `#C79A63` / `#A87C48` | decorative rules only |

- **Contrast-corrected roles (deviations from the kit):**
  - The primary button text is `--navy-900` on `--whatsapp-500` (9.4:1).
    White on `#25D366` is 2.0:1 and is forbidden. Hover: `--whatsapp-600`
    with navy text (6.2:1). Press: same surface plus `--press-scale`.
    `--whatsapp-700` is not used as a text surface.
  - `--stone-500` (`#7A7570`, 4.4:1 on cream) is never used for text; it
    may tint decorative rules only. The lightest text on cream is
    `--stone-700`.
  - Wood is never a text colour (3.6:1 on cream) and never a surface; it
    appears only as a 2px rule under section eyebrows and the hours-table
    head.
- Exactly one accent hue for text per surface: blue-700 on cream, ice on
  navy. Coral and lemon (`--coral-600`, `--lemon-300`) are not used in UI;
  they exist in the photos.
- The glow (`--glow-sign`) is applied to the wordmark only, as a static
  `text-shadow`; never to buttons, headings or icons.

### 2.3 Typography

Families: `--font-display` Secular One (wordmark, h1, h2), `--font-body`
Assistant (everything else), `--font-quote` Frank Ruhl Libre (Story body
only — its one appearance; the deliberate risk that gives Irit's passage a
voice without a quote block).

Scale (mobile → ≥900px), all `clamp`ed, nothing below 19px:

| Step | Token | Size | Leading | Use |
|---|---|---|---|---|
| Hero | `--text-hero` | 40 → 72px | 1.1 | wordmark only |
| H1 | `--text-h1` | 32 → 48px | 1.1 | not used below the hero |
| H2 | `--text-h2` | 26 → 34px | 1.1 | section headings |
| H3 | `--text-h3` | 22px, Assistant 700 | 1.28 | hours-table head, footer name |
| Lead | `--text-lead` | 20 → 24px | 1.28 | hero line, offer heading sub-line |
| Body-lg | `--text-body-lg` | 21px | 1.62 | offer body, story body (serif) |
| Body | `--text-body-size` | 19px | 1.62 | default |
| Label | `--text-label` | 18px 600 → **raised to 19px** | 1.28 | eyebrows, button labels |

- Relationships: h2 ≥ 1.35× body; hero ≥ 1.5× h2 on phones; button labels
  = body size, weight 600.
- Display faces are weight 400 with `--track-display` 0.005em; the
  wordmark uses `--track-sign` 0.02em. Never bold Secular One (it has one
  weight); never letterspace Hebrew body text.
- Eyebrows (`גן העיר, תל אביב`) are Assistant 600, `--text-accent`, with a
  2px wood rule 8px below, `--track-label` 0.04em.
- Headings align `start`; no centered text except the hero block and the
  wordmark.

### 2.4 Spacing

4px base: 4 8 12 16 20 24 32 40 48 64 80 96 (`--space-1…24`). Stacks:
`--stack-tight` 12, `--stack` 20, `--stack-loose` 32. Heading→body gap is
`--stack`; body→button gap is `--stack-loose`; numbered lines are separated
by `--stack`. Button internal padding is `--space-4` block × `--space-8`
inline.

### 2.5 Shape and elevation

- Radii: buttons `--radius-pill`; photos `--radius-md` 12px; hours table
  `--radius-lg` 20px; nothing else is rounded. No `--radius-xl` use.
- Elevation is warm and quiet: `--shadow-card` is not used (there are no
  cards); the only shadows are `--shadow-float` on the sticky bar and
  `--glow-sign` on the wordmark. Shadows are never blue-grey.
- Text over photography sits on `--scrim-bottom` (navy gradient 92%→0%);
  never on a flat darkened photo, never with a text-shadow as the only
  protection.

### 2.6 Motion budget

CSS transitions only; no JS-driven motion exists (PRD §3.7).

- Hover: 200ms `--ease-out`, background/colour only; buttons do not lift.
- Press: 120ms, `transform: scale(.985)` plus the hover colour.
- Nothing else transitions: no reveal, no scroll effects, no hero zoom,
  no glow pulse.
- Under reduced motion all of the above are 0ms (see [reduced-motion]).

### 2.7 Component language

- **Buttons.** Pills, `--tap-lg` 64px tall for the primary, `--tap-min`
  56px for secondary and quiet; full width on phones, intrinsic width
  ≥ 200px at ≥600px. Three kinds only: *primary* (green surface, navy
  text), *secondary* (navy surface, ice text), *quiet* (transparent, 2px
  navy border, navy text; on navy surfaces: ice border/text). Labels are
  verbs from PRD §3.5 with no icon except the WhatsApp/phone glyph inline
  before the label at 24px.
- **Icon-only controls** (call icon, social icons): 56×56 hit area, 28px
  glyph, `--text-accent` on cream / ice on navy, `aria-label` in Hebrew.
- **Numbered steps** (How it works): the numeral is Secular One at
  `--text-h2` in `--text-accent`, inline-start of the line; text is body
  size. No circles, no connectors.
- **Hours table.** Two-column, day / time, `--surface-raised` background,
  `--radius-lg`, hairline rows, times as LTR runs. The computed open/closed
  line sits directly above the table in `--text-accent`; when absent the
  table's top margin does not change.
- **Photos grid.** 2 columns <900px, 3 at ≥900px, gap `--space-3`, every
  tile 4:5, `object-fit: cover`, `--radius-md`. Every photo visible by
  vertical scroll; no carousel, no lightbox, no hover state, no caption per
  photo.
- **Links** (reviews, map): `--link` blue-700, underlined, offset 3px,
  thickness 1.5px; never styled as buttons except the three named review /
  navigate / call actions.
- **Sticky bar** (mobile only): `--surface-page` at 85% opacity with
  `--blur-glass`, `--shadow-float`, hairline top edge, `--space-3` padding,
  `padding-bottom` includes `env(safe-area-inset-bottom)`; contains one
  secondary pill and one icon control. Not a second dark band.
- **Hero.** Storefront photo as `background`/`<img>` with `--scrim-bottom`;
  content block bottom-aligned: eyebrow (ice-300) → wordmark (ice-100,
  glow) → hero line (lead, ice-100) → primary button → sub-line
  (ice-300, body). Minimum height 88svh on phones, ≤ 80vh at ≥900px.
- **Footer.** Navy, ice text, three lines (name in `--font-display` at
  `--text-h3` without glow, address, phone) and the social row; social
  icons are the only icons in the footer.

### 2.8 Photography

Photos are launch content from `src/photos.ts`. Warm-lit, clothes-forward,
hands allowed, faces never. No filters, no duotone, no overlays other than
the hero scrim. The hero image is the storefront; grid images are cropped
to 4:5 in CSS, never pre-cropped to match the layout.
