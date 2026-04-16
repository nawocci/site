import { createImageUrlBuilder } from "@sanity/image-url";

import { sanityClient } from "@/lib/sanity.client";
import type { SanityImage } from "@/lib/sanity.queries";

const { projectId, dataset } = sanityClient.config();

if (!projectId || !dataset) {
  throw new Error("Missing Sanity projectId or dataset in client configuration.");
}

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImage) {
  return imageBuilder.image(source).auto("format");
}
