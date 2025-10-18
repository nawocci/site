'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiOutlineDocumentText, HiOutlineFolder, HiOutlineMail, HiOutlineHome } from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex justify-between items-center min-h-32">
        <Link href="/" className="flex items-center gap-4">
          <Image 
            src="https://github.com/nawocci.png"
            alt="logo"
            width={64}
            height={64}
            className="rounded-full border border-solid border-border"
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

      {/* Mobile Navbar - Top */}
      <div className="lg:hidden relative flex justify-center items-center min-h-20 border-b-2 border-border mb-6">
        <div className="absolute left-4">
          <Image 
            src="https://github.com/nawocci.png"
            alt="logo"
            width={48}
            height={48}
            className="rounded-full border border-solid border-border"
          />
        </div>
        <h1 className="text-xl font-semibold">
          <span className="inline">Naufal&nbsp;</span>
          <span className="">Altaf</span>
        </h1>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-6 left-4 right-4 bg-background border-2 border-border rounded-full shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          <Link 
            href="/"
            className={`flex items-center justify-center w-16 h-16 duration-200 ${
              pathname === '/'
                ? 'text-primary'
                : 'text-foreground'
            }`}
          >
            <HiOutlineHome className="w-7 h-7" />
          </Link>
          <Link 
            href="/blog"
            className={`flex items-center justify-center w-16 h-16 duration-200 ${
              pathname.startsWith('/blog')
                ? 'text-primary'
                : 'text-foreground'
            }`}
          >
            <HiOutlineDocumentText className="w-7 h-7" />
          </Link>
          <Link 
            href="/drive"
            className={`flex items-center justify-center w-16 h-16 duration-200 ${
              pathname.startsWith('/drive')
                ? 'text-primary'
                : 'text-foreground'
            }`}
          >
            <HiOutlineFolder className="w-7 h-7" />
          </Link>
          <Link 
            href="mailto:naufal@altaf.xyz"
            className="flex items-center justify-center w-16 h-16 text-foreground duration-200"
          >
            <HiOutlineMail className="w-7 h-7" />
          </Link>
        </div>
      </nav>
    </>
  )
}
