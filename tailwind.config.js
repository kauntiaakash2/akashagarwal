/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        phosphor: "#00ff00",
        terminal: "#000000",
        panel: "#050805",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "IBM Plex Mono", "Fira Code", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
