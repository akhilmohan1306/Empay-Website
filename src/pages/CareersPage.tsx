import { PageHero } from "../components/sections/PageHero";
import { CareersSection } from "../components/sections/CareersSection";

export const CareersPage: React.FC = () => {
  return (
    <>
      <PageHero
        eyebrow="CAREERS AT EMPAY // SMARTCITY KOCHI"
        badge="JOIN OUR TEAM"
        titleRow1="BUILD MISSION-CRITICAL"
        titleAccent="FINANCIAL"
        titleRow2="INFRASTRUCTURE."
        pitch="Work at the intersection of extreme scale, high security, and real-time transaction processing. Explore open engineering and operations roles at our Lulu IT Twin Tower center at SmartCity Kochi."
        ctaText="Explore Open Positions ↓"
        ctaHref="#career-list"
        secondaryText="Connect With HR Team ↗"
        secondaryHref="mailto:hr@empaysoft.com"
        theme="dark"
      />
      <CareersSection />
    </>
  );
};
