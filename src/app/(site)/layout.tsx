import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Naufal Altaf",
  description: "I'm Naufal Altaf. I write, code, and build things that I like.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-foreground bg-background">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
