import { PageHero } from "../components/sections/PageHero";
import { AboutScrubSection } from "../components/sections/AboutScrubSection";
import { StatementSection } from "../components/sections/StatementSection";

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageHero
        eyebrow="ABOUT EMPAY SOFTWARE SOLUTIONS // EST. 2008"
        badge="PA-DSS CERTIFIED"
        titleRow1="PIONEERING NEXT-GEN"
        titleAccent="PAYMENT"
        titleRow2="INFRASTRUCTURE."
        pitch="Founded in 2008 by industry veterans, Empay delivers mission-critical payment switching, transaction processing, and automated reconciliation systems to banks and financial institutions worldwide."
        ctaText="Explore Our Products ↗"
        ctaHref="/products"
        secondaryText="View Open Careers ↓"
        secondaryHref="/careers"
        theme="light"
      />
      <AboutScrubSection />
      <StatementSection />
    </>
  );
};
