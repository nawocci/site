import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortableText } from "next-sanity";
import { FiArrowLeft } from "react-icons/fi";

import { sanityClient } from "@/lib/sanity.client";
import { postBySlugQuery, type BlogPost } from "@/lib/sanity.queries";
import { urlForImage } from "@/lib/sanity.image";
import InlineImageLightbox from "./InlineImageLightbox";
import BlogPostLoading from "./loading";

const HERO_IMAGE_ALT = "Featured blog image";

type PortableTextImageValue = {
  _type: "image";
  alt?: string | null;
  caption?: string | null;
  asset?: {
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
};

const portableTextComponents = {
  types: {
    image: ({ value }: { value: PortableTextImageValue }) => {
      const src = value?.asset?.url;
      if (!src) {
        return null;
      }

      const width = value.asset?.metadata?.dimensions?.width ?? 1600;
      const height = value.asset?.metadata?.dimensions?.height ?? 900;
      const alt = value.alt?.trim() || "Inline article image";

      return (
        <InlineImageLightbox src={src} alt={alt} width={width} height={height} caption={value.caption} />
      );
    },
  },
};

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

async function BlogPostContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const freshClient = sanityClient.withConfig({ useCdn: false });
  const post = await freshClient.fetch<BlogPost | null>(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  const heroImageUrl = post.image
    ? urlForImage(post.image).width(1600).height(900).fit("crop").url()
    : null;
  const publishedDate = post.publishedAt || post._createdAt;
  const lastModifiedDate = post._updatedAt;
  const hasLastModified =
    new Date(lastModifiedDate).toDateString() !== new Date(post._createdAt).toDateString();
  const datePillClass =
    "inline-flex w-fit max-w-full self-start rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary sm:px-3 sm:text-sm";

  return (
    <article className="w-full pb-8 sm:pb-10 lg:pb-14 font-mono">
      <div className="space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between gap-4 motion-fade-up">
          <Link
            href="/blog"
            aria-label="Back to blog"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 text-foreground transition-colors duration-200 hover:border-primary hover:text-primary sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          >
            <FiArrowLeft className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Back to blog</span>
          </Link>
          <p className="text-xs uppercase text-foreground/50" style={{ letterSpacing: "0.3em" }}>
            Article
          </p>
        </div>

        {heroImageUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-border bg-border shadow-lg shadow-foreground/15">
            <Image
              src={heroImageUrl}
              alt={HERO_IMAGE_ALT}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        ) : null}
        {!heroImageUrl ? (
          <div className="hero-fallback-gradient relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-border shadow-lg shadow-foreground/15">
            <div className="absolute -left-8 top-4 h-24 w-24 sm:top-6 sm:h-32 sm:w-32 rounded-full bg-background/35 blur-2xl" />
            <div className="absolute right-0 bottom-0 h-28 w-28 sm:h-40 sm:w-40 rounded-full bg-primary/25 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-xs sm:text-sm font-semibold tracking-wide text-foreground/80">
              Featured image coming soon
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
        <header className="space-y-4 border-b pb-6 motion-fade-up motion-delay-1">
          <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3">
            <p className={datePillClass}>
              Published {new Date(publishedDate).toLocaleDateString()}
            </p>
            {hasLastModified ? (
              <p className={datePillClass}>
                Updated {new Date(lastModifiedDate).toLocaleDateString()}
              </p>
            ) : null}
          </div>
          <p
            className="text-center text-xs uppercase text-foreground/55 motion-fade-up motion-delay-2"
            style={{ letterSpacing: "0.25em" }}
          >
            Title
          </p>
          <h1 className="mx-auto max-w-4xl text-center text-3xl sm:text-4xl font-bold tracking-tight text-foreground md:text-6xl motion-fade-up motion-delay-2">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mx-auto max-w-3xl text-center text-base sm:text-lg leading-7 sm:leading-8 text-foreground/70 motion-fade-up motion-delay-3">
              {post.excerpt}
            </p>
          ) : null}
        </header>

        <div className="mx-auto w-full max-w-3xl">
          <div className="prose sm:prose-lg max-w-none prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-foreground/80 prose-li:text-foreground/80 prose-a:text-primary prose-strong:text-foreground prose-img:rounded-2xl prose-img:border prose-img:border-border prose-blockquote:border-l-primary prose-blockquote:text-foreground/70 prose-ol:pl-8 prose-ul:pl-8 dark:prose-invert motion-fade-up motion-delay-3">
            {Array.isArray(post.body) && post.body.length > 0 ? (
              <PortableText value={post.body as never} components={portableTextComponents} />
            ) : (
              <p>No content added yet.</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
