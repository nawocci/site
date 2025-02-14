import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "@portabletext/types";

export interface Posts {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: SanityImageSource;
  _createdAt: string;
}

export interface Post extends Posts {
  body: PortableTextBlock[];
  _modifiedAt: string;
} 