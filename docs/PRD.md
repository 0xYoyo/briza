# Briza (בריזה) — PRD
Version: 1 · Date: 2026-08-05

## 1. One-liner
A Hebrew, RTL, single-page website for Briza — a 40-year-old women's clothing
store in Gan Ha'Ir, Tel Aviv — whose job is to convert local searches and
social-media curiosity into store visits and WhatsApp reservations.

## 2. Problem & audience
The store depends entirely on repeat customers and mall passers-by; it is
invisible online — no website, no Google presence. Its customers (women ~50+,
Tel Aviv area) search Google and Maps before visiting and check WhatsApp
daily. The site is the credibility anchor every other channel (Google
Business Profile, WhatsApp, TikTok/IG/FB) points to.

Product type: **web product** — a static marketing site supporting an offline
retail business; no app logic.

## 3. v1 scope
1. Single-page Hebrew RTL site at the purchased domain, mobile-first (the
   audience arrives from phones), also rendering cleanly on desktop.
2. Hero: storefront photo with the glowing בריזה sign, store name styled
   after the sign (no separate logo), a one-line value proposition, and a
   prominent WhatsApp button (`wa.me/972524381666` with a prefilled Hebrew
   greeting).
3. Story section: 40 years, founded by Dorian (buttons factory → clothing),
   continued by his daughter; warm, personal copy. No owner photo.
4. "What you'll find" section: hand-picked imported stock, sizes 38–54,
   prices from ₪79 (ranges only, no catalog).
5. Photo gallery (6–10 images) rendered from a simple images folder/config so
   photos can be swapped without touching layout.
6. Visit section: address (אבן גבירול 71, קניון גן העיר, קומת כניסה), full
   opening hours (Sun–Thu 9:30–19:00, Fri 9:30–14:00, Sat closed),
   click-to-call phone link, embedded Google Map, and a WhatsApp-group join
   button.
7. Social row: TikTok, Instagram, Facebook links. The site must not break or
   look broken while profiles do not exist yet — links are configurable and
   individually hideable.
8. Local SEO: Hebrew title/meta/OG tags, `LocalBusiness` (ClothingStore)
   JSON-LD with name/address/geo/hours/phone, sitemap.xml, robots.txt, and
   descriptive Hebrew alt texts on all images.
9. Performance: static output, no framework runtime required at view time;
   fast load on mid-range phones.

## 4. Explicitly out of v1 (Later)
1. E-commerce / online checkout of any kind (Shopify explicitly rejected for
   v1 — monthly cost, no online-selling need yet).
2. Product catalog or inventory listing.
3. English or any second language.
4. CMS / admin panel — content changes go through the factory.
5. Blog/content pages for SEO expansion.
6. Analytics platform (GBP insights + WhatsApp joins are the v1 measures).
7. Online reservation system — reservations happen manually in WhatsApp chat.
8. Accessibility statement page (Israeli accessibility regulation exempts
   very small businesses; revisit if the site grows commercial features).

## 5. User experience
One page, top-to-bottom: hero → story → what you'll find → gallery → visit
us (map, hours, WhatsApp) → footer. Sticky or floating WhatsApp button on
mobile. Hebrew only, full RTL. The flow to test: a woman lands from Google
Maps or a TikTok bio on her phone, understands within ~5 seconds what the
store is and where it is, and can tap exactly once to open WhatsApp or
navigation.

## 6. Data & accounts
No user accounts, no forms, no stored data, no cookies requiring consent.
Content (texts, image files, hours, links) lives in the repository. Privacy:
nothing is collected.

## 7. Integrations & services
- **Hosting:** GitHub Pages or Cloudflare Pages (factory's choice) — free
  tier, static hosting, custom-domain support. Fallback: the other one.
- **Domain:** `briza-tlv.co.il` (availability check pending — see Human
  checklist), ~₪60–80/year, the project's only recurring cost.
- **Google Maps:** free embed iframe; no API key.
- **WhatsApp:** `wa.me` deep links + group invite link; free, no API.

## 8. Monetization
N/A — the site sells nothing directly; it exists to increase store revenue.
No payment infrastructure. Unit economics: hosting ₪0, domain ~₪6/month
amortized; marginal cost per visitor ₪0. Commercial measurement lives in the
marketing plan's checkpoints (WhatsApp group joins, GBP actions), not in the
site.

## 9. Validation & go-to-market
The site launches with existing photos immediately; the photo shoot upgrades
it later and never blocks launch. First users are the ~100 existing regulars
(site linked from the WhatsApp-group invite message) plus Google Business
Profile visitors once the profile is verified and linked. The demo-able slice
IS v1 — one page. Before any paid spend: GBP verified and linked, WhatsApp
group live, social profiles created with the site in bio.

## 10. Success criteria
1. Site live at the custom domain, correct RTL rendering on mobile, and all
   links (call, WhatsApp, map, socials) working.
2. Google indexes the site for "בריזה גן העיר" within ~4 weeks of GBP
   linkage.
3. GBP shows website clicks > 0 weekly by week 6.
4. ≥25 WhatsApp group joins attributable to launch month (invite blast +
   site button + register QR).
5. Swapping photos after the shoot requires changing only image files/config,
   no layout work.

## 11. Risks & open questions
- **Domain availability** — `briza-tlv.co.il` may be taken; fallback name
  decided at purchase time (blocks DNS, not the build).
- **Sole-operator risk** — the growth plan leans on the owner's ~40-minute
  per-stock-drop routine; mitigated by a zero-maintenance site and the week-8
  checkpoint in the marketing plan.
- **Content-channel variance** — handled in the marketing plan; the site must
  not depend on social success.
- **Mall constraints** — Gan Ha'Ir may have rules about register signage/QR;
  verify informally (low risk).
- Deferred: whether the site later grows a catalog page fed by stock videos —
  answer only if WhatsApp reservation volume proves demand (~month 4).

## 12. Human checklist
- [ ] Buy domain `briza-tlv.co.il` (or fallback) — blocks the DNS/launch
      step, not the build.
- [ ] Create `briza.ganhair@gmail.com` (or similar) — owns GBP, socials, and
      the domain account. Blocks GBP setup.
- [ ] Convert 052-4381666 to WhatsApp Business (guide provided) — blocks
      group creation.
- [ ] Create + verify Google Business Profile at the store (guide provided) —
      blocks Maps presence; start early, verification can take days.
- [ ] Create TikTok/IG/FB accounts under the business email (guide provided)
      — blocks the social row going live (site can launch with them hidden).
- [ ] Owner approves the Dorian story text before it goes public.
- [ ] Photo session per the shot list (upgrades the site; does not block
      launch).
- [ ] Point domain DNS at hosting when the factory says ready.

## 13. Milestone sketch
- **M1 — Skeleton:** repo scaffold, test suite, CI on pull_request.
  (~2-3 issues)
- **M2 — Full site with current photos:** complete single page per v1 scope,
  deployed to hosting on the custom domain, SEO/JSON-LD included, links
  configurable. (~4-6 issues)
- **M3 — Content upgrade:** swap in shoot photos, final copy polish, social
  links live, Google Search Console submission. (~2-3 issues)
