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
    <html
      lang="en"
      className={`antialiased`}
    >
      <body>
        <div className="mx-auto max-w-5xl px-6 sm:px-0">{children}</div>
      </body>
    </html>
  );
}
