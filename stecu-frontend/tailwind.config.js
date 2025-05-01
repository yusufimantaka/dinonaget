/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        customGray: '#232222',
        customGrayLight: '#363636',
        customGrayDark: '#1A1A1A',

      },
    },
  },
  plugins: [],
};
