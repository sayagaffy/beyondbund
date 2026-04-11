import { defineField, defineType } from "sanity";
import { validateWebpUnder300kb } from "./validators";

const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Upload .webp, maksimal 300KB.",
      options: { hotspot: true, accept: "image/webp" },
      validation: (Rule) =>
        Rule.custom((value, context) =>
          validateWebpUnder300kb(value, context),
        ),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});

export default author;
