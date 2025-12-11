/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // include this if you use `src/` structure
  ],
  theme: {
    extend: {
      colors: {
        // Example custom brand colors (adjust to match your app)
        "pne-brand": "#1B4965",
        "pne-accent": "#62B6CB",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}
