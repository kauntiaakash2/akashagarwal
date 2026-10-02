# Villo-inspired portfolio

A responsive local implementation of the [Villo Framer template](https://www.framer.com/marketplace/templates/villo/), built with React, TypeScript, and Vite.

## Run

```sh
npm ci
npm run dev -- --port 4200
npm run build
npm run preview -- --port 4201
```

Open http://127.0.0.1:4200 for development or http://127.0.0.1:4201 for the production preview. npm uses `package-lock.json`; `npm run build` checks TypeScript and creates the deployable site in `dist/`. The clean install and build were verified with Node.js 24. No environment variables or backend service are required.

## Content

The portfolio content is based on `Akash_Agarwal_Detailed_Profile.md` (September 2026) and centralized in `src/content.ts`. Edit that file to update the profile, project details and links, experience, education, tools, statistics, and skills. The name and description in `index.html` provide static search metadata.

The existing four-card gallery highlights CodeFlowViz 2.0, FinVerify AI, ReSlot, and Smart Contract Verification using LLM. The AlgoZenith platform is represented under the chapter experience with its website link. No additional sections or project categories were introduced.

The contact address is `akashkauntia2006@gmail.com`, supplied by Akash. The source provides no résumé or authored articles, so neither is displayed. GitHub, LinkedIn, and email are displayed in About; additional social profiles appear in the footer. The contact form validates name, email, and message, then opens a prefilled mailto draft directly when Send is pressed. The visitor sends the email from their email app; there is no sending backend. A retry link is shown if the app does not open.

The site retains its keyboard-accessible navigation, project views, saved dark-blue/dark-lime accent preference, reduced-motion support, and locally hosted assets. No Framer service is needed to run the app.

## Reference assets

The original abstract project artwork from the Villo preview by CocoBasic is retained as decorative imagery, not as project screenshots or logos. Akash’s portrait is served as responsive 480px and 960px WebP images in `public/images/`, framed within the original oval. The full-resolution source remains recoverable from Git history and is not shipped with the site. Visual reference: https://villo.framer.website/.

Fonts: Big Shoulders and DM Sans from Google Fonts (SIL Open Font License). Font license text is included under `public/fonts/`.

## Recording-based interactions

The local screen recording is the primary reference for the fixed header, compact navigation disclosure, letter-by-letter titles, section transitions, project hover labels, related projects, and scrolling social footer. The blue palette, Akash signature, supplied portrait, real content, and original assets are retained.

Section views use static-host-friendly hashes (`#/about`, `#/projects`, `#/experience`, `#/education`, `#/contact`). Project details use `#/projects/<id>` and support direct links and browser Back/Forward. Unknown project IDs and paths show a not-found view. Existing anchors such as `#about` and `#contact` still navigate within the complete home page. `src/ReferenceUI.tsx` contains the shared navigation, animated text, and project card; `src/usePortfolioView.ts` handles hash navigation, and `src/PortfolioSections.tsx` contains the existing content sections. Content stays centralized in `src/content.ts`.

The menu closes on Escape, outside click, link selection, or keyboard focus leaving it. View headings receive focus on navigation. Mobile project labels remain visible without hover. Operating-system reduced-motion preferences disable reveals and present static social links. The recording only demonstrates desktop behavior, so the existing responsive layout is retained and adapted for these interactions. No dependencies were added.

The theme switch keeps the dark background in both positions: blue (`#5289ff`) or lime (`#E0F11F`). New visitors start with lime; saved light preferences migrate to lime and saved dark preferences retain blue. The choice is applied before rendering and persists across visits.

## Static deployment and security

This is a Vite single-page app. Its real section and project routes use hashes on `/`, so production hosting does not need a catch-all rewrite for them. Deploy `dist/` at `https://kauntiaakash2.tech/`. Preserve the existing HTTP-to-HTTPS and `www`-to-non-`www` redirects. Serve `404.html` with an actual HTTP 404 status for unknown pathnames; do not rewrite all paths to `index.html`. Vite's development and preview servers instead serve `index.html` with HTTP 200 for unknown paths, where the React not-found view handles the display. No hosting provider is configured in this repository, so its 404 and redirect rules must be set when the host is chosen.

Configure security headers at that host: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy: camera=(), microphone=(), geolocation=()`. Enable HSTS only on the final HTTPS deployment. Test a Content Security Policy against the existing early theme script and React's inline styles before enforcing it; a strict inline-script/style ban would break the current site. No third-party scripts or public environment variables are required.

The supplied full-resolution portrait remains in Git history. Visitors receive only 480px or 960px WebP derivatives, selected by `srcset`; the hero loads eagerly and the hidden hero image is lazy on other views. The favicon has also been resized for web delivery.

## Search metadata and migration

The crawlable page is `/`; hash views are navigation states and are intentionally absent from the one-URL sitemap. `index.html` contains the production canonical, social preview metadata, and Person/WebSite/ProfilePage structured data. The branded 1200×630 social image is `public/images/og-image.png`. The static 404 page is marked `noindex`; the production host must serve it with HTTP 404 rather than a successful SPA fallback.

The read-only Search Console export and live-site URL inventory are summarized in [docs/seo-migration.md](docs/seo-migration.md). Check that plan when the new portfolio is deployed; this repository change does not alter the current live site or Search Console.
