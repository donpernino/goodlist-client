module.exports = {
  theme: {
    fontFamily: {
      'sans': ['Manrope', 'Arial', 'sans-serif']
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      'default': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'xl': '20px',
    },
    opacity: {
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '10': '.1',
      '20': '.2',
      '30': '.3',
      '40': '.4',
      '50': '.5',
      '60': '.6',
      '70': '.7',
      '80': '.8',
      '90': '.9',
      '100': '1',
    },
    extend: {
      fontSize: {
        'xxs': '0.5rem'
      },
      colors: {
        dark: '#141322',
        primary: '#00f69b',
        primarydarken: '#00c27b',
        secondary: {
          blue: '#3468f6',
          bluedarken: '#0941dc',
          dark: '#1e213a',
          darklighten: '#212440',
          light: '#2a2e52',
          gray: '#939aba',
          border: '#2e314e',
        },
        "gray-900": '#9f9fa5',
      },
      boxShadow: {
        xl: '0 2.6px 0.9px rgba(0, 0, 0, 0.018),0 6px 2.2px rgba(0, 0, 0, 0.026),0 10.8px 3.9px rgba(0, 0, 0, 0.032),0 18px 6.4px rgba(0, 0, 0, 0.038),0 29.6px 10.6px rgba(0, 0, 0, 0.044),0 51.8px 18.5px rgba(0, 0, 0, 0.052),0 112px 40px rgba(0, 0, 0, 0.07)',
        xlhover: '0 2.6px 0.9px rgba(0, 0, 0, 0.018),0 6px 2.2px rgba(0, 0, 0, 0.026),0 10.8px 3.9px rgba(0, 0, 0, 0.032),5px 14px 6.4px rgba(0, 0, 0, 0.038),10px 25.6px 10.6px rgba(0, 0, 0, 0.044),15px 45.8px 18.5px rgba(0, 0, 0, 0.052),20px 100px 40px rgba(0, 0, 0, 0.07)',
        xlreverse: '0 -2.6px 0.9px rgba(0, 0, 0, 0.018), 0 -6px 2.2px rgba(0, 0, 0, 0.026), 0 -10.8px 3.9px rgba(0, 0, 0, 0.032), 0 -18px 6.4px rgba(0, 0, 0, 0.038), 0 -29.6px 10.6px rgba(0, 0, 0, 0.044), 0 -51.8px 18.5px rgba(0, 0, 0, 0.052), 0 -112px 40px rgba(0, 0, 0, 0.07)'
      },
      width: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        '10/10': '100%',
      },
      height: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        '10/10': '100%',
        '17/100': '17%',
        '83/100': '83%',
        'big-banner': '34rem'
      },
      screens: {
        'xxl': '1440px',
        'xxxl': '1880px'
      }
    }
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    boxShadow: ['responsive', 'hover', 'focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    objectPosition: ['responsive', 'hover', 'focus'],
    height: ['responsive', 'hover', 'focus'],
    margin: ['responsive', 'hover', 'focus'],
  },
  plugins: [
    require('tailwindcss-interaction-variants')(),
  ],
}
