import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schema } from "../../sanity/schema";

const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID ?? "qsjt1myt";
const dataset =
  import.meta.env.VITE_SANITY_DATASET ?? "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "BeyondTheWall Studio",
  plugins: [deskTool(), visionTool()],
  schema,
});
