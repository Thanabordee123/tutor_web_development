/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': "#0a192f",
        'hard-dark-blue': "#030b2e",
        'light-blue': "#1e293b",
        'cream': "#f0efed"
      },
      backgroundImage: {
        'wood': "url('file:///C:/Users/ADMIN/Documents/dev/frontend-project/my-app/src/assets/images/MainWoodBg.jpg')",
        'mister-Ohm': "url('file:///C:/Users/ADMIN/Documents/dev/frontend-project/my-app/src/assets/images/MisterOhm.jpg')"
      },
    },
  },
  plugins: [],
}
