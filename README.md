# ✨ Akash Agarwal — Premium Editorial Portfolio

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Deploy](https://img.shields.io/badge/deploy-vercel-black.svg)

A high-performance, editorial-style personal portfolio for showcasing full-stack development work, AI/ML projects, and competitive programming achievements.

---

## 📚 Table of Contents

- [About](#-about)
- [Highlights](#-highlights)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Run Locally](#-run-locally)
- [Deployment Note (`gh-pages`)](#-deployment-note-gh-pages)
- [Roadmap](#-roadmap)
- [Usage, Cloning & Credits](#-usage-cloning--credits)
- [Contributing](#-contributing)

---

## 🧾 About

This repository contains the source code for **Akash Agarwal’s personal portfolio website**.

The interface intentionally avoids generic portfolio templates and uses a magazine-inspired visual language with:

- strong typographic hierarchy,
- generous whitespace,
- and a high-contrast palette: **Cream (`#FDFBF7`)** + **Royal Blue (`#0A2A5E`)**.

---

## 🌟 Highlights

- **Editorial UI/UX** — Serif-forward heading system with clean sans-serif body text.
- **Responsive Layout** — Mobile-first, utility-based styling with Tailwind CSS.
- **Project Showcase** — Dedicated sections for technical projects and achievements.
- **Deployment Strategy** — Vercel hosts the app; `gh-pages` safely redirects GitHub Pages traffic.

---

## 🛠 Tech Stack

| Area | Technology |
|------|------------|
| Framework | React.js / Next.js |
| Styling | Tailwind CSS |
| Fonts | Google Fonts (Playfair Display, Inter) |
| Deployment | Vercel |
| Version Control | Git + GitHub |

---

## 🚀 Getting Started

### Prerequisites

Install these tools before running locally:

- [Node.js](https://nodejs.org/) (**16.x or newer** recommended)
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

---

## 💻 Run Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## 📦 Deployment Note (`gh-pages`)

This project uses a dual-deployment pattern:

- `main` → full app deployment on **Vercel**
- `gh-pages` → redirect-only `index.html` for **GitHub Pages** traffic

> ⚠️ Do **not** merge `gh-pages` into `main`, or you may overwrite the application source.

---

## 🧭 Roadmap

- Integrate a headless CMS (e.g., **Sanity** / **Contentful**) for easier content updates.
- Add dark mode while preserving the editorial visual identity.
- Add a technical blog section for project deep-dives and engineering write-ups.

---

## 🤝 Usage, Cloning & Credits

You are welcome to fork or reference this codebase for learning and portfolio inspiration.

If you reuse this structure or significant parts of the implementation, please provide attribution back to this repository.

If this repo helped you, consider giving it a ⭐.

---

## 🧩 Contributing

Contributions, issues, and feature requests are welcome.

- Open an issue: <https://github.com/kauntiaakash2/akashagarwal/issues>
- Submit a pull request with a clear summary of changes
