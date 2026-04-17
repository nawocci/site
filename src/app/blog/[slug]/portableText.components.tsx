import InlineImageLightbox from "./InlineImageLightbox";
import CodeBlock from "./CodeBlock";
import { urlForAsset } from "@/lib/sanity.image";

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
      const baseUrl = value?.asset?.url;
      if (!baseUrl) {
        return null;
      }

      const width = value.asset?.metadata?.dimensions?.width ?? 1600;
      const height = value.asset?.metadata?.dimensions?.height ?? 900;
      const alt = value.alt?.trim() || "Inline article image";
      const previewWidth = width > 1600 ? 1600 : width;
      const modalWidth = width > 2400 ? 2400 : width;
      const previewHeight = Math.max(1, Math.round((previewWidth / width) * height));
      const modalHeight = Math.max(1, Math.round((modalWidth / width) * height));

      const previewSrc = urlForAsset(baseUrl, {
        width: previewWidth,
        height: previewHeight,
        fit: "max",
        quality: 72,
      });

      const modalSrc = urlForAsset(baseUrl, {
        width: modalWidth,
        height: modalHeight,
        fit: "max",
        quality: 82,
      });

      return (
        <InlineImageLightbox
          previewSrc={previewSrc}
          modalSrc={modalSrc}
          alt={alt}
          width={width}
          height={height}
          caption={value.caption}
        />
      );
    },
    code_block: ({ value }: { value: PortableTextCodeBlockValue }) => {
      return <CodeBlock language={value.language} code={value.code} filename={value.filename} />;
    },
  },
};
