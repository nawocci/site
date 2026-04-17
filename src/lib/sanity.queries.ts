import groq from "groq";

export type SanityImage = {
  _type: "image";
  alt?: string | null;
  caption?: string | null;
  asset?: {
    _ref: string;
    _type: "reference";
  };
};

type SanityImageAssetWithMetadata = {
  _id: string;
  url?: string;
  metadata?: {
    dimensions?: {
      width?: number;
      height?: number;
      aspectRatio?: number;
    };
  };
};

export type PortableTextImage = {
  _type: "image";
  alt?: string | null;
  caption?: string | null;
  asset?: SanityImageAssetWithMetadata;
};

export type PortableTextCodeBlock = {
  _type: "code_block";
  language?: string | null;
  code?: string | null;
  filename?: string | null;
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
  body?: Array<unknown | PortableTextImage | PortableTextCodeBlock>;
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
  body[]{
    ...,
    _type == "image" => {
      ...,
      alt,
      caption,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    }
  }
}`;
