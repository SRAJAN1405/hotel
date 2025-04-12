const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "spice-orange": "#E85D04",
        "spice-orange-dark": "#DC4C03",
        "gold-crayola": "#FFC107",
        "gold-dark": "#C4A670",
        "deep-brown": "#3C2F2F",
        maroon: "#4A2F2F",
        "gray-300": "#D1D5DB",
      },
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
        forum: ["Forum", "cursive"],
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionDuration: {
        7000: "7000ms",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
