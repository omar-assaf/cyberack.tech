/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.html',
    './*.md'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ],
      },
      colors: {
        framer: {
          bg: '#000000',
          card: '#111111',
          border: '#222222',
          textPrimary: '#ffffff',
          textSecondary: '#888888',
          accent: '#0099ff',
          accentHover: '#33adff'
        }
      }
    },
  },
  plugins: [],
}