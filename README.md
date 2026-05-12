# Akash Agarwal - Premium Editorial Portfolio 

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
<!---![License](https://img.shields.io/badge/license-[ADD_LICENSE_HERE]-green.svg)--->

## About the Project

This project serves as the professional digital portfolio for Akash Agarwal, a Software Engineering and B.Tech AI/ML student at KIIT. It is designed to act as a centralized, high-performance hub showcasing a blend of full-stack development skills, artificial intelligence integrations, and competitive programming achievements. 

After initially exploring a Brutalist/Terminal OS concept, the project was deliberately pivoted to a sophisticated "Editorial Magazine" aesthetic. Moving away from generic "tech-bro" templates, the design relies heavily on elegant typographical hierarchy, strategic whitespace, and a high-contrast Cream (`#FDFBF7`) and Royal Blue (`#0A2A5E`) color palette to deliver information cleanly and professionally.

Architecturally, the project solves a common hosting conflict by utilizing a dual-deployment strategy. The main React/Next.js application is deployed on Vercel for optimal performance. Simultaneously, a dedicated `gh-pages` branch acts as an automated traffic router, capturing visits to the repository's GitHub Pages URL and instantly redirecting them to the live Vercel site without causing asset path errors or requiring complex framework reconfigurations.

## Key Features

* **Editorial UI/UX Design:** A clean, magazine-style layout utilizing elegant Serif headings (Playfair Display/Merriweather) and legible Sans-Serif body text (Inter/DM Sans).
* **Dual-Deployment Routing:** A custom branch architecture where `main` deploys to Vercel, and `gh-pages` safely handles URL redirects to prevent 404 asset errors.
* **Dynamic Project Showcase:** Highlights complex technical builds including CodeFlow Visualizer 2.0 (with Next.js/ReactFlow) and the FinVerify AI pipeline.
* **Interactive Components:** Features smooth accordion-style technical skill lists, sleek project cards, and secure new-tab routing for resume downloads.
* **Fully Responsive Architecture:** Optimized across all device sizes using Tailwind CSS utility classes.

## Built With / Tech Stack

* **Frontend Framework:** React.js / Next.js
* **Styling:** Tailwind CSS
* **Typography:** Google Fonts (Playfair Display, Inter)
* **Hosting & Deployment:** Vercel (Primary Host)
* **Routing / Legacy URL Handling:** GitHub Pages (via HTML Meta Refresh)
* **Version Control:** Git & GitHub

## Getting Started

### Prerequisites
To run this project locally, you will need the following installed on your machine:
* [Node.js](https://nodejs.org/) (Version 16.x or higher recommended)
* `npm` or `yarn` package manager
* Git

### Installation
1. Clone the repository to your local machine:
   ```bash
   git clone [https://github.com/kauntiaakash2/akashagarwal.git](https://github.com/kauntiaakash2/akashagarwal.git)
   ```

2. Navigate into the project directory:
```bash
cd akashagarwal

```


3. Install the required dependencies:
```bash
npm install
# OR
yarn install

```



## Usage

To start the local development server:

```bash
npm run dev
# OR
yarn dev

```

Open `http://localhost:3000` in your browser to view the application.

**Important Deployment Note regarding `gh-pages`:**
This repository uses a specific strategy to handle GitHub Pages. The `gh-pages` branch is *strictly* isolated and contains only a single `index.html` file with the following redirect code:

```html
<meta http-equiv="refresh" content="0; URL=[https://akashagarwal.vercel.app/](https://akashagarwal.vercel.app/)" />

```

**Never merge the `gh-pages` branch into the `main` branch**, as it will overwrite your application code and break the Vercel deployment.

## Future Roadmap

* **Headless CMS Integration:** Connect the portfolio to a system like Sanity or Contentful to allow for seamless updates to projects, hackathon stats, and resume data without requiring manual code changes.
* **Dark Mode Implementation:** Introduce a toggle that transitions the Cream/Royal Blue aesthetic into a dark, sophisticated editorial palette for low-light viewing.
* **Technical Blog Section:** Add a dedicated markdown-supported routing structure to publish articles on AI/ML workflows, Next.js architecture, and competitive programming editorials.

## ⚠️ Usage, Cloning & Credits

I am a huge advocate for open-source and collaborative learning! You are more than welcome to fork this repository, use the code as a reference, or clone it to use as a baseline for your own personal portfolio.

However, if you do use this codebase or its design structure, **please be respectful and provide proper credit**. You can do this by keeping a link back to this original repository in your site's footer or within your own README file.

⭐ **If you found this repository helpful, dropping a star would mean a lot and is highly appreciated!** ⭐

## License & Contributing

<!---Distributed under the [ADD LICENSE HERE, e.g., MIT] License. See `LICENSE` for more information.--->

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://www.google.com/search?q=https://github.com/kauntiaakash2/akashagarwal/issues).
