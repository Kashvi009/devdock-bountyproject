/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF1493', // Hot pink
          dark: '#CC1177',
        },
        secondary: {
          DEFAULT: '#1A1A1A', // Rich black
          light: '#2D2D2D',
        }
      }
    },
  },
  plugins: [],
};