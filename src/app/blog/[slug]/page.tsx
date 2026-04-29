import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortableText } from "next-sanity";
import { FiArrowLeft } from "react-icons/fi";

import { sanityClient, getFreshClient } from "@/lib/sanity.client";
import { postBySlugQuery, type BlogPost } from "@/lib/sanity.queries";
import { urlForImage } from "@/lib/sanity.image";
import { formatDate } from "@/lib/sanity.utils";
import { UI_BUTTON_CLASSNAMES, UI_BLOG_CLASSNAMES } from "@/lib/ui.classes";
import BlogPostLoading from "./loading";
import HeroImage from "./HeroImage";
import { portableTextComponents } from "./portableText.components";

const HERO_IMAGE_ALT = "Featured blog image";

type ArticleMetaHeaderProps = {
  publishedDate: string;
  lastModifiedDate: string;
  hasLastModified: boolean;
  title: string;
  excerpt?: string | null;
};

function HeroMedia({ heroImageUrl }: { heroImageUrl: string | null }) {
  if (heroImageUrl) {
    return <HeroImage src={heroImageUrl} alt={HERO_IMAGE_ALT} />;
  }

  return (
    <div className="hero-fallback-gradient relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-border shadow-lg shadow-foreground/15 sm:rounded-3xl motion-fade-up motion-delay-1">
      <div className="absolute -left-8 top-4 h-24 w-24 rounded-full bg-background/35 blur-2xl sm:top-6 sm:h-32 sm:w-32" />
      <div className="absolute bottom-0 right-0 h-28 w-28 rounded-full bg-primary/25 blur-3xl sm:h-40 sm:w-40" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-xs font-semibold tracking-wide text-foreground/80 sm:p-6 sm:text-sm">
        Featured image coming soon
      </div>
    </div>
  );
}

function ArticleMetaHeader({
  publishedDate,
  lastModifiedDate,
  hasLastModified,
  title,
  excerpt,
}: ArticleMetaHeaderProps) {
  return (
    <header className="space-y-4 border-b pb-6 motion-fade-up motion-delay-1">
      <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3">
        <p className={UI_BLOG_CLASSNAMES.datePill}>Published {formatDate(publishedDate)}</p>
        {hasLastModified ? (
          <p className={UI_BLOG_CLASSNAMES.datePill}>Updated {formatDate(lastModifiedDate)}</p>
        ) : null}
      </div>
      <p
        className="text-center text-xs uppercase text-foreground/55 motion-fade-up motion-delay-2"
        style={UI_BLOG_CLASSNAMES.titleLabel}
      >
        Title
      </p>
      <h1 className="mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight text-foreground motion-fade-up motion-delay-2 sm:text-4xl md:text-6xl">
        {title}
      </h1>
      {excerpt ? (
        <p className="mx-auto max-w-3xl text-center text-base leading-7 text-foreground/70 motion-fade-up motion-delay-3 sm:text-lg sm:leading-8">
          {excerpt}
        </p>
      ) : null}
    </header>
  );
}

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

  const post = await getFreshClient().fetch<BlogPost | null>(postBySlugQuery, {
    slug,
  });

  if (!post) {
    notFound();
  }

  const heroImageUrl = post.image
    ? urlForImage(post.image, { width: 1600, height: 900, fit: "crop", quality: 76 }).url()
    : null;
  const publishedDate = post.publishedAt || post._createdAt;
  const lastModifiedDate = post._updatedAt;
  const hasLastModified =
    new Date(lastModifiedDate).toDateString() !== new Date(post._createdAt).toDateString();

  return (
    <article className="w-full pb-8 sm:pb-10 lg:pb-14 font-mono">
      <div className="space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between gap-4 motion-fade-up">
          <Link
            href="/blog"
            aria-label="Back to blog"
            className={UI_BUTTON_CLASSNAMES.navBack}
          >
            <FiArrowLeft className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Back to blog</span>
          </Link>
          <p
            className="text-xs uppercase text-foreground/50"
            style={UI_BLOG_CLASSNAMES.articleLabel}
          >
            Article
          </p>
        </div>

        <HeroMedia heroImageUrl={heroImageUrl} />
      </div>

      <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
        <ArticleMetaHeader
          publishedDate={publishedDate}
          lastModifiedDate={lastModifiedDate}
          hasLastModified={hasLastModified}
          title={post.title}
          excerpt={post.excerpt}
        />

        <div className="mx-auto w-full max-w-3xl">
          <div className="post-prose-body prose sm:prose-lg max-w-none prose-headings:tracking-tight prose-headings:text-foreground prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-2 prose-h3:mt-8 prose-h3:mb-3 prose-p:text-foreground/80 prose-li:my-1 prose-li:text-foreground/80 prose-a:text-primary prose-a:no-underline prose-a:transition-colors prose-strong:text-foreground prose-img:rounded-2xl prose-img:border prose-img:border-border prose-hr:my-10 prose-hr:border-border prose-ol:pl-8 prose-ul:pl-8 dark:prose-invert motion-fade-up motion-delay-3 [&_a:hover]:underline [&_a:hover]:decoration-current [&_a:hover]:underline-offset-[0.18em]">
            {Array.isArray(post.body) && post.body.length > 0 ? (
              <PortableText value={post.body as any} components={portableTextComponents} />
            ) : (
              <p>No content added yet.</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
