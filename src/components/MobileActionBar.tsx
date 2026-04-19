"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiBookOpen, FiHome, FiMail } from "react-icons/fi";
import ThemeToggle from "@/components/ThemeToggle";

const mobileActionIconClasses =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border-2 text-foreground transition-colors duration-200 hover:border-primary hover:text-primary";

type MobileActionBarProps = {
  isHomeRoute: boolean;
  isBlogRoute: boolean;
};

export default function MobileActionBar({ isHomeRoute, isBlogRoute }: MobileActionBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isTicking = false;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (delta > 8) {
        setIsVisible(false);
      } else if (delta < -8) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
      isTicking = false;
    };

    const onScroll = () => {
      if (isTicking) {
        return;
      }

      isTicking = true;
      requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-50 flex justify-center px-4 transition-all duration-200 md:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      <div className="motion-fade-up motion-delay-1 flex items-center gap-3 rounded-full border-2 border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur">
        <ThemeToggle />
        <Link
          href="/"
          aria-label="Home"
          aria-current={isHomeRoute ? "page" : undefined}
          className={`${mobileActionIconClasses} ${isHomeRoute ? "border-primary text-primary" : ""}`}
        >
          <FiHome className="h-4 w-4" />
        </Link>
        <Link
          href="/blog"
          aria-label="Blog"
          aria-current={isBlogRoute ? "page" : undefined}
          className={`${mobileActionIconClasses} ${isBlogRoute ? "border-primary text-primary" : ""}`}
        >
          <FiBookOpen className="h-4 w-4" />
        </Link>
        <a href="mailto:naufal@altaf.xyz" aria-label="Contact" className={mobileActionIconClasses}>
          <FiMail className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}