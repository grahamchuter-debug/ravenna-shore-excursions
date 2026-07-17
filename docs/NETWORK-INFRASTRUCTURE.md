# Network Infrastructure — Operations Manual

**Version:** 1.0  
**Effective date:** 2026-07-17  
**Scope:** Multi-destination shore excursion network (World 2.0)  

This is the platform operations manual. Deployment mechanics for new sites live in detail in [CLOUDFLARE-WORKERS-DEPLOYMENT.md](./CLOUDFLARE-WORKERS-DEPLOYMENT.md).

---

## 1. Platform overview

| Layer | Standard |
|-------|----------|
| Product | Cruise-focused editorial destination sites |
| Framework | Next.js static export (`output: "export"`) |
| Design system | World 2.0 Gold (reference: Málaga and peers) |
| New hosting | **Cloudflare Workers Static Assets** |
| Legacy hosting | Cloudflare Pages (existing sites only) |
| Domains | Cloudflare Registrar / Cloudflare DNS where possible |
| Source control | GitHub (`grahamchuter-debug` / network org as applicable) |

---

## 2. Cloudflare deployment standards

### New sites (mandatory)

1. Follow [CLOUDFLARE-WORKERS-DEPLOYMENT.md](./CLOUDFLARE-WORKERS-DEPLOYMENT.md).  
2. Use [WORKERS-DEPLOY-CHECKLIST.md](./WORKERS-DEPLOY-CHECKLIST.md) every time.  
3. Start from [`templates/workers-static-template/`](../templates/workers-static-template/).  

### Existing Pages sites

- Leave on Pages.  
- Do not migrate “for consistency”.  
- Do not delete Pages projects to free capacity without explicit approval.  

### Account hygiene

- Track Pages project count vs Free limit (100).  
- Track Workers count as an ops metric.  
- Prefer Workers for capacity growth.  

---

## 3. GitHub repository naming

| Pattern | Example |
|---------|---------|
| Destination site | `{destination}-shore-excursions` |
| Worker name | Same kebab-case as repo when possible |
| Domain | Usually `{destination}shoreexcursions.com` (confirm per brand) |

Rules:

- One repo per destination.  
- `main` is production.  
- Never push secrets (`.env`, API tokens).  
- Prefer British English editorial; technical identifiers stay ASCII kebab-case.  

---

## 4. Domain registration conventions

| Practice | Standard |
|----------|----------|
| Registrar | Prefer Cloudflare Registrar for zones we operate |
| Nameservers | Cloudflare NS only for production |
| Apex | Primary marketing hostname |
| www | 301 to apex (not a second origin) |
| Typosquat / alternate spellings | Separate zones if registered; do not attach production Worker unless intentional |

Before attach:

- Zone **Active**  
- No conflicting CNAME on apex  
- Inspect existing DNS; preserve mail/TXT/verification  

---

## 5. Cloudflare DNS standards

| Record purpose | Guidance |
|----------------|----------|
| Apex → Worker | Managed via **Workers Custom Domain** |
| www | Proxied placeholder + Redirect Rule → apex |
| Email | MX / SPF / DKIM / DMARC as required — never delete casually |
| Verification | Google Search Console, etc. — preserve TXT |
| Deprecated Pages | Remove only when cutover is deliberate and verified |

Do not manually invent competing A/CNAME origins on the same hostname as a Custom Domain.

---

## 6. SEO deployment checks

Before calling production complete:

- [ ] Canonical URLs = apex HTTPS  
- [ ] `og:url` = apex HTTPS  
- [ ] `sitemap.xml` locs = apex HTTPS  
- [ ] `robots.txt` Sitemap line = apex HTTPS  
- [ ] No `workers.dev` in indexable metadata  
- [ ] Trailing-slash consistency  
- [ ] 404 is real 404  
- [ ] Affiliate disclosure / legal pages present where required  

Use site scripts when available: `seo-qa`, `check-links`, World 2.0 audit.

---

## 7. Performance standards

| Area | Expectation |
|------|-------------|
| Output | Fully static; CDN-cached |
| Images | Pre-optimised (webp/avif responsive set); avoid huge unoptimised heroes |
| JS/CSS | Next build output; no unnecessary client bundles |
| Lighthouse | Target strong Performance / SEO on mobile homepage (track over time) |
| Asset budget | Stay under Workers file-count and 25 MiB/file limits |

---

## 8. Image optimisation

- Prefer network Sharp / `optimize-images` pipelines in `prebuild`.  
- Serve responsive `srcset` from `/images/opt/` (or site equivalent).  
- Keep originals out of critical path where possible.  
- Confirm largest exported asset after every build.  

---

## 9. Analytics

| Item | Guidance |
|------|----------|
| Tooling | Prefer one consistent analytics approach across new sites (document per-site IDs) |
| Privacy | Honour privacy policy / consent requirements for the jurisdiction |
| Deploy check | Analytics snippet present if required; does not block first paint excessively |

*(Fill specific GA/Plausible/etc. property IDs in each site’s private ops notes — not in public repos if sensitive.)*

---

## 10. Search Console

- Property on apex `https://example.com/`  
- Submit `sitemap.xml` after production DNS works  
- Monitor coverage after launch  
- Use DNS TXT or HTML file verification without breaking Worker routing  

---

## 11. Future automation

Tracked roadmap (design-level):

1. `deploy:verified` local script (preflight + smoke)  
2. GitHub Actions + `CLOUDFLARE_API_TOKEN`  
3. Automated dig checks (auth + 1.1.1.1 + 8.8.8.8)  
4. Deployment Markdown/JSON reports  
5. Lighthouse CI  
6. Uptime monitors on apex  
7. Network dashboard listing Workers vs Pages sites  
8. Rollback runbook (`wrangler versions` / `rollback`)  

Details: [CLOUDFLARE-WORKERS-DEPLOYMENT.md §14](./CLOUDFLARE-WORKERS-DEPLOYMENT.md).

---

## 12. Related documents

| Document | Role |
|----------|------|
| [CLOUDFLARE-WORKERS-DEPLOYMENT.md](./CLOUDFLARE-WORKERS-DEPLOYMENT.md) | Workers deploy SoT |
| [WORKERS-DEPLOY-CHECKLIST.md](./WORKERS-DEPLOY-CHECKLIST.md) | Per-deploy checklist |
| World 2.0 standards hub | Editorial / QA gold standards |
| Per-site `WORKERS-STATIC-ASSETS.md` | Optional historical deploy notes |

---

## Document control

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 2026-07-17 | Initial ops manual; Workers V1.0 (Palma) |
