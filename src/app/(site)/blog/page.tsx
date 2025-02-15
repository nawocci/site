import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postsQuery } from "@/sanity/queries/post";
import { Posts } from "@/types/Blog";
import Image from "next/image";
import Link from "next/link";

export default async function Blog() {
  const posts = await client.fetch<Posts[]>(postsQuery);

  return (
    <main className="w-full space-y-10">
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
                className="object-cover h-full w-full sm:group-hover:scale-110 duration-200"
              />
            </div>
            <div className="flex flex-col flex-grow p-2 sm:p-4 space-y-2 sm:group-hover:bg-primary duration-200">
              <time className="text-xs lg:text-base mb-1 lg:mb-2 text-primary sm:group-hover:text-white dark:sm:group-hover:text-black sm:duration-200">
                {new Date(post._createdAt).toLocaleDateString()}
              </time>
              <h2 className="font-bold text-base sm:group-hover:text-white dark:sm:group-hover:text-black duration-200 lg:text-2xl mb-1 lg:mb-2">
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
