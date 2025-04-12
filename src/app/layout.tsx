import "@/styles/globals.css"
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children } : RootLayoutProps) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}  