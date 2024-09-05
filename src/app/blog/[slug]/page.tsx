import { Post } from "@/types/blog";
import { fetchBlogPost } from "@/sanity/lib/api";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";

export const fetchCache = 'force-no-store';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post: Post = await fetchBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl flex flex-col space-y-12 justify-center">
      <div className="flex flex-col items-center space-y-2">
        <p className="text-base text-secondary font-medium">{post.postDate}</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-center">{post.title}</h1>
      </div>
      <Image
        src={urlFor(post.mainImage).url()}
        alt={"Main Image"}
        height={300}
        width={600}
        className={"rounded-lg w-full h-[38rem] object-cover"}
      />
      <div className="max-w-none prose prose-invert sm:hover:prose-a:text-primary">
        <PortableText value={post.body}/>
      </div>
    </div>
  );
}