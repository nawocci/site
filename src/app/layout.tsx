import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naufal Altaf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-text">
        {children}
      </body>
    </html>
  );
}
