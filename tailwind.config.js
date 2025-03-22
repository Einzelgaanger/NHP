tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4a90e2',
        secondary: '#2ecc71',
        warning: '#f1c40f',
        danger: '#e74c3c',
        dark: '#2c3e50',
        light: '#ecf0f1',
      },
    },
  },
  plugins: [],
}