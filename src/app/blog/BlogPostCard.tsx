"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import BlogCardSkeleton from "./BlogCardSkeleton";

type BlogPostCardProps = {
  slug: string;
  title: string;
  dateTime: string;
  displayDate: string;
  excerpt?: string | null;
  imageUrl?: string;
  lqip?: string;
  index: number;
};

export default function BlogPostCard({
  slug,
  title,
  dateTime,
  displayDate,
  excerpt,
  imageUrl,
  lqip,
  index,
}: BlogPostCardProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isImageReady = !imageUrl || loadedSrc === imageUrl;
  const cardClassName = isImageReady ? "relative motion-card-in" : "relative";
  const shouldEagerLoad = index < 3;
  const shouldPreload = index === 0;

  return (
    <li className={cardClassName} style={{ animationDelay: `${index * 75}ms` }}>
      <Link
        href={`/blog/${slug}`}
        className="group flex flex-col rounded-xl sm:rounded-2xl border-2 border-border overflow-hidden bg-background transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-card-hover"
      >
        <div className="relative h-48 sm:h-48 lg:h-52 overflow-hidden bg-border">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              loading={shouldEagerLoad ? "eager" : "lazy"}
              priority={shouldPreload}
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip}
              onLoad={() => setLoadedSrc(imageUrl)}
              onError={() => setLoadedSrc(imageUrl)}
              className="object-cover h-full w-full transition-transform duration-200 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="hero-fallback-gradient relative h-full w-full flex items-center justify-center">
              <div className="absolute -left-4 top-2 h-16 w-16 rounded-full bg-background/35 blur-xl" />
              <div className="absolute bottom-0 right-0 h-20 w-20 rounded-full bg-primary/25 blur-2xl" />
              <p className="z-10 text-xs font-semibold tracking-wide text-foreground/60">
                Featured image coming soon
              </p>
            </div>
          )}
        </div>

        <div className="flex grow flex-col p-3 sm:p-4 space-y-2 transition-colors duration-200">
          <time
            dateTime={dateTime}
            className="inline-flex w-fit self-start whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors duration-200 sm:text-sm lg:text-base"
          >
            {displayDate}
          </time>
          <h2 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
            {title}
          </h2>
          {excerpt ? (
            <p className="text-xs sm:text-sm leading-relaxed text-foreground/75 transition-colors duration-200 group-hover:text-foreground line-clamp-2">
              {excerpt}
            </p>
          ) : null}
        </div>
      </Link>

      {imageUrl && !isImageReady ? (
        <div className="pointer-events-none absolute inset-0 z-10 rounded-xl sm:rounded-2xl border-2 border-border overflow-hidden bg-background">
          <BlogCardSkeleton framed={false} />
        </div>
      ) : null}
    </li>
  );
}
