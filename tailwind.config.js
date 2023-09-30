/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        scroll: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll: "scroll 35s linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-max-sans)", "sans-serif"],
      },
      backgroundImage: (theme) => ({
        "body-pattern": "url('assets/images/body-pattern.svg')",
        "radial-gradient":
          "radial-gradient( 51.39% 511.66% at 47.68% -217.91%, #ff9900 0%, #e50914 17.27%, #0e1b4f 79.44%, #000413 100% )",
      }),
      boxShadow: {
        "box-shadow": "0px -8px 25px rgba(0, 0, 0, 0.5)",
      },
      colors: {
        primaryBlue: "#0e1b4f",
        primaryRed: "#e50914",
        primaryYellow: "#ff9900",
        primaryGray: "#000413",
        primaryWhite: "#ffffff",
        primaryBlack: "#000000",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animate"), nextui()],
};
