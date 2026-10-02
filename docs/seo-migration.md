# SEO migration notes

The local Vite/React portfolio is the implementation source of truth. The site currently at `https://kauntiaakash2.tech/` is a read-only migration baseline.

## Evidence available on 2026-10-02

- The supplied Search Console performance export is filtered to Web search / “Last 3 months”; its chart contains dates 2026-08-22 through 2026-09-29. The Pages report lists `https://kauntiaakash2.tech/` with 2 clicks, 10 impressions, 20% CTR, and average position 6.7. These are small samples, not a trend or evidence for any specific query.
- `Queries.csv` has headers but no query rows. No winning, low-CTR, or near-ranking keyword can be identified from this export. No query-level metrics should be inferred from page totals.
- The Coverage chart reports one indexed URL and one non-indexed “Page with redirect” by 2026-09-21. The export does not identify the redirected URL.
- The current live homepage returned HTTP 200 with `<title>Akash_Agarwal</title>` and an editorial portfolio description. The live `/robots.txt` and `/sitemap.xml` returned HTTP 404 on 2026-10-02. Both `http://kauntiaakash2.tech/` and `https://www.kauntiaakash2.tech/` returned 308 redirects to the canonical HTTPS non-`www` URL. The public homepage and its bundle exposed no additional pathname routes. This is not proof that no historical URLs or backlinks exist.
- No authenticated Search Console API credentials or CLI were present in this environment. The supplied exports are the only Search Console data used.

## Query/topic coverage

| Topic | Query metrics | Current local coverage | Decision |
| --- | --- | --- | --- |
| Akash Agarwal | Unavailable | Hero H1, page title, About, structured data | Preserve clear identity |
| Software and AI engineering | Unavailable | Hero positioning, About, projects, experience | Use in title and description |
| Developer tools and code visualization | Unavailable | CodeFlowViz project | Describe naturally in metadata and structured data |
| Full-stack systems | Unavailable | Hero, About, multiple projects | Retain supporting copy |
| Smart contract verification and LLM benchmarking | Unavailable | Research internship and project | Include concise semantic context |

The empty Queries report does not establish which topics lack search visibility. It also supplies no evidence to preserve old keyword wording.

## URL inventory and future action

| Current production URL | Search value | New destination | Future action |
| --- | --- | --- | --- |
| `https://kauntiaakash2.tech/` | Indexed; 2 clicks / 10 impressions in supplied export | Same URL | Keep; verify canonical and HTTP 200 after launch |
| `http://kauntiaakash2.tech/` | Existing 308 redirect to HTTPS; no separate traffic evidence | `https://kauntiaakash2.tech/` | Keep the redirect |
| `https://www.kauntiaakash2.tech/` | Existing 308 redirect to non-`www`; no separate traffic evidence | `https://kauntiaakash2.tech/` | Keep the redirect |
| Redirected URL not identified in Coverage export | One “Page with redirect” issue; traffic unknown | Unknown | Identify from a full Coverage export or live host routing before launch; decide whether existing redirect should remain |

Hash states such as `/#/projects` and `/#about` are not separate crawlable pages and must not be placed in the sitemap or given separate canonicals. No production redirects are configured in this phase. The old title spelling and generic editorial description are not preserved because the local portfolio establishes a clearer and more accurate professional identity.

## Deployment-time checklist — do not perform during local development

1. Confirm the production host and inventory its existing redirects, including the unidentified Coverage item and any backlinks or indexed URLs beyond `/`.
2. Preserve the HTTPS non-`www` `/` at HTTP 200 and the existing HTTP-to-HTTPS and `www`-to-non-`www` redirects. Add 301 redirects only for confirmed legacy URLs with relevant equivalents; serve unrelated unknown paths with the branded `404.html` at HTTP 404.
3. Deploy the new static build, then check the response HTML for title, description, canonical, JSON-LD, Open Graph, Twitter/X tags, and a reachable social image.
4. Confirm `https://kauntiaakash2.tech/robots.txt` and `/sitemap.xml` return HTTP 200 and reference only the production root URL.
5. Submit the new sitemap in Search Console, inspect the root URL, and verify Google's selected canonical and indexing status. Do not request removal of the old root URL.
6. Compare page/query performance against the 2-click/10-impression baseline only after enough new data accumulates; review Core Web Vitals on real users and devices.
