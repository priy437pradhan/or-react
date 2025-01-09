/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your root colors here
        primary: {
          DEFAULT: '#1a73e8',
          dark: '#1557b0',
        },
        secondary: {
          DEFAULT: '#4a5568',
          dark: '#2d3748',
        },
      },
      spacing: {
        // Add your root spacing here
        'root-spacing': '1rem',
        'section-spacing': '2rem',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
  ],
}