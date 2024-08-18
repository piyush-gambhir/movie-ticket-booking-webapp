import "./globals.css";

import { Inter } from "@/fonts/fonts";

import Providers from "@/providers/providers";

import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Movie Booking App",
  description: "Movie Booking App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
