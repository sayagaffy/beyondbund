import LandingButton from "./LandingButton";

const lockedTiles = [
  {
    title: "Underground Speakeasy Index",
    subtitle: "Beijing — Hutong Network",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Private Courtyard Map",
    subtitle: "Shanghai — Heritage Keys",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "After-Hours Atelier List",
    subtitle: "Guangzhou — Artisan Circuit",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function InsiderAccessSection() {
  return (
    <section
      id="insider-access"
      className="w-full py-24 md:py-32"
      style={{ backgroundColor: "#1A1714" }}
    >
      <div className="px-8 md:px-16">
        <div className="gold-rule w-full mb-12" />

        <div className="text-center mb-14 md:mb-20">
          <p
            className="font-grotesk text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: "#B8975A" }}
          >
            Insider Access
          </p>
          <h2
            className="font-fraunces"
            style={{
              fontSize: "clamp(2.6rem, 5vw, 5rem)",
              fontWeight: 800,
              color: "#EDE8DF",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Insider Access
            <br />
            <span style={{ fontStyle: "italic" }}>Portal</span>
          </h2>
          <p
            className="font-crimson italic mt-6"
            style={{ color: "#EDE8DF", opacity: 0.65, fontSize: "1.1rem" }}
          >
            Unlock our most guarded local secrets. Exclusively for members.
          </p>

          <form
            className="max-w-2xl mx-auto mt-10 flex flex-col md:flex-row gap-4"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Create insider access account"
          >
            <input
              type="email"
              required
              placeholder="Enter secure email"
              aria-label="Email address for insider access"
              className="flex-1 bg-transparent px-5 py-4 font-grotesk text-xs tracking-[0.2em] uppercase focus:outline-none"
              style={{
                border: "1px solid rgba(237,232,223,0.25)",
                color: "#EDE8DF",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#B8975A";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(237,232,223,0.25)";
              }}
            />
            <LandingButton className="whitespace-nowrap">
              Create Free Account
            </LandingButton>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {lockedTiles.map((tile) => (
            <div
              key={tile.title}
              className="relative overflow-hidden"
              style={{
                border: "1px solid rgba(237,232,223,0.18)",
                minHeight: "280px",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${tile.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(10px) grayscale(60%) brightness(0.7)",
                  transform: "scale(1.05)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(16,13,11,0.9) 0%, rgba(16,13,11,0.55) 50%, rgba(16,13,11,0.2) 100%)",
                }}
              />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
                <div
                  className="flex items-center justify-center mb-6"
                  style={{
                    width: "64px",
                    height: "64px",
                    border: "1px solid rgba(237,232,223,0.25)",
                    backgroundColor: "rgba(16,13,11,0.7)",
                  }}
                >
                  <span
                    className="font-grotesk text-lg"
                    style={{ color: "#B8975A" }}
                  >
                    ⟟
                  </span>
                </div>
                <p
                  className="font-grotesk text-[0.6rem] tracking-[0.3em] uppercase mb-3"
                  style={{ color: "#B8975A" }}
                >
                  Classified
                </p>
                <h3
                  className="font-fraunces"
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                    color: "#EDE8DF",
                  }}
                >
                  {tile.title}
                </h3>
                <p
                  className="font-crimson italic mt-3 text-sm"
                  style={{ color: "#EDE8DF", opacity: 0.6 }}
                >
                  {tile.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
