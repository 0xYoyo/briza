# Briza (בריזה)

Hebrew RTL single-page website for Briza — a women's clothing store in Gan Ha'Ir, Tel Aviv.

Bootstrap install: this repository starts from a spec (docs/PRD.md), built by the yoyo loop.

## Development

Requires Node 22 (`nvm use` picks it up from `.nvmrc`).

- `npm ci` — install dependencies from the lockfile
- `npm run dev` — start the Astro dev server
- `npm run build` — build the static site into `dist/`

## Deploy

Hosting is **Cloudflare Workers static assets**, connected through the Cloudflare
dashboard's git integration — no GitHub Actions deploy job and no secrets in GitHub.

1. Cloudflare dashboard → **Workers & Pages → Create → import `0xYoyo/briza`**.
2. Build settings: build command `npm run build`, deploy command `npx wrangler deploy`,
   root directory `/`. Node 22 is picked up from `.nvmrc`. The committed `wrangler.jsonc`
   serves `./dist` as static assets.
3. Custom domain: add `briza-tlv.com` under the Worker's **Domains & Routes**.
4. Production deploys from `main`; every pull request gets a preview URL.

Local check without Cloudflare credentials: `npm run build && npm run deploy:check`
(a `wrangler deploy --dry-run` against `wrangler.jsonc`).

Status: build ready for connection (M2-4).
