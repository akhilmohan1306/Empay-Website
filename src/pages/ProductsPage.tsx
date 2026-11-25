import { useOutletContext } from "react-router-dom";
import { PageHero } from "../components/sections/PageHero";
import { ProductsSection } from "../components/sections/ProductsSection";
import { FinTechSystemsSection } from "../components/sections/FinTechSystemsSection";

interface ContextType {
  onNavigate: (href: string) => void;
}

export const ProductsPage: React.FC = () => {
  const { onNavigate } = useOutletContext<ContextType>();

  return (
    <>
      <PageHero
        eyebrow="FLAGSHIP FINTECH PLATFORMS"
        badge="MARS & RECONPLUS"
        titleRow1="AUTONOMOUS ACQUIRING &"
        titleAccent="INTELLIGENT"
        titleRow2="RECONCILIATION."
        pitch="Explore MARS for PA-DSS certified merchant onboarding and POS/IPG acquiring, and ReconPlus for multi-source, multi-bank card transaction reconciliation with automatic General Ledger posting."
        ctaText="Schedule a Live Product Demo ↗"
        ctaHref="/contact"
        secondaryText="View Client Implementations →"
        secondaryHref="/clients"
        theme="dark"
      />
      <ProductsSection onNavigate={onNavigate} />
      <FinTechSystemsSection />
    </>
  );
};
