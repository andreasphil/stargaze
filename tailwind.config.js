module.exports = {
  purge: [],
  theme: {
    extend: {},
    colors: {
      'crayola-10': 'var(--color-crayola-10)',
      'eerie-black': 'var(--color-eerie-black)',
      crayola: 'var(--color-crayola)',
      cultured: 'var(--color-cultured)',
      jet: 'var(--color-jet)',
      powder: 'var(--color-powder)',
      web: 'var(--color-web)',
      white: 'var(--color-white)',
      transparent: 'transparent'
    },
    spacing: {
      px: '1px',
      '0': '0',
      '1/4': '.25rem',
      '1/2': '.5rem',
      '3/4': '.75rem',
      '1': '1rem',
      '1-1/2': '1.5rem',
      '2': '2rem',
      '4': '4rem',
      '6': '6rem',
      '8': '8rem'
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
    fontSize: {
      small: '.875rem',
      base: '1rem',
      large: '1.25rem',
      h1: '2.25rem',
      h2: '1.5rem'
    },
    fontWeight: {
      normal: '400',
      emphasized: '600',
      heavy: '700'
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      normal: '1.5'
    },
    borderRadius: {
      default: '.5rem',
      none: '0',
      full: '9999rem'
    },
    borderWidth: {
      default: '0.125rem',
      hair: '1px'
    }
  },
  variants: {},
  plugins: []
}
