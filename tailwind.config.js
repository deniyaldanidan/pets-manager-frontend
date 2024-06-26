/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    fontFamily: {
      poppins: '"Poppins", sans-serif',
      playfair: '"Playfair Display", serif'
    },
    extend: {
      colors: {
        "foreground": "#1a0a02",
        "secFg": "#2a1a12",
        "terFg": "#3a2a22",
        "background": "#f1ede7",
        "secBg": "#faf4f1",
        "terBg": "#fff9f6",
        "border": "#cac4c1",
        "primary": "#ff7716",
        "secondary": "#7ef7f2",
        "accent": "#406cf3"
      },
      spacing: {
        myspace: "65px"
      }
    },
  },
  plugins: [],
}

