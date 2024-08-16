import Header from "@/components/Header";
import "./globals.css";

import { Inter } from "@/fonts/fonts";

import Providers from "@/providers/providers";

export const metadata = {
  title: "Movie Booking App",
  description: "Movie Booking App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
