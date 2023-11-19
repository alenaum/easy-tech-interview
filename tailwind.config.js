/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
  daisyui: {
    themes: ["dim"],
  },
}
