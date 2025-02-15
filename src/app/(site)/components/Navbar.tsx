'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineBookOpen } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";

interface NavLinkProps {
  href: string;
  isExternal?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavLink = ({ href, isExternal, icon, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  
  const Component = isExternal ? 'a' : Link;
  
  return (
    <Component
      href={href}
      className={`
        flex items-center justify-center 
        w-10 h-10 sm:w-auto sm:h-auto 
        px-0 sm:px-4 py-2 
        text-sm sm:text-base font-semibold 
        ${isActive ? 'text-primary border-primary' : 'border-text'} 
        border rounded-md 
        lg:hover:text-primary lg:hover:border-primary 
        duration-200
      `}
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
    </Component>
  );
};

export default function Navbar() {
  return (
    <div className="flex justify-between items-center min-h-24 sm:min-h-32">
      <Link href="/" className="flex items-center gap-4">
        <Image 
          src="https://github.com/nawocci.png" 
          alt="logo" 
          width={32} 
          height={32} 
          className="rounded-full sm:w-10 sm:h-10 border border-solid border-border" 
        />
        <h1 className="text-xl sm:text-2xl font-semibold lg:hover:text-primary hover:flicker">
          <span className="hidden sm:inline">Naufal&nbsp;</span>
          <span className="">Altaf</span>
        </h1>
      </Link>
      <div className="flex items-center gap-6">
        <NavLink 
          href="/blog" 
          icon={<HiOutlineBookOpen className="w-5 h-5 sm:hidden" />}
        >
          Blog
        </NavLink>
        <NavLink 
          href="mailto:me@altaf.xyz"
          isExternal
          icon={<HiOutlineEnvelope className="w-5 h-5 sm:hidden" />}
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
}