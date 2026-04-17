import InlineImageLightbox from "./InlineImageLightbox";

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
  },
};
