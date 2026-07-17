# Ravenna Shore Excursions

Independent shore excursions and cruise-port guidance for passengers visiting or sailing from **Porto Corsini** (Ravenna).

**Domain:** https://ravennashoreexcursions.com  
**Worker:** `ravenna-shore-excursions` (Cloudflare Workers Static Assets)  
**Proposition:** Find the best version of your day in Ravenna.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Static export (`output: "export"`, `trailingSlash: true`, `images.unoptimized: true`)
- Cloudflare Workers Static Assets via Wrangler (not Pages)

## Local development

```bash
npm install
npm run dev
```

## Build & QA

```bash
npm run build
npm run check-links
npm run seo-qa
npm run lint
```

## Deploy (approval required)

Do **not** attach custom domains until deployment is approved.

```bash
npm run deploy   # build + wrangler deploy → workers.dev first
```

See `docs/CLOUDFLARE-WORKERS-DEPLOYMENT.md` and `docs/WORKERS-DEPLOY-CHECKLIST.md`.

## Live partner excursions

Three Shore Excursions Group products (affiliate links with `rel="sponsored"`):

1. Post-Cruise Ravenna to Venice Discovery
2. Bologna and San Luca from Porto Corsini
3. Private San Marino Experience from Ravenna

## Content notes

- Ships dock at Porto Corsini — Ravenna historic centre is inland (~15 km / ~30 min).
- Schedules can change; passengers must verify with their cruise line.
- No invented tours, prices, reviews, or transfer guarantees.
