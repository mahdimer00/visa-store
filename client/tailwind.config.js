/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Arabic', 'sans-serif'],
      },
      colors: {
        primary: '#1D4ED8', // Blue for professional look
        secondary: '#10B981', // Green for accents
        accent: '#EF4444', // Red for errors
      },
    },
  },
  plugins: [],
};