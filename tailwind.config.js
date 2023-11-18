/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dim"],
  },
}
