import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import LandingButton from "./LandingButton";
import { DEFAULT_CONTACT_EMAIL } from "../../lib/siteDefaults";

type CTASectionProps = {
  contactEmail?: string;
};

export default function CTASection({ contactEmail }: CTASectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const resolvedEmail = contactEmail?.trim() || DEFAULT_CONTACT_EMAIL;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="flex flex-col justify-center items-center py-32 md:py-48 w-full text-center"
      style={{ backgroundColor: "#100D0B" }}
    >
      <motion.p
        className="mb-8 font-grotesk text-xs uppercase tracking-[0.35em]"
        style={{ color: "#B8975A" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        An Invitation
      </motion.p>

      <motion.h2
        className="mb-4 px-8 font-fraunces"
        style={{
          fontSize: "clamp(2rem, 5vw, 5rem)",
          fontWeight: 800,
          color: "#EDE8DF",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.9,
          delay: 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        Begin Your
        <br />
        <span style={{ fontStyle: "italic" }}>Private Journey</span>
      </motion.h2>

      <motion.p
        className="mb-14 px-8 font-crimson italic"
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
          className="z-10 relative"
          onClick={() => window.open(`mailto:${resolvedEmail}`, "_blank")}
        >
          Request a Private Consultation
        </LandingButton>
      </motion.div>
    </section>
  );
}
