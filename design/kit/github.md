repo: 0xYoyo/briza
branch: main
path: docs/

## Last sync
date: 2026-08-19T09:55:00Z

### Updated in this project
- Read `docs/PRD.md` (v1) and derived the whole system from it: Hebrew RTL, one page, WhatsApp-first.
- Confirmed the repo is spec-only (Astro scaffold, no UI code) — tokens and components were authored here, not imported.
- Owner review round 1: hero CTA de-loudened and de-duplicated, story copy corrected (אירית), icon paths fixed.
- Two hero directions built (photo-dominant, type-dominant) as a template tweak.

## Screen map
| Screen / artifact | Built from |
| --- | --- |
| `ui_kits/website/index.html` + `Site.jsx` | `docs/PRD.md` §3, §5; owner photographs |
| `components/site/WhatsAppBar.jsx` | `docs/PRD.md` §3.2, §5 (wa.me/972524381666) |
| `components/site/HoursTable.jsx` | `docs/PRD.md` §3.6 (opening hours) |
| `components/site/InfoRow.jsx` | `docs/PRD.md` §3.6 (address, phone) |
| `components/site/PhotoGrid.jsx` | `docs/PRD.md` §3.5 (swappable gallery) |
| `components/site/SocialRow.jsx` | `docs/PRD.md` §3.7 (hideable social links) |
| `components/brand/Wordmark.jsx` | `docs/PRD.md` §3.2 (name styled after the sign, no logo) |
| `tokens/*.css` | Owner photographs; `docs/PRD.md` audience constraints |
