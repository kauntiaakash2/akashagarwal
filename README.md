# Akash Agarwal — Premium Editorial Portfolio

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

## About

This repository contains the source code for Akash Agarwal’s personal portfolio website. It is designed as a high-performance, editorial-style showcase for full-stack development work, AI/ML projects, and competitive programming achievements.

The UI intentionally avoids generic portfolio templates and instead uses a magazine-inspired visual system with strong typographic hierarchy, generous whitespace, and a high-contrast Cream (`#FDFBF7`) and Royal Blue (`#0A2A5E`) palette.

## Highlights

- **Editorial UI/UX:** Serif-forward heading system and clean sans-serif body text for readability.
- **Responsive Layout:** Mobile-first, utility-based styling with Tailwind CSS.
- **Project Showcase:** Dedicated sections for technical projects and achievements.
- **Deployment Strategy:** Vercel hosts the app, while the `gh-pages` branch safely redirects GitHub Pages traffic.

## Tech Stack

- **Framework:** React.js / Next.js
- **Styling:** Tailwind CSS
- **Fonts:** Google Fonts (Playfair Display, Inter)
- **Deployment:** Vercel
- **Version Control:** Git + GitHub

## Getting Started

### Prerequisites

Install the following before running locally:

- [Node.js](https://nodejs.org/) (16.x or newer recommended)
- npm (or yarn)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kauntiaakash2/akashagarwal.git
   ```

2. Move into the project directory:

   ```bash
   cd akashagarwal
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

## Run Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deployment Note (`gh-pages`)

This project uses a dual-deployment pattern:

- `main` branch → full app deployment on Vercel.
- `gh-pages` branch → contains only a redirect `index.html` for GitHub Pages traffic.

> Do **not** merge `gh-pages` into `main`, or you may overwrite the application source.

## Roadmap

- Integrate a headless CMS (e.g., Sanity/Contentful) for easier content updates.
- Add dark mode while preserving the editorial visual identity.
- Add a technical blog section for project deep-dives and engineering writeups.

## Usage, Cloning & Credits

You are welcome to fork or reference this codebase for learning and portfolio inspiration.

If you reuse this structure or significant parts of the implementation, please provide attribution back to this repository.

If this repo helped you, consider giving it a ⭐.

## Contributing

Contributions, issues, and feature requests are welcome.

- Open an issue: https://github.com/kauntiaakash2/akashagarwal/issues
- Submit a pull request with a clear summary of changes
