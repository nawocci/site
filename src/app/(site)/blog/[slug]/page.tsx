import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postQuery } from "@/sanity/queries/post";
import { Post } from "@/types/Blog";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) {
        return null;
      }
      
      const width = value.asset.metadata?.dimensions?.width || 800;
      const height = value.asset.metadata?.dimensions?.height || 600;
      
      // Use the direct URL from Sanity with image parameters
      const imageUrl = `${value.asset.url}?w=800&fit=max&auto=format`;
      
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog post image'}
            width={width}
            height={height}
            className="w-full h-auto rounded-lg"
          />
        </div>
      );
    },
  },
};

export const dynamic = 'force-dynamic';

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch<Post>(postQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <article>
      <Link href="/blog">Back</Link>
      <h1>Title: {post.title}</h1>
      <h1>Posted at: {new Date(post._createdAt).toLocaleDateString()}</h1>
      <h1>Edited at: {new Date(post._updatedAt).toLocaleDateString()}</h1>
      
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).width(800).height(400).url()}
          alt={post.mainImage.alt || post.title}
          width={800}
          height={400}
          priority
        />
      )}

      <div className="prose dark:prose-invert prose-lg max-w-[800px]">
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  );
}