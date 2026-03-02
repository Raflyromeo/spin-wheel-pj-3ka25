import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PJ Selector | Dual Spin Wheel",
  description: "Modern immersive spin wheel to select Person in Charge (PJ) fairly using dual spin logic.",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
           <div className="relative flex min-h-screen flex-col">
             <Navbar />
             <div className="flex-1">{children}</div>
             <Footer />
           </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
