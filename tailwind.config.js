/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        surface: "#F8FAFC",
        dark: {
          bg: "#0b0f1a",
          surface: "#111827",
          elevated: "#1a2236",
          text: "#f0f4ff",
          textSecondary: "#8b9ab8",
        },
        light: {
          bg: "#f4f6fb",
          surface: "#ffffff",
          elevated: "#eef1f8",
          text: "#0f1729",
          textSecondary: "#4a5675",
        },
      },
    },
  },
  plugins: [
  ],
}