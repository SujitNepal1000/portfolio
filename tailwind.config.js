module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        opensans: ['Open Sans', 'Arial', 'Helvetica', 'sans-serif'],
        dmmono: ['DM Mono', 'monospace'],
      },
      colors: {
        primary: '#1a1a2e',
        accent: '#e94560',
        secondary: '#23234b',
        light: '#fffaf2',
        dark: '#131212',
        text: '#fcfbfb',
        highlight: '#ea0027',
      },
      backgroundImage: {
        'portfolio-bg': "url('./src/assects/bg-image.jpg')",
      },
    },
  },
  plugins: [],
};
