import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postQuery } from "@/sanity/queries/post";
import { Post } from "@/types/Blog";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

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
      const imageUrl = `${value.asset.url}?w=800&fit=max&auto=format`;
      
      return (
        <div className="flex flex-col items-center gap-2">
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog post image'}
            width={width}
            height={height}
            className="rounded-lg w-full max-w-2xl h-auto object-contain"
          />
          {value.alt && (
            <p className="text-sm text-secondary italic">{value.alt}</p>
          )}
        </div>
      );
    },
  },
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch<Post>(postQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full space-y-12">
      <header className="flex flex-col items-center space-y-4">
        <time 
          dateTime={post._createdAt}
          className="text-base text-secondary font-medium"
        >
          {new Date(post._createdAt).toLocaleDateString()}
        </time>
        <h1 className="text-5xl font-bold text-center">{post.title}</h1>
      </header>
      
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).url()}
          alt={post.mainImage.alt || post.title}
          width={600}
          height={300}
          priority
          className="rounded-lg w-5/6 aspect-video object-cover mx-auto border border-border"
        />
      )}
      
      <article className="max-w-3xl mx-auto prose dark:prose-invert prose-lg hover:prose-a:text-primary prose-img:my-0">
        <PortableText value={post.body} components={components} />
      </article>
    </div>
  );
}