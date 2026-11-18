/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bank Proposal Theme Colors
        'brand-bank-green': '#196f3d',
        'brand-bank-cyan': '#0099b8',
        'brand-bank-red': '#c0392b',
        'brand-bank-purple': '#6C3483',

        // Clean Eco Emerald Green (Customer Proposal Primary Brand)
        brand: {
          green: '#196f3d',
          cyan: '#0099b8',
          red: '#c0392b',
          purple: '#6C3483',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        navy: {
          50: '#f0f6ff',
          100: '#e0effe',
          500: '#0284c7',
          800: '#0a2540',
          900: '#071726',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        eco: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        solar: {
          amber: '#d97706',
          orange: '#f97316',
          warm: '#f59e0b',
          gold: '#eab308',
          glow: '#fde047',
          subtle: '#fffbeb',
          border: '#fde68a',
        },
        neutral: {
          surface: '#f8fafc',
          card: '#ffffff',
          subtle: '#f1f5f9',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(10, 37, 64, 0.05), 0 1px 2px -1px rgba(10, 37, 64, 0.05)',
        'card': '0 4px 6px -1px rgba(10, 37, 64, 0.04), 0 2px 4px -2px rgba(10, 37, 64, 0.04)',
        'float': '0 10px 25px -3px rgba(10, 37, 64, 0.08), 0 4px 6px -4px rgba(10, 37, 64, 0.05)',
        'a4': '0 20px 40px -15px rgba(10, 37, 64, 0.15), 0 0 1px 1px rgba(10, 37, 64, 0.05)',
      }
    },
  },
  plugins: [],
}
