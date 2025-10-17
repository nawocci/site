import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postsQuery } from "@/sanity/queries/post";
import { Posts } from "@/types/Blog";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Blog() {
  const posts = await client.fetch<Posts[]>(postsQuery);

  return (
    <main>
      <h1 className="text-2xl mb-4">Blog</h1>
      
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/blog/${post.slug.current}`}>
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).width(400).height(300).url()}
                  alt={post.mainImage.alt || post.title}
                  width={400}
                  height={300}
                />
              )}
              <h2>{post.title}</h2>
              <p>{new Date(post._createdAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
