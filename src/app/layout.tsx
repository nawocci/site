import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RouteTransition from "@/components/RouteTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Naufal Altaf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground font-sans min-h-screen flex flex-col">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-3 sm:px-6 lg:px-8">
          <Navbar />
          <main className="flex-1 py-4 sm:py-6">
            <RouteTransition>{children}</RouteTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
