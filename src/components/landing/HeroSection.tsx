import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [autoAdvanceKey, setAutoAdvanceKey] = useState(0);

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

  const fallbackEyebrow = settings?.eyebrow?.trim() || DEFAULT_HERO.eyebrow;
  const fallbackHeadlineLine1 =
    settings?.headlineLine1?.trim() || DEFAULT_HERO.headlineLine1;
  const fallbackHeadlineLine2 =
    settings?.headlineLine2?.trim() || DEFAULT_HERO.headlineLine2;
  const fallbackItalicLine2 =
    settings?.headlineLine2Italic ?? DEFAULT_HERO.headlineLine2Italic;
  const fallbackSubheadline =
    settings?.subheadline?.trim() || DEFAULT_HERO.subheadline;
  const fallbackCtaLabel =
    settings?.ctaLabel?.trim() || DEFAULT_HERO.ctaLabel;

  const heroImages = (settings?.backgroundImages ?? [])
    .map((image) =>
      urlForImage(image)?.width(2400).height(1600).fit("crop").url(),
    )
    .filter((image): image is string => Boolean(image));

  const resolvedSlides = (() => {
    if (settings?.slides && settings.slides.length > 0) {
      return settings.slides.map((slide, index) => {
        const imageUrl =
          urlForImage(slide.backgroundImage)
            ?.width(2400)
            .height(1600)
            .fit("crop")
            .url() ||
          heroImages[index] ||
          heroImages[0] ||
          DEFAULT_HERO.backgroundImages[0];

        return {
          imageUrl,
          eyebrow: slide.eyebrow?.trim() || fallbackEyebrow,
          headlineLine1: slide.headlineLine1?.trim() || fallbackHeadlineLine1,
          headlineLine2: slide.headlineLine2?.trim() || fallbackHeadlineLine2,
          headlineLine2Italic:
            slide.headlineLine2Italic ?? fallbackItalicLine2,
          subheadline: slide.subheadline?.trim() || fallbackSubheadline,
          ctaLabel: slide.ctaLabel?.trim() || fallbackCtaLabel,
        };
      });
    }
    const baseSlides = DEFAULT_HERO.slides.map((slide, index) => ({
      ...slide,
      imageUrl:
        heroImages[index] || heroImages[0] || slide.imageUrl,
    }));

    const hasHeroOverride = Boolean(
      settings?.eyebrow ||
        settings?.headlineLine1 ||
        settings?.headlineLine2 ||
        settings?.subheadline ||
        settings?.ctaLabel,
    );

    if (hasHeroOverride) {
      baseSlides[0] = {
        ...baseSlides[0],
        imageUrl: heroImages[0] || baseSlides[0].imageUrl,
        eyebrow: fallbackEyebrow,
        headlineLine1: fallbackHeadlineLine1,
        headlineLine2: fallbackHeadlineLine2,
        headlineLine2Italic: fallbackItalicLine2,
        subheadline: fallbackSubheadline,
        ctaLabel: fallbackCtaLabel,
      };
    }

    return baseSlides;
  })();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= resolvedSlides.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, resolvedSlides.length]);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || resolvedSlides.length <= 1) {
      return;
    }
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % resolvedSlides.length);
    }, 8000);

    return () => window.clearInterval(interval);
  }, [resolvedSlides.length, isPaused, prefersReducedMotion, autoAdvanceKey]);

  const currentSlide =
    resolvedSlides[activeIndex] ?? DEFAULT_HERO.slides[0];
  const headline = [currentSlide.headlineLine1, currentSlide.headlineLine2];

  const goToSlide = (index: number) => {
    if (resolvedSlides.length === 0) {
      return;
    }
    const nextIndex = (index + resolvedSlides.length) % resolvedSlides.length;
    setActiveIndex(nextIndex);
    setAutoAdvanceKey((prev) => prev + 1);
  };

  const handlePrev = () => goToSlide(activeIndex - 1);
  const handleNext = () => goToSlide(activeIndex + 1);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", backgroundColor: "#1A1714" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.imageUrl}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 1.8,
              ease: "easeInOut",
            }}
          >
            <div
              className="bg-cover bg-center w-full h-full ken-burns"
              style={{ backgroundImage: `url('${currentSlide.imageUrl}')` }}
            />
          </motion.div>
        </AnimatePresence>
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
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-content-${activeIndex}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 1.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Subheading */}
            <motion.p
              className="mb-6 font-grotesk text-xs uppercase tracking-[0.35em]"
              style={{ color: "#B8975A" }}
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.9,
                delay: 0.15,
                ease: "easeOut",
              }}
            >
              {currentSlide.eyebrow}
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
                          lineIdx === 1 && currentSlide.headlineLine2Italic
                            ? "italic"
                            : "normal",
                      }}
                      initial={{ y: "110%", filter: "blur(8px)" }}
                      animate={loaded ? { y: "0%", filter: "blur(0px)" } : {}}
                      transition={{
                        duration: prefersReducedMotion ? 0.01 : 1.05,
                        delay: 0.35 + lineIdx * 0.18,
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
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1.1,
                delay: 1,
              }}
            >
              <div
                className="w-16 h-px"
                style={{ backgroundColor: "#B8975A", opacity: 0.7 }}
              />
              <p
                className="font-crimson text-lg italic"
                style={{ color: "#EDE8DF", opacity: 0.65 }}
              >
                {currentSlide.subheadline}
              </p>
            </motion.div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 12 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.9,
                delay: 1.2,
                ease: "easeOut",
              }}
            >
              <LandingButton>{currentSlide.ctaLabel}</LandingButton>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {resolvedSlides.length > 1 ? (
        <>
          <button
            type="button"
            className="hero-arrow hero-arrow--left"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="hero-arrow-icon"
            >
              <path
                d="M15.5 19.5L8 12l7.5-7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="hero-arrow hero-arrow--right"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="hero-arrow-icon"
            >
              <path
                d="M8.5 4.5L16 12l-7.5 7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      ) : null}

      {resolvedSlides.length > 1 ? (
        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          {resolvedSlides.map((_, index) => (
            <button
              key={`hero-dot-${index}`}
              type="button"
              className={`hero-dot${
                index === activeIndex ? " is-active" : ""
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={index === activeIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      ) : null}

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
