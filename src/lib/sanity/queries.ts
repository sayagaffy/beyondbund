import { sanityClient } from "./client";
import type { PostDetail, PostListItem } from "./types";

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
