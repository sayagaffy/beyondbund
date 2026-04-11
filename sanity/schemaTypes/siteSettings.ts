import { defineField, defineType } from "sanity";
import { validateWebpUnder300kb } from "./validators";

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        }),
        defineField({
          name: "slides",
          title: "Hero Slides",
          type: "array",
          description:
            "Isi beberapa slide hero. Jika kosong, akan memakai fallback global/default.",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "eyebrow",
                  title: "Eyebrow",
                  type: "string",
                }),
                defineField({
                  name: "headlineLine1",
                  title: "Headline Line 1",
                  type: "string",
                }),
                defineField({
                  name: "headlineLine2",
                  title: "Headline Line 2",
                  type: "string",
                }),
                defineField({
                  name: "headlineLine2Italic",
                  title: "Italicize Line 2",
                  type: "boolean",
                  initialValue: true,
                }),
                defineField({
                  name: "subheadline",
                  title: "Subheadline",
                  type: "text",
                  rows: 3,
                }),
                defineField({
                  name: "ctaLabel",
                  title: "CTA Label",
                  type: "string",
                }),
                defineField({
                  name: "backgroundImage",
                  title: "Background Image",
                  type: "image",
                  description:
                    "Upload .webp, maksimal 300KB. Rekomendasi 2400x1600.",
                  options: { hotspot: true, accept: "image/webp" },
                  fields: [
                    defineField({
                      name: "alt",
                      title: "Alt Text",
                      type: "string",
                    }),
                  ],
                  validation: (Rule) =>
                    Rule.custom((value, context) =>
                      validateWebpUnder300kb(value, context),
                    ),
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "headlineLine1",
          title: "Headline Line 1",
          type: "string",
        }),
        defineField({
          name: "headlineLine2",
          title: "Headline Line 2",
          type: "string",
        }),
        defineField({
          name: "headlineLine2Italic",
          title: "Italicize Line 2",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Label",
          type: "string",
        }),
        defineField({
          name: "backgroundImages",
          title: "Background Images",
          type: "array",
          description:
            "Upload beberapa gambar .webp (maks 300KB per gambar). Rekomendasi 2400x1600.",
          of: [
            {
              type: "image",
              options: { hotspot: true, accept: "image/webp" },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
              validation: (Rule) =>
                Rule.custom((value, context) =>
                  validateWebpUnder300kb(value, context),
                ),
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "title",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "keywords",
          title: "Meta Keywords",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "ogTitle",
          title: "OG Title",
          type: "string",
        }),
        defineField({
          name: "ogDescription",
          title: "OG Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ogImage",
          title: "OG Image",
          type: "image",
          description: "Upload .webp, maksimal 300KB. Rekomendasi 2000x1200.",
          options: { hotspot: true, accept: "image/webp" },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
          validation: (Rule) =>
            Rule.custom((value, context) =>
              validateWebpUnder300kb(value, context),
            ),
        }),
        defineField({
          name: "twitterTitle",
          title: "Twitter Title",
          type: "string",
        }),
        defineField({
          name: "twitterDescription",
          title: "Twitter Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "twitterImage",
          title: "Twitter Image",
          type: "image",
          description: "Upload .webp, maksimal 300KB. Rekomendasi 2000x1200.",
          options: { hotspot: true, accept: "image/webp" },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
          validation: (Rule) =>
            Rule.custom((value, context) =>
              validateWebpUnder300kb(value, context),
            ),
        }),
        defineField({
          name: "siteName",
          title: "Site Name",
          type: "string",
        }),
        defineField({
          name: "siteUrl",
          title: "Site URL",
          type: "url",
        }),
        defineField({
          name: "locale",
          title: "Locale (OG)",
          type: "string",
        }),
        defineField({
          name: "ogType",
          title: "OG Type",
          type: "string",
        }),
        defineField({
          name: "twitterCard",
          title: "Twitter Card",
          type: "string",
        }),
        defineField({
          name: "hreflang",
          title: "Hreflang",
          type: "string",
        }),
        defineField({
          name: "hreflangUrl",
          title: "Hreflang URL",
          type: "url",
        }),
        defineField({
          name: "schemaJson",
          title: "JSON-LD Schema",
          description: "Isi JSON-LD (opsional).",
          type: "text",
          rows: 6,
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});

export default siteSettings;
