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

The source provides no email address, résumé, or authored articles. Email controls and the form stay hidden until `profile.email` is populated; the Writing section likewise renders only when supplied. GitHub, LinkedIn, and the portfolio URL are displayed in Contact. The email form, when enabled, validates a message and prepares a mailto draft; it has no sending backend.

The site retains its keyboard-accessible navigation and detail dialogs, saved light/dark preference, reduced-motion support, and locally hosted assets. No Framer service is needed to run the app.

## Reference assets

The original abstract project artwork from the Villo preview by CocoBasic is retained as decorative imagery, not as project screenshots or logos. The hero uses Akash’s supplied photo at `public/images/portrait.png`, framed within the original oval. Visual reference: https://villo.framer.website/.

Fonts: Big Shoulders and DM Sans from Google Fonts (SIL Open Font License). Font license text is included under `public/fonts/`.
