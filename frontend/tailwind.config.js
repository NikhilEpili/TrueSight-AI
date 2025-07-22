/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Libre Baskerville", "serif"],
      },
      colors: {
        background: '#f3f4f6', // medium-light background for the whole site
        primary: '#6366f1', // indigo-500
        accent: '#a5b4fc', // light indigo accent
      },
    },
  },
  plugins: [],
}

