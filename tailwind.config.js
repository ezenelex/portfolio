/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/src/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        background: '#0c1222',
        text_skill: '#53c8b9',
        icon: '#b0a99f',
        text_primary: '#c9d7e3',
        text_secondary: '#aaa4a0',
        skill_background: '#0f2233'
      },
    },
  },
  plugins: [],
}

