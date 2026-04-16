import { createClient } from "next-sanity";

const projectId =
  process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Missing Sanity env vars. Set SANITY_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID) and SANITY_DATASET (or NEXT_PUBLIC_SANITY_DATASET)."
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-04-16",
  useCdn: process.env.NODE_ENV === "production",
});
