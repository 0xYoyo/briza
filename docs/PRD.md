# Briza (בריזה) — PRD
Version: 2 · Date: 2026-08-26
Supersedes v1 (2026-08-05). v2 reconciles the PRD with every decision made in
the 2026-08-24/26 sessions: site direction, page content and copy, facts
register, hosting, DESIGN.md gate, milestone restructure, checklist state.

## 1. One-liner
A Hebrew, RTL, single-page website for Briza — a ~40-year-old women's clothing
store in Gan Ha'Ir, Tel Aviv — whose single job is to turn visitors into
members of the store's WhatsApp updates group, and secondarily into WhatsApp
reservations and store visits.

## 2. Problem & audience
The store depends on repeat customers and mall passers-by; it is invisible
online. Its customers (women ~50+, Tel Aviv area) search Google and Maps
before visiting and check WhatsApp daily. The business goal behind the site is
revenue (baseline ~₪60K/month; target: double). The cheapest lever is getting
the ~100 regulars to return more often, which is what the WhatsApp updates
group does. The site exists to feed that group and to anchor Google Business
Profile, TikTok and WhatsApp with one credible home.

Product type: **web product** — a static marketing site supporting an offline
retail business; no app logic beyond one computed open/closed line.

### 2.1 Hard product constraints (binding for every milestone)
1. **Zero recurring maintenance.** After launch nobody edits the site on a
   schedule. No section may depend on anyone posting anything anywhere. No
   "new arrivals", no feeds, no embeds of social content. Content changes go
   through the factory as one-off changes only.
2. **No catalog, no e-commerce.** Photos are launch content, not inventory.
3. **Honest facts only.** Every fact on the page must appear in §3.4 (facts
   register). No fabricated quotes, no solicited quotes from the owner, no
   invented dates or services.
4. **The owner is a private person.** Named once (אירית), no owner photo, no
   features that treat her as a brand persona.
5. **Incentives need no infrastructure.** The 10% offer is verified in person
   by the owner (customer shows the group on her phone). No codes, no forms.

## 3. v1 scope

### 3.1 Page structure (top to bottom, mobile-first)
1. **Hero** — storefront photo with the glowing בריזה sign (scrimmed), store
   name as text styled after the sign (no separate logo file), one-line
   value line, ONE primary button: join the WhatsApp updates group. Sub-line
   under the button: the 10% first-purchase offer in one clause.
2. **Offer** — a full section, not a footnote: the 10% first-purchase
   discount for group members, what the group is (silent, admin-only, new
   stock appears there first), and how the discount is claimed (show the
   group at the register). Primary button repeated.
3. **How it works** — three short numbered lines: owner posts new stock in
   the group → customer writes "שמרי לי" → she reserves it in the store; come
   try it on, no obligation. Secondary button: write to Irit (WhatsApp chat).
4. **Story** — short, owner-centered (אירית is the protagonist; her father
   Dorian gets one warm line). No photo of the owner.
5. **Photos** — 6–10 launch photos of CLOTHES (racks, prints, hand holding an
   item on a hanger), rendered from a config list so files can be swapped
   without layout work. Caption "מהמדפים שלנו" — never "new" or "this week".
6. **Visit** — address, opening hours table, computed open/closed line
   (§3.3), map link + navigate button, click-to-call, and the primary join
   button once more.
7. **Google reviews** — two links: read reviews on Google, write a review.
   No quotes reproduced on the page; the links are the social proof.
8. **Footer** — name, address, phone, social links (configurable, each
   individually hideable; only TikTok is expected at launch).

A sticky bottom bar on mobile carries the secondary "write to Irit" WhatsApp
action and a call icon; the primary join action lives in the sections, not
the bar, so the page has exactly one loud CTA at a time.

### 3.2 Links & actions
- **Join group:** `GROUP_INVITE_URL` (WhatsApp group invite link). **Fallback
  while unset:** the join button opens a WhatsApp chat to the owner with a
  prefilled Hebrew message asking to be added to the updates group. The site
  never shows a dead or empty button.
- **Write to Irit:** `wa.me/972524381666` with a prefilled Hebrew greeting.
- **Call:** `tel:` link to the owner's number 052-4381666 (the number she
  answers). The landline 03-5279187 appears in JSON-LD only.
- **Navigate:** Google Maps link to the store (`MAPS_URL`).
- **Reviews:** `GBP_REVIEWS_URL` (read) and `GBP_WRITE_REVIEW_URL` (write).
- **Socials:** `TIKTOK_URL`, `INSTAGRAM_URL`, `FACEBOOK_URL` — each rendered
  only when non-empty.
All of the above live in `src/constants.ts` alongside `STORE_NAME`.

### 3.3 Computed open/closed line (the only dynamic element)
Derived at view time in the browser from a single `HOURS` constant (the same
one that feeds JSON-LD), in the `Asia/Jerusalem` time zone via
`Intl.DateTimeFormat` (DST-safe). Never hand-edited.
- Open: `פתוח עכשיו · אירית עונה בוואטסאפ`
- Closed: `סגור עכשיו · נפתח {יום} ב־{שעה}` (next opening computed from
  `HOURS`, including Friday→Sunday).
Without JavaScript the line is simply absent; the hours table stands alone.

### 3.4 Facts register (the only facts allowed on the page)
Source: founder (F) or founder-confirmed on 2026-08-26 (F26).
- Store name בריזה; women's clothing; Gan Ha'Ir mall, אבן גבירול 71, תל
  אביב, entrance floor. (F)
- Roughly forty years in business; founded by the owner's father Dorian; the
  owner אירית runs it today. (F) The exact founding year is NOT confirmed —
  do not print a year.
- Imported, hand-picked stock, small quantities, no big brands. (F)
- Sizes 38–54. (F) Prices from ₪79, most items ₪79–~₪400. (F)
- Hours: Sun–Thu 9:30–19:00, Fri 9:30–14:00, Sat closed. (F)
- Owner's WhatsApp 052-4381666; she answers it herself during store hours.
  (F26)
- Store landline 03-5279187 (JSON-LD/GBP only). (F)
- 10% discount on the first purchase for WhatsApp-group members, verified
  by showing the group at the register. (F26)
- Fitting help in store. NOT tailoring — never say התאמה/תיקונים. (F)
- Stock renews often but on no schedule — never say "weekly". (F)

### 3.5 Page copy (v1, founder-approved via this PR)
Conventions: Hebrew only, second-person feminine plural, warm and factual,
no superlatives, no urgency, digits/prices/phones LTR inside RTL lines, no
emoji on the site.

**Hero**
- Eyebrow: `גן העיר, תל אביב`
- Title: `בריזה`
- Line: `בגדי נשים מיובאים, נבחרים ביד, במידות 38–54. ואירית שעונה לכן באהבה.`
- Primary button: `הצטרפו לקבוצת העדכונים`
- Sub-line: `10% הנחה על הקנייה הראשונה לחברות הקבוצה`

**Offer**
- Heading: `10% הנחה על הקנייה הראשונה`
- Body: `קבוצת הוואטסאפ של בריזה היא קבוצה שקטה — רק אירית כותבת בה, וכל סחורה חדשה מופיעה שם ראשונה. הצטרפו, ובקנייה הראשונה בחנות הראו בקופה שאתן בקבוצה ותקבלו 10% הנחה.`
- Button: `הצטרפו לקבוצת העדכונים`

**How it works**
- Heading: `איך זה עובד`
- 1: `אירית מעלה לקבוצה תמונות של סחורה חדשה, עם מידות ומחיר.`
- 2: `ראיתן משהו? כתבו לה ״שמרי לי״ — והיא שומרת לכן אותו בחנות.`
- 3: `באות למדוד בנחת, בלי התחייבות.`
- Secondary button: `כתבו לאירית`

**Story**
- Heading: `בריזה`
- Body: `את בריזה פתח אבא של אירית, דוריאן, לפני כארבעים שנה. היום אירית מנהלת אותה בעצמה: בוחרת כל פריט ביד, מזמינה בכמויות קטנות, ועונה לכן בעצמה בוואטסאפ. בלי מותגים גדולים ובלי אופנה מהירה — בגדים יפים שנוח ללבוש, במחירים שמתחילים ב־₪79. אצלנו לא ממהרים.`

**Photos** — Heading: `מהמדפים שלנו`

**Visit**
- Heading: `גן העיר, קומת כניסה`
- Address line: `אבן גבירול 71, קניון גן העיר, תל אביב`
- Hours rows: `ראשון–חמישי 9:30–19:00` · `שישי 9:30–14:00` · `שבת סגור`
- Buttons: `נווטו לחנות` · `התקשרו` · `הצטרפו לקבוצת העדכונים`

**Reviews**
- Heading: `מה אומרות עלינו`
- Links: `לביקורות בגוגל` · `כתבו לנו ביקורת`

**Sticky bar (mobile):** `כתבו לאירית` + call icon.

**Prefilled WhatsApp messages (customer → owner)**
- Write to Irit: `שלום אירית, הגעתי מהאתר של בריזה ואשמח לשאול על פריט.`
- Join fallback (while `GROUP_INVITE_URL` is empty): `שלום אירית, אשמח להצטרף לקבוצת העדכונים של בריזה.`

### 3.6 Local SEO
Hebrew title/meta/OG tags, `ClothingStore` JSON-LD (name, address, geo,
hours from `HOURS`, both phones, sameAs for non-empty social URLs),
sitemap.xml, robots.txt, descriptive Hebrew alt text on every image.

### 3.7 Performance & floors
Static output; the only script is the open/closed line. Fast on mid-range
phones. WCAG AA contrast, 19px body baseline, tap targets ≥56px, reduced
motion honored, full RTL via logical CSS properties.

## 4. Explicitly out of v1 (Later)
1. E-commerce / checkout of any kind.
2. Product catalog or inventory listing.
3. English or any second language.
4. CMS / admin panel — content changes go through the factory.
5. Blog/content pages.
6. Analytics platform (GBP insights + WhatsApp group joins are the measures).
7. Online reservation system — reservations happen in WhatsApp chat.
8. Accessibility statement page (very small business exemption; revisit if
   the site grows commercial features).
9. Any embedded social feed (TikTok/Instagram) — rejected: posting dependency,
   third-party widget, violates §2.1.
10. Any "new arrivals" / periodically refreshed section — rejected (§2.1).

## 5. User experience
One page, top-to-bottom per §3.1. Hebrew only, full RTL. The flow to test: a
woman lands from Google Maps, a TikTok bio or a WhatsApp forward on her
phone, understands within ~5 seconds what the store is, where it is, and what
she gets for joining the group, and can tap exactly once to join, write, call
or navigate.

### 5.1 Design-binding decisions (input to docs/DESIGN.md)
These are settled and are not re-litigated in the design session:
- Scrimmed photo hero: KEEP (founder's call).
- Exactly one primary CTA visible at a time; the sticky bar carries the
  secondary action only.
- No icon-card grids and no template "feature cards"; the offer and
  how-it-works sections are typographic, with photography carrying warmth.
- No pull-quote / testimonial block of any kind.
- On mobile the photo sign and the text wordmark must not both read as the
  store name at once (avoid the double-בריזה).
- Sizes 38–54 appear in the hero line and story, never as a badge.
- Palette and type are harvested from the Claude Design kit committed at
  `design/kit/` (navy/ice + cream/wood, Secular One / Assistant / Frank Ruhl
  Libre, glow token, 56–64px targets); the kit's compositions and example
  copy are NOT adopted.
- Photographs are of clothes and hands, not of ceilings and doorframes.

## 6. Data & accounts
No user accounts, no forms, no stored data, no cookies requiring consent.
Content (texts, image files, hours, links) lives in the repository. Privacy:
nothing is collected.

## 7. Integrations & services
- **Hosting:** Cloudflare Pages (decision 2026-08-26: the domain is already at
  Cloudflare, so custom-domain DNS is one click). Free tier, static output,
  auto-deploy from `main` via the GitHub integration; preview deploys per PR.
  Fallback: GitHub Pages.
- **Domain:** `briza-tlv.com`, registered at Cloudflare (purchased; the
  project's only recurring cost, ~₪40–60/year).
- **Google Maps:** plain link + navigate deep link; no embed, no API key.
- **WhatsApp:** `wa.me` deep links + group invite link; free, no API.
- **Google Business Profile:** verified, owned by `briza.ganhair@gmail.com`;
  the site URL is entered there at launch.

## 8. Monetization
N/A — the site sells nothing directly; it exists to grow the WhatsApp group
and store revenue. Hosting ₪0, domain ~₪5/month amortized. The 10% offer is
the only cost and is incurred only on a completed first purchase.

## 9. Validation & go-to-market
The site launches with the current photo set (already shot). First users are
the ~100 regulars (site linked from the group invite and pinned post) plus
GBP visitors. Before any paid spend: WhatsApp group live, GBP linked to the
site, TikTok bio pointing at the site.

## 10. Success criteria
1. Site live at `briza-tlv.com`, correct RTL on mobile, all links (join,
   write, call, navigate, reviews, socials) working; no dead buttons while
   `GROUP_INVITE_URL` is unset.
2. Google indexes the site for "בריזה גן העיר" within ~4 weeks of GBP
   linkage.
3. GBP shows website clicks > 0 weekly by week 6.
4. ≥25 WhatsApp group joins attributable to launch month (invite blast +
   site button + register QR).
5. Swapping photos or any link requires changing only files/constants, no
   layout work; nobody edits the site on a schedule.

## 11. Risks & open questions
- **Group not yet created** at build time — mitigated by the join fallback
  (§3.2); `GROUP_INVITE_URL` is filled by a one-line change when it exists.
- **Sole-operator risk** — the growth plan leans on the owner's per-stock-drop
  routine; the site adds zero to her workload by construction.
- **Content-channel variance** — the site does not depend on social success
  (§4.9).
- **Mall constraints** — Gan Ha'Ir may have rules about register signage/QR;
  verify informally (low risk).
- Deferred: a catalog page only if WhatsApp reservation volume proves demand
  (~month 4).

## 12. Human checklist
- [x] Buy the domain — `briza-tlv.com` at Cloudflare.
- [x] Create the business Gmail — `briza.ganhair@gmail.com`.
- [x] Create + verify Google Business Profile — verified.
- [ ] Add founder's personal Gmail as GBP manager (2 min, not blocking).
- [ ] Upload the launch photos to GBP.
- [ ] Convert 052-4381666 to WhatsApp Business (guide provided) — blocks
      group creation. TOP PRIORITY: pure revenue, zero code.
- [ ] Create the silent updates group; paste its invite link into
      `GROUP_INVITE_URL`; send the invite blast.
- [ ] Fix the existing TikTok page (business account, bio with site + "להזמנות
      בוואטסאפ"); paste URL into `TIKTOK_URL`. IG/FB later, hidden until then.
- [ ] Commit the launch photos to `public/photos/` and the design kit to
      `design/kit/` (upstream material for DESIGN.md).
- [ ] Connect the repo to Cloudflare Pages and add the custom domain when the
      factory says the build is ready.
- [ ] Print the two register signs (reviews QR + group QR).

## 13. Milestones
- **M1 — Skeleton:** repo scaffold, test suite, CI. DONE (PRs #1–#6).
- **Gate:** `docs/DESIGN.md` authored by /yoyo-design from this PRD + the kit,
  merged before M2 is spec'd.
- **M2 — Full site, deployed:** the complete page per §3 with the committed
  photos and copy, `src/constants.ts` carrying every link/hour/fact,
  computed open/closed line with unit tests, SEO/JSON-LD/sitemap/robots,
  Cloudflare Pages deploy on `briza-tlv.com`, Playwright check that every
  action link resolves. (~4–6 issues, one milestone.)
- **M3 — Post-launch links:** fill `GROUP_INVITE_URL`/social URLs as they
  exist, Search Console submission. (~1 issue; mostly manual.) The former
  "content upgrade" milestone is retired — the shoot happened before M2.
