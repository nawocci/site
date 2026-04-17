"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ImageLightboxModalProps = {
  isVisible: boolean;
  src: string;
  alt: string;
  width: number;
  height: number;
  onRequestClose: () => void;
};

export default function ImageLightboxModal({
  isVisible,
  src,
  alt,
  width,
  height,
  onRequestClose,
}: ImageLightboxModalProps) {
  const canUseDOM = typeof document !== "undefined";
  const [visibleSrc, setVisibleSrc] = useState<string | null>(null);
  const isImageReady = visibleSrc === src;
  const frameAspectRatio = `${width} / ${height}`;
  const frameWidth = `min(calc(100vw - 2rem), calc((100vh - 9rem) * ${width} / ${height}))`;
  const modalImageClass = `m-0 rounded-2xl shadow-xl shadow-black/35 transition-all duration-280 ease-[cubic-bezier(0.16,1,0.3,1)] ${
    isImageReady ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-1"
  }`;

  const handleImageResolved = () => {
    requestAnimationFrame(() => {
      setVisibleSrc(src);
    });
  };

  useEffect(() => {
    if (!canUseDOM) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [canUseDOM, onRequestClose]);

  if (!canUseDOM) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/30 p-4 backdrop-blur-md transition-opacity duration-150 sm:p-6 ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onRequestClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <p
        className={`pointer-events-none absolute left-1/2 top-4 rounded-full border bg-background px-3 py-1 font-mono uppercase font-semibold text-foreground shadow-md shadow-black/20 sm:top-6 sm:text-xs ${
          isVisible ? "motion-modal-hint-in" : "motion-modal-hint-out"
        }`}
        style={{ fontSize: "11px" }}
      >
        Click outside or press Esc to close
      </p>

      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-border/40 ${
          isVisible ? "motion-modal-in" : "motion-modal-out"
        }`}
        style={{ aspectRatio: frameAspectRatio, width: frameWidth }}
        onClick={(event) => event.stopPropagation()}
        aria-busy={!isImageReady}
      >
        {!isImageReady ? (
          <div className="pointer-events-none absolute inset-0 flex min-h-52 min-w-52 items-center justify-center rounded-2xl border border-border bg-border/80 px-4">
            <div className="w-full max-w-sm space-y-3">
              <div className="h-6 w-1/3 rounded-full bg-background/60 animate-pulse" />
              <div className="h-4 w-full rounded bg-background/60 animate-pulse" />
              <div className="h-4 w-4/5 rounded bg-background/60 animate-pulse" />
            </div>
          </div>
        ) : null}

        <Image
          src={src}
          alt={alt}
          fill
          className={`${modalImageClass} object-contain`}
          sizes="(max-width: 640px) calc(100vw - 2rem), calc(100vw - 3rem)"
          priority
          onLoad={handleImageResolved}
          onError={handleImageResolved}
        />
      </div>
    </div>,
    document.body,
  );
}
