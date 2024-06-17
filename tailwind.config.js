/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        current: "currentColor",
        gray: "rgba(69 ,69 ,69,0.75)",
        primary: "#0075FF",
        secondary: "#000F28",
        bodyText: "#fff",
        white: "#fff",
        black: "#000",
        light: "#667085"
      },
      fontFamily: {
        Ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
