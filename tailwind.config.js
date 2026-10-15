/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#087443',
          light: '#0A8F55',
          dark: '#065C36',
        },
        deep: {
          DEFAULT: '#064E3B',
          light: '#0A6349',
          dark: '#04382B',
        },
        mint: {
          DEFAULT: '#EAF5EE',
          light: '#F0F9F3',
          dark: '#D0E8D9',
        },
        warm: {
          DEFAULT: '#FAFAF7',
          dark: '#F0F0EB',
        },
        charcoal: '#202923',
        muted: '#66716A',
        border: '#E2E5E0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
}
