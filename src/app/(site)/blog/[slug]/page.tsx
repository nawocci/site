import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postQuery } from "@/sanity/queries/post";
import { Post } from "@/types/Blog";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8 relative w-full aspect-video">
          <Image
            src={urlFor(value).width(800).height(450).url()}
            alt={value.alt || ' '}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      );
    },
  },
};

export default async function BlogPost({ params }: Props) {
  const post = await client.fetch<Post>(postQuery, { slug: params.slug });

  if (!post) {
    notFound();
  }

  return (
    <article>
      <Link href="/blog">Back</Link>
      <h1>Title:{post.title}</h1>
      
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).width(800).height(400).url()}
          alt={post.title}
          width={800}
          height={400}
          priority
        />
      )}

      <div className="prose prose-lg">
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  );
} 