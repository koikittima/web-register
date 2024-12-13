/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Prompt: ['Prompt', 'sans-serif'],
      },
      screens: {
        xs: '200px',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
