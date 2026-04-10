export default function Footer() {
  return (
    <footer
      className="px-8 md:px-16 py-12 w-full"
      style={{ backgroundColor: "#100D0B" }}
    >
      <div className="mb-10 w-full gold-rule" />

      <div className="flex md:flex-row flex-col justify-between items-center gap-6">
        {/* Monogram */}
        <div className="flex items-center gap-3">
          <span
            className="font-fraunces font-bold text-2xl"
            style={{ color: "#B8975A" }}
          >
            超过
          </span>
          <div
            className="w-px h-6"
            style={{ backgroundColor: "#B8975A", opacity: 0.4 }}
          />
          <p
            className="font-crimson italic"
            style={{
              color: "#EDE8DF",
              opacity: 0.45,
              fontSize: "0.95rem",
            }}
          >
            China, as it was meant to be discovered.
          </p>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6">
          {["Instagram", "WeChat", "LinkedIn"].map((platform) => (
            <button
              key={platform}
              className="font-grotesk text-xs uppercase tracking-[0.15em] transition-colors duration-300"
              style={{ color: "#EDE8DF", opacity: 0.4 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#B8975A";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#EDE8DF";
                e.currentTarget.style.opacity = "0.4";
              }}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <p
          className="font-grotesk text-xs"
          style={{ color: "#EDE8DF", opacity: 0.2 }}
        >
          © {new Date().getFullYear()} BeyondBund Journeys. Private expeditions
          by invitation.
        </p>
      </div>
    </footer>
  );
}
