/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: false,
  content: ["./server/**/*.{hbs,html,js}"],
  corePlugins: {
    preflight: false,
  },
  // prefix: "tw-",
  theme: {
    extend: {},
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
