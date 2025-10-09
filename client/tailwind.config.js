/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkviolet: '#9400D3',
        firstCard: '#f0fff4',
        fCTextColor: '#065f46',
        secondCard: '#fffaf2',
        sCTextColor: '#5b3700',
        slate: {
          50 : '#f8fafc'
        }
      },
    },
  },
  plugins: [],
}

