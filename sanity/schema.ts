import type { SchemaTypeDefinition } from "sanity";
import author from "./schemaTypes/author";
import post from "./schemaTypes/post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author],
};
