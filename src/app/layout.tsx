import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // <--- Ngayon gagana na ito!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lance Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {/* Navbar sa taas ng lahat ng pages */}
        <Navbar />
        
        {children}
      </body>
    </html>
  );
}