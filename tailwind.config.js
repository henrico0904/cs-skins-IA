/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'cs-bg':       '#08080E',
        'cs-surface':  '#111119',
        'cs-border':   '#1E1E2E',
        'cs-orange':   '#FF6B35',
        'cs-gold':     '#F0C040',
        'cs-blue':     '#4A9EFF',
        'cs-pink':     '#FF4E9F',
        'cs-text':     '#E4E4F0',
        'cs-muted':    '#6B6B88',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideLeft: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer:   'shimmer 2.5s linear infinite',
        carousel:  'slideLeft 28s linear infinite',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
    },
  },
  plugins: [],
}
