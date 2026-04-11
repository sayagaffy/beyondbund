import { useEffect } from "react";
import { urlForImage } from "../lib/sanity/client";
import type { SiteSettings } from "../lib/sanity/types";
import { DEFAULT_SEO } from "../lib/siteDefaults";

type SEOManagerProps = {
  seo?: SiteSettings["seo"];
};

const setMeta = (
  selector: string,
  attributes: Record<string, string>,
  content: string,
) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) =>
      element?.setAttribute(key, value),
    );
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const setLink = (
  selector: string,
  attributes: Record<string, string>,
  href: string,
) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    Object.entries(attributes).forEach(([key, value]) =>
      element?.setAttribute(key, value),
    );
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

const resolveUrl = (base: string, path: string) => {
  if (!base) {
    return "";
  }
  if (!base.startsWith("http")) {
    return base;
  }
  try {
    return new URL(path, base).toString();
  } catch (error) {
    return base;
  }
};

export default function SEOManager({ seo }: SEOManagerProps) {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const title = seo?.title?.trim() || DEFAULT_SEO.title;
    const description = seo?.description?.trim() || DEFAULT_SEO.description;
    const keywords = seo?.keywords?.length
      ? seo.keywords.join(", ")
      : DEFAULT_SEO.keywords.join(", ");
    const ogTitle = seo?.ogTitle?.trim() || title;
    const ogDescription = seo?.ogDescription?.trim() || description;
    const twitterTitle = seo?.twitterTitle?.trim() || title;
    const twitterDescription =
      seo?.twitterDescription?.trim() || description;
    const siteName = seo?.siteName?.trim() || DEFAULT_SEO.siteName;
    const locale = seo?.locale?.trim() || DEFAULT_SEO.locale;
    const ogType = seo?.ogType?.trim() || DEFAULT_SEO.ogType;
    const twitterCard =
      seo?.twitterCard?.trim() || DEFAULT_SEO.twitterCard;
    const hreflang = seo?.hreflang?.trim() || DEFAULT_SEO.hreflang;
    const siteUrl = seo?.siteUrl?.trim() || DEFAULT_SEO.siteUrl;
    const hreflangUrl =
      seo?.hreflangUrl?.trim() || DEFAULT_SEO.hreflangUrl || siteUrl;
    const currentPath = window.location?.pathname ?? "/";
    const resolvedUrl = resolveUrl(siteUrl, currentPath);

    const ogImage =
      urlForImage(seo?.ogImage)
        ?.width(2000)
        .height(1200)
        .fit("crop")
        .url() || DEFAULT_SEO.ogImageUrl;
    const twitterImage =
      urlForImage(seo?.twitterImage)
        ?.width(2000)
        .height(1200)
        .fit("crop")
        .url() || ogImage || DEFAULT_SEO.twitterImageUrl;

    document.title = title;

    setMeta('meta[name="description"]', { name: "description" }, description);
    setMeta('meta[name="keywords"]', { name: "keywords" }, keywords);
    setMeta('meta[property="og:title"]', { property: "og:title" }, ogTitle);
    setMeta(
      'meta[property="og:description"]',
      { property: "og:description" },
      ogDescription,
    );
    setMeta('meta[property="og:type"]', { property: "og:type" }, ogType);
    setMeta('meta[property="og:image"]', { property: "og:image" }, ogImage);
    setMeta(
      'meta[property="og:site_name"]',
      { property: "og:site_name" },
      siteName,
    );
    setMeta(
      'meta[property="og:locale"]',
      { property: "og:locale" },
      locale,
    );
    if (resolvedUrl) {
      setMeta('meta[property="og:url"]', { property: "og:url" }, resolvedUrl);
      setLink('link[rel="canonical"]', { rel: "canonical" }, resolvedUrl);
    }

    setMeta(
      'meta[name="twitter:card"]',
      { name: "twitter:card" },
      twitterCard,
    );
    setMeta(
      'meta[name="twitter:title"]',
      { name: "twitter:title" },
      twitterTitle,
    );
    setMeta(
      'meta[name="twitter:description"]',
      { name: "twitter:description" },
      twitterDescription,
    );
    setMeta(
      'meta[name="twitter:image"]',
      { name: "twitter:image" },
      twitterImage,
    );

    if (hreflang && hreflangUrl) {
      setLink(
        `link[rel="alternate"][hreflang="${hreflang}"]`,
        { rel: "alternate", hreflang },
        hreflangUrl,
      );
    }

    const rawSchema = seo?.schemaJson?.trim();
    let schema = DEFAULT_SEO.schema;
    if (rawSchema) {
      try {
        schema = JSON.parse(rawSchema);
      } catch (error) {
        schema = DEFAULT_SEO.schema;
      }
    }

    const scriptId = "site-jsonld";
    let script =
      document.head.querySelector<HTMLScriptElement>(
        `script#${scriptId}[type="application/ld+json"]`,
      ) ?? null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [seo]);

  return null;
}
