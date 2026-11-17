/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#196f3d',
          cyan: '#0099b8',
          red: '#c0392b',
          purple: '#6C3483'
        }
      }
    },
  },
  plugins: [],
}

