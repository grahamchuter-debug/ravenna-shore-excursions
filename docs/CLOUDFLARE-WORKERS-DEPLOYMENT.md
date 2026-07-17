# Cloudflare Workers Static Assets — Network Deployment Standard

**Version:** 1.0  
**Effective date:** 2026-07-17  
**Reference implementation:** Palma Shore Excursions (`palma-shore-excursions`)  
**Status:** Official standard for all **new** destination websites  

This document is the **single source of truth** for deploying static Next.js destination sites on Cloudflare Workers Static Assets.

Related files:

| File | Purpose |
|------|---------|
| [WORKERS-DEPLOY-CHECKLIST.md](./WORKERS-DEPLOY-CHECKLIST.md) | Pre-flight checklist for every deploy |
| [NETWORK-INFRASTRUCTURE.md](./NETWORK-INFRASTRUCTURE.md) | Broader platform operations manual |
| [`../templates/workers-static-template/`](../templates/workers-static-template/) | Golden starter files |
| [`../WORKERS-STATIC-ASSETS.md`](../WORKERS-STATIC-ASSETS.md) | Palma V1.0 deploy record (historical) |

---

## 1. Why we moved from Pages

### The problem

Cloudflare Pages on the Free plan allows **100 projects**. This network already runs at or near that ceiling. Every new destination site historically consumed one Pages project slot.

### The decision

| Rule | Policy |
|------|--------|
| **New destinations** | Deploy as **Workers Static Assets** |
| **Existing Pages sites** | **Leave unchanged** — do not migrate |
| **Pages projects** | Do **not** delete Pages projects merely to free slots |
| **Platform version** | Palma = **Workers deployment platform V1.0** |

### Why Workers Static Assets

- Scales well beyond the Pages project limit (Workers quotas are far higher for static asset sites).
- Same static `out/` export we already build — no SSR requirement.
- Custom Domains, SSL, and CDN behaviour are first-class.
- One Worker per destination; no Pages project slot consumed.

### What this is not

- Not a mandate to migrate Málaga, Naples, Flam, or any live Pages site.
- Not Workers with a custom `main` runtime (assets-only unless a site genuinely needs Worker logic).
- Not attaching both apex and www as separate application origins (see §9).

---

## 2. Architecture

### Pipeline diagram

```text
Cursor / local repo
        ↓
Next.js (output: "export")
        ↓
npm run build   (+ prebuild hooks if present)
        ↓
out/            (static HTML, CSS, JS, images, _redirects)
        ↓
npx wrangler deploy
        ↓
Cloudflare Worker (Static Assets)
        ↓
workers.dev preview URL  ← smoke-test here first
        ↓
Custom Domain (apex only)
        ↓
Cloudflare DNS + SSL certificate
        ↓
www → apex Redirect Rule (301)
        ↓
Production HTTPS
```

### Stage explanations

| Stage | What happens |
|-------|----------------|
| **Repo** | Destination site lives in its own GitHub repo; World 2.0 editorial/static patterns. |
| **Next.js export** | `next build` writes a fully static site to `out/`. No Node server in production. |
| **Wrangler deploy** | Uploads `out/` as Worker static assets; binds config from `wrangler.jsonc`. |
| **workers.dev** | Instant preview hostname. Proves the Worker + assets work **before** DNS. |
| **Custom Domain** | Attaches apex hostname to the Worker. Cloudflare creates managed DNS + cert. |
| **www redirect** | Separate proxied DNS record + Redirect Rule — www is **not** a second Worker origin. |
| **Production** | Apex HTTPS serves the same assets as workers.dev, with site canonicals on apex. |

---

## 3. Required Next.js configuration

Canonical `next.config.ts` (or `.mjs` / `.js`):

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

| Setting | Why |
|---------|-----|
| `output: "export"` | Produces a static `out/` directory Wrangler can upload. No server/runtime required. |
| `images.unoptimized: true` | Static export cannot use the Next Image Optimisation API. Images ship as static files (we pre-optimise with Sharp/scripts). |
| `trailingSlash: true` | Emits `/path/index.html` URLs. Must match Wrangler `html_handling: "force-trailing-slash"`. |

Do **not** enable features that require a Node server (ISR with revalidate to a server, middleware that needs edge runtime for auth, etc.) unless you intentionally leave assets-only and accept the limitation.

---

## 4. Standard Wrangler configuration

Canonical `wrangler.jsonc` for a new destination:

```jsonc
{
  "name": "DESTINATION-shore-excursions",
  "compatibility_date": "YYYY-MM-DD",
  "workers_dev": true,
  "preview_urls": true,
  "assets": {
    "directory": "./out",
    "html_handling": "force-trailing-slash",
    "not_found_handling": "404-page"
  },
  "routes": [
    {
      "pattern": "destinationshoreexcursions.com",
      "custom_domain": true
    }
  ]
}
```

Replace `DESTINATION`, the date, and the apex domain per site.

### Property reference

| Property | Standard value | Why |
|----------|----------------|-----|
| `name` | kebab-case destination Worker name | Unique Worker script name in the account. Match GitHub repo where practical. |
| `compatibility_date` | Deploy date (ISO) | Pins Workers runtime behaviour. Use the day of first production deploy. |
| `workers_dev` | `true` | Keep preview URL for smoke tests and emergency access. |
| `preview_urls` | `true` | Enables version preview URLs when supported. |
| `assets.directory` | `"./out"` | Must match Next.js export output. |
| `assets.html_handling` | `"force-trailing-slash"` | Aligns with `trailingSlash: true`. |
| `assets.not_found_handling` | `"404-page"` | Serves exported `404.html` for unknown paths (not SPA fallback). |
| `routes[].pattern` | Apex hostname only | Workers **Custom Domain** (not a wildcard route). |
| `routes[].custom_domain` | `true` | Lets Cloudflare create DNS + certificate for that hostname. |
| `main` | **Omit** | Assets-only Worker. Do not add a Worker script unless the product needs runtime logic. |

### Explicit non-goals in Wrangler

- Do **not** set `pages_build_output_dir` (Pages-only; obsolete for new sites).
- Do **not** add www as a second `custom_domain` route unless there is a documented exception.
- Do **not** use `routes` with `zone_id` + `pattern: "domain.com/*"` for new sites (Worker Routes — see §8).

---

## 5. Standard package.json scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint",
    "deploy": "npm run build && wrangler deploy",
    "deploy:worker": "npm run deploy",
    "legacy:pages-deploy": "echo 'LEGACY Pages deploy disabled — use npm run deploy (Workers Static Assets).' && exit 1"
  }
}
```

### Build order

1. **`prebuild`** (optional, site-specific) — e.g. image optimisation.  
2. **`build`** — `next build` → writes `out/`.  
3. **`wrangler deploy`** — uploads assets and applies triggers (workers.dev + Custom Domain from config).

### Rules

- Keep `build` as production static export only (do not hide deploy inside `build`).
- `deploy` must always rebuild before upload so `out/` cannot drift.
- Never leave a live `wrangler pages deploy` script that can be run by accident; if retained, use `legacy:pages-deploy` that **exits 1**.

Use the project’s existing package manager (`npm` for Palma / World 2.0 Gold sites).

---

## 6. Static Assets requirements

### Output directory

- Directory: **`./out`**
- Must contain `index.html`, route folders, `_next/`, images, and usually `404.html`.

### Limits (Workers Free — verify current Cloudflare docs if quotas change)

| Limit | Guidance |
|-------|----------|
| Max static files per Worker | **20,000** — fail the checklist if count ≥ 20,000 |
| Max individual file size | **25 MiB** — fail if any file exceeds |

Typical destination sites are hundreds–low thousands of files after image optimisation.

### Supported patterns

- HTML, CSS, JS, images (webp/avif/jpg/png/svg), `robots.txt`, `sitemap.xml`, fonts, `_redirects`.
- Path aliases via `public/_redirects` → copied into `out/_redirects` at build.

### Redirects (`_redirects`)

Workers Static Assets `_redirects` allow **relative URLs only**.

```text
# ✅ Allowed
/old-path /new-path/ 301

# ❌ Rejected (error 100324)
https://www.example.com/* https://example.com/:splat 301
```

Host-level www / HTTP → HTTPS belong in **Cloudflare Redirect Rules** and **Always Use HTTPS**, not `_redirects`.

### 404 behaviour

- Export must produce `404.html` (and typically `404/index.html` with trailing slash).
- Wrangler `not_found_handling: "404-page"` serves that page for unknown URLs.
- Expect HTTP **404** with HTML body (not a soft 200 SPA).

---

## 7. Cloudflare dashboard steps

> Screenshot references: capture and store under `docs/assets/` when available (`workers-overview.png`, `custom-domain-add.png`, `dns-worker-record.png`, `redirect-rule.png`). Until then, follow the named UI paths below.

### 7.1 Deploy the Worker (CLI preferred)

```bash
npm run lint
npx tsc --noEmit   # or project typecheck equivalent
npm run build
# Confirm out/ exists, asset count, largest file
npx wrangler deploy
```

Dashboard alternative: Workers & Pages → Create → upload / connect — **not** preferred for this network; use Wrangler from the repo.

### 7.2 Verify workers.dev

After deploy, Wrangler prints:

```text
https://<worker-name>.<account-subdomain>.workers.dev
```

Open that URL and run the smoke tests in §11 **before** relying on the Custom Domain.

**workers.dev success = deployment succeeded.** DNS issues after that are zone/DNS/cache problems, not a failed upload.

### 7.3 Attach Custom Domain

**Preferred:** declare in `wrangler.jsonc` and redeploy:

```jsonc
"routes": [{ "pattern": "example.com", "custom_domain": true }]
```

**Dashboard:** Workers & Pages → select Worker → Settings → Domains & Routes → Add → **Custom Domain** → enter apex only → Add.

Cloudflare should create a managed DNS record (often shown as type **Worker**) and issue a certificate.

### 7.4 Verify production

1. Confirm authoritative DNS answers (see §12 / Lessons learned).  
2. `curl -I https://example.com/` → 200.  
3. Repeat smoke tests on apex.  
4. Confirm www 301 → apex.  
5. Confirm certificate is trusted in browser.

---

## 8. DNS

### Workers Custom Domains

- Bind a hostname to a Worker as the **origin**.
- Cloudflare creates/manages the DNS record and Advanced Certificate.
- Exact hostname match only (no wildcards).

### “Worker” DNS records

In the DNS UI, Custom Domains often appear as a special **Worker** record type. Public resolvers still see normal proxied **A/AAAA** anycast addresses (`104.x` / `172.x` / `2606:4700:…`).

### Pages vs Worker Routes vs Custom Domains

| Mechanism | Use for new sites? | Notes |
|-----------|-------------------|--------|
| **Pages Custom Domain** | No (legacy only) | Consumes Pages project. |
| **Worker Route** (`example.com/*`) | **No** | Needs existing DNS; treated as a route in front of an origin; weaker fit for pure static sites; same-zone fetch quirks. |
| **Workers Custom Domain** | **Yes** | Preferred. Auto DNS + cert; Worker is the origin. |

### Why we do not use Worker Routes for new destinations

- Custom Domains are designed for “this hostname is this Worker”.
- Avoids manual CNAME/`100::` route setups.
- Clearer dashboard model and fewer misconfigurations with static assets.

---

## 9. www handling

### Preferred architecture

```text
www.example.com  --301-->  https://example.com/$path$query
```

| Hostname | Role |
|----------|------|
| `example.com` | Custom Domain on the Worker |
| `www.example.com` | Proxied DNS placeholder + Redirect Rule only |

Do **not** attach www as a second Custom Domain unless there is an explicit, documented exception.

### Recommended DNS for www

Proxied originless placeholder (either is fine):

- `AAAA` name `www` content `100::` Proxied, **or**
- `A` name `www` content `192.0.2.1` Proxied  

### Recommended Redirect Rule

- **If:** Hostname equals `www.example.com`  
- **Then:** Dynamic redirect →  
  `concat("https://example.com", http.request.uri.path)`  
  (preserve query string per Cloudflare dynamic redirect settings)  
- **Status code:** **301**  
- **Scope:** All paths (`/*`)

Also enable **Always Use HTTPS** on the zone.

---

## 10. SSL

| Topic | Standard |
|-------|----------|
| Provisioning | Automatic when Custom Domain is attached |
| Type | Advanced Certificate on the zone for that hostname |
| Verify | Browser padlock; `curl -I https://apex/`; Workers Domains API `cert_id` present |
| Timing | Often minutes; can take longer on brand-new zones. Do not declare production complete until HTTPS works on apex |

If certificate fails: confirm DNS is published on authoritative NS, no conflicting CNAME, zone active, then re-check SSL/TLS → Edge Certificates in the dashboard.

---

## 11. Smoke tests

Run on **workers.dev first**, then again on **apex production**.

### Functional

- [ ] Homepage `/`
- [ ] Representative excursion detail page
- [ ] Cruise port guide
- [ ] Cruise ship schedule
- [ ] Listing / hub pages used in nav
- [ ] Nonexistent URL → **404** + real 404 HTML
- [ ] Alias redirect from `_redirects` (e.g. `/cruise-port-guide` → canonical)
- [ ] Trailing-slash handling (`/path` → `/path/`)

### SEO / metadata

- [ ] `robots.txt` (Sitemap URL uses apex HTTPS)
- [ ] `sitemap.xml` (all locs use apex HTTPS)
- [ ] Canonical tags → apex HTTPS (never workers.dev)
- [ ] Open Graph `og:url` → apex HTTPS

### Assets

- [ ] CSS (`/_next/static/...css`) → 200
- [ ] JS chunks → 200
- [ ] Hero / content images → 200

### Domain

- [ ] `https://apex` → 200
- [ ] `https://www` → 301 → apex (path + query preserved)
- [ ] `http://apex` → HTTPS upgrade
- [ ] Certificate valid

---

## 12. Lessons learned from Palma (V1.0)

### Negative DNS caching

If a hostname is queried **before** Cloudflare publishes DNS, resolvers cache a **negative** answer (`NOERROR` with no A/AAAA, or `NXDOMAIN`). They keep serving that empty result until the SOA **MINIMUM** / negative TTL expires (often up to ~1800s), even after authoritative DNS is correct.

**Symptom:** Dashboard shows Worker DNS; Workers API shows `enabled: true`; `dig @1.1.1.1` works; local ISP `dig` still empty.

**Fix:** Wait for negative TTL, or test with authoritative / public resolvers (below). Flush local DNS if needed.

### Authoritative vs recursive resolvers

| Query | What it proves |
|-------|----------------|
| `dig @chris.ns.cloudflare.com example.com A` | Whether Cloudflare **published** the record |
| `dig @1.1.1.1 example.com A` | Public resolver view (good propagation check) |
| `dig @8.8.8.8 example.com A` | Second public view |
| `dig example.com A` (default ISP) | Local recursive — may be stale / negatively cached |

### workers.dev working proves deployment

If `https://worker.subdomain.workers.dev` returns 200 with correct HTML/assets, the Worker upload and Static Assets config succeeded. Failures after that are DNS, SSL, redirects, or local cache — **not** “deploy failed”.

### NXDOMAIN / NOERROR empty did not mean deploy failure

Palma’s Worker was live on workers.dev while apex dig returned empty. That was DNS publish lag + negative cache on a **brand-new** registrar zone, not a bad Wrangler upload.

### How to verify propagation

```bash
# 1) Find Cloudflare nameservers
dig example.com NS +short

# 2) Authoritative (ground truth for "is it published?")
dig @paislee.ns.cloudflare.com example.com A +noall +answer
dig @chris.ns.cloudflare.com example.com A +noall +answer

# 3) Public recursive
dig @1.1.1.1 example.com A +noall +answer
dig @8.8.8.8 example.com A +noall +answer

# 4) Local recursive (may lag)
dig example.com A +noall +answer +authority
```

Interpret:

- Auth empty → Custom Domain DNS not published yet (incomplete provisioning or attach failure).
- Auth has A/AAAA, public OK, local empty → **negative cache / ISP lag**.
- Auth + public OK, HTTPS 200 with `--resolve` → site is fine; local resolver is the problem.

### Expected timing

| Event | Typical |
|-------|---------|
| Wrangler asset upload | Minutes |
| workers.dev live | Immediate after deploy success |
| Custom Domain API `enabled: true` | Near-immediate |
| DNS visible on authoritative NS | Seconds to many minutes (longer on brand-new zones) |
| Negative cache expiry on resolvers that saw empty | Up to SOA minimum (~30 min common) |
| Certificate usable | Often aligned with DNS; can trail slightly |

### `_redirects` absolute URLs

Workers reject absolute host redirects in `_redirects` (`Invalid _redirects` / code **100324**). Move www/http rules to Cloudflare Redirect Rules.

### OAuth vs DNS API

Wrangler OAuth includes Workers write + `zone:read`, but **not** DNS edit/list. Dashboard can show DNS while `GET /zones/.../dns_records` returns 403. For automation, use a scoped `CLOUDFLARE_API_TOKEN` with Zone DNS Read/Edit.

### Configuration note (Palma)

Preferred standard is **apex Custom Domain only**. If www was also attached as a Custom Domain during experimentation, future sites should follow §9 (redirect-only www) unless an exception is documented.

---

## 13. Troubleshooting decision tree

```text
Is workers.dev returning 200 for homepage + assets?
├─ NO
│  ├─ Did `wrangler deploy` succeed?
│  │  ├─ NO → Fix Wrangler errors (config, auth, _redirects 100324, asset limits)
│  │  └─ YES → Confirm out/ uploaded; check Workers dashboard metrics/logs
│  ├─ Wrong wrangler assets.directory? (must be ./out)
│  ├─ Missing index.html / empty out/?
│  └─ Pages confusion: site still pointing at old Pages project? (new sites should not)
│
└─ YES  (deployment OK — debug DNS/domain next)
   │
   Does dig @AUTHORITATIVE_NS apex A return Cloudflare IPs?
   ├─ NO
   │  ├─ Is Custom Domain attached on the Worker? (dashboard Domains & Routes)
   │  ├─ Is zone status Active? Correct account?
   │  ├─ Conflicting CNAME on hostname? (blocks Custom Domain)
   │  ├─ Re-check Workers Domains API: enabled + cert_id
   │  └─ Wait / re-attach Custom Domain; do not declare failure based only on ISP dig
   │
   └─ YES
      │
      Does dig @1.1.1.1 (and @8.8.8.8) return the same?
      ├─ NO → Propagation lag on those resolvers (rare if auth is good); wait / recheck
      └─ YES
         │
         Does local dig / curl still fail?
         ├─ YES → Negative cache or corporate DNS filter (e.g. Mosyle).
         │        Test: curl --resolve apex:443:<cf-ip> https://apex/
         │        Wait for SOA negative TTL; flush local DNS; try another network
         └─ NO
            │
            Does https://apex return 200?
            ├─ NO → Certificate / SSL pending or mis-issued; check Edge Certificates
            ├─ Soft wrong content → wrong Worker / wrong domain binding
            └─ YES
               │
               www → apex 301?
               ├─ NO → Add proxied www DNS + Redirect Rule (§9)
               └─ YES
                  │
                  Path alias redirects work?
                  ├─ NO → Fix public/_redirects (relative only); rebuild; redeploy
                  └─ YES
                     │
                     404 page correct?
                     ├─ NO → Ensure 404.html export + not_found_handling: 404-page
                     └─ YES → Production OK — complete checklist & report
```

### Quick symptom table

| Symptom | Likely cause |
|---------|----------------|
| Deploy error 100324 | Absolute URLs in `_redirects` |
| workers.dev 404 everywhere | Wrong `assets.directory` or empty `out/` |
| workers.dev OK, apex NXDOMAIN/empty | DNS not published or negative cache |
| Auth DNS OK, browser fails | Local DNS filter / cache |
| Apex OK, www serves Worker or fails | www attached as origin or missing redirect |
| Canonicals show workers.dev | Site config bug — fix `SITE.url` / metadata |
| SSL error | Cert still provisioning or DNS not pointing at CF |

---

## 14. Deployment automation roadmap (design only — do not implement yet)

### Already automatable today (scripts exist or are trivial)

| Step | Candidate |
|------|-----------|
| Lint | `npm run lint` |
| Typecheck | `tsc --noEmit` |
| Build | `npm run build` |
| Asset count | `find out -type f \| wc -l` |
| Largest asset / 25 MiB check | `find` + size compare |
| Link / SEO QA | `check-links`, `seo-qa`, World 2.0 audit |
| Deploy | `wrangler deploy` |

### Proposed future command (not built yet)

```text
npm run deploy:verified
  → lint
  → typecheck
  → build
  → assert out/
  → assert asset count < 20000
  → assert no file > 25 MiB
  → assert index.html + 404.html
  → assert _redirects relative-only
  → assert sitemap/robots apex domain
  → wrangler deploy
  → HTTP smoke workers.dev
  → optional: dig checks + production smoke when DNS ready
  → write DEPLOY-REPORT.md
```

### Phase plan

1. **Local `scripts/workers-preflight.mjs`** — asset limits, redirects lint, SEO domain grep.  
2. **`scripts/workers-smoke.mjs`** — curl checklist against a base URL.  
3. **GitHub Action** — on tag/release: build + preflight + deploy with `CLOUDFLARE_API_TOKEN`.  
4. **DNS verify module** — authoritative + 1.1.1.1/8.8.8.8 (needs DNS read token).  
5. **Report artefact** — JSON + Markdown completion report for ops.

Do **not** implement these in this documentation pass; track under Future Improvements (§16 in Network Infrastructure).

---

## 15. Golden template

Use [`templates/workers-static-template/`](../templates/workers-static-template/) as the starting point for every new destination’s Wrangler + scripts + notes. Copy files into the new repo; replace placeholders.

---

## 16. Migration strategy

| Site class | Policy |
|------------|--------|
| Existing Cloudflare Pages destinations | **Leave on Pages.** No migration project. |
| Broken / unused Pages projects | Audit only; delete only with explicit owner approval. |
| **New** destinations from this date | **Workers Static Assets only.** |
| Hybrid mistakes | Never run Pages + Worker Custom Domain on the same hostname as competing origins. |

### Why prefer Workers for new sites

- Avoids the 100-project Pages ceiling.  
- Same static export workflow.  
- Cleaner long-term capacity for a large multi-destination network.

---

## 17. Future improvements

See also [NETWORK-INFRASTRUCTURE.md](./NETWORK-INFRASTRUCTURE.md). Priority ideas:

- Automated DNS verification (auth + public resolvers)  
- Deployment reports checked into CI artefacts  
- Lighthouse / performance budgets in CI  
- Cloudflare API token vault + scoped automation  
- GitHub Actions deploy pipeline  
- Documented rollback (`wrangler rollback` / prior version)  
- Monitoring / uptime on apex  
- Shared deployment dashboard for the network  

---

## Document control

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 2026-07-17 | Created from Palma Shore Excursions first live Workers Static Assets deploy |
