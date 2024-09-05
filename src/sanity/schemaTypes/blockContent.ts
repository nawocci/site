// src/sanity/schemaTypes/blockContent.ts
import { type SchemaTypeDefinition } from 'sanity'

const blockContent: SchemaTypeDefinition = {
  name: 'blockContent',
  type: 'array',
  title: 'Block Content',
  of: [
    {
      type: 'block',
    },
  ],
}

export default blockContent