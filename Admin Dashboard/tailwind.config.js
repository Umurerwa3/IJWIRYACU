/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: {
          light: '#1976d2',
          DEFAULT: '#1976d2',
          dark: '#1565c0',
        },
        // Dark theme colors
        dark: {
          bg: '#1a1a1a',
          card: '#2d2d2d',
          text: '#e5e5e5',
          border: '#404040',
        }
      },
    },
  },
  plugins: [],
}
