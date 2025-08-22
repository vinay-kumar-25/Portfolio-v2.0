/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["./index.html", "./assets/js/**/*.{js,jsx,ts,tsx,html}"],
  darkMode: 'class', // Or 'media' for OS preference
  theme: {
    extend: {
      colors: {
        'primary-blue': {
          DEFAULT: 'rgb(1, 1, 90)', // Your specified blue
          50: '#E0E0F0',
          100: '#C0C0E0',
          200: '#A0A0D0',
          300: '#8080C0',
          400: '#6060B0',
          500: '#4040A0', // A slightly lighter shade for variations
          600: '#202080',
          700: '#01015A', // A darker shade
          800: '#000040',
          900: '#000020',
        },
        'accent-blue': { // Actually orange shades now
 light: '#FFDAB9',   // Peach-Orange (if you want a softer light option)
  DEFAULT: '#FF8C00', // Dark Orange / Tangerine (energetic, less 'peach')
  dark: '#CC5500',      // Dark burnt orange (strong accents)
},

        'text-light': '#F8FAFC', // Near white for main text
        'text-dark': '#CBD5E1', // Slightly darker for secondary text
        'bg-dark': '#00000A', // Very dark background base
        'bg-card': 'rgba(1, 1, 90, 0.7)', // Your primary blue with transparency for cards
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'], // Default sans-serif font
        heading: ['Open Sans', 'sans-serif'], // Font for prominent headings
        mono: ['SF Mono', 'monospace'], // For code-like elements
      },
      boxShadow: {
        '2xl-custom': '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(1, 1, 90, 0.4)', // Custom shadow with blue tint
        '2xl-custom-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06), inset 0 0 20px rgba(1, 1, 90, 0.6)',
      },
       keyframes: {
    gradient: {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
  },
  backgroundSize: {
    '200%': '200%',
  },
  animation: {
    'gradient-x': 'gradient 4s ease-in-out infinite',
  },
    },
  },
  plugins: [],
};