export interface Posts {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset?: {
      _ref: string;
      _type: string;
      _id?: string;
      url?: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  _createdAt: string;
  body: any[];
}

export interface Post extends Posts {
  _updatedAt: string;
}
