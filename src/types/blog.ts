export interface Posts {
  title: string;
  slug: { current: string };
  mainImage: any;
  postDate: string;
}

export interface Post extends Posts {
  body: any;
}