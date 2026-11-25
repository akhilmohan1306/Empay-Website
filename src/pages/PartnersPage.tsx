import React from "react";
import { PageHero } from "../components/sections/PageHero";
import { PartnersSection } from "../components/sections/PartnersSection";

export const PartnersPage: React.FC = () => {
  return (
    <>
      <PageHero
        eyebrow="GLOBAL SCHEME INTEGRATIONS & ALLIANCES"
        badge="INTEROPERABLE"
        titleRow1="CERTIFIED SCHEME"
        titleAccent="PARTNERSHIPS &"
        titleRow2="NETWORKS."
        pitch="Deeply certified across global payment networks and national rails including Visa, Mastercard, RuPay, and American Express with bank-grade PA-DSS Level 1 compliance."
        ctaText="Inquire About Alliances ↗"
        ctaHref="/contact"
        secondaryText="Explore Core Platforms →"
        secondaryHref="/products"
        theme="dark"
      />
      <PartnersSection />
    </>
  );
};
