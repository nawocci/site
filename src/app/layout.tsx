import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Naufal Altaf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeBootstrapScript = `(function(){try{var themeKey='theme';var storedTheme=localStorage.getItem(themeKey);var root=document.documentElement;var system=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(storedTheme==='light'||storedTheme==='dark'){root.setAttribute('data-theme',storedTheme);root.style.colorScheme=storedTheme;}else{root.removeAttribute('data-theme');root.style.colorScheme=system;}}catch(_e){}})();`;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
      </head>
      <body className="bg-background text-foreground font-sans min-h-screen flex flex-col">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <Navbar />
          <main className="flex-1 pb-16 sm:pb-16 md:pb-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
