import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LandingButton from "./LandingButton";

interface FloatingNavProps {
  onScrollTo: (section: string) => void;
}

export default function FloatingNav({ onScrollTo }: FloatingNavProps) {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.nav
      className="glass-nav fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4"
      initial={{ y: -80, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-center justify-between">
        {/* Monogram Logo */}
        <Link
          to="/"
          className="font-fraunces font-bold text-xl tracking-widest"
          style={{ color: "#B8975A" }}
        >
          <span
            className="font-fraunces font-bold text-2xl"
            style={{ color: "#B8975A" }}
          >
            超过
          </span>
          <span>BeyondBund</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {["Journeys", "Philosophy", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => onScrollTo(item.toLowerCase())}
              className="hover:opacity-100 font-grotesk text-xs uppercase tracking-[0.2em] transition-colors duration-300"
              style={{ color: "#EDE8DF", opacity: 0.65 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#B8975A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#EDE8DF")}
            >
              {item}
            </button>
          ))}
          <Link
            to="/blog"
            className="hover:opacity-100 font-grotesk text-xs uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: "#EDE8DF", opacity: 0.65 }}
          >
            Blog
          </Link>
          <LandingButton size="sm" onClick={() => onScrollTo("contact")}>
            Book Consultation
          </LandingButton>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden flex flex-col items-end gap-1"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block"
              style={{
                width: i === 1 ? "18px" : "24px",
                height: "1px",
                backgroundColor: "#EDE8DF",
                opacity: 0.7,
              }}
            />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="pt-4 flex flex-col gap-4"
              style={{ borderTop: "1px solid rgba(184,151,90,0.2)" }}
            >
              {["Journeys", "Philosophy", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    onScrollTo(item.toLowerCase());
                    setMenuOpen(false);
                  }}
                  className="font-grotesk text-xs tracking-[0.3em] uppercase text-left"
                  style={{ color: "#EDE8DF", opacity: 0.75 }}
                >
                  {item}
                </button>
              ))}
              <Link
                to="/blog"
                className="font-grotesk text-xs tracking-[0.3em] uppercase text-left"
                style={{ color: "#EDE8DF", opacity: 0.75 }}
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
              <LandingButton
                size="md"
                onClick={() => {
                  onScrollTo("contact");
                  setMenuOpen(false);
                }}
              >
                Book Consultation
              </LandingButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
