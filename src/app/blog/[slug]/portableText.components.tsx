import InlineImageLightbox from "./InlineImageLightbox";
import CodeBlock from "./CodeBlock";

type PortableTextImageValue = {
  _type: "image";
  alt?: string | null;
  caption?: string | null;
  asset?: {
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
};

type PortableTextCodeBlockValue = {
  _type: "code_block";
  language?: string | null;
  code?: string | null;
  filename?: string | null;
};

export const portableTextComponents = {
  types: {
    image: ({ value }: { value: PortableTextImageValue }) => {
      const src = value?.asset?.url;
      if (!src) {
        return null;
      }

      const width = value.asset?.metadata?.dimensions?.width ?? 1600;
      const height = value.asset?.metadata?.dimensions?.height ?? 900;
      const alt = value.alt?.trim() || "Inline article image";

      return (
        <InlineImageLightbox src={src} alt={alt} width={width} height={height} caption={value.caption} />
      );
    },
    code_block: ({ value }: { value: PortableTextCodeBlockValue }) => {
      return <CodeBlock language={value.language} code={value.code} filename={value.filename} />;
    },
  },
};
