// app/layout.js
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}


  