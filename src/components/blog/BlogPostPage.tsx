import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { PortableText } from "@portabletext/react";
import FloatingNav from "../landing/FloatingNav";
import Footer from "../landing/Footer";
import { fetchPostBySlug } from "../../lib/sanity/queries";
import { urlForImage } from "../../lib/sanity/client";
import type { PostDetail } from "../../lib/sanity/types";

const hasSanityConfig = Boolean(
  import.meta.env.VITE_SANITY_PROJECT_ID && import.meta.env.VITE_SANITY_DATASET,
);

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: ReactNode }) => (
      <h2
        className="font-fraunces mt-10 mb-4"
        style={{
          fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
          color: "#EDE8DF",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3
        className="font-fraunces mt-8 mb-3"
        style={{
          fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)",
          color: "#EDE8DF",
        }}
      >
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: ReactNode }) => (
      <p
        className="font-crimson leading-relaxed mb-5"
        style={{ color: "#EDE8DF", opacity: 0.8 }}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote
        className="font-crimson italic my-6 pl-6"
        style={{
          borderLeft: "2px solid rgba(184,151,90,0.6)",
          color: "#EDE8DF",
          opacity: 0.8,
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <ul
        className="font-crimson leading-relaxed mb-6 list-disc ml-6"
        style={{ color: "#EDE8DF", opacity: 0.8 }}
      >
        {children}
      </ul>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <ol
        className="font-crimson leading-relaxed mb-6 list-decimal ml-6"
        style={{ color: "#EDE8DF", opacity: 0.8 }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <li className="mb-2">{children}</li>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <li className="mb-2">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: ReactNode }) => (
      <strong style={{ color: "#EDE8DF" }}>{children}</strong>
    ),
    em: ({ children }: { children?: ReactNode }) => (
      <em style={{ color: "#EDE8DF" }}>{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: ReactNode;
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="underline"
        style={{ color: "#B8975A" }}
      >
        {children}
      </a>
    ),
  },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!slug) {
        if (isMounted) {
          setError("Missing post slug.");
          setLoading(false);
        }
        return;
      }

      if (!hasSanityConfig) {
        if (isMounted) {
          setError(
            "Sanity project ID and dataset are required to load the blog post.",
          );
          setLoading(false);
        }
        return;
      }

      try {
        const data = await fetchPostBySlug(slug);
        if (isMounted) {
          setPost(data);
          if (!data) {
            setError("This post could not be found.");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load this post right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const heroImage = useMemo(() => {
    if (!post?.mainImage) {
      return null;
    }
    return urlForImage(post.mainImage)?.width(1600).height(900).fit("crop").url();
  }, [post]);

  const scrollTo = (section: string) => {
    window.location.href = `/#${section}`;
  };

  return (
    <div
      className="grain-overlay relative min-h-screen"
      style={{ backgroundColor: "#1A1714" }}
    >
      <FloatingNav onScrollTo={scrollTo} />

      <div
        aria-hidden="true"
        style={{ height: "clamp(96px, 12vh, 140px)" }}
      />

      <main className="pt-4 md:pt-6 pb-28 md:pb-36">
        <div className="px-8 md:px-16">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="font-grotesk text-[0.6rem] tracking-[0.35em] uppercase"
              style={{ color: "#B8975A" }}
            >
              Back to Journal
            </Link>

            {loading ? (
              <div className="mt-8 animate-pulse">
                <div
                  className="h-6 w-40 mb-4"
                  style={{ background: "rgba(237,232,223,0.1)" }}
                />
                <div
                  className="h-16 w-full mb-6"
                  style={{ background: "rgba(237,232,223,0.1)" }}
                />
                <div
                  className="h-6 w-3/4"
                  style={{ background: "rgba(237,232,223,0.1)" }}
                />
              </div>
            ) : null}

            {error ? (
              <div
                className="mt-8 p-6"
                style={{
                  border: "1px solid rgba(237,232,223,0.18)",
                  backgroundColor: "rgba(16,13,11,0.35)",
                }}
              >
                <p
                  className="font-crimson"
                  style={{ color: "#EDE8DF", opacity: 0.8 }}
                >
                  {error}
                </p>
              </div>
            ) : null}

            {!loading && post ? (
              <>
                <div className="flex flex-wrap items-center gap-3 mt-6 mb-6">
                  <span
                    className="font-grotesk text-[0.6rem] tracking-[0.3em] uppercase px-3 py-2"
                    style={{
                      border: "1px solid rgba(237,232,223,0.2)",
                      color: "#B8975A",
                    }}
                  >
                    Field Notes
                  </span>
                  <span
                    className="font-grotesk text-[0.6rem] tracking-[0.3em] uppercase"
                    style={{ color: "#EDE8DF", opacity: 0.6 }}
                  >
                    {post.publishedAt
                      ? format(new Date(post.publishedAt), "MMMM dd, yyyy")
                      : "Draft"}
                    {post.author?.name ? ` • ${post.author.name}` : ""}
                  </span>
                </div>

                <h1
                  className="font-fraunces"
                  style={{
                    fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
                    fontWeight: 800,
                    color: "#EDE8DF",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  {post.title ?? "Untitled"}
                </h1>
                {post.excerpt ? (
                  <p
                    className="font-crimson italic mt-6"
                    style={{
                      color: "#EDE8DF",
                      opacity: 0.7,
                      fontSize: "clamp(1.05rem, 1.7vw, 1.35rem)",
                    }}
                  >
                    {post.excerpt}
                  </p>
                ) : null}

                <div className="gold-rule w-full mt-10 mb-10" />

                <div
                  className="relative overflow-hidden"
                  style={{
                    border: "1px solid rgba(237,232,223,0.18)",
                    aspectRatio: "16 / 9",
                  }}
                >
                  {heroImage ? (
                    <img
                      src={heroImage}
                      alt={post.title ?? "Blog hero"}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        filter:
                          "grayscale(20%) contrast(1.05) brightness(0.85)",
                      }}
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(140deg, rgba(237,232,223,0.12), rgba(184,151,90,0.18))",
                      }}
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(16,13,11,0.85) 0%, rgba(16,13,11,0.2) 60%, rgba(16,13,11,0.05) 100%)",
                    }}
                  />
                </div>

                <article className="mt-10">
                  {post.body ? (
                    <PortableText
                      value={post.body}
                      components={portableTextComponents}
                    />
                  ) : (
                    <p
                      className="font-crimson leading-relaxed"
                      style={{ color: "#EDE8DF", opacity: 0.8 }}
                    >
                      No content has been added yet for this story.
                    </p>
                  )}
                </article>
              </>
            ) : null}
          </div>
        </div>
      </main>

      <div className="mt-24 md:mt-28">
        <Footer />
      </div>
    </div>
  );
}
