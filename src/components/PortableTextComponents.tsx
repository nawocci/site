import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import CopyButton from './CopyButton';

const PortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value).url();
      return (
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[800px]">
            <Image
              src={imageUrl}
              alt={value.alt}
              width={800}
              height={450}
              className="rounded-lg"
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
          </div>
          <p className="text-sm text-secondary italic mt-2">{value.alt}</p>
        </div>
      );
    },
    code: ({ value }) => (
      <div className="my-4 overflow-hidden rounded-md">
        {value.filename && (
          <div className="bg-[#1E1E1E] text-text p-2 text-sm flex items-center justify-between border-b border-[#333333]">
            <span className="truncate mr-2">{value.filename}</span>
            <CopyButton text={value.code} />
          </div>
        )}
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language={value.language || 'text'}
            style={atomOneDark}
            customStyle={{
              margin: 0,
              backgroundColor: '#1E1E1E',
              fontSize: '0.875rem',
              padding: '1rem',
            }}
            wrapLongLines
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      </div>
    ),
  },
};

export default PortableTextComponents;