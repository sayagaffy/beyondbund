import { sanityClient } from "./client";
import type { PostDetail, PostListItem, SiteSettings } from "./types";

const POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->{name}
  }
`;

const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    body,
    "author": author->{name}
  }
`;

const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    _id,
    contactEmail,
    hero {
      eyebrow,
      slides[] {
        eyebrow,
        headlineLine1,
        headlineLine2,
        headlineLine2Italic,
        subheadline,
        ctaLabel,
        backgroundImage
      },
      headlineLine1,
      headlineLine2,
      headlineLine2Italic,
      subheadline,
      ctaLabel,
      backgroundImages
    },
    seo {
      title,
      description,
      keywords,
      ogTitle,
      ogDescription,
      ogImage,
      twitterTitle,
      twitterDescription,
      twitterImage,
      siteName,
      siteUrl,
      locale,
      ogType,
      twitterCard,
      hreflang,
      hreflangUrl,
      schemaJson
    }
  }
`;

export async function fetchPosts(): Promise<PostListItem[]> {
  if (!sanityClient) {
    return [];
  }
  return sanityClient.fetch<PostListItem[]>(POSTS_QUERY);
}

export async function fetchPostBySlug(
  slug: string,
): Promise<PostDetail | null> {
  if (!sanityClient) {
    return null;
  }
  return sanityClient.fetch<PostDetail | null>(POST_BY_SLUG_QUERY, { slug });
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  if (!sanityClient) {
    return null;
  }
  return sanityClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
}
