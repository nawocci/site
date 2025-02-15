import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    _createdAt
  }
`;

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    body,
    _createdAt,
    _updatedAt
  }
`; 