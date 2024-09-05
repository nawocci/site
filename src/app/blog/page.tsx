import {Posts} from "@/types/blog";
import {fetchBlogPosts} from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";

export const fetchCache = 'force-no-store';

export default async function Blog() {
  const posts: Posts[] = await fetchBlogPosts();

  return (
    <div className="flex flex-col space-y-6 sm:space-y-10">
      <h1 className="h-20 flex items-center text-4xl sm:text-6xl font-bold">Blog</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug.current}
            href={`/blog/${post.slug.current}`}
            className="flex flex-col h-58 rounded-lg border-[1px] border-border overflow-hidden group sm:duration-200"
          >
            <div className="h-40 lg:h-56 overflow-hidden">
              <Image
                className="h-full sm:group-hover:scale-110 sm:duration-200"
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                width={1000}
                height={500}
                style={{objectFit: "cover"}}
              />
            </div>
            <div className="flex flex-col flex-grow p-2 lg:p-4 sm:group-hover:bg-primary sm:duration-200">
              <p className="text-xs lg:text-base mb-1 lg:mb-2 text-primary sm:group-hover:text-white sm:duration-200">
                {post.postDate}
              </p>
              <h2 className="font-bold text-base lg:text-2xl mb-1 lg:mb-2">
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}