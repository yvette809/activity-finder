/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette — warm, energetic, outdoor-activity feel
        forest: {
          50: "#f0f9f4",
          100: "#dcf2e3",
          200: "#bce4cb",
          300: "#8acea7",
          400: "#56b07d",
          500: "#33945f",
          600: "#23774a",
          700: "#1d5f3d",
          800: "#194c33",
          900: "#163f2c",
          950: "#0a2317",
        },
        sun: {
          50: "#fff9eb",
          100: "#fef0c7",
          200: "#fde08a",
          300: "#fbcb4d",
          400: "#fab424",
          500: "#f49a0c",
          600: "#d87406",
          700: "#b35009",
          800: "#923f0e",
          900: "#78340f",
        },
        ink: {
          50: "#f7f7f8",
          100: "#eeeef0",
          200: "#d9d9df",
          300: "#b8b8c2",
          400: "#90909f",
          500: "#727283",
          600: "#5b5b6a",
          700: "#4a4a55",
          800: "#3f3f48",
          900: "#37373e",
          950: "#1a1a1f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(0,0,0,0.04), 0 4px 16px -4px rgba(0,0,0,0.06)",
        card: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.08)",
        lift: "0 4px 12px rgba(0,0,0,0.06), 0 16px 40px -8px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
