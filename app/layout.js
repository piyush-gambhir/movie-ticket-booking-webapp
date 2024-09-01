import "./globals.css";
import { Inter } from "@/fonts/fonts";

import Providers from "@/providers/providers";

import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Movie Ticket Booking Web App",
  description: "Movie Booking Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
