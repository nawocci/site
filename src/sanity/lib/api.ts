import {client} from './client'

export async function fetchBlogPosts() {
  const query = '*[_type == "blogPost"]{title, slug, mainImage, postDate}'

  return await client.fetch(query)
}

export async function fetchBlogPost(slug: string) {
  const query = `*[_type == "blogPost" && slug.current == '${slug}'][0]{title, mainImage, postDate, body}`

  return await client.fetch(query)
}