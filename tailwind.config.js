/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-muni' : '#00bc70',
        'blue-muni' : '#1700a5',
        'lime-muni' : '#97d700',
      },
      boxShadow: {
        'all': '0 10px 15px -5px rgb(0 0 0 / 0.1), 0 -10px 15px -5px rgb(0 0 0 / 0.1), 10px 0 15px -5px rgb(0 0 0 / 0.1), -10px 0 15px -5px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

