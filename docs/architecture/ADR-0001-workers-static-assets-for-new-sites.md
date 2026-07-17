# ADR-0001: Cloudflare Workers Static Assets for new destination sites

- **Status:** Accepted
- **Date:** 2026-07-17
- **Deciders:** Network platform / ops (Palma V1.0 rollout)
- **Tags:** hosting, cloudflare, workers, pages, deployment
- **Related:**
  - [CLOUDFLARE-WORKERS-DEPLOYMENT.md](../CLOUDFLARE-WORKERS-DEPLOYMENT.md)
  - [WORKERS-DEPLOY-CHECKLIST.md](../WORKERS-DEPLOY-CHECKLIST.md)
  - [NETWORK-INFRASTRUCTURE.md](../NETWORK-INFRASTRUCTURE.md)
  - [templates/workers-static-template](../../templates/workers-static-template/)
  - Palma record: [WORKERS-STATIC-ASSETS.md](../../WORKERS-STATIC-ASSETS.md)

## Context

Destination sites in this network are static Next.js exports (`output: "export"`) historically deployed to **Cloudflare Pages**.

The Cloudflare Pages Free plan allows **100 projects**. The account reached that ceiling, blocking creation of new Pages projects (including Palma) without deleting existing ones. The network is expected to keep adding destinations.

Requirements for a replacement:

- Must host fully static `out/` exports without a Node server
- Must not force migration or deletion of live Pages sites
- Must support Custom Domains, HTTPS, trailing-slash HTML, and `_redirects`-style path aliases
- Must be repeatable as a platform standard for every **new** site

Palma Shore Excursions was deployed successfully as the first **Workers Static Assets** site and established platform V1.0.

## Decision

**All new destination websites deploy to Cloudflare Workers Static Assets** (assets-only Workers), using the network deployment standard and golden template.

**Existing Cloudflare Pages sites remain on Pages** and are **not** migrated as part of this decision. Pages projects must **not** be deleted merely to free capacity for new sites.

Operational defaults for new sites:

- Apex hostname attached as a Workers **Custom Domain**
- `www` permanently redirected to apex via DNS + Redirect Rules (not a second Worker origin)
- `workers.dev` retained for pre-DNS smoke tests
- No `pages_build_output_dir`; no accidental Pages deploy scripts

## Consequences

### Positive

- New destinations no longer consume scarce Pages project slots
- Same static export pipeline (`npm run build` → `out/` → `wrangler deploy`)
- Clear workers.dev vs production verification path
- Documented checklist, template, and troubleshooting (including DNS negative caching)

### Negative / trade-offs

- Two hosting modes coexist (Pages legacy + Workers new) until/unless a later ADR changes that
- Operators must learn Wrangler Custom Domains and www Redirect Rules instead of Pages-only flows
- Workers `_redirects` allow **relative** URLs only; host-level redirects move to Cloudflare rules
- Wrangler OAuth may lack DNS read/edit; DNS automation needs a scoped API token

### Neutral / follow-ups

- Platform docs live under `docs/` and `templates/workers-static-template/`
- Future automation (`deploy:verified`, CI dig checks) is designed but not required by this ADR
- A separate ADR would be required to mandate migrating existing Pages sites

## Alternatives considered

### Alternative A — Stay on Cloudflare Pages for new sites

- **Summary:** Continue creating one Pages project per destination; free slots by deleting unused projects.
- **Why not chosen:** Account already at the 100-project limit; deleting live or ambiguous projects is operationally risky and was explicitly ruled out. Does not scale with expected network growth.

### Alternative B — Migrate all existing Pages sites to Workers immediately

- **Summary:** Convert every destination to Workers Static Assets in one programme.
- **Why not chosen:** High blast radius, no capacity emergency for sites already on Pages, and unnecessary churn. This ADR deliberately scopes Workers to **new** sites only.

### Alternative C — Workers with routes (`example.com/*`) instead of Custom Domains

- **Summary:** Map zones with Worker Routes and manual DNS.
- **Why not chosen:** Custom Domains auto-provision DNS and certificates, treat the Worker as origin, and match our static-site model better. Routes are reserved for exceptional cases, not the default.

### Alternative D — Non-Cloudflare static hosts (e.g. object storage + CDN)

- **Summary:** Host `out/` on S3/R2/Netlify/etc.
- **Why not chosen:** Domains, DNS, and most of the network already run on Cloudflare. Splitting hosts adds operational complexity without solving a problem Workers Static Assets already solves inside the same account.

### Alternative E — SSR / non-export Next.js on Workers

- **Summary:** Run a full Worker/`main` or OpenNext-style runtime.
- **Why not chosen:** Current product is intentionally static. Assets-only keeps deploys simple and aligned with World 2.0 export sites. A runtime Worker would need its own ADR if requirements change.

## Notes

- Reference implementation: Worker `palma-shore-excursions` (2026-07-17).
- Do not use this ADR as permission to modify or delete existing Pages projects.
- Implementation detail and smoke-test procedure: see the Workers deployment standard, not this ADR.
