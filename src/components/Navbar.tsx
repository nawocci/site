"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import MobileActionBar from "@/components/MobileActionBar";
import Logo from "@/components/Logo";

const actionPillClasses =
  "hidden rounded-full border-2 px-6 py-2.5 text-base font-bold text-foreground transition-colors duration-200 hover:border-primary hover:text-primary md:inline-flex";

function NavbarView({ isHomeRoute, isBlogRoute }: { isHomeRoute: boolean; isBlogRoute: boolean }) {
  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 py-4 font-mono backdrop-blur-md sm:border-b-0 sm:py-8">
        {/* Mobile Logo — icon left, text centered */}
        <div className="relative flex items-center justify-center md:hidden">
          <Link href="/" className="group absolute left-0">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 transition-transform duration-200 group-hover:scale-110">
              <Image
                src="https://avatars.githubusercontent.com/nawocci"
                alt="Naufal Altaf"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
          </Link>
          <Link href="/" className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-foreground">~/</span>
            <span className="text-lg font-bold text-primary">naufal-altaf</span>
          </Link>
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
