import { defineType, defineField } from 'sanity'
import { CodeBlockIcon } from '@sanity/icons'

export const codeBlockType = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Programming language (e.g., typescript, python, bash)',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      description: 'The code content',
    }),
  ],
  preview: {
    select: {
      language: 'language',
      code: 'code',
    },
    prepare({ language, code }) {
      return {
        title: language ? `Code: ${language}` : 'Code Block',
        subtitle: code ? code.slice(0, 50) + '...' : 'Empty code block',
      }
    },
  },
})
