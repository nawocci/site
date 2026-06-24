import { createClient } from "next-sanity";

const projectId =
  process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET;

export const hasSanityConfig = !!(projectId && dataset);

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId: projectId!,
      dataset: dataset!,
      apiVersion: "2026-04-16",
      useCdn: process.env.NODE_ENV === "production",
    })
  : null;

export const getFreshClient = () =>
  sanityClient ? sanityClient.withConfig({ useCdn: false }) : null;
