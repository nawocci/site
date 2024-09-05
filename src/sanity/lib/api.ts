import { client } from "@/sanity/lib/client";
import { Posts } from "@/types/blog";

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export async function fetchBlogPosts() {
  const query = '*[_type == "blogPost"]{title, slug, mainImage, postDate}';
  const posts: Posts[] = await client.fetch(query);

  return posts.map(post => ({
    ...post,
    postDate: formatDate(post.postDate),
  }));
}

export async function fetchBlogPost(slug: string) {
  const query = `*[_type == "blogPost" && slug.current == '${slug}'][0]{title, mainImage, postDate, body}`;
  const post = await client.fetch(query);

  return {
    ...post,
    postDate: formatDate(post.postDate),
  };
}