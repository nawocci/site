'use client'

import Image from "next/image";
import {usePathname} from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
      <div className="flex justify-between items-center min-h-24 sm:min-h-32">
        <a href="/" className="flex items-center gap-4">
          <Image src="https://github.com/nawocci.png" alt="logo" width={32} height={32} className="rounded-full sm:w-10 sm:h-10 border border-solid border-border" />
          <h1 className="text-xl sm:text-2xl font-semibold"><span className="hidden sm:inline">Naufal&nbsp;</span>Altaf</h1>
        </a>
        <div className="flex items-center gap-6">
          <a href="/blog"
             className={`flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto px-0 sm:px-4 py-2 text-sm sm:text-base font-semibold ${pathname.startsWith('/blog') ? 'text-primary border-primary' : 'border-text'} border rounded-md lg:hover:text-primary lg:hover:border-primary duration-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:hidden">
              <path
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
            </svg>
            <span className="hidden sm:inline">Blog</span>
          </a>

          <a href="https://cloud.altaf.xyz"
             className={`flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto px-0 sm:px-4 py-2 text-sm sm:text-base font-semibold ${pathname.startsWith('/cloud') ? 'text-primary border-primary' : 'border-text'} border rounded-md lg:hover:text-primary lg:hover:border-primary duration-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="w-6 h-6 sm:hidden">
              <path d="M19.35 10.04a7 7 0 00-13.31 2A5.002 5.002 0 005 19h13a5 5 0 001.35-8.96z"/>
            </svg>
            <span className="hidden sm:inline">Cloud</span>
          </a>

          <a href="mailto:me@altaf.xyz"
             className={`flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto px-0 sm:px-4 py-2 text-sm sm:text-base font-semibold ${pathname.startsWith('/contact') ? 'text-primary border-primary' : 'border-text'} border rounded-md lg:hover:text-primary lg:hover:border-primary duration-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="w-5 h-5 sm:hidden">
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
              <path
                  d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
            </svg>
            <span className="hidden sm:inline">Contact</span>
          </a>
        </div>
      </div>
  );
}