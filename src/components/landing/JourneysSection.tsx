import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingButton from "./LandingButton";

export default function JourneysSection() {
  const [selection, setSelection] = useState<"fine-dining" | "street-food" | null>(
    null
  );

  return (
    <section
      id="journeys"
      className="w-full py-24 md:py-32"
      style={{ backgroundColor: "#1A1714" }}
    >
      <div className="px-8 md:px-16">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p
            className="font-grotesk text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: "#B8975A" }}
          >
            Vibe Check
          </p>
          <h2
            className="font-fraunces"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              color: "#EDE8DF",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Your
            <br />
            <span style={{ fontStyle: "italic" }}>Travel Vibe</span>
          </h2>
        </div>

        <div className="gold-rule w-full mb-12" />

        {/* Interactive vibe check */}
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            {selection === null ? (
              <motion.div
                key="choices"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <p
                  className="font-crimson text-lg md:text-xl italic mb-8"
                  style={{ color: "#EDE8DF", opacity: 0.8 }}
                >
                  In Beijing, what is your dining style?
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      id: "fine-dining",
                      title: "5-Star Peking Duck Restaurant",
                      image:
                        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200",
                    },
                    {
                      id: "street-food",
                      title: "Hidden Local Street Food Alley",
                      image:
                        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200",
                    },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className="text-left p-6 md:p-10 transition-all duration-300 relative overflow-hidden md:min-h-[320px]"
                      style={{
                        border: "1px solid rgba(237,232,223,0.18)",
                        backgroundColor: "rgba(16,13,11,0.4)",
                      }}
                      onClick={() =>
                        setSelection(option.id as "fine-dining" | "street-food")
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#B8975A";
                        e.currentTarget.style.backgroundColor = "rgba(26,23,20,0.85)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(237,232,223,0.18)";
                        e.currentTarget.style.backgroundColor = "rgba(16,13,11,0.4)";
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#B8975A";
                        e.currentTarget.style.backgroundColor = "rgba(26,23,20,0.85)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(237,232,223,0.18)";
                        e.currentTarget.style.backgroundColor = "rgba(16,13,11,0.4)";
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url('${option.image}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          filter: "grayscale(60%) contrast(1.1) brightness(0.8)",
                          opacity: 0.55,
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(16,13,11,0.9) 0%, rgba(16,13,11,0.55) 55%, rgba(16,13,11,0.2) 100%)",
                        }}
                      />
                      <div className="relative z-10">
                      <p
                        className="font-grotesk text-xs tracking-[0.3em] uppercase mb-4"
                        style={{ color: "#B8975A" }}
                      >
                        Option {option.id === "fine-dining" ? "A" : "B"}
                      </p>
                      <h3
                        className="font-fraunces"
                        style={{
                          fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)",
                          color: "#EDE8DF",
                        }}
                      >
                        {option.title}
                      </h3>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <p
                  className="font-crimson text-lg md:text-xl italic"
                  style={{ color: "#EDE8DF", opacity: 0.85 }}
                >
                  Your profile matches Cultural Explorer. Our local experts will craft a unique itinerary for you.
                </p>

                <div className="mt-8 flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="WhatsApp or Email"
                    aria-label="WhatsApp number or email address"
                    className="w-full bg-transparent px-4 py-3 font-grotesk text-sm tracking-[0.08em] focus:outline-none"
                    style={{
                      border: "1px solid rgba(237,232,223,0.2)",
                      color: "#EDE8DF",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#B8975A";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(237,232,223,0.2)";
                    }}
                  />
                  <LandingButton className="w-full md:w-auto">
                    Get My Bespoke Itinerary
                  </LandingButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
