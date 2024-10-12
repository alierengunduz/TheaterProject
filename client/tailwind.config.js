/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      skew: {
        30: "30deg",
      },
    },
  },
  plugins: [],
};
