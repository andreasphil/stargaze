module.exports = {
  purge: ["./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "hsl(216, 33%, 97%)",
          200: "hsl(216, 27%, 93%)",
          300: "hsl(216, 27%, 88%)",
          400: "hsl(216, 27%, 70%)",
          500: "hsl(216, 21%, 60%)",
          600: "hsl(216, 21%, 46%)",
          700: "hsl(216, 15%, 34%)",
          800: "hsl(216, 15%, 22%)",
          900: "hsl(216, 15%, 10%)",
        },
        yellow: "hsl(45, 100%, 68%)",
      },
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
      boxShadow: {
        sm: "0 .125rem .5rem 0 rgba(0, 0, 0, 0.03)",
        md:
          "0 .125rem .3rem 0 rgba(0, 0, 0, 0.05), 0 .2rem .4rem 0 rgba(0, 0, 0, 0.03)",
      },
      inset: {
        "1/2": "50%",
      },
      borderRadius: {
        default: "0.75rem",
        lg: "1.25rem",
      },
      spacing: {
        "text-4": "1em",
        "text-5": "1.25em",
      },
    },
  },
  variants: {
    opacity: ["disabled"],
  },
  plugins: [],
}
