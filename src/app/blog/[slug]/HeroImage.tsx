"use client";

import Image from "next/image";
import { useState } from "react";

type HeroImageProps = {
  src: string;
  alt: string;
};

export default function HeroImage({ src, alt }: HeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-border bg-border shadow-lg shadow-foreground/15 sm:rounded-3xl motion-fade-up motion-delay-1">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 1024px"
        priority
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />

      {!isLoaded ? <div className="pointer-events-none absolute inset-0 bg-border animate-pulse" /> : null}
    </div>
  );
}