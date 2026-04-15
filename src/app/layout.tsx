import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

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
        <main className="mx-auto max-w-5xl w-full px-6 sm:px-0 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
