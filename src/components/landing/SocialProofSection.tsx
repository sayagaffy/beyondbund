const testimonials = [
  {
    quote:
      "They got us into places no tourist could ever find. Unbelievable experience that completely changed my perspective of China.",
    name: "Alexander Reed",
    role: "Tech Executive, SF",
  },
  {
    quote:
      "The level of personalization was unmatched. From secret tea houses to private wall access, every detail was flawless.",
    name: "Sophia Laurent",
    role: "Art Director, Paris",
  },
  {
    quote:
      "I thought I knew luxury travel until I booked with BeyondTheWall. They redefined authenticity and premium service.",
    name: "James Chen",
    role: "Entrepreneur, London",
  },
  {
    quote:
      "Every moment felt intentional. Quiet courtyards, hidden ateliers, and a pace that let the culture sink in.",
    name: "Maya Torres",
    role: "Founder, NYC",
  },
];

export default function SocialProofSection() {
  return (
    <section
      className="w-full py-24 md:py-32"
      style={{ backgroundColor: "#1A1714" }}
    >
      <div className="px-8 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <p
            className="font-grotesk text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: "#B8975A" }}
          >
            The Insiders' Circle
          </p>
          <h2
            className="font-fraunces"
            style={{
              fontSize: "clamp(2.2rem, 4.2vw, 4rem)",
              fontWeight: 800,
              color: "#EDE8DF",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Social Proof
          </h2>
          <p
            className="font-crimson italic mt-4"
            style={{ color: "#EDE8DF", opacity: 0.65 }}
          >
            Don&apos;t just take our word for it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative p-10 md:p-12 transition-colors duration-300"
              style={{
                minHeight: "300px",
                border: "1px solid rgba(237,232,223,0.18)",
                backgroundColor: "rgba(16,13,11,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#B8975A";
                e.currentTarget.style.backgroundColor = "rgba(16,13,11,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(237,232,223,0.18)";
                e.currentTarget.style.backgroundColor = "rgba(16,13,11,0.35)";
              }}
            >
              <div className="flex flex-col h-full">
                <div
                  className="absolute top-8 right-8 font-fraunces"
                  style={{ color: "#B8975A", opacity: 0.25, fontSize: "2.5rem" }}
                >
                  &ldquo;
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={`${t.name}-star-${idx}`}
                      className="text-xs"
                      style={{ color: "#B8975A" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div
                  className="w-10 h-px mb-6"
                  style={{ backgroundColor: "#B8975A", opacity: 0.5 }}
                />
                <p
                  className="font-crimson italic text-base md:text-lg mb-6 leading-relaxed"
                  style={{ color: "#EDE8DF", opacity: 0.78 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto">
                  <p
                    className="font-grotesk text-xs tracking-[0.2em] uppercase"
                    style={{ color: "#EDE8DF" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-grotesk text-[0.65rem] tracking-[0.2em] uppercase mt-2"
                    style={{ color: "#EDE8DF", opacity: 0.5 }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
