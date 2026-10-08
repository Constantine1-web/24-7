/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#14382B",
          darkGreen: "#0D251C",
          lightGreen: "#1D4E3D",
          parchment: "#FBF7EE",
          parchmentDark: "#F2EADB",
          orange: "#E85D04",
          orangeHover: "#DC5200",
          yellow: "#FFB703",
          yellowLight: "#FFC533",
          darkBrown: "#2A1E17",
          creamCard: "#F3ECE0",
          charcoal: "#1A1A1A",
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
