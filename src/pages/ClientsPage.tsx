import { useOutletContext } from "react-router-dom";
import { PageHero } from "../components/sections/PageHero";
import { ClientsSection } from "../components/sections/ClientsSection";
import { PartnersSection } from "../components/sections/PartnersSection";

interface ContextType {
  onNavigate: (href: string) => void;
}

export const ClientsPage: React.FC = () => {
  const { onNavigate } = useOutletContext<ContextType>();

  return (
    <>
      <PageHero
        eyebrow="OUR PRESTIGIOUS CLIENTS & ECOSYSTEM"
        badge="PROVEN SCALE"
        titleRow1="HELPING INDUSTRY"
        titleAccent="PIONEERS BECOME &"
        titleRow2="STAY LEADERS."
        pitch="Empay powers high-throughput transaction switching, card issuance, and multi-scheme reconciliation infrastructure for leading banks, payment networks, and fintech enterprises worldwide."
        ctaText="Initiate Client Onboarding ↗"
        ctaHref="/contact"
        secondaryText="View Certified Scheme Partners →"
        secondaryHref="/partners"
        theme="dark"
      />
      <ClientsSection onNavigate={onNavigate} />
      <PartnersSection />
    </>
  );
};
