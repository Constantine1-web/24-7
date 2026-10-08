/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "var(--brand-green)",
          darkGreen: "var(--brand-darkGreen)",
          lightGreen: "var(--brand-lightGreen)",
          parchment: "var(--brand-parchment)",
          parchmentDark: "var(--brand-parchmentDark)",
          orange: "var(--brand-orange)",
          orangeHover: "var(--brand-orangeHover)",
          yellow: "var(--brand-yellow)",
          yellowLight: "var(--brand-yellowLight)",
          darkBrown: "var(--brand-darkBrown)",
          creamCard: "var(--brand-creamCard)",
          charcoal: "var(--brand-charcoal)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-clash)", "Impact", "sans-serif"],
      },
      boxShadow: {
        'brand': '0 20px 40px -15px rgba(20, 56, 43, 0.15)',
        'orange-glow': '0 12px 30px -8px rgba(232, 93, 4, 0.4)',
        'card-elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
};
