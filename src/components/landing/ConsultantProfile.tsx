import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ConsultantProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="profile"
      ref={ref}
      className="w-full py-0"
      style={{ backgroundColor: "#1A1714" }}
    >
      <div className="mx-8 md:mx-16">
        <div className="gold-rule w-full" />
      </div>

      <div className="px-8 md:px-16 py-20 md:py-28">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center max-w-6xl">
          {/* Portrait */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: "clamp(220px, 28vw, 380px)",
                height: "clamp(280px, 36vw, 480px)",
                border: "1px solid rgba(184,151,90,0.3)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                alt="Portrait of Wei Chen, China travel consultant"
                className="w-full h-full object-cover grayscale contrast-110"
                style={{ filter: "grayscale(60%) contrast(1.1) brightness(0.85)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 60%, rgba(26,23,20,0.6) 100%)",
                }}
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              className="font-grotesk text-xs tracking-[0.35em] uppercase mb-6"
              style={{ color: "#B8975A" }}
            >
              Your Guide
            </p>

            <h2
              className="font-fraunces mb-2"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#EDE8DF",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Wei Chen
            </h2>
            <p
              className="font-crimson italic mb-8"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "#B8975A",
              }}
            >
              China Travel Consultant & Cultural Interpreter
            </p>

            <div
              className="w-12 h-px mb-8"
              style={{ backgroundColor: "#B8975A", opacity: 0.6 }}
            />

            <p
              className="font-crimson mb-6 leading-relaxed"
              style={{
                fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                color: "#EDE8DF",
                opacity: 0.8,
                maxWidth: "520px",
              }}
            >
              Twenty years traversing China's hidden provinces — from Tibetan
              borderlands to the ink-wash landscapes of the Huangshan. Fluent
              in Mandarin, Cantonese, and the unspoken language of place.
            </p>

            <p
              className="font-crimson leading-relaxed"
              style={{
                fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                color: "#EDE8DF",
                opacity: 0.65,
                maxWidth: "520px",
              }}
            >
              Each journey is singular, private, and impossible to replicate.
              Not a tour. A transformation.
            </p>

            {/* Credentials */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                ["30+", "Provinces explored"],
                ["18", "Years guiding"],
                ["200+", "Private expeditions"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p
                    className="font-fraunces font-bold"
                    style={{ fontSize: "1.75rem", color: "#B8975A" }}
                  >
                    {num}
                  </p>
                  <p
                    className="font-grotesk text-xs tracking-[0.15em] uppercase"
                    style={{ color: "#EDE8DF", opacity: 0.5 }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-8 md:mx-16">
        <div className="gold-rule w-full" />
      </div>
    </section>
  );
}
