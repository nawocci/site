import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import Navbar from "@/app/(site)/components/Navbar";
import Footer from "@/app/(site)/components/Footer";

export const metadata: Metadata = {
  title: "Naufal Altaf",
  description: "Naufal Altaf's personal website",
};

const figtree = Figtree({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${figtree.className} bg-background text-text`}>
        <div className="min-h-[100dvh] flex justify-center px-4 md:px-0">
          <div className="w-full md:max-w-5xl flex flex-col">
            <Navbar />
            <main className="flex flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
