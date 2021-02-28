const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        primary: colors.yellow,
        gray: colors.trueGray,
      },
      boxShadow: {
        sm: "0 .125rem .5rem 0 rgba(0, 0, 0, 0.03)",
        md:
          "0 .125rem .3rem 0 rgba(0, 0, 0, 0.05), 0 .2rem .4rem 0 rgba(0, 0, 0, 0.03)",
      },
      inset: {
        "1/2": "50%",
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1.25rem",
      },
      spacing: {
        "text-4": "1em",
        "text-5": "1.25em",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
}
