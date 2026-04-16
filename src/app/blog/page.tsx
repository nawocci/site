import Image from "next/image";
import Link from "next/link";

import { sanityClient } from "@/lib/sanity.client";
import { postsQuery, type BlogPostPreview } from "@/lib/sanity.queries";
import { urlForImage } from "@/lib/sanity.image";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const freshClient = sanityClient.withConfig({ useCdn: false });
  const posts = await freshClient.fetch<BlogPostPreview[]>(postsQuery);

  return (
    <main className="w-full space-y-5 sm:space-y-6 lg:space-y-10 font-mono">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold tracking-tight text-foreground">Blog</h1>
        <p className="text-sm sm:text-base text-foreground/65">Latest posts from the studio.</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-foreground/60">No posts yet. Publish one in Sanity Studio.</p>
      ) : (
        <ul className="mx-auto grid w-full max-w-md grid-cols-1 gap-3 sm:max-w-none sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {posts.map((post, index) => (
            <li key={post._id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl sm:rounded-2xl border-2 border-border overflow-hidden bg-background transition-all duration-200 hover:-translate-y-0.5 hover:border-primary"
              >
                <div className="relative h-48 sm:h-48 lg:h-52 overflow-hidden bg-border">
                  {post.image ? (
                    <Image
                      src={urlForImage(post.image).width(960).height(720).fit("crop").url()}
                      alt={post.title}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      className="object-cover h-full w-full transition-transform duration-200 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="relative h-full w-full flex items-center justify-center bg-border">
                      <p className="text-foreground/60">No image</p>
                    </div>
                  )}
                </div>

                <div className="flex grow flex-col p-3 sm:p-4 space-y-2 transition-colors duration-200">
                  <time
                    dateTime={post.publishedAt || post._createdAt}
                    className="inline-flex w-fit self-start whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors duration-200 sm:text-sm lg:text-base"
                  >
                    {new Date(post.publishedAt || post._createdAt).toLocaleDateString()}
                  </time>
                  <h2 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground/75 transition-colors duration-200 group-hover:text-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
