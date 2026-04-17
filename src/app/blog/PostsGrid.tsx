import { sanityClient } from "@/lib/sanity.client";
import { postsQuery, type BlogPostPreview } from "@/lib/sanity.queries";
import { urlForImage } from "@/lib/sanity.image";
import BlogPostCard from "./BlogPostCard";
import BlogCardSkeleton from "./BlogCardSkeleton";

export async function PostsGrid() {
  const freshClient = sanityClient.withConfig({ useCdn: false });
  const posts = await freshClient.fetch<BlogPostPreview[]>(postsQuery);

  if (posts.length === 0) {
    return <p className="text-foreground/60">No posts yet. Publish one in Sanity Studio.</p>;
  }

  return (
    <ul className="mx-auto grid w-full max-w-md grid-cols-1 gap-3 sm:max-w-none sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {posts.map((post, index) => {
        const dateTime = post.publishedAt || post._createdAt;

        return (
          <BlogPostCard
            key={post._id}
            slug={post.slug}
            title={post.title}
            dateTime={dateTime}
            displayDate={new Date(dateTime).toLocaleDateString("en-US")}
            excerpt={post.excerpt}
            imageUrl={post.image ? urlForImage(post.image).width(960).height(720).fit("crop").url() : undefined}
            index={index}
          />
        );
      })}
    </ul>
  );
}

export function PostsGridSkeleton() {
  return (
    <ul className="mx-auto grid w-full max-w-md grid-cols-1 gap-3 sm:max-w-none sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 motion-fade-up motion-delay-1">
      {Array.from({ length: 6 }).map((_, index) => (
        <li
          key={index}
          className="rounded-xl sm:rounded-2xl border-2 border-border overflow-hidden bg-background motion-card-in"
          style={{ animationDelay: `${90 + index * 75}ms` }}
        >
          <BlogCardSkeleton />
        </li>
      ))}
    </ul>
  );
}