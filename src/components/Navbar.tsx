"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import MobileActionBar from "@/components/MobileActionBar";
import Logo from "@/components/Logo";

const actionPillClasses =
  "hidden rounded-full border-2 px-6 py-2.5 text-base font-bold text-foreground transition-colors duration-200 hover:border-primary hover:text-primary md:inline-flex";

function NavbarView({ isHomeRoute, isBlogRoute }: { isHomeRoute: boolean; isBlogRoute: boolean }) {
  return (
    <>
      <nav className="w-full border-b border-border py-4 font-mono sm:border-b-0 sm:py-10">
        {/* Mobile Logo */}
        <div className="md:hidden">
          <Logo />
        </div>

        {/* Desktop Navbar */}
        <div className="hidden items-center justify-between gap-3 sm:gap-4 md:flex">
          <Logo />

          <div className="ml-2 flex shrink-0 items-center gap-4 sm:gap-6">
            <ThemeToggle />
            <Link
              href="/blog"
              className={`${actionPillClasses} ${isBlogRoute ? "border-primary text-primary" : ""}`}
              aria-current={isBlogRoute ? "page" : undefined}
            >
              blog
            </Link>
            <a href="mailto:naufal@altaf.xyz" className={actionPillClasses}>
              contact
            </a>
          </div>
        </div>
      </nav>

      <MobileActionBar isHomeRoute={isHomeRoute} isBlogRoute={isBlogRoute} />
    </>
  );
}

function NavbarPathAware() {
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";
  const isBlogRoute = pathname.startsWith("/blog");

  return <NavbarView isHomeRoute={isHomeRoute} isBlogRoute={isBlogRoute} />;
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarView isHomeRoute={true} isBlogRoute={false} />}>
      <NavbarPathAware />
    </Suspense>
  );
}
