/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBg: '#ECE2DB', 
        formBg : '#F3F4F6' // Define your custom color here
      },
    },
  },
  plugins: [],
}