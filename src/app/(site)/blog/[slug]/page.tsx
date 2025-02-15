import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postQuery } from "@/sanity/queries/post";
import { Post } from "@/types/Blog";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

interface SanityImage {
  value: {
    asset?: {
      _ref: string;
    };
    alt?: string;
  };
}

const components = {
  types: {
    image: ({ value }: SanityImage) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-2xl">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || ''}
              width={800}
              height={450}
              className="rounded-lg"
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
          </div>
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
    <div className="w-full space-y-12 animate-fadeIn">
      <div className="flex flex-col items-center space-y-4">
        <time className="text-base text-secondary font-medium">
          {new Date(post._createdAt).toLocaleDateString()}
        </time>
        <h1 className="text-3xl sm:text-5xl font-bold text-center">{post.title}</h1>
      </div>
      <Image
        src={urlFor(post.mainImage).url()}
        alt={post.title}
        width={600}
        height={300}
        priority
        className="rounded-lg w-full lg:w-5/6 aspect-video object-cover mx-auto"
      />
      <article className="max-w-3xl mx-auto prose dark:prose-invert sm:prose-lg lg:hover:prose-a:text-primary prose-img:my-0">
        <PortableText value={post.body} components={components} />
      </article>
    </div>
  );
} 