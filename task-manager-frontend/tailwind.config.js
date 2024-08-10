/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'purple': '#331832',
        'l-purple': '#694d75',
        'blue': '#1b5299',
        'l-blue': '#0096c7',
        'cream': '#f1ecce',
        'black':'#212227',
        'gray': '#373f51',
        'light-blue': '#58a4b0',
        'gray-blue': '#a9bcd0',
        'red': '#c1121f',
        'l-red': '#e5383b',	
        'green': '#0ead69',
        'l-green': '#6ede8a',	
        'light-gray': '#a9bcd0',
        'white': '#edf2f4',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        bold: 700,
        semi: 400, 
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
