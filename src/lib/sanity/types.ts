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

export type SiteSettings = {
  _id: string;
  contactEmail?: string;
  hero?: {
    eyebrow?: string;
    headlineLine1?: string;
    headlineLine2?: string;
    headlineLine2Italic?: boolean;
    subheadline?: string;
    ctaLabel?: string;
    backgroundImage?: SanityImage;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: SanityImage;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: SanityImage;
    siteName?: string;
    siteUrl?: string;
    locale?: string;
    ogType?: string;
    twitterCard?: string;
    hreflang?: string;
    hreflangUrl?: string;
    schemaJson?: string;
  };
};
