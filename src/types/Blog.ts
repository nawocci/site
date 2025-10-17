export interface Posts {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  _createdAt: string;
  body: any[];
}

export interface Post extends Posts {
  _updatedAt: string;
}
