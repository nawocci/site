import { createImageUrlBuilder } from "@sanity/image-url";

import { sanityClient } from "@/lib/sanity.client";
import type { SanityImage } from "@/lib/sanity.queries";

const { projectId, dataset } = sanityClient.config();

if (!projectId || !dataset) {
  throw new Error("Missing Sanity projectId or dataset in client configuration.");
}

const imageBuilder = createImageUrlBuilder({ projectId, dataset });
type SanityImageBuilder = ReturnType<typeof imageBuilder.image>;

type SanityImageFit = "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";

export type SanityImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
  fit?: SanityImageFit;
};

function applyImageOptions(builder: SanityImageBuilder, options: SanityImageOptions) {
  let nextBuilder = builder;

  if (options.width) {
    nextBuilder = nextBuilder.width(options.width);
  }

  if (options.height) {
    nextBuilder = nextBuilder.height(options.height);
  }

  if (options.fit) {
    nextBuilder = nextBuilder.fit(options.fit);
  }

  if (typeof options.quality === "number") {
    nextBuilder = nextBuilder.quality(options.quality);
  }

  return nextBuilder;
}

export function urlForImage(source: SanityImage, options: SanityImageOptions = {}) {
  return applyImageOptions(imageBuilder.image(source).auto("format"), options);
}

export function urlForAsset(baseUrl: string, options: SanityImageOptions = {}) {
  const url = new URL(baseUrl);
  url.searchParams.set("auto", "format");

  if (options.width) {
    url.searchParams.set("w", String(options.width));
  }

  if (options.height) {
    url.searchParams.set("h", String(options.height));
  }

  if (options.fit) {
    url.searchParams.set("fit", options.fit);
  }

  if (typeof options.quality === "number") {
    url.searchParams.set("q", String(options.quality));
  }

  return url.toString();
}
