// /app/layout.js
import "../styles/globals.css";  // Adicionando a importação do CSS global

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}

  