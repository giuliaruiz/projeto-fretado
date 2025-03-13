/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",  // Para arquivos dentro da pasta 'app' do Next.js
    "./pages/**/*.{js,ts,jsx,tsx}",  // Para arquivos dentro da pasta 'pages'
    "./components/**/*.{js,ts,jsx,tsx}",  // Para arquivos dentro da pasta 'components'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

