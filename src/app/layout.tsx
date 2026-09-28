import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Pemilihan PJ Matkul | Kelas 4KA25",
  description: "Sistem pemilihan Penanggung Jawab Mata Kuliah secara acak dan transparan menggunakan Spin Wheel untuk Kelas 4KA25.",
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
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased bg-background text-foreground`}
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
