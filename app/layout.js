import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
