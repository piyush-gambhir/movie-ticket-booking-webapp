import localFont from "next/font/local";

// Google Fonts
import { Inter as InterFont } from "next/font/google";
import { Poppins as PoppinsFont } from "next/font/google";

export const Inter = InterFont({ subsets: ["latin"] });

export const Poppins = PoppinsFont({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
