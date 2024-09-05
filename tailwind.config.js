/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "sugar-cane": {
        50: "#fbfff5",
        100: "#edffd7",
        200: "#ddffb2",
        300: "#c0ff76",
        400: "#9cf533",
        500: "#7cde09",
        600: "#64b900",
        700: "#4f9005",
        800: "#40710a",
        900: "#345d0a",
        950: "#1a3400",
      },

      feta: {
        50: "#f3faeb",
        100: "#e4f3d4",
        200: "#cae9ad",
        300: "#a8d97d",
        400: "#89c754",
        500: "#6aac36",
        600: "#508927",
        700: "#3e6922",
        800: "#355420",
        900: "#2e481f",
        950: "#16270c",
      },
    },
  },
  plugins: [],
};
