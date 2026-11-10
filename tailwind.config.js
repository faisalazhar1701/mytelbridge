export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { navy: { 950: '#050B1A', 900: '#0A1330', 800: '#101C44' }, brand: '#2F7BFF', cyan2: '#22D3EE' },
      fontFamily: { display: ['Sora', 'Inter', 'sans-serif'], sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
