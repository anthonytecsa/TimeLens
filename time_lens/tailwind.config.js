/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes all files in src
    "./pages/**/*.{js,jsx,ts,tsx}", // Includes traditional pages directory
    "./components/**/*.{js,jsx,ts,tsx}", // Includes components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
