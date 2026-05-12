/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FDFBF7",
        royal: "#0A2A5E",
        rust: "#C05621",
        ink: "#151515",
      },
      fontFamily: {
        serif: ["Playfair Display", "Merriweather", "Georgia", "serif"],
        sans: ["Inter", "DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(10, 42, 94, 0.08)",
        editorial: "0 30px 80px rgba(10, 42, 94, 0.16)",
      },
    },
  },
  plugins: [],
};
