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
      <body className={`${figtree.className} bg-background text-text w-full flex justify-center px-4 sm:px-0`}>
        <div className="max-w-5xl w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
