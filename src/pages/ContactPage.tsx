import { PageHero } from "../components/sections/PageHero";
import { ContactSection } from "../components/sections/ContactSection";

export const ContactPage: React.FC = () => {
  return (
    <>
      <PageHero
        eyebrow="CONNECT WITH EMPAY // SMARTCITY KOCHI"
        badge="RESPONSIVE SUPPORT"
        titleRow1="ARCHITECT YOUR"
        titleAccent="NEXT-GEN"
        titleRow2="PAYMENT FUTURE."
        pitch="Reach out to our solutions engineering and sales team for product demos, architecture assessments, or scheme certification inquiries at Lulu IT Twin Tower, SmartCity (Kochi) SEZ."
        ctaText="Send Business Enquiry ↓"
        ctaHref="#contact"
        secondaryText="Call: 0484 486 5189 ↗"
        secondaryHref="tel:04844865189"
        theme="dark"
      />
      <ContactSection />
    </>
  );
};
