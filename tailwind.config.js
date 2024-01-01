/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    { pattern: /bg-(red|green|yellow|purple|blue|cyan|sky|orange)-(500|400)/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
