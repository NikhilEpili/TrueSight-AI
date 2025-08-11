/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Montserrat", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: '#3B3BFF', // Sensity blue
        accent: '#FF3B3B', // Sensity red
        background: '#FFFFFF', // white
        text: '#111111', // almost black
        lightgray: '#F5F6FA', // light gray section bg
        bordergray: '#E5E7EB', // border gray
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      addUtilities(newUtilities)
    }
  ],
}

