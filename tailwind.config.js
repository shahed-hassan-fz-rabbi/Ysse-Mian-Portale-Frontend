/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#087443', // accessible deep YSSE green (buttons, links, text)
          light: '#0A8F55',
          dark: '#065C36',
        },
        brand: '#30B078', // sampled from the official YSSE logo (accent use)
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
      fontSize: {
        display: ['clamp(2.5rem, 4.5vw + 0.5rem, 3.75rem)', { lineHeight: '1.07', letterSpacing: '-0.02em' }],
        title: ['clamp(1.75rem, 2vw + 1rem, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.0625rem, 0.5vw + 0.9rem, 1.25rem)', { lineHeight: '1.65' }],
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
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        nav: '0 12px 28px -24px rgba(6, 78, 59, 0.45)',
        cta: '0 12px 28px -14px rgba(4, 56, 43, 0.5)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-8px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-down': 'fadeDown 0.18s ease-out both',
      },
    },
  },
  plugins: [],
}
