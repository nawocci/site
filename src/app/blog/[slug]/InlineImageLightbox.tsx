"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ImageLightboxModal from "./ImageLightboxModal";

type InlineImageLightboxProps = {
  previewSrc: string;
  modalSrc: string;
  alt: string;
  width: number;
  height: number;
  caption?: string | null;
};

export default function InlineImageLightbox({
  previewSrc,
  modalSrc,
  alt,
  width,
  height,
  caption,
}: InlineImageLightboxProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleOpen = () => {
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
        <span className="relative block overflow-hidden rounded-2xl border-2 border-border shadow-md shadow-foreground/10">
          <Image
            src={previewSrc}
            alt={alt}
            width={width}
            height={height}
            className="m-0 block h-auto w-full object-cover"
            sizes={isPortrait ? "(max-width: 640px) 80vw, 420px" : "(max-width: 768px) 100vw, 768px"}
            loading="lazy"
            onLoad={() => setIsPreviewLoaded(true)}
            onError={() => setIsPreviewLoaded(true)}
          />
          {!isPreviewLoaded ? <span className="pointer-events-none absolute inset-0 bg-border animate-pulse" /> : null}
        </span>
      </div>

      <button
        type="button"
        onClick={handleOpen}
        className="group hidden w-full appearance-none border-0 bg-transparent p-0 text-left leading-none outline-none md:block md:cursor-pointer focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Open image dialog"
        aria-expanded={isMounted}
      >
        <span className="relative block overflow-hidden rounded-2xl border-2 border-border shadow-md shadow-foreground/10 transition-transform duration-200 group-hover:scale-[1.01]">
          <Image
            src={previewSrc}
            alt={alt}
            width={width}
            height={height}
            className="m-0 block h-auto w-full object-cover"
            sizes={isPortrait ? "(max-width: 640px) 80vw, 420px" : "(max-width: 768px) 100vw, 768px"}
            loading="lazy"
            onLoad={() => setIsPreviewLoaded(true)}
            onError={() => setIsPreviewLoaded(true)}
          />
          {!isPreviewLoaded ? <span className="pointer-events-none absolute inset-0 bg-border animate-pulse" /> : null}
        </span>
      </button>
      {caption ? (
        <figcaption className="mt-3 text-center text-xs sm:text-sm text-foreground/65">{caption}</figcaption>
      ) : null}

      {isMounted ? (
        <ImageLightboxModal
          isVisible={isVisible}
          src={modalSrc}
          alt={alt}
          width={width}
          height={height}
          onRequestClose={closeModal}
        />
      ) : null}
    </figure>
  );
}