import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";

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
      <body className={`${figtree.className} bg-background text-text`}>
        {children}
      </body>
    </html>
  );
}
