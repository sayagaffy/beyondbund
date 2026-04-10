export type SanityImageAsset = {
  _ref?: string;
  _type?: string;
};

export type SanityImage = {
  _type?: "image";
  asset?: SanityImageAsset;
  alt?: string;
};

export type Author = {
  _id: string;
  name?: string;
  slug?: { current?: string };
  image?: SanityImage;
  bio?: Array<unknown>;
};

export type PostListItem = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  author?: { name?: string };
};

export type PostDetail = PostListItem & {
  body?: Array<unknown>;
};
