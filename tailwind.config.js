const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this based on your project structure
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { "platform-font": ["Poppins", "serif"] },
      colors: {
        grayish: "#545454",
        graytext: "#737373",
        grey: "#668a88",
        lightbg: "#f6f5f3",
        primary: "#034d3a",
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        platformTheme: {
          colors: {
            primary: {
              DEFAULT: "#034d3a",

              50: "#e0fff8",
              100: "#b5fcea",
              200: "#89f9dc",
              300: "#5df7cf",
              400: "#3bf5c1",
              500: "#2cdca7",
              600: "#1fab82",
              700: "#137b5d",
              800: "#034a37",
              900: "#001a11",
            },

            secondary: { DEFAULT: "#000000" },
          },
        },
      },
    }),
  ],
};
