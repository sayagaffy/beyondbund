import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["Culinary Focus", "History & Culture", "Hidden Gems", "Shopping"];

const contentMap: Record<
  (typeof tabs)[number],
  { title: string; desc: string; img: string; alt: string }[]
> = {
  "Culinary Focus": [
    {
      title: "Sichuan Spice Market",
      desc: "Navigate the vibrant Chengdu markets with a local chef.",
      img: "https://images.unsplash.com/photo-1760390952109-97b41176f790?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Sichuan spice market stalls in Chengdu with colorful chilies and herbs",
    },
    {
      title: "Imperial Banquet",
      desc: "Dine in a restored Qing Dynasty courtyard in Beijing.",
      img: "https://images.unsplash.com/photo-1755742319537-449f661a3190?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Traditional courtyard dining setup in Beijing for an imperial-style banquet",
    },
    {
      title: "Dim Sum Masterclass",
      desc: "Private workshop with a Michelin-starred chef in Guangzhou.",
      img: "https://images.unsplash.com/photo-1769830716122-cf98ceb1c5f5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Dim sum chef preparing dumplings in a Guangzhou kitchen",
    },
    {
      title: "Tea Plantation Trek",
      desc: "Harvest Longjing tea and enjoy a traditional ceremony.",
      img: "https://images.unsplash.com/photo-1679667049239-0a5e1d073244?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Longjing tea terraces with harvest baskets in Hangzhou",
    },
  ],
  "History & Culture": [
    {
      title: "Private Mutianyu Wall",
      desc: "Sunrise champagne breakfast on a deserted section of the Great Wall.",
      img: "https://images.unsplash.com/photo-1590050371954-f8c5beb14b1e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Sunrise view of the Mutianyu section of the Great Wall",
    },
    {
      title: "Terracotta Access",
      desc: "Exclusive access to the excavation pits in Xi'an.",
      img: "https://plus.unsplash.com/premium_photo-1692673142063-e1184cb78c0e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Terracotta Army warriors inside the Xi'an excavation pit",
    },
    {
      title: "Forbidden City Secrets",
      desc: "Tour areas normally closed to the general public.",
      img: "https://images.unsplash.com/photo-1590301729964-23833732ee04?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Forbidden City rooftops and courtyards in Beijing",
    },
    {
      title: "Dunhuang Caves",
      desc: "Expert-led exploration of ancient Buddhist art in the desert.",
      img: "https://images.unsplash.com/photo-1729581514945-ef3f32fe2e7e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Mogao cave murals and desert landscape near Dunhuang",
    },
  ],
  "Hidden Gems": [
    {
      title: "Guizhou Villages",
      desc: "Immerse in the undisturbed minority cultures of the southwest.",
      img: "https://images.unsplash.com/photo-1755584519952-533f95364510?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Traditional stilt houses in a Guizhou minority village",
    },
    {
      title: "Zhangjiajie Heights",
      desc: "Helicopter tour over the towering sandstone pillars.",
      img: "https://images.unsplash.com/photo-1567266565245-c08dc046815f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Zhangjiajie sandstone pillars rising above the mist",
    },
    {
      title: "Desert Glamping",
      desc: "Luxury tents in the singing sands of the Gobi.",
      img: "https://images.unsplash.com/photo-1681400739651-db98efd447c5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Luxury tents under the stars in the Gobi desert",
    },
    {
      title: "Tiger Leaping Gorge",
      desc: "Guided trek through one of the world's deepest canyons.",
      img: "https://images.unsplash.com/photo-1656746791303-1220a13e0a04?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Tiger Leaping Gorge river and mountain trail in Yunnan",
    },
  ],
  Shopping: [
    {
      title: "Shanghai Tailors",
      desc: "Bespoke silk garments crafted by generational masters.",
      img: "https://images.unsplash.com/photo-1597533456455-39defa5bf390?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Silk fabrics and tailoring workshop in Shanghai",
    },
    {
      title: "Jingdezhen Ceramics",
      desc: "Source authentic porcelain directly from artists.",
      img: "https://images.unsplash.com/photo-1582254951277-680ec7cb58e6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Handcrafted porcelain being finished in a Jingdezhen studio",
    },
    {
      title: "Antique Markets",
      desc: "Curated shopping in Beijing's hidden Panjiayuan alleys.",
      img: "https://images.unsplash.com/photo-1642787962696-2ee1ba7a0f00?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Panjiayuan antique market alley in Beijing",
    },
    {
      title: "Modern Tech Hubs",
      desc: "VIP tours of Shenzhen's cutting-edge electronics markets.",
      img: "https://images.unsplash.com/photo-1658367063280-3b97e6745cdd?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Electronics market stalls in Shenzhen",
    },
  ],
};

export default function ItineraryBuilderSection() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("Hidden Gems");

  return (
    <section
      id="itinerary"
      className="py-24 md:py-32 w-full"
      style={{ backgroundColor: "#1A1714" }}
    >
      <div className="px-8 md:px-16">
        <div className="mb-12 md:mb-16">
          <p
            className="mb-4 font-grotesk text-xs uppercase tracking-[0.35em]"
            style={{ color: "#B8975A" }}
          >
            Build the Itinerary
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
            Design Your
            <br />
            <span style={{ fontStyle: "italic" }}>Custom Experience</span>
          </h2>
        </div>

        <div className="mb-10 w-full gold-rule" />

        <div className="flex flex-wrap gap-3 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="px-5 py-3 font-grotesk text-[0.65rem] uppercase tracking-[0.25em] transition-all duration-300"
                style={{
                  border: "1px solid rgba(237,232,223,0.25)",
                  color: isActive ? "#1A1714" : "#EDE8DF",
                  backgroundColor: isActive ? "#B8975A" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#B8975A";
                    e.currentTarget.style.color = "#B8975A";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor =
                      "rgba(237,232,223,0.25)";
                    e.currentTarget.style.color = "#EDE8DF";
                  }
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="gap-4 grid md:grid-cols-2 xl:grid-cols-4">
          {contentMap[activeTab].map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
              className="group relative overflow-hidden"
              style={{
                border: "1px solid rgba(237,232,223,0.18)",
                minHeight: "360px",
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img
                src={item.img}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: "grayscale(60%) contrast(1.1) brightness(0.8)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(16,13,11,0.9) 0%, rgba(16,13,11,0.5) 55%, rgba(16,13,11,0.15) 100%)",
                }}
              />
              <div className="z-10 relative flex flex-col justify-end p-6 h-full">
                <p
                  className="mb-3 font-grotesk text-[0.6rem] uppercase tracking-[0.3em]"
                  style={{ color: "#B8975A" }}
                >
                  {activeTab}
                </p>
                <h3
                  className="mb-3 font-fraunces"
                  style={{
                    fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                    color: "#EDE8DF",
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-crimson text-sm italic"
                  style={{ color: "#EDE8DF", opacity: 0.75 }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
