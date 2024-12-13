module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#745096',    // Morado
        secondary: '#9c79b5',  // Morado-medio
        accent: '#b293c4',     // Morado claro
        background: '#fdddbf', // Arena
        alt: '#f6a316',
        alt2: '#f07f11',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        gobold: ['Gobold', 'sans-serif'],
        retro: ['Retro Vintage', 'serif'],
      }
    },
  },
  plugins: [],
}