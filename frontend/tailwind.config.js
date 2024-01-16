/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#F9F1E7",
        color1_selected: "#B88E2F",
        color2: "#816DFA",
        color3: "#F4F5F7",
        color_selected: "#B88E2F",
        color_home: "#FFF3E3",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
