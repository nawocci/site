import { type SchemaTypeDefinition } from 'sanity'
import blogPost from "@/sanity/schemaTypes/blogPost";
import blockContent from "@/sanity/schemaTypes/blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost, blockContent],
}
