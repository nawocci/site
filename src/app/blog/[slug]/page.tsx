import { Post } from "@/types/blog";
import { fetchBlogPost } from "@/sanity/lib/api";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post: Post = await fetchBlogPost(params.slug);

  return (
    <div>
      <h1>{post.title}</h1>
      <Image
        src={urlFor(post.mainImage).url()}
        alt={"Main Image"}
        height={300}
        width={600}
      />
      <p>{post.postDate}</p>
      <PortableText value={post.body} />
    </div>
  );
}