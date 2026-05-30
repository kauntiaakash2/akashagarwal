# ✨ Akash Agarwal — Editorial Portfolio

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.11-646cff.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Deploy](https://img.shields.io/badge/deploy-vercel-black.svg)

A fast, responsive personal portfolio for **Akash Agarwal**. The site presents full-stack projects, AI/ML experience, competitive programming highlights, and contact links through an editorial, magazine-inspired interface.

---

## 📚 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Customization Guide](#-customization-guide)
- [Contributing](#-contributing)
- [Credits](#-credits)

---

## 🧾 About

This repository contains the source code for Akash Agarwal's portfolio website. It is built as a Vite + React single-page application and styled with Tailwind CSS.

The visual system intentionally avoids generic portfolio templates and uses:

- strong serif-led typographic hierarchy,
- generous whitespace,
- responsive card-based sections,
- a light/dark theme toggle,
- and a high-contrast editorial palette: **Cream (`#FDFBF7`)**, **Royal Blue (`#0A2A5E`)**, **Rust (`#C05621`)**, and **Ink (`#151515`)**.

---

## 🌟 Features

- **Editorial landing page** with a bold hero section and portrait card.
- **About & stats section** highlighting academics, DSA practice, ratings, and open-source involvement.
- **Selected projects showcase** with live demo and GitHub links.
- **Experience section** for internships, leadership, and shipped work.
- **Technical arsenal accordion** for grouped skills.
- **Dark mode support** using `localStorage` and system preference detection.
- **Responsive layout** optimized for mobile, tablet, and desktop screens.
- **Vercel-ready build** powered by Vite.

---

## 🛠 Tech Stack

| Area | Technology |
|------|------------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Fonts | Google Fonts: Playfair Display + Inter |
| Deployment | Vercel |
| Package Manager | npm |

---

## 🗂 Project Structure

```text
.
├── assets/              # Images and static visual assets
├── src/
│   ├── App.jsx          # Main portfolio layout and content data
│   ├── index.css        # Tailwind layers, base styles, and dark-mode overrides
│   └── main.jsx         # React entry point
├── index.html           # Vite HTML shell
├── package.json         # Scripts and dependencies
├── tailwind.config.js   # Tailwind theme tokens
├── postcss.config.js    # PostCSS/Tailwind pipeline
└── vite.config.js       # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

Install these tools before running the project locally:

- [Node.js](https://nodejs.org/) 18.x or newer
- npm
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
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal. By default, Vite serves the app at:

   ```text
   http://localhost:5173
   ```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite development server on `0.0.0.0`. |
| `npm run build` | Builds the production bundle into `dist/`. |
| `npm run preview` | Serves the production build locally for review. |

---

## 📦 Deployment

The app is suitable for Vercel deployment with the default Vite settings:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

If GitHub Pages is also configured, keep any redirect-only `gh-pages` branch separate from `main` so the application source is not overwritten.

---

## 🎨 Customization Guide

Most portfolio content can be updated from `src/App.jsx`:

- `navItems` controls the header navigation.
- `stats` controls the metric cards in the About section.
- `projects` controls the project cards, GitHub links, and live demo links.
- `experiences` controls the Work Experience cards.
- `skillGroups` controls the Technical Arsenal accordion.
- `socialLinks` controls the footer links.

Theme tokens such as colors, font stacks, and shadows live in `tailwind.config.js`. Global base styles and dark-mode overrides live in `src/index.css`.

---

## 🧩 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes with a clear message.
4. Open a pull request with a concise summary and screenshots when the UI changes.

Useful links:

- Issues: <https://github.com/kauntiaakash2/akashagarwal/issues>
- Pull requests: <https://github.com/kauntiaakash2/akashagarwal/pulls>

---

## 🤝 Credits

Built and maintained by **Akash Agarwal**.

You are welcome to fork or reference this codebase for learning and portfolio inspiration. If you reuse the structure or significant parts of the implementation, please provide attribution back to this repository.
