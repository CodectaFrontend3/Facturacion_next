/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 2. Cambiamos la fuente predeterminada a Outfit
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        'sidebar-bg': '#1538a0',
        'topbar-text': '#000000',
        'card-bg': '#ffffff',
        'bg-gray': '#f4f6f9',
        'turquoise': '#26c6da',
        'leonosoft-blue': '#0100FF',
        'leonosoft-btn': '#0044B2'
      }
    },
  },
  plugins: [],
}