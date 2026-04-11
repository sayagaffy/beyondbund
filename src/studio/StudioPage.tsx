import { useEffect } from "react";
import { Studio } from "sanity";
import sanityConfig from "./sanity.config";

export default function StudioPage() {
  useEffect(() => {
    document.documentElement.classList.add("studio-bg");
    document.body.classList.add("studio-bg");
    return () => {
      document.documentElement.classList.remove("studio-bg");
      document.body.classList.remove("studio-bg");
    };
  }, []);

  return (
    <div className="studio-shell">
      <Studio config={sanityConfig} />
    </div>
  );
}
