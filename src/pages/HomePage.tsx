import { useOutletContext } from "react-router-dom";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutScrubSection } from "../components/sections/AboutScrubSection";
import { StatementSection } from "../components/sections/StatementSection";
import { ExpertiseSection } from "../components/sections/ExpertiseSection";
import { ProductsSection } from "../components/sections/ProductsSection";
import { FinTechSystemsSection } from "../components/sections/FinTechSystemsSection";
import { ClientsSection } from "../components/sections/ClientsSection";
import { PartnersSection } from "../components/sections/PartnersSection";
import { ArchitectureSection } from "../components/sections/ArchitectureSection";
import { CareersSection } from "../components/sections/CareersSection";

interface ContextType {
  onNavigate: (href: string) => void;
}

export const HomePage: React.FC = () => {
  const { onNavigate } = useOutletContext<ContextType>();

  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <AboutScrubSection />
      <StatementSection />
      <ExpertiseSection onNavigate={onNavigate} />
      <ProductsSection onNavigate={onNavigate} />
      <FinTechSystemsSection />
      <ClientsSection onNavigate={onNavigate} />
      <PartnersSection />
      <ArchitectureSection />
      <CareersSection />
    </>
  );
};
