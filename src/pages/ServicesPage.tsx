import { useOutletContext } from "react-router-dom";
import { PageHero } from "../components/sections/PageHero";
import { ExpertiseSection } from "../components/sections/ExpertiseSection";
import { ArchitectureSection } from "../components/sections/ArchitectureSection";

interface ContextType {
  onNavigate: (href: string) => void;
}

export const ServicesPage: React.FC = () => {
  const { onNavigate } = useOutletContext<ContextType>();

  return (
    <>
      <PageHero
        eyebrow="FINANCIAL ARCHITECTURE & CONSULTING"
        badge="FULL-LIFECYCLE"
        titleRow1="ENTERPRISE FINANCIAL"
        titleAccent="SERVICES &"
        titleRow2="CONSULTING."
        pitch="From high-throughput switch modernization and PA-DSS compliance to automated scheme interfaces, our specialized financial engineering team delivers robust, production-proven payment rails."
        ctaText="Request Solutions Consultation ↗"
        ctaHref="/contact"
        secondaryText="Explore Flagship Products →"
        secondaryHref="/products"
        theme="dark"
      />
      <ExpertiseSection onNavigate={onNavigate} />
      <ArchitectureSection />
    </>
  );
};
