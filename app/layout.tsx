import type { Metadata } from "next";
import { Poppins, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-main",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "BoxPox — Box of Possibility",
  description: "Consumer-focused innovation. Hardware and software products engineered for the future. Get instant 3D printing quotes with BoxPrint.",
  keywords: ["innovation", "hardware", "software", "consumer products", "technology", "3D printing", "BoxPrint", "custom prints"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  appleWebApp: {
    title: "BoxPox",
    statusBarStyle: "default",
    capable: true,
  },
  openGraph: {
    title: "BoxPox — Box of Possibility",
    description: "Consumer-focused innovation. Hardware and software products engineered for the future.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${spaceMono.variable} font-sans cursor-default`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
