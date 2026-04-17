"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import MobileActionBar from "@/components/MobileActionBar";

const actionPillClasses =
  "hidden rounded-full border-2 px-6 py-2.5 text-base font-bold text-foreground transition-colors duration-200 hover:border-primary hover:text-primary md:inline-flex";

function NavbarView({ isBlogRoute }: { isBlogRoute: boolean }) {
  return (
    <>
      <nav className="w-full border-b border-border py-4 font-mono sm:border-b-0 sm:py-10">
        <div className="relative h-9 md:hidden">
          <Link href="/" className="group absolute left-0 top-1/2 z-10 inline-flex -translate-y-1/2 cursor-pointer">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 transition-transform duration-200 group-hover:scale-110">
              <Image
                src="https://avatars.githubusercontent.com/nawocci"
                alt="Naufal Altaf"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
          </Link>
          <Link
            href="/"
            className="absolute inset-0 inline-flex items-center justify-center"
          >
            <span className="inline-flex max-w-[72vw] items-center gap-1">
              <span className="text-sm font-bold text-foreground">~/</span>
              <span className="truncate text-lg font-bold text-primary">naufal-altaf</span>
            </span>
          </Link>
        </div>

        <div className="hidden items-center justify-between gap-3 sm:gap-4 md:flex">
          <Link href="/" className="group flex min-w-0 flex-1 items-center gap-4 cursor-pointer">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 transition-transform duration-200 group-hover:scale-110">
              <Image
                src="https://avatars.githubusercontent.com/nawocci"
                alt="Naufal Altaf"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex min-w-0 items-baseline gap-1">
              <span className="text-lg font-bold text-foreground">~/</span>
              <span className="truncate text-2xl font-bold text-primary">naufal-altaf</span>
            </div>
          </Link>

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

      <MobileActionBar isBlogRoute={isBlogRoute} />
    </>
  );
}

function NavbarPathAware() {
  const pathname = usePathname();
  const isBlogRoute = pathname.startsWith("/blog");

  return <NavbarView isBlogRoute={isBlogRoute} />;
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarView isBlogRoute={false} />}>
      <NavbarPathAware />
    </Suspense>
  );
}
