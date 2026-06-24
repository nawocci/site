import { PortableTextComponentProps } from "next-sanity";
import { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";
import InlineImageLightbox from "./InlineImageLightbox";
import CodeBlock from "./CodeBlock";
import { urlForAsset } from "@/lib/sanity.image";
import LinkedHeader from "./LinkedHeader";
import { toPlainText, slugify } from "@/lib/sanity.utils";

type PortableTextImageValue = {
  _type: "image";
  alt?: string | null;
  caption?: string | null;
  asset?: {
    url?: string;
    metadata?: {
      lqip?: string;
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

      const lqip = value.asset?.metadata?.lqip;

      return (
        <InlineImageLightbox
          previewSrc={previewSrc}
          modalSrc={modalSrc}
          alt={alt}
          width={width}
          height={height}
          caption={value.caption}
          lqip={lqip}
        />
      );
    },
    code_block: ({ value }: { value: PortableTextCodeBlockValue }) => {
      return <CodeBlock language={value.language} code={value.code} filename={value.filename} />;
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-current underline-offset-[0.18em] transition-colors can-hover:hover:text-primary/80"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-primary underline decoration-current underline-offset-[0.18em] transition-colors can-hover:hover:text-primary/80"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h2: ({ children, value }: PortableTextComponentProps<PortableTextBlock>) => {
      const id = slugify(toPlainText([value]));
      return (
        <LinkedHeader level={2} id={id}>
          {children}
        </LinkedHeader>
      );
    },
    h3: ({ children, value }: PortableTextComponentProps<PortableTextBlock>) => {
      const id = slugify(toPlainText([value]));
      return (
        <LinkedHeader level={3} id={id}>
          {children}
        </LinkedHeader>
      );
    },
    h4: ({ children, value }: PortableTextComponentProps<PortableTextBlock>) => {
      const id = slugify(toPlainText([value]));
      return (
        <LinkedHeader level={4} id={id}>
          {children}
        </LinkedHeader>
      );
    },
  },
};
