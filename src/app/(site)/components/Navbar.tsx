'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center min-h-32">
      <Link href="/" className="flex items-center gap-4">
        <Image 
          src="https://github.com/nawocci.png"
          alt="logo"
          width={64}
          height={64}
          className="rounded-full sm:w-10 sm:h-10 border border-solid border-border"
        />
        <h1 className="text-2xl font-semibold hover:text-primary hover:flicker">
          <span className="inline">Naufal&nbsp;</span>
          <span className="">Altaf</span>
        </h1>
      </Link>
      <div className="flex items-center gap-6">
        <Link 
          href="/blog"
          className={`flex items-center justify-center px-4 py-2 font-semibold border-2 rounded-2xl duration-200 ${
            pathname.startsWith('/blog')
              ? 'text-primary border-primary'
              : 'border-foreground hover:text-primary hover:border-primary'
          }`}
        >
          Blog
        </Link>
        <Link 
          href="/drive"
          className={`flex items-center justify-center px-4 py-2 font-semibold border-2 rounded-2xl duration-200 ${
            pathname.startsWith('/drive')
              ? 'text-primary border-primary'
              : 'border-foreground hover:text-primary hover:border-primary'
          }`}
        >
          Drive
        </Link>
        <Link 
          href="mailto:naufal@altaf.xyz"
          className="flex items-center justify-center px-4 py-2 font-semibold border-foreground border-2 rounded-2xl hover:text-primary hover:border-primary duration-200"
        >
          Contact
        </Link>
      </div>
    </nav>
  )
}
