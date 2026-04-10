import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import FloatingNav from "../landing/FloatingNav";
import Footer from "../landing/Footer";
import { fetchPosts } from "../../lib/sanity/queries";
import { urlForImage } from "../../lib/sanity/client";
import type { PostListItem } from "../../lib/sanity/types";

const hasSanityConfig = Boolean(
  import.meta.env.VITE_SANITY_PROJECT_ID && import.meta.env.VITE_SANITY_DATASET,
);

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!hasSanityConfig) {
        if (isMounted) {
          setError(
            "Sanity project ID and dataset are required to load the blog.",
          );
          setLoading(false);
        }
        return;
      }

      try {
        const data = await fetchPosts();
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load posts right now.");
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
  }, []);

  const cards = useMemo(() => {
    if (loading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="p-6 md:p-7 animate-pulse"
          style={{
            border: "1px solid rgba(237,232,223,0.12)",
            backgroundColor: "rgba(16,13,11,0.35)",
          }}
        >
          <div
            className="mb-4"
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              background: "rgba(237,232,223,0.08)",
            }}
          />
          <div
            className="h-4 mb-3"
            style={{ background: "rgba(237,232,223,0.08)" }}
          />
          <div
            className="h-4 w-3/4"
            style={{ background: "rgba(237,232,223,0.08)" }}
          />
        </div>
      ));
    }

    return posts.map((post) => {
      const imageUrl = urlForImage(post.mainImage)
        ?.width(800)
        .height(600)
        .fit("crop")
        .url();

      return (
        <Link
          key={post._id}
          to={post.slug?.current ? `/blog/${post.slug.current}` : "/blog"}
          className="journey-card block transition-transform duration-300 hover:-translate-y-1"
          style={{
            border: "1px solid rgba(237,232,223,0.18)",
            backgroundColor: "rgba(16,13,11,0.35)",
          }}
        >
          <div className="p-6 md:p-7">
            <div
              className="relative overflow-hidden mb-5"
              style={{
                border: "1px solid rgba(237,232,223,0.18)",
                aspectRatio: "16 / 9",
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={post.title ?? "Blog post image"}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    filter: "grayscale(15%) contrast(1.05) brightness(0.85)",
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(130deg, rgba(237,232,223,0.12), rgba(184,151,90,0.12))",
                  }}
                />
              )}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-grotesk text-[0.6rem] tracking-[0.3em] uppercase"
                style={{ color: "#B8975A" }}
              >
                Field Notes
              </span>
              {post.publishedAt ? (
                <span
                  className="font-grotesk text-[0.6rem] tracking-[0.3em] uppercase"
                  style={{ color: "#EDE8DF", opacity: 0.6 }}
                >
                  {format(new Date(post.publishedAt), "MMM dd, yyyy")}
                </span>
              ) : null}
            </div>
            <h3
              className="font-fraunces mb-3"
              style={{ color: "#EDE8DF", fontSize: "1.6rem" }}
            >
              {post.title ?? "Untitled"}
            </h3>
            <p
              className="font-crimson"
              style={{ color: "#EDE8DF", opacity: 0.7 }}
            >
              {post.excerpt ?? "A bespoke dispatch from our private field notes."}
            </p>
            {post.author?.name ? (
              <p
                className="font-grotesk text-[0.6rem] tracking-[0.3em] uppercase mt-5"
                style={{ color: "#EDE8DF", opacity: 0.5 }}
              >
                {post.author.name}
              </p>
            ) : null}
          </div>
        </Link>
      );
    });
  }, [loading, posts]);

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
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 md:mb-16">
              <p
                className="font-grotesk text-xs tracking-[0.35em] uppercase mb-4"
                style={{ color: "#B8975A" }}
              >
                The Journal
              </p>
              <h1
                className="font-fraunces"
                style={{
                  fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                  fontWeight: 800,
                  color: "#EDE8DF",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                Field Notes From the Inner Circle
              </h1>
              <p
                className="font-crimson italic mt-6 max-w-3xl"
                style={{
                  color: "#EDE8DF",
                  opacity: 0.7,
                  fontSize: "clamp(1.05rem, 1.7vw, 1.35rem)",
                }}
              >
                Dispatches for travelers who move quietly, access privately,
                and prefer depth over spectacle.
              </p>
            </div>

            <div className="gold-rule w-full mb-10" />

            {error ? (
              <div
                className="p-6"
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

            {!loading && !error && posts.length === 0 ? (
              <div
                className="p-6"
                style={{
                  border: "1px solid rgba(237,232,223,0.18)",
                  backgroundColor: "rgba(16,13,11,0.35)",
                }}
              >
                <p
                  className="font-crimson"
                  style={{ color: "#EDE8DF", opacity: 0.8 }}
                >
                  No posts yet. Once entries are published in Sanity, they will
                  appear here.
                </p>
              </div>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {cards}
            </div>
          </div>
        </div>
      </main>

      <div className="mt-24 md:mt-28">
        <Footer />
      </div>
    </div>
  );
}
