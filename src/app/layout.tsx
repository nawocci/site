import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Naufal Altaf",
};

const figtree = Figtree({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} bg-background text-text duration-300`}>
        <div className="min-h-[100dvh] flex justify-center px-4 sm:px-0">
          <div className="w-full max-w-5xl flex flex-col">
            <Navbar />
            <main className="flex-grow flex justify-center items-center animate-fadeIn">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
