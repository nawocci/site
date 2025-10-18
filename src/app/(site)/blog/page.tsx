import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postsQuery } from "@/sanity/queries/post";
import { Posts } from "@/types/Blog";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0; // Only revalidate via webhook

export default async function Blog() {
  const posts = await client.fetch<Posts[]>(postsQuery);

  if (!posts || posts.length === 0) {
    return (
      <main className="w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl lg:text-9xl font-bold">Oops</h1>
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg lg:text-2xl">There&apos;s nothing to show here</p>
          <Link href="/" className="text-base lg:text-xl text-primary hover:underline">Return to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full space-y-6 lg:space-y-10 fade-in">
      <h1 className="text-3xl lg:text-6xl font-bold">Blog</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group flex flex-col rounded-2xl border-2 border-border overflow-hidden"
          >
            {post.mainImage ? (
              <div className="relative h-48 lg:h-52 overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.mainImage.alt || post.title}
                  width={post.mainImage.asset?.metadata?.dimensions?.width || 1000}
                  height={post.mainImage.asset?.metadata?.dimensions?.height || 500}
                  className="object-cover h-full w-full group-hover:scale-110 duration-200"
                />
              </div>
            ) : (
              <div className="relative h-48 lg:h-52 bg-border flex items-center justify-center">
                <p className="text-secondary">No image</p>
              </div>
            )}
            <div className="flex flex-col flex-grow p-4 space-y-2 group-hover:bg-primary duration-200">
              <time 
                dateTime={post._createdAt}
                className="text-sm lg:text-base text-primary group-hover:text-white dark:group-hover:text-black duration-200"
              >
                {new Date(post._createdAt).toLocaleDateString()}
              </time>
              <h2 className="font-bold text-xl lg:text-2xl group-hover:text-white dark:group-hover:text-black duration-200">
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
