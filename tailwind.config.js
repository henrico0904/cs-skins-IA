/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'cs-bg':       '#0a0e27',
        'cs-surface':  '#111d3d',
        'cs-border':   '#1e2d5f',
        'cs-orange':   '#0066ff',
        'cs-gold':     '#00d4ff',
        'cs-blue':     '#0099ff',
        'cs-pink':     '#ff0099',
        'cs-text':     '#e4e4f0',
        'cs-muted':    '#8b9dc3',
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
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 102, 255, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 102, 255, 0.6)' },
        },
      },
      animation: {
        shimmer:   'shimmer 2.5s linear infinite',
        carousel:  'slideLeft 28s linear infinite',
        'fade-in': 'fadeIn 0.4s ease forwards',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
