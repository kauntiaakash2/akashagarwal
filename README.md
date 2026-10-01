# Villo-inspired portfolio

A responsive local implementation of the [Villo Framer template](https://www.framer.com/marketplace/templates/villo/), built with React, TypeScript, and Vite.

## Run

```sh
npm install
npm run dev -- --port 4200
```

Open http://127.0.0.1:4200. `npm run build` checks TypeScript and creates the production site in `dist/`. `npm run preview` serves that build.

## Content

The portfolio content is based on `Akash_Agarwal_Detailed_Profile.md` (September 2026) and centralized in `src/content.ts`. Edit that file to update the profile, project details and links, experience, education, tools, statistics, and skills. The name and description in `index.html` provide static search metadata.

The existing four-card gallery highlights CodeFlowViz 2.0, FinVerify AI, ReSlot, and Smart Contract Verification using LLM. The AlgoZenith platform is represented under the chapter experience with its website link. No additional sections or project categories were introduced.

The contact address is `akashkauntia2006@gmail.com`, supplied by Akash. The source provides no résumé or authored articles; the Writing section renders only when supplied. GitHub, LinkedIn, and the portfolio URL are displayed in Contact. The contact form validates name, email, and message, then opens a prefilled mailto draft directly when Send is pressed. The visitor sends the email from their email app; there is no sending backend. A retry link is shown if the app does not open.

The site retains its keyboard-accessible navigation, project views, and article dialogs, saved dark-blue/dark-lime accent preference, reduced-motion support, and locally hosted assets. No Framer service is needed to run the app.

## Reference assets

The original abstract project artwork from the Villo preview by CocoBasic is retained as decorative imagery, not as project screenshots or logos. The hero uses Akash’s supplied photo at `public/images/portrait.png`, framed within the original oval. Visual reference: https://villo.framer.website/.

Fonts: Big Shoulders and DM Sans from Google Fonts (SIL Open Font License). Font license text is included under `public/fonts/`.

## Recording-based interactions

The local screen recording is the primary reference for the fixed header, compact navigation disclosure, letter-by-letter titles, section transitions, project hover labels, related projects, and scrolling social footer. The blue palette, Akash signature, supplied portrait, real content, and original assets are retained.

Section views use static-host-friendly hashes (`#/about`, `#/projects`, `#/experience`, `#/education`, `#/contact`). Project details use `#/projects/<id>` and support direct links and browser Back/Forward. Existing anchors such as `#about` and `#contact` still navigate within the complete home page. `src/ReferenceUI.tsx` contains the shared navigation, animated text, project card, and view hook; content stays centralized in `src/content.ts`.

The menu closes on Escape, outside click, link selection, or keyboard focus leaving it. View headings receive focus on navigation. Mobile project labels remain visible without hover. Operating-system reduced-motion preferences disable reveals and present static social links. The recording only demonstrates desktop behavior, so the existing responsive layout is retained and adapted for these interactions. No dependencies were added.

The theme switch keeps the dark background in both positions: blue (`#5289ff`) or lime (`#E0F11F`). New visitors start with lime; saved light preferences migrate to lime and saved dark preferences retain blue. The choice is applied before rendering and persists across visits.
