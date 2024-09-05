import { Posts } from "@/types/blog";
import { fetchBlogPosts } from "@/sanity/lib/api";
import Link from "next/link";

export const fetchCache = 'force-no-store';

export default async function Blog() {
  const posts:Posts[] = await fetchBlogPosts();

  return (
    <div className="flex flex-col space-y-10">
      <h1 className="h-20 flex items-center text-6xl font-bold">Blog</h1>
      {posts.map((post) => (
        <Link
          key={post.slug.current}
          href={`/blog/${post.slug.current}`}
        >
          {post.title}
        </Link>
      ))}
    </div>
  )
}