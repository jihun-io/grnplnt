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
      "wisp-pink": {
        50: "#fff5f7",
        100: "#ffe0e6",
        200: "#ffc6d1",
        300: "#ff9eb1",
        400: "#ff6685",
        500: "#fd365e",
        600: "#eb1741",
        700: "#c60f34",
        800: "#a3112e",
        900: "#87152c",
        950: "#4a0513",
      },
      mantis: {
        50: "#f6faf3",
        100: "#e9f5e3",
        200: "#d3eac8",
        300: "#afd89d",
        400: "#82bd69",
        500: "#61a146",
        600: "#4c8435",
        700: "#3d692c",
        800: "#345427",
        900: "#2b4522",
        950: "#13250e",
      },
      chablis: {
        50: "#fff5f5",
        100: "#ffe0e0",
        200: "#ffc6c6",
        300: "#ff9e9e",
        400: "#ff6666",
        500: "#fd3636",
        600: "#eb1717",
        700: "#c60f0f",
        800: "#a31111",
        900: "#871515",
        950: "#4a0505",
      },
      "mine-shaft": {
        50: "#f6f6f6",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#888888",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#4f4f4f",
        800: "#454545",
        900: "#343434",
        950: "#262626",
      },
      white: "#ffffff",
      black: "#000000",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
