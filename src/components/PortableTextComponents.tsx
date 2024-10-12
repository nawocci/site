import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import CodeBlock from "@/components/CodeBlock";

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
      <CodeBlock value={value}/>
    ),
  },
};

export default PortableTextComponents;