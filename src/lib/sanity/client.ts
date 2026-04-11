import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID ?? "qsjt1myt";
const dataset =
  import.meta.env.VITE_SANITY_DATASET ?? "production";

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion: "2024-03-01",
  useCdn: true,
};

export const sanityClient =
  projectId && dataset ? createClient(sanityConfig) : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export const urlForImage = (source: unknown) => {
  if (!builder || !source) {
    return null;
  }
  return builder.image(source).format("webp").quality(80);
};
