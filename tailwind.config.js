module.exports = {
  purge: ['./src/**/*.vue'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#F9F9FA',
          200: '#E9E9ED',
          300: '#DEDEE3',
          400: '#AFAFB6',
          500: '#898990',
          600: '#6F6F76',
          700: '#505053',
          800: '#323234',
          900: '#1E1E1F'
        },
        yellow: '#FFD65C'
      },
      borderWidth: {
        default: '0.125rem'
      },
      container: {
        center: true
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ]
      },
      boxShadow: {
        sm: '0 .125rem .25rem 0 rgba(0, 0, 0, 0.05)',
        'outline-yellow':
          '0 0 0 .0625rem rgba(255, 214, 92, 1), 0 0 0 0.25rem rgba(255, 214, 92, 0.3)'
      }
    }
  },
  variants: {},
  plugins: []
}
