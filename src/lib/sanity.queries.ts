import groq from "groq";

export type SanityImage = {
  _type: "image";
  asset?: {
    _ref: string;
    _type: "reference";
  };
};

export type BlogPostPreview = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: string;
  publishedAt?: string | null;
  excerpt?: string | null;
  image?: SanityImage;
};

export type BlogPost = BlogPostPreview & {
  body?: unknown[];
};

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  image
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  image,
  body
}`;
