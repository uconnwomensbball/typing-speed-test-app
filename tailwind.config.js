/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        soraReg: ['sora-regular', 'sans-serif'],
        soraSemiBold: ['sora-semi-bold','sans-serif'], 
        soraBold: ['sora-bold', 'sans-serif']
      },
    },
  },
  plugins: [],
}
