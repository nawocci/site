import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postsQuery } from "@/sanity/queries/post";
import { Posts } from "@/types/Blog";
import Image from "next/image";
import Link from "next/link";

export default async function Blog() {
  const posts = await client.fetch<Posts[]>(postsQuery);

  if (!posts || posts.length === 0) {
    return (
      <main className="w-full flex flex-col items-center justify-center gap-4 animate-fadeIn">
        <h1 className="text-7xl sm:text-9xl font-bold">Oops</h1>
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl sm:text-2xl">There&apos;s nothing to show here</p>
          <Link href="/" className="text-md sm:text-xl text-primary lg:hover:underline">Return to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full space-y-10 animate-fadeIn">
      <h1 className="text-4xl sm:text-6xl font-bold">Blog</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group flex flex-col rounded-lg border border-border overflow-hidden"
          >
            <div className="relative h-40 lg:h-52 overflow-hidden">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                width={1000}
                height={500}
                className="object-cover h-full w-full lg:group-hover:scale-110 duration-200"
              />
            </div>
            <div className="flex flex-col flex-grow p-2 sm:p-4 space-y-2 lg:group-hover:bg-primary duration-200">
              <time className="text-xs lg:text-base mb-1 lg:mb-2 text-primary lg:group-hover:text-white dark:lg:group-hover:text-black duration-200">
                {new Date(post._createdAt).toLocaleDateString()}
              </time>
              <h2 className="font-bold text-base lg:group-hover:text-white dark:lg:group-hover:text-black duration-200 lg:text-2xl mb-1 lg:mb-2">
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
