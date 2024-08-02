import "./globals.css";

import { Inter } from "@/fonts/fonts";

export const metadata = {
  title: "Movie Booking App",
  description: "Movie Booking App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Inter.className}>{children}</body>
    </html>
  );
}
