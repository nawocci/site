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
    {
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      type: 'code',
      options: {
        withFilename: true,
      },
    },
  ],
}

export default blockContent