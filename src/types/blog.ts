import { PortableTextBlock } from '@portabletext/types';

export interface Posts {
  title: string;
  slug: { current: string };
  mainImage: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  postDate: string;
}

export interface Post extends Posts {
  body: PortableTextBlock[];
}