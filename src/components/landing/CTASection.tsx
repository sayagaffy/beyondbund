import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import LandingButton from "./LandingButton";

export default function CTASection() {
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full py-32 md:py-48 flex flex-col items-center justify-center text-center"
      style={{ backgroundColor: "#100D0B" }}
    >
      <motion.p
        className="font-grotesk text-xs tracking-[0.35em] uppercase mb-8"
        style={{ color: "#B8975A" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        An Invitation
      </motion.p>

      <motion.h2
        className="font-fraunces mb-4 px-8"
        style={{
          fontSize: "clamp(2rem, 5vw, 5rem)",
          fontWeight: 800,
          color: "#EDE8DF",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        Begin Your
        <br />
        <span style={{ fontStyle: "italic" }}>Private Journey</span>
      </motion.h2>

      <motion.p
        className="font-crimson italic mb-14 px-8"
        style={{
          fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
          color: "#EDE8DF",
          opacity: 0.55,
          maxWidth: "480px",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.55 } : {}}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        Every expedition begins with a single, unhurried conversation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <LandingButton
          className="relative z-10"
          onClick={() =>
            window.open("mailto:wei@chenchinajourneys.com", "_blank")
          }
        >
          Request a Private Consultation
        </LandingButton>
      </motion.div>
    </section>
  );
}
