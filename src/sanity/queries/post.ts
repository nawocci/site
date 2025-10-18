import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage {
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    _createdAt
  }
`;

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        }
      }
    },
    _createdAt,
    _updatedAt
  }
`; 