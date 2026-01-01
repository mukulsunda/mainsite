import type { Metadata } from "next";
import { Poppins, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  description: "Consumer-focused innovation. Hardware and software products engineered for the future.",
  keywords: ["innovation", "hardware", "software", "consumer products", "technology"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${spaceMono.variable} font-sans cursor-default`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
