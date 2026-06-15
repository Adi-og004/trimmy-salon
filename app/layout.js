import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Trimmy's — Best Luxury Unisex Salon in Bhiwadi",
  description:
    "Experience premium grooming at Trimmy's, the finest luxury unisex salon in Bhiwadi. Expert stylists, world-class treatments, and an unforgettable experience for him & her.",
  keywords:
    "salon, luxury salon, unisex salon, Bhiwadi, haircut, balayage, bridal, grooming, Trimmy",
  openGraph: {
    title: "Trimmy's — Best Luxury Unisex Salon in Bhiwadi",
    description:
      "Experience premium grooming at Trimmy's, the finest luxury unisex salon in Bhiwadi.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
