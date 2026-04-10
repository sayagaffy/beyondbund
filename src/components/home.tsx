import FloatingNav from "./landing/FloatingNav";
import HeroSection from "./landing/HeroSection";
import ManifestoSection from "./landing/ManifestoSection";
import ItineraryBuilderSection from "./landing/ItineraryBuilderSection";
import JourneysSection from "./landing/JourneysSection";
import InsiderAccessSection from "./landing/InsiderAccessSection";
import CTASection from "./landing/CTASection";
import SocialProofSection from "./landing/SocialProofSection";
import Footer from "./landing/Footer";

function Home() {
  const scrollTo = (section: string) => {
    const sectionMap: Record<string, string> = {
      journeys: "journeys",
      philosophy: "philosophy",
      contact: "contact",
    };
    const el = document.getElementById(sectionMap[section] || section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="grain-overlay relative min-h-screen"
      style={{ backgroundColor: "#1A1714" }}
    >
      <FloatingNav onScrollTo={scrollTo} />
      <HeroSection />
      <ManifestoSection />
      <ItineraryBuilderSection />
      <JourneysSection />
      <InsiderAccessSection />
      <CTASection />
      <SocialProofSection />
      <Footer />
    </div>
  );
}

export default Home;
