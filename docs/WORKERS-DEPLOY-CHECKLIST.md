# Workers Static Assets — Deployment Checklist

**Use before every new destination production deploy.**  
**Standard:** [CLOUDFLARE-WORKERS-DEPLOYMENT.md](./CLOUDFLARE-WORKERS-DEPLOYMENT.md) V1.0  

Copy this file into the destination repo or tick in the PR / ops note. Do not skip workers.dev verification.

---

## A. Repository

- [ ] Working directory is the correct destination repository
- [ ] `git` root confirmed
- [ ] Branch confirmed (usually `main`)
- [ ] Remote GitHub repo is the destination (not a sibling site)
- [ ] `wrangler.jsonc` uses Workers Static Assets (no `pages_build_output_dir`)
- [ ] Worker `name` is unused in the account (or intentionally updating this Worker)
- [ ] Apex zone exists and is **Active** in Cloudflare
- [ ] No conflicting CNAME on the apex hostname
- [ ] Existing Pages projects left untouched

## B. Configuration

- [ ] Next.js: `output: "export"`
- [ ] Next.js: `images.unoptimized: true`
- [ ] Next.js: `trailingSlash: true`
- [ ] Wrangler: `assets.directory: "./out"`
- [ ] Wrangler: `html_handling: "force-trailing-slash"`
- [ ] Wrangler: `not_found_handling: "404-page"`
- [ ] Wrangler: `workers_dev: true`
- [ ] Wrangler: apex `custom_domain: true` only (www not a second origin)
- [ ] No unnecessary `main` Worker script
- [ ] `package.json` `deploy` = `npm run build && wrangler deploy`
- [ ] Legacy Pages deploy script disabled (`exit 1`) if present
- [ ] `public/_redirects` uses **relative** URLs only

## C. Quality gates

- [ ] Lint passed
- [ ] Typecheck passed
- [ ] Production build passed (`npm run build`)
- [ ] `out/` exists
- [ ] Asset file count recorded: ______ (must be **&lt; 20,000**)
- [ ] Largest file: ______ (must be **≤ 25 MiB**)
- [ ] `out/index.html` exists
- [ ] `out/404.html` (or equivalent export) exists
- [ ] `out/_redirects` exists and inspected
- [ ] `sitemap.xml` / `robots.txt` use apex `https://…`
- [ ] Canonical / OG base URL is apex HTTPS
- [ ] No leftover wrong-domain / localhost references in `out/`

## D. Deploy (Worker)

- [ ] `npx wrangler deploy` (or `npm run deploy`) succeeded
- [ ] Worker created/updated in account
- [ ] workers.dev URL recorded: `https://________________.workers.dev`
- [ ] Worker count before/after noted (optional ops metric)

## E. workers.dev smoke tests

- [ ] Homepage
- [ ] Excursion page
- [ ] Cruise port guide
- [ ] Ship schedule
- [ ] `sitemap.xml`
- [ ] `robots.txt`
- [ ] 404 for unknown URL
- [ ] Alias redirect (`_redirects`)
- [ ] Trailing-slash behaviour
- [ ] CSS / JS / images load
- [ ] Canonicals still apex (not workers.dev)
- [ ] No Worker runtime errors in logs (if checked)

**Stop here if workers.dev fails.** Do not attach/trust production DNS yet.

## F. Custom Domain + DNS

- [ ] Existing apex DNS inspected (report conflicts before overwrite)
- [ ] Apex Custom Domain attached
- [ ] Authoritative dig shows A/AAAA:  
      `dig @<cf-ns> apex A`
- [ ] Public dig OK:  
      `dig @1.1.1.1 apex A` and `dig @8.8.8.8 apex A`
- [ ] If local dig empty but auth/public OK → treat as negative cache; wait / retest
- [ ] www proxied placeholder DNS created (AAAA `100::` or A `192.0.2.1`)
- [ ] www → apex **301** Redirect Rule configured
- [ ] Always Use HTTPS on
- [ ] Mail / verification / unrelated DNS preserved

## G. SSL

- [ ] HTTPS on apex succeeds
- [ ] Certificate trusted in browser
- [ ] Workers domain shows `cert_id` / dashboard cert healthy

## H. Production smoke tests

- [ ] `https://apex`
- [ ] `https://www` → 301 → apex (path + query)
- [ ] HTTP → HTTPS
- [ ] Deep pages
- [ ] 404 behaviour
- [ ] CSS / JS / images
- [ ] Canonicals + Open Graph
- [ ] Sitemap + robots
- [ ] Mobile homepage render (spot check)

## I. Completion report

Record:

1. Files changed  
2. Previous vs new Wrangler config  
3. Package scripts changed  
4. Build result  
5. Exported asset count  
6. Largest asset  
7. Worker count before/after  
8. Deploy result  
9. workers.dev URL  
10. Custom Domain status  
11. DNS changes  
12. Certificate status  
13. Redirect tests  
14. Production smoke results  
15. Warnings / unresolved issues  
16. Git status  

- [ ] Completion report written
- [ ] Git commit/PR only if requested by owner

## Sign-off

| Field | Value |
|-------|--------|
| Destination | |
| Date | |
| Operator | |
| workers.dev OK | Yes / No |
| Production OK | Yes / No |
| Notes | |
