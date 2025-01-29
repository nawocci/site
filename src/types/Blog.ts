import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "@portabletext/types";

export interface Posts {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: SanityImageSource;
}

export interface Post extends Posts {
  body: PortableTextBlock[];
} 