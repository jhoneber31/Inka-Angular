/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('/assets/img/background-login.png')",
      }
    },
  },
  plugins: [],
}