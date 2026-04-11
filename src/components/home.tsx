import { useEffect, useState } from "react";
import FloatingNav from "./landing/FloatingNav";
import HeroSection from "./landing/HeroSection";
import ManifestoSection from "./landing/ManifestoSection";
import ItineraryBuilderSection from "./landing/ItineraryBuilderSection";
import JourneysSection from "./landing/JourneysSection";
import InsiderAccessSection from "./landing/InsiderAccessSection";
import CTASection from "./landing/CTASection";
import SocialProofSection from "./landing/SocialProofSection";
import Footer from "./landing/Footer";
import SEOManager from "./SEOManager";
import { fetchSiteSettings } from "../lib/sanity/queries";
import type { SiteSettings } from "../lib/sanity/types";

const hasSanityConfig = Boolean(
  import.meta.env.VITE_SANITY_PROJECT_ID && import.meta.env.VITE_SANITY_DATASET,
);

function Home() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!hasSanityConfig) {
        return;
      }

      try {
        const data = await fetchSiteSettings();
        if (isMounted) {
          setSettings(data);
        }
      } catch (error) {
        if (isMounted) {
          setSettings(null);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

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
      <SEOManager seo={settings?.seo} />
      <FloatingNav onScrollTo={scrollTo} />
      <HeroSection settings={settings?.hero} />
      <ManifestoSection />
      <ItineraryBuilderSection />
      <JourneysSection />
      <InsiderAccessSection />
      <CTASection contactEmail={settings?.contactEmail} />
      <SocialProofSection />
      <Footer />
    </div>
  );
}

export default Home;
