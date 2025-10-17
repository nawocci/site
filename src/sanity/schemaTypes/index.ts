import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContentType'
import { postType } from './postType'
import { codeBlockType } from './codeBlockType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, postType, codeBlockType],
}
