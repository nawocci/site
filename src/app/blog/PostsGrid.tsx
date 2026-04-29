import { sanityClient, getFreshClient } from "@/lib/sanity.client";
import { postsQuery, type BlogPostPreview } from "@/lib/sanity.queries";
import { urlForImage } from "@/lib/sanity.image";
import { formatDate } from "@/lib/sanity.utils";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { UI_BUTTON_CLASSNAMES, UI_BLOG_CLASSNAMES } from "@/lib/ui.classes";
import BlogPostCard from "./BlogPostCard";
import BlogCardSkeleton from "./BlogCardSkeleton";

const POSTS_GRID_CLASS =
  "mx-auto grid w-full max-w-md grid-cols-1 gap-3 sm:max-w-none sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6";

function EmptyPostsState() {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl border-2 border-border bg-background px-5 py-6 sm:rounded-3xl sm:px-7 sm:py-8 motion-fade-up motion-delay-1">
      <p
        className="text-xs uppercase text-foreground/55"
        style={UI_BLOG_CLASSNAMES.articleLabel}
      >
        Blog status
      </p>
      <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-3xl">
        No posts yet
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-foreground/70 sm:text-base">
        Nothing is published yet. Once a post is published, it will appear here.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/" className={UI_BUTTON_CLASSNAMES.secondary}>
          <FiArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    </section>
  );
}

export async function PostsGrid() {
  const posts = await getFreshClient().fetch<BlogPostPreview[]>(postsQuery);

  if (posts.length === 0) {
    return <EmptyPostsState />;
  }

  return (
    <ul className={POSTS_GRID_CLASS}>
      {posts.map((post, index) => {
        const dateTime = post.publishedAt || post._createdAt;

        return (
          <BlogPostCard
            key={post._id}
            slug={post.slug}
            title={post.title}
            dateTime={dateTime}
            displayDate={formatDate(dateTime)}
            excerpt={post.excerpt}
            imageUrl={
              post.image
                ? urlForImage(post.image, { width: 960, height: 720, fit: "crop", quality: 72 }).url()
                : undefined
            }
            index={index}
          />
        );
      })}
    </ul>
  );
}

export function PostsGridSkeleton() {
  return (
    <ul className={`${POSTS_GRID_CLASS} motion-fade-up motion-delay-1`}>
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index} className="relative motion-card-in" style={{ animationDelay: `${90 + index * 75}ms` }}>
          <BlogCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
