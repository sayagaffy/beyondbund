import { defineField, defineType } from "sanity";
import { validateWebpUnder300kb } from "./validators";

const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description: "Upload .webp, maksimal 300KB.",
      options: { hotspot: true, accept: "image/webp" },
      validation: (Rule) =>
        Rule.custom((value, context) =>
          validateWebpUnder300kb(value, context),
        ),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "author.name",
    },
  },
});

export default post;
