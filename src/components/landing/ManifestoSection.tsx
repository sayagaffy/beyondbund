import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const QUOTE = "China is not a destination. It is an initiation.";

export default function ManifestoSection() {
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
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = QUOTE.split(" ");

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative w-full py-32 md:py-48"
      style={{ backgroundColor: "#1A1714" }}
    >
      {/* Gold rule top */}
      <div className="mx-8 md:mx-16 mb-20">
        <div className="gold-rule w-full" />
      </div>

      {/* Pull quote */}
      <div className="px-8 md:px-16 max-w-5xl mx-auto text-center">
        <p
          className="font-grotesk text-xs tracking-[0.35em] uppercase mb-12"
          style={{ color: "#B8975A" }}
        >
          The Philosophy
        </p>
        <h2
          className="font-fraunces leading-tight"
          style={{
            fontSize: "clamp(2rem, 5vw, 5rem)",
            fontStyle: "italic",
            color: "#EDE8DF",
            letterSpacing: "-0.01em",
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={
                inView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: words.length * 0.08 + 0.2 }}
        >
          <div className="w-24 h-px" style={{ backgroundColor: "#B8975A" }} />
        </motion.div>
      </div>

      {/* Gold rule bottom */}
      <div className="mx-8 md:mx-16 mt-20">
        <div className="gold-rule w-full" />
      </div>
    </section>
  );
}
