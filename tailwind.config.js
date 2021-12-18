const colors = require("tailwindcss/colors")
const theme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.vue"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      inset: {
        "1/2": "50%",
      },
      spacing: {
        "text-4": "1em",
        "text-5": "1.25em",
      },
    },
    colors: {
      black: colors.black,
      gray: colors.gray,
      primary: colors.indigo,
      transparent: "transparent",
      white: colors.white,
    },
    borderRadius: {
      DEFAULT: "0.75rem",
      lg: "1.25rem",
      full: theme.borderRadius.full,
    },
    screens: {
      normal: "680px",
    },
  },
  plugins: [],
}
