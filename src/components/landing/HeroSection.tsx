import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import LandingButton from "./LandingButton";
import { urlForImage } from "../../lib/sanity/client";
import type { SiteSettings } from "../../lib/sanity/types";
import { DEFAULT_HERO } from "../../lib/siteDefaults";

type HeroSectionProps = {
  settings?: SiteSettings["hero"];
};

export default function HeroSection({ settings }: HeroSectionProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const eyebrow = settings?.eyebrow?.trim() || DEFAULT_HERO.eyebrow;
  const headlineLine1 =
    settings?.headlineLine1?.trim() || DEFAULT_HERO.headlineLine1;
  const headlineLine2 =
    settings?.headlineLine2?.trim() || DEFAULT_HERO.headlineLine2;
  const italicLine2 =
    settings?.headlineLine2Italic ?? DEFAULT_HERO.headlineLine2Italic;
  const subheadline =
    settings?.subheadline?.trim() || DEFAULT_HERO.subheadline;
  const ctaLabel = settings?.ctaLabel?.trim() || DEFAULT_HERO.ctaLabel;
  const heroImageUrl =
    urlForImage(settings?.backgroundImage)
      ?.width(2400)
      .height(1600)
      .fit("crop")
      .url() || DEFAULT_HERO.backgroundImageUrl;

  const headline = [headlineLine1, headlineLine2];

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", backgroundColor: "#1A1714" }}
    >
      {/* Background image with parallax + Ken Burns */}
      <motion.div
        ref={bgRef}
        className="absolute inset-0 w-full parallax-hero"
        style={{ height: "130%" }}
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <div
          className="bg-cover bg-center w-full h-full ken-burns"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        />
        {/* Deep gradient vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(26,23,20,0.7) 70%, rgba(26,23,20,0.95) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,23,20,0.3) 0%, transparent 30%, transparent 60%, rgba(26,23,20,0.95) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div
        className="z-10 relative flex flex-col justify-end h-full"
        style={{
          paddingBottom: "12vh",
          paddingLeft: "8vw",
          paddingRight: "8vw",
        }}
      >
        {/* Subheading */}
        <motion.p
          className="mb-6 font-grotesk text-xs uppercase tracking-[0.35em]"
          style={{ color: "#B8975A" }}
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {eyebrow}
        </motion.p>

        {/* Main headline */}
        <div className="overflow-hidden">
          <h1
            className="font-fraunces leading-none"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              fontWeight: 800,
              color: "#EDE8DF",
              letterSpacing: "-0.02em",
              filter: "none",
            }}
          >
            {headline.map((line, lineIdx) => (
              <span
                key={lineIdx}
                className="block overflow-hidden mb-1 last:mb-0"
              >
                <motion.span
                  className="block"
                  style={{
                    fontStyle:
                      lineIdx === 1 && italicLine2 ? "italic" : "normal",
                  }}
                  initial={{ y: "110%", filter: "blur(8px)" }}
                  animate={loaded ? { y: "0%", filter: "blur(0px)" } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.5 + lineIdx * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Thin gold rule + descriptor */}
        <motion.div
          className="flex items-center gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div
            className="w-16 h-px"
            style={{ backgroundColor: "#B8975A", opacity: 0.7 }}
          />
          <p
            className="font-crimson text-lg italic"
            style={{ color: "#EDE8DF", opacity: 0.65 }}
          >
            {subheadline}
          </p>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 12 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.35, ease: "easeOut" }}
        >
          <LandingButton>{ctaLabel}</LandingButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="right-10 bottom-8 z-10 absolute flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 0.5 } : {}}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <span
          className="font-grotesk text-xs uppercase tracking-widest"
          style={{ color: "#EDE8DF", writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, #B8975A, transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
