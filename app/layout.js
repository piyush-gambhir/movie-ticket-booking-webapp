import { GoogleTagManager } from "@next/third-parties/google";

import { Inter } from "@/fonts/fonts";

import Providers from "@/providers/providers";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

export const metadata = {
  title: "Movie Ticket Booking Web App",
  description: "Movie Booking Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-M5TXSH7R" />
      <body className={Inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
