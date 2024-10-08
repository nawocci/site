import { Post } from "@/types/blog";
import { fetchBlogPost } from "@/sanity/lib/api";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import PortableTextComponents from "@/components/PortableTextComponents";

export const fetchCache = 'force-no-store';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post: Post = await fetchBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-8 animate-fadeIn">
      <div className="flex flex-col space-y-12">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-base text-secondary font-medium">{post.postDate}</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-center">{post.title}</h1>
        </div>
        <Image
          src={urlFor(post.mainImage).url()}
          alt={"Main Image"}
          height={300}
          width={600}
          className={"rounded-lg w-full h-56 sm:h-[32rem] object-cover"}
        />
        <div className="prose prose-invert sm:prose-lg sm:hover:prose-a:text-primary max-w-none overflow-hidden">
          <PortableText value={post.body} components={PortableTextComponents} />
        </div>
      </div>
    </div>
  );
}