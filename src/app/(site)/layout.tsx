import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Naufal Altaf",
  description: "I'm Naufal Altaf. I write, code, and build things that I like.",
};

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex justify-center h-full">
      <body className={`${figtree.className} antialiased text-foreground bg-background max-w-5xl w-full flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow pb-28 lg:pb-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
