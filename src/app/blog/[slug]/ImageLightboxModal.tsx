"use client";

import Image from "next/image";
import { useEffect } from "react";
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
  );
}
