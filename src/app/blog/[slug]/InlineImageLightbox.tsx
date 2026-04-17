"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type InlineImageLightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string | null;
};

export default function InlineImageLightbox({
  src,
  alt,
  width,
  height,
  caption,
}: InlineImageLightboxProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canUseDOM = typeof window !== "undefined";
  const MODAL_ANIMATION_MS = 200;
  const isPortrait = height > width;
  const frameClass = isPortrait
    ? "mx-auto my-6 w-full max-w-xs sm:my-8 sm:max-w-sm md:max-w-md"
    : "mx-auto my-6 w-full max-w-3xl sm:my-8";

  const closeModal = () => {
    setIsVisible(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsMounted(false);
    }, MODAL_ANIMATION_MS);
  };

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMounted]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleOpen = () => {
    if (!canUseDOM) {
      return;
    }

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMounted(true);
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };

  return (
    <figure className={`not-prose ${frameClass}`}>
      <div className="md:hidden">
        <span className="block overflow-hidden rounded-2xl border-2 border-border shadow-md shadow-foreground/10">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="m-0 block h-auto w-full object-cover"
            sizes={isPortrait ? "(max-width: 640px) 80vw, 420px" : "(max-width: 768px) 100vw, 768px"}
            loading="lazy"
          />
        </span>
      </div>

      <button
        type="button"
        onClick={handleOpen}
        className="group hidden w-full appearance-none border-0 bg-transparent p-0 text-left leading-none outline-none md:block md:cursor-pointer focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Open image dialog"
        aria-expanded={isMounted}
      >
        <span className="block overflow-hidden rounded-2xl border-2 border-border shadow-md shadow-foreground/10 transition-transform duration-200 group-hover:scale-[1.01]">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="m-0 block h-auto w-full object-cover"
            sizes={isPortrait ? "(max-width: 640px) 80vw, 420px" : "(max-width: 768px) 100vw, 768px"}
            loading="lazy"
          />
        </span>
      </button>
      {caption ? (
        <figcaption className="mt-3 text-center text-xs sm:text-sm text-foreground/65">{caption}</figcaption>
      ) : null}

      {isMounted && canUseDOM
        ? createPortal(
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-background/30 p-4 backdrop-blur-md transition-opacity duration-150 sm:p-6 ${
            isVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <p className={`pointer-events-none absolute left-1/2 top-4 rounded-full border bg-background px-3 py-1 font-mono text-[11px] uppercase font-semibold text-foreground shadow-md shadow-black/20 sm:top-6 sm:text-xs ${
            isVisible ? "motion-modal-hint-in" : "motion-modal-hint-out"
          }`}>
            Click outside or press Esc to close
          </p>

          <div
            className={`relative flex items-center justify-center ${
              isVisible ? "motion-modal-in" : "motion-modal-out"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="m-0 block h-auto w-auto max-h-[calc(100vh-6rem)] max-w-[calc(100vw-2rem)] rounded-2xl shadow-xl shadow-black/35 sm:max-h-[calc(100vh-7rem)] sm:max-w-[calc(100vw-3rem)]"
              sizes="(max-width: 640px) calc(100vw - 2rem), calc(100vw - 3rem)"
              priority
            />
          </div>
        </div>,
        document.body,
      )
        : null}
    </figure>
  );
}