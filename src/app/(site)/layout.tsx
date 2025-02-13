import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/(site)/components/Navbar";
import Footer from "@/app/(site)/components/Footer";

export const metadata: Metadata = {
  title: "Naufal Altaf",
  description: "Naufal Altaf's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
