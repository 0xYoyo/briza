# Briza — Design

Version: 2.1 · Date: 2026-08-28 · v2 (2026-08-27) was rewritten in the
founder-directed makeover PR to match what the page then was; v2.1 is the
founder-directed polish pass, which refines three of its rules — section
sizing ([one-viewport]), surface alternation and photo casting
([photo-used-once]) — and strikes the fixed-distance form of [one-cta]. v1
(2026-08-27) was authored by /yoyo-design from `docs/PRD.md` v2, the
repository and the Claude Design kit at `design/kit/` (tokens only); its
palette, type and floors survive all three versions unchanged. What has
changed each time is layout, and the invariants that described it.

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

### What v2 changed, and why

The v1 rules produced a correct page that read like a Word document on
desktop. Five of them were the cause and are struck or narrowed here; the
rest — contrast, tap targets, honesty, states, motion discipline — are
unchanged, because none of them was the problem.

| v1 rule | v2 | Why |
|---|---|---|
| single column, prose ≤34ch inside 1100px | **struck** — [half-photograph] + `--measure-column` 56ch | The 34ch column in an 1100px box is what made the page a document. |
| [no-badge] — no big-number callout at all | **narrowed** to [no-badge-chip]; the Offer's 10% numeral is sanctioned | The blanket ban left the offer with no visual weight anywhere. |
| [no-card-grid] — Offer and How-it-works must be typographic | **narrowed** to [no-icon-card] | It banned photographs-in-columns along with icon tiles; only the tiles were the smell. |
| [wordmark-once] — crop the sign away, the text wordmark wins | **inverted** to [wordmark-is-photo] | The hero hid the one thing the shoot captured and then re-typed the name beside it. |
| [one-cta] — primary pills ≥1 viewport-height apart | **restated** as "never two green pills visible at once" | The distance rule forced a viewport-tall empty Offer. The reader's screen is the real constraint. |
| [no-auto-motion] — nothing may animate without input | **narrowed** to [motion-on-entry] | One progressive-enhancement reveal is allowed; everything else still may not move. |

### What v2.1 changed, and why

The v2 page was right in kind and loose in composition: panels were sized by
`min-block-size` alone, so each one ran a little past the screen and the next
section peeked in under it, a full-height photograph left its neighbour's
ground continuing beside it at half width, three of the surfaces sat on
near-white, and three photographs were used twice.

| v2 rule | v2.1 | Why |
|---|---|---|
| "Sections are sized by their content, never padded out to a viewport" | **struck** for the five major sections — [one-viewport] | Content-sized panels are what made every boundary look broken. The mosaic, reviews and footer keep the old rule. |
| the Offer panel is sized from `lvh` plus `--cta-clearance` | **replaced** — both sections are one viewport and [one-cta] is held by where each pill sits inside its own section | A panel taller than the screen was the spill; the clearance is now `--hero-cta-inset` vs `--panel-cta-inset`. |
| `--surface-sand` lifts the Offer and Visit panels, cream is everything else | **narrowed** — three warm steps, no two adjacent sections alike | Cream on cream on cream read as a document; the ground now changes at every boundary. |
| "A photograph may carry a panel and appear in the mosaic" | **struck** — [photo-used-once] | A reader who has already seen a frame reads its second appearance as the page running out of material. |
| the mosaic is 2x5 / 3x3 with mixed cell shapes | **restated** — uniform 4:5 cells, two two-row frames | Mixed shapes and a floating heading read as a spreadsheet with a caption. |

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
  icon-only controls (the call icon, social icons) and the review pills. The
  PRD's 56px floor overrides the kit's 44px icon target.
- **[reduced-motion]** Under `prefers-reduced-motion: reduce` all durations
  are 0, `--press-scale` is 1, and the reveal rule set does not exist:
  nothing on the page moves, and nothing is hidden waiting to move.
- **[focus-visible]** Every focusable element shows the 3px `--focus-ring`
  outline with 2px offset on `:focus-visible`; focus is never removed or
  hidden.
- **[logical-props]** Layout uses logical properties only
  (`margin-inline-start`, `padding-block`, `inset-inline-end`, `text-align:
  start`, `order`); no `left`/`right`/`margin-left`/`margin-right`/
  `text-align: right` anywhere in authored CSS. A panel's photograph swaps
  sides with `order`, never with a physical property.
- **[rtl-numerals]** Digits, prices, phone numbers and time ranges are
  isolated LTR runs inside RTL lines (`unicode-bidi: isolate` /
  `<bdi>` / `dir="ltr"` on the span), so `9:30–19:00`, `10%`,
  `052-4381666` and `₪79` never reverse. `₪` precedes the number. An
  isolated run that is also a block gets a wrapper element, so its LTR
  direction never drags the line's alignment with it.
- **[hebrew-only]** No Latin-script UI text is visible on the page. Latin
  appears only in URLs, `alt`-less decorative assets, and the `<head>`.
- **[no-layout-shift]** Every image declares its aspect ratio (or width and
  height) so nothing reflows while photos or fonts load; the mosaic's row
  height comes from the container's aspect ratio, not from the images.
  Webfonts load with `font-display: swap` and a metric-compatible fallback
  (`"Arial Hebrew", system-ui`).
- **[no-emoji]** No emoji anywhere on the page, in any state.

### States (every surface has a designed answer)

- **[loading-state]** Photos below the fold are `loading="lazy"` with a
  `--surface-raised` placeholder at the final aspect ratio; the hero photo
  is eager and has a `--navy-900` background so the scrim and the hero line
  are readable before the image arrives.
- **[no-js-state]** With JavaScript disabled or failed, the page is complete:
  the open/closed line is simply absent, every revealed block is simply
  visible, and the hours table stands alone. No spinner, no placeholder
  text, no reserved empty row.
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

- **[one-cta]** No two WhatsApp-green pills may be visible in the same
  viewport at any scroll position, at any viewport height. This is a rule
  about the reader's screen, not a fixed distance. Since the hero and the
  Offer are one viewport each ([one-viewport]), the rule is held by where
  each pill sits inside its own section: the hero's pill clears the hero's
  lower edge by `--hero-cta-inset`, which is at least the Offer pill's own
  inset (`--panel-cta-inset`) plus the pill's height, so the gap between
  them is never less than one screen. Primary pills are never side by side
  and never in the sticky bar.
- **[green-is-join]** WhatsApp green (`--whatsapp-*`) appears only on the
  "join the updates group" button. "Write to Irit", "call", "navigate" and
  the review pills are never green, even though two of them open WhatsApp.
- **[one-viewport]** At ≥900px every major section — hero, Offer, How it
  works, Story, Visit — is exactly one small viewport tall (`--section-lock`,
  100svh): never taller, so the next section can never peek in under it, and
  never shorter, so a neighbour's ground can never continue beside a
  full-height photograph at half width. Its content is centred in that height
  (the Offer's column is held at the panel's lower edge instead, which is
  what [one-cta] is measured against) and clipped to it: a panel photograph
  is `object-fit: cover` inside an `overflow: hidden` column. Nothing may
  overflow a locked section — no heading is ever cut at any scroll position.
  The photo mosaic, the reviews band and the footer are exempt and are sized
  by their content, but they still start flush: no section ever leaves a
  strip of its own ground above the one below it. On a window shorter than
  640px the sections flow at their content height instead — a clipped
  heading is worse than a long page.
- **[photo-used-once]** Every photograph in `src/photos.ts` is cast into
  exactly one role. No file appears twice on the page in any crop: not a
  panel and the mosaic, not a step and the mosaic. If the page needs more
  frames than the shoot has, the answer is another shoot, not a second crop
  of a picture the reader has already passed.
- **[sticky-secondary]** The mobile sticky bar carries only the secondary
  "write to Irit" action and the call icon; it never contains the join
  button, never grows past 80px tall, and is hidden at ≥900px. The hero
  reserves its height, so the hero's own pill is never underneath it.
- **[no-overlay]** No modal, popup, cookie banner, lightbox, exit-intent,
  chat bubble, or floating widget of any kind. The sticky bar is the only
  fixed element.
- **[wordmark-is-photo]** The photographed sign is the wordmark. Wherever
  the storefront photograph renders, nothing else on that screen paints the
  store name: the hero crops so the whole sign is in frame at every viewport
  and the `<h1>` is visually hidden (clipped, never `display: none`, so it
  stays in the accessibility tree and in the document outline). The name may
  be painted as text only where the photograph is not — the Story title and
  the footer.
- **[story-owns-38-54]** The 38–54px display band belongs to the Story title
  alone. Every other display step clears it: the Offer numeral's floor is
  above 54px and every heading's ceiling is below 38px, at every viewport
  width. A second large word anywhere is a second wordmark.

### Content-as-design (from PRD §5.1, promoted to invariants)

- **[half-photograph]** Every section between the hero and the reviews band
  is roughly half photograph. At ≥900px a panel is a 50/50 split with the
  photograph full-bleed to the viewport edge on its side and a reading
  column of `--measure-column` (50–60ch) vertically centred on the other;
  consecutive panels put the photograph on opposite sides. Below 900px the
  panel stacks, photograph over text, photograph still edge to edge. No
  section is text alone.
- **[no-icon-card]** No icon+title+text cards, no three-up feature tiles, no
  bordered or shadowed box per item. A column of photograph + numeral +
  sentence is not a card and is the intended form for How it works.
- **[no-testimonial]** No quote block, star row, review excerpt, avatar, or
  rating number anywhere. Social proof is two links.
- **[review-pills]** The review links are pill-shaped link-buttons on the
  inverse band — pale surface, navy text, ≥56px tall, no underline. They are
  never bare underlined text and never green.
- **[no-badge-chip]** Sizes, prices and "40 years" appear only inline in
  running text; never as a badge, pill, chip or stat tile. The single
  sanctioned big number is the Offer's `10%`, which is the heading's own
  first word at display size — not a separate element, and never repeating a
  sentence set beside it.
- **[photos-of-clothes]** Every photograph below the hero shows clothes or
  hands with clothes. The one exception is the Visit panel, which shows the
  shopfront from the mall corridor because finding the door is that panel's
  job; no ceilings, doorframes, empty interiors, or the owner.
- **[caption-static]** Photo and section captions never imply recency or
  schedule: no "new", "this week", "just in", "updated".

### Anti-patterns (must never look like)

- **[not-template]** No generic-SaaS tells: no gradient text, no glass
  cards with 1px white borders, no purple/indigo, no terracotta-on-cream
  default accent, no gradient-blob or shape decor, no isometric or 3D
  illustration, no stock icon sets in circles, no "trusted by" rows.
- **[not-fast-fashion]** No urgency devices: no countdowns, "last items",
  strikethrough prices, sale tags, red discount stickers, or marquee text.
  A neighbouring shop's price signage is cropped out of any photograph.
- **[not-catalog]** Photos are never accompanied by product names, prices,
  sizes or "shop" affordances; the mosaic has no hover overlay, no zoom, no
  lightbox and no per-photo link.
- **[not-dark-mode]** The page has exactly one theme. It does not respond
  to `prefers-color-scheme`; the palette below is fixed.
- **[motion-on-entry]** The only motion that happens without a pointer or
  keyboard action is a one-shot fade-and-rise the first time a block scrolls
  into view. It is progressive enhancement: the hidden state exists only
  under a class the script adds, nothing above the fold is marked, a block
  the reader has already scrolled past reveals anyway, and under reduced
  motion the whole rule set is absent. Nothing else: no parallax, no autoplay
  carousel, no pulsing glow, no animated gradient, no repeat on re-entry.

---

## 2. Direction system

**Case: owned pages** (stated above). One page, Hebrew RTL, fixed single
theme, mobile-first, readers ~50+. The direction is *the shop is the
layout*: the black fascia with its ice-blue glowing lettering supplies the
inverse surfaces and the wordmark itself; the cream, lit interior and wood
rails supply the reading surfaces; the clothes supply all colour — and the
photographs of them supply the page's structure, not its decoration. Source
of palette and type: `design/kit/` tokens (Claude Design, 2026-08-21),
sampled from the storefront photographs; compositions and copy from that kit
are not adopted.

### 2.1 Surfaces and rhythm

- **Alternating panels.** Below the hero the page is a sequence of split
  panels ([half-photograph]) separated by two full-width sections — How it
  works and the photo mosaic — and closed by the reviews band and footer.
- **Inverse anchors.** Three inverse blocks: the hero (photo + scrim over
  navy), the reviews band on `--surface-inverse-2` (navy-800) and the footer
  on `--surface-inverse` (navy-900). The two adjacent inverse blocks
  separate by their own step in value, never by a divider.
- **Three warm steps, alternating.** `--surface-sand-deep` (sand-300),
  `--surface-sand` (cream-200) and `--surface-page` (cream-50) are used so
  that **no two adjacent sections share a ground** and no section reads as
  plain white: Offer sand-deep, How it works sand, Story cream with its
  reading column on a sand block, mosaic sand, Visit sand-deep, then the two
  inverse blocks. `--surface-raised` (cream-100) stays an object surface —
  the hours table, image placeholders — not a section ground. No section is
  white (`--white`); white is reserved for the sticky bar's glass tint and
  button text.
- The Story is the one section on the page cream, and it carries a
  `--surface-sand` block behind its reading column: a field, not a card —
  square corners, no border, no shadow ([no-icon-card]).
- Sections are separated by vertical rhythm (`--section-y` 64px on phones,
  `--section-y-lg` 96px at ≥900px), by a locked section's own edge
  ([one-viewport]) or by a change of ground, never by borders, dividers or
  angled edges. A hairline (`--border-hairline`, 1px) is
  used only inside the hours table and above the sticky bar.
- Panel columns hold `--measure-column` 56ch and sit inside `--pane-pad`
  (32→88px). Full-width sections keep `--content-max` 1100px with `--gutter`
  20px / `--gutter-wide` 40px; the mosaic and every panel photograph ignore
  both and run to the viewport edge.
- Text on inverse surfaces is `--text-on-inverse` (ice-100), muted lines
  `--text-on-inverse-muted` (ice-300). Never white on navy.

### 2.2 Color roles

| Role | Token | Hex | Rule |
|---|---|---|---|
| Page surface | `--surface-page` | `#FDFAF5` | default section background |
| Lifted surface | `--surface-sand` | `#EFE5D3` | How it works, mosaic, Story's text block |
| Deep surface | `--surface-sand-deep` | `#E0CDAE` | Offer and Visit panels |
| Placeholder | `--surface-raised` | `#F7F1E6` | image placeholders, hours table — never a section ground |
| Inverse surface | `--surface-inverse` | `#0B1020` | hero ground, footer |
| Inverse surface 2 | `--surface-inverse-2` | `#131B31` | reviews band |
| Body text | `--text-body` | `#1A1A1A` | all running text on cream |
| Muted text | `--text-muted` | `#4A4A4A` | hours rows, address, meta |
| Accent text | `--text-accent` | `#1E4685` | eyebrows, numerals, links |
| Text on inverse | `--text-on-inverse` | `#F0F7FC` | hero line, footer |
| Muted on inverse | `--text-on-inverse-muted` | `#AFD5EC` | hero eyebrow, footer meta |
| Primary action | `--action-primary` | `#25D366` | join button surface only |
| Secondary action | `--action-secondary` | `#0B1020` | write / navigate / call buttons |
| Review pill | `--ice-200` | `#D5E9F6` | review pills on the inverse band |
| Focus | `--focus-ring` | `#4E93C2` | focus outline |
| Hairline | `--border-hairline` | `#CFC9C0` | table rules, sticky-bar edge |
| Wood | `--wood-500` | `#C79A63` | the hours-table head rule, nothing else |

- **Contrast-corrected roles (deviations from the kit):**
  - The primary button text is `--navy-900` on `--whatsapp-500` (9.4:1).
    White on `#25D366` is 2.0:1 and is forbidden. Hover: `--whatsapp-600`
    with navy text (6.2:1). Press: same surface plus `--press-scale`.
    `--whatsapp-700` is not used as a text surface.
  - Review pills are `--navy-900` on `--ice-200` (14.4:1).
  - `--stone-500` (`#7A7570`, 4.4:1 on cream) is never used for text; it
    may tint decorative rules only. The lightest text on cream is
    `--stone-700`.
  - Wood is never a text colour (3.6:1 on cream) and never a surface; its
    one appearance is the 2px rule under the hours-table head.
- Exactly one accent hue for text per surface: blue-700 on cream, ice on
  navy. Coral and lemon (`--coral-600`, `--lemon-300`) are not used in UI;
  they exist in the photos.
- The glow (`--glow-sign`) is not applied to any text: the sign in the
  photograph glows on its own. The token stays for a future re-typeset
  wordmark and must not be attached to buttons, headings or icons.

### 2.3 Typography

Families: `--font-display` Secular One (hero line, headings, numerals),
`--font-body` Assistant (everything else), `--font-quote` Frank Ruhl Libre
(Story body only — its one appearance; the deliberate risk that gives Irit's
passage a voice without a quote block).

Scale (mobile → ≥900px), all `clamp`ed, nothing below 19px. The 38–54px band
is reserved ([story-owns-38-54]):

| Step | Token | Size | Leading | Use |
|---|---|---|---|---|
| Numeral | `--text-numeral` | 60 → 112px | 0.92 | the Offer's `10%` only |
| Story title | `--text-story-title` | 38 → 54px | 1.1 | the Story heading only |
| Hero line | `--text-hero-line` | 22 → 34px | 1.28 | the hero's one line |
| H2 | `--text-h2` | 26 → 34px | 1.1 | section and panel headings |
| H3 | `--text-h3` | 22px, Assistant 700 | 1.28 | hours-table head, footer name |
| Story body | `--text-story-body` | 21 → 24px | 1.62 | Story serif passage |
| Body-lg | `--text-body-lg` | 21px | 1.62 | offer body |
| Body | `--text-body-size` | 19px | 1.62 | default |
| Label | `--text-label` | 19px 600 | 1.28 | eyebrows, button and pill labels |

- Relationships: the numeral ≥ 2× h2; story title ≥ 1.4× h2; h2 ≥ 1.35×
  body; button labels = body size, weight 600.
- Display faces are weight 400 with `--track-display` 0.005em. Never bold
  Secular One (it has one weight); never letterspace Hebrew body text.
- Eyebrows (`גן העיר, תל אביב`) are Assistant 600, `--track-label` 0.04em,
  `--text-accent` on cream and `--text-on-inverse-muted` on navy.
- Headings align `start`. Nothing on the page is centred, including the
  hero block, which sits bottom-start.

### 2.4 Spacing

4px base: 4 8 12 16 20 24 32 40 48 64 80 96 (`--space-1…24`). Stacks:
`--stack-tight` 12, `--stack` 20, `--stack-loose` 32. Heading→body gap is
`--stack`; body→button gap is `--stack-loose`; step columns are separated by
`--space-6` at ≥900px and `--space-10` stacked. Button internal padding is
`--space-4` block × `--space-8` inline. Mosaic seams are `--mosaic-gap` 8px.

### 2.5 Shape and elevation

- Radii: buttons and review pills `--radius-pill`; step photos
  `--radius-md` 12px; hours table `--radius-lg` 20px; nothing else is
  rounded — panel photographs and mosaic frames are square-cornered because
  they are the page's edges, not objects on it.
- Elevation is warm and quiet: `--shadow-card` is not used (there are no
  cards); the only shadow is `--shadow-float` on the sticky bar. Shadows are
  never blue-grey.
- Text over photography sits on a navy scrim covering the lower third of the
  frame and landing on the navy ground — `--scrim-hero` (95%→0%) where the
  ground is the lit interior, `--scrim-bottom` (92%→0%) otherwise;
  never on a flat darkened photo, never with a text-shadow as the only
  protection.

### 2.6 Motion budget

CSS transitions plus one IntersectionObserver ([motion-on-entry]).

- Hover: 200ms `--ease-out`, background/colour only; buttons do not lift.
- Press: 120ms, `transform: scale(.985)` plus the hover colour.
- Reveal: `--dur-slow` 420ms `--ease-out`, opacity 0→1 and a 14px rise,
  once per block, first entry only.
- Nothing else transitions: no scroll effects, no hero zoom, no glow pulse.
- Under reduced motion all of the above are 0ms and the reveal rule set is
  not emitted at all (see [reduced-motion]).

### 2.7 Component language

- **Split panel.** Photograph (full-bleed, `object-fit: cover`, its crop
  named per role in `src/photos.ts`) beside a reading column; sides
  alternate by `order`; stacked below 900px at a per-panel aspect ratio.
  A panel that carries a join pill holds its whole column — heading, sentence
  and pill — at the panel's lower edge, so the open field above it reads as a
  poster rather than as a void between two blocks.
- **Buttons.** Pills, `--tap-lg` 64px tall for the primary, `--tap-min`
  56px for secondary and quiet; full width on phones, intrinsic width
  ≥ 200px at ≥600px, shrinking to content where three actions share a row.
  Three kinds only: *primary* (green surface, navy text), *secondary* (navy
  surface, ice text), *quiet* (transparent, 2px navy border, navy text; on
  navy surfaces: ice border/text). Labels are verbs from PRD §3.5 with no
  icon except the WhatsApp/phone glyph inline before the label at 24px.
- **Icon-only controls** (call icon, social icons): 56×56 hit area, 28px
  glyph, `--text-accent` on cream / ice on navy, `aria-label` in Hebrew.
- **Numbered steps** (How it works): a 4:3 photograph, then the numeral in
  Secular One at `--text-h2` in `--text-accent` at the inline-start of its
  sentence. No circles, connectors, boxes or icons.
- **Hours table.** Two-column, day / time, `--surface-raised` background,
  `--radius-lg`, hairline rows, times as LTR runs. The computed open/closed
  line is absolutely positioned in the gap above the table in
  `--text-accent`, so the table sits at the same place with or without
  JavaScript.
- **Photo mosaic.** Full-bleed, one `--mosaic-gap` seam everywhere, cells
  placed by hand: 2 columns × 3 rows below 900px, 3 × 2 at ≥900px. Every cell
  is the same upright 4:5 frame; exactly two of them run two rows tall, at
  fixed positions (the outer columns at ≥900px, opposite columns offset by a
  row on phones), and those two are always frames whose subject survives a
  two-row crop. Row height comes from the container's aspect ratio. The
  heading sits on the grid — inside the first column's inline edge, one
  `--space-12` above the first row — not in the page's centred column.
  Each frame names its own `object-position` so no cell decapitates a
  garment. [not-catalog] no caption, link, hover state or overlay per frame.
- **Links** (map, phone): `--link` blue-700, underlined, offset 3px,
  thickness 1.5px; never styled as buttons except the named review /
  navigate / call actions.
- **Sticky bar** (mobile only): `--surface-page` at 85% opacity with
  `--blur-glass`, `--shadow-float`, hairline top edge, `--space-3` padding,
  `padding-bottom` includes `env(safe-area-inset-bottom)`; contains one
  secondary pill and one icon control. Not a second dark band.
- **Hero.** Full-screen storefront photograph, cropped so the whole sign is
  in frame; scrim over the lower third; content bottom-start: eyebrow
  (ice-300) → hero line (display face, ice-100) → primary button. Below
  900px the photograph takes every pixel the content block does not need and
  the content sits on the navy ground beneath it, minus the sticky bar's
  reserved height; at ≥900px the photograph is the whole viewport and the
  content overlays the scrim.
- **Reviews band.** One inverse row: the heading at the inline-start, two
  review pills at the inline-end, stacked below 900px.
- **Footer.** Navy, ice text, one compact row at ≥900px — name in
  `--font-display` at `--text-h3`, address, phone, then the social row
  pushed to the inline-end — stacked below 900px. Social icons are the only
  icons in the footer.

### 2.8 Photography

Photos are launch content from `src/photos.ts`, which names every role (hero,
offer, three steps, story, visit) and the mosaic list, each with Hebrew alt
text and the `object-position` its crop needs. Warm-lit, clothes-forward,
hands allowed, faces never. No filters, no duotone, no overlays other than
the hero scrim. Files are never pre-cropped to the layout: a role's crop is
CSS, so swapping a file is a one-line change (PRD §10.5). [photo-used-once] a file
carries exactly one role: a photograph that carries a panel or a step is
never also in the mosaic, in any crop. A full-bleed panel needs a frame with
depth and colour across it — a flat single-garment product shot cannot carry
one, and belongs in a step column or a mosaic cell.
