module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      rotate: {
        270: "270deg"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
