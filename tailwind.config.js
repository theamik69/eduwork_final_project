/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-recom': "url('./src/assets/images/recom.jpg')",
      }
    },
  },
  plugins: [],
}