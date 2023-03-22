/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: "class",
  theme: {
    screens: {
      'phone': '480px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    colors: {
      'offWhite': '#f5f5f5',
      'bgDarkMode': '#2B2A2B',
      'transctionsDarkMode': '#424042',
      'borderLight': '#D6D9DC',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'primary': '#ff39db',
      'royalBlue': '#0052FF',
      'Entertainment': '#990099',
      'FoodDrink': '#DC3913',
      'Groceries': '#449F46',
      'Utilities': '#0199C6',
      'Travel': '#3366CC',
      'Shopping': '#FF9802',
      'Other': '#90A4AF'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    dropShadow: {
      'test': '0 0 0 rgb(0,50,50)'
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}
