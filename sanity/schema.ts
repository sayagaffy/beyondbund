import type { SchemaTypeDefinition } from "sanity";
import author from "./schemaTypes/author";
import post from "./schemaTypes/post";
import siteSettings from "./schemaTypes/siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, post, author],
};
