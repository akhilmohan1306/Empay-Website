import React from "react";
import { InteractiveDotGrid } from "./InteractiveDotGrid";
import { SplitText } from "./SplitText";

interface SubpageHeroProps {
  theme?: "light" | "dark";
  eyebrow: string;
  badge: string;
  word1: string;
  word2: string;
  accentWord: string;
  word4: string;
  pitch: string;
  primaryLabel: string;
  primaryTarget: string;
  secondaryLabel: string;
  secondaryTarget: string;
  onNavigate: (target: string) => void;
}

export const SubpageHero: React.FC<SubpageHeroProps> = ({
  theme = "dark",
  eyebrow,
  badge,
  word1,
  word2,
  accentWord,
  word4,
  pitch,
  primaryLabel,
  primaryTarget,
  secondaryLabel,
  secondaryTarget,
  onNavigate,
}) => {
  return (
    <section className="hero" data-theme-trigger={theme}>
      <InteractiveDotGrid
        theme={theme}
        spacing={22}
        radius={116}
        maxPush={36}
        baseDotRadius={1.25}
        maxDotRadius={2.2}
        intensity={theme === "light" ? 1 : 0.85}
      />

      <div className="hero__rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="container hero__container">
        <div className="hero__centerpiece">
          <div className="hero__eyebrow-chip">
            <span className="live-dot-pulse" aria-hidden="true" />
            <span className="mono-label">{eyebrow}</span>
            <span className="chip-sep">/</span>
            <span className="chip-code">{badge}</span>
          </div>

          <h1
            className="hero__cinematic-title"
            aria-label={`${word1} ${word2} ${accentWord} ${word4}`}
          >
            <span className="title-row">
              <span className="title-word">{word1}</span>
              <span className="title-word title-word--ghost">{word2}</span>
            </span>
            <span className="title-row title-row--shift">
              <span className="title-word title-word--accent">{accentWord}</span>
              <span className="title-word">{word4}</span>
            </span>
          </h1>

          <div className="hero__editorial-sub">
            <p className="hero__pitch">{pitch}</p>

            <div className="hero__cta-cluster">
              <a
                href={primaryTarget}
                className="pill-btn pill-btn--orange scribble-host"
                data-magnetic
                data-cursor="EXPLORE"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(primaryTarget);
                }}
              >
                <span className="scribble-bg" aria-hidden="true">
                  <svg viewBox="0 0 170 44" preserveAspectRatio="none">
                    <path
                      pathLength={1}
                      d="M-4,22 C18,6 32,38 56,18 C80,-2 96,40 124,18 C142,6 156,28 174,20"
                    />
                  </svg>
                </span>
                <span className="pill-btn__content">{primaryLabel}</span>
              </a>

              <a
                href={secondaryTarget}
                className="ghost-pill-btn"
                data-magnetic
                data-cursor="VIEW"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(secondaryTarget);
                }}
              >
                <span>{secondaryLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutHeritageExtra: React.FC = () => (
  <section className="proof-section" data-theme-trigger="dark">
    <div className="container proof-section__inner">
      <div className="proof-center">
        <span className="pill-eyebrow">HERITAGE &amp; ENGINEERING DNA</span>
        <h2 className="editorial-h2" data-split="lines">
          <SplitText
            mode="lines"
            text="Sixteen years of engineering mission-critical"
            accentText="payment infrastructure."
          />
        </h2>
        <p className="clients-lead">
          From our R&amp;D center at Lulu IT Twin Tower in SmartCity (Kochi) SEZ, our domain veterans architect, certify, and support electronic and mobile payment platforms trusted by banks and financial processors.
        </p>
      </div>

      <div className="clients-bento">
        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <div className="clients-card__icon clients-card__icon--orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
              </svg>
            </div>
            <span className="clients-card__badge">ESTABLISHED 2008</span>
          </div>
          <h3 className="clients-card__title">Founded by Domain Veterans</h3>
          <p className="clients-card__desc">
            Over 16 years of specialized focus in card issuing, merchant acquiring, transaction switching, and multi-entity reconciliation.
          </p>
          <div className="clients-card__tags">
            <span>Est. 2008</span>
            <span>FinTech Specialists</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <div className="clients-card__icon clients-card__icon--blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <span className="clients-card__badge">SECURITY &amp; COMPLIANCE</span>
          </div>
          <h3 className="clients-card__title">PA-DSS Certified Suite</h3>
          <p className="clients-card__desc">
            Both MARS and ReconPlus are PA-DSS Certified applications engineered for strict cardholder data protection and audit readiness.
          </p>
          <div className="clients-card__tags">
            <span>PA-DSS</span>
            <span>Audit Ready</span>
            <span>GL Compliant</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <div className="clients-card__icon clients-card__icon--cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <span className="clients-card__badge">ENGINEERING HUB</span>
          </div>
          <h3 className="clients-card__title">SmartCity (Kochi) SEZ</h3>
          <p className="clients-card__desc">
            Headquartered at Lulu IT Twin Tower, SmartCity SEZ, housing product engineering, business analysis, QA, and 24/7 enterprise support.
          </p>
          <div className="clients-card__tags">
            <span>Kakkanad, Kochi</span>
            <span>Dedicated R&amp;D</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <div className="clients-card__icon clients-card__icon--emerald">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <span className="clients-card__badge">LOW-COST SCALE</span>
          </div>
          <h3 className="clients-card__title">Streamlined &amp; Flexible</h3>
          <p className="clients-card__desc">
            Designed to lower total cost of ownership while adapting rapidly to new payment schemes, fee structures, and regulatory mandates.
          </p>
          <div className="clients-card__tags">
            <span>Modular Core</span>
            <span>99.998% SLA</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const ServicesMethodologyExtra: React.FC = () => (
  <section className="proof-section" data-theme-trigger="dark">
    <div className="container proof-section__inner">
      <div className="proof-center">
        <span className="pill-eyebrow">DELIVERY METHODOLOGY</span>
        <h2 className="editorial-h2" data-split="lines">
          <SplitText
            mode="lines"
            text="Structured execution from discovery to"
            accentText="production go-live."
          />
        </h2>
        <p className="clients-lead">
          Every engagement combines deep payment domain analysis, modular software configuration, scheme certification testing, and resilient post-launch operations.
        </p>
      </div>

      <div className="clients-bento">
        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">PHASE 01</span>
          </div>
          <h3 className="clients-card__title">Discovery &amp; Business Analysis</h3>
          <p className="clients-card__desc">
            Map existing switch logs, merchant billing formulas, interchange rules, and General Ledger posting requirements across your banking entities.
          </p>
          <div className="clients-card__tags">
            <span>Gap Analysis</span>
            <span>Scheme Specs</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">PHASE 02</span>
          </div>
          <h3 className="clients-card__title">Architecture &amp; Configuration</h3>
          <p className="clients-card__desc">
            Tailor MARS acquiring workflows and ReconPlus matching rules for stand-alone bank deployments or multi-bank service provider hubs.
          </p>
          <div className="clients-card__tags">
            <span>Custom Workflows</span>
            <span>Multi-Entity</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">PHASE 03</span>
          </div>
          <h3 className="clients-card__title">Certification &amp; UAT Testing</h3>
          <p className="clients-card__desc">
            Validate clearing file generation and settlement reconciliation against Visa, MasterCard, RuPay, and American Express compliance test suites.
          </p>
          <div className="clients-card__tags">
            <span>Visa / MC</span>
            <span>RuPay / Amex</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">PHASE 04</span>
          </div>
          <h3 className="clients-card__title">Cutover &amp; Managed Support</h3>
          <p className="clients-card__desc">
            Zero-disruption production rollout backed by continuous application performance optimization, monitoring, and regulatory updates.
          </p>
          <div className="clients-card__tags">
            <span>24/7 Support</span>
            <span>Performance Tuning</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const ProductsComparisonExtra: React.FC = () => (
  <section className="proof-section" data-theme-trigger="dark">
    <div className="container proof-section__inner">
      <div className="proof-center">
        <span className="pill-eyebrow">DEPLOYMENT TOPOLOGIES</span>
        <h2 className="editorial-h2" data-split="lines">
          <SplitText
            mode="lines"
            text="Engineered for banks, acquirers, and"
            accentText="service providers."
          />
        </h2>
        <p className="clients-lead">
          Deploy MARS and ReconPlus independently or as an integrated acquiring-to-reconciliation backbone with full PA-DSS compliance.
        </p>
      </div>

      <div className="clients-bento">
        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">MARS · ACQUIRING</span>
          </div>
          <h3 className="clients-card__title">Merchant Onboarding &amp; Billing</h3>
          <p className="clients-card__desc">
            Complete merchant hierarchy setup, POS/IPG terminal mapping, dynamic MDR calculation, rentals, fees, and automated merchant statements.
          </p>
          <div className="clients-card__tags">
            <span>POS &amp; IPG</span>
            <span>MDR &amp; Fees</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">MARS · CLEARING</span>
          </div>
          <h3 className="clients-card__title">Scheme Clearing &amp; GL</h3>
          <p className="clients-card__desc">
            Automated outgoing clearing file generation to Visa, MasterCard, RuPay &amp; Amex, incoming settlement reconciliation, and GL entry posting.
          </p>
          <div className="clients-card__tags">
            <span>4 Card Rails</span>
            <span>Auto GL</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">RECONPLUS · ENGINE</span>
          </div>
          <h3 className="clients-card__title">Multi-Source Matching</h3>
          <p className="clients-card__desc">
            Highly configurable rule engine reconciling electronic card transactions across ATM switches, POS logs, core banking, and network files.
          </p>
          <div className="clients-card__tags">
            <span>Configurable Rules</span>
            <span>Exception Tracking</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">RECONPLUS · MODULARITY</span>
          </div>
          <h3 className="clients-card__title">Multi-Bank or Stand-Alone</h3>
          <p className="clients-card__desc">
            Run as a multi-tenant reconciliation hub for Payment Service Providers or as a dedicated stand-alone system for Issuer and Acquirer Banks.
          </p>
          <div className="clients-card__tags">
            <span>Service Provider</span>
            <span>Issuer &amp; Acquirer</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const PartnersStandardsExtra: React.FC = () => (
  <section className="proof-section" data-theme-trigger="dark">
    <div className="container proof-section__inner">
      <div className="proof-center">
        <span className="pill-eyebrow">SCHEME INTEGRATIONS &amp; STANDARDS</span>
        <h2 className="editorial-h2" data-split="lines">
          <SplitText
            mode="lines"
            text="Certified rails across global and domestic"
            accentText="payment networks."
          />
        </h2>
        <p className="clients-lead">
          Direct support for association clearing, settlement, and dispute protocols across major card schemes and national payment infrastructure.
        </p>
      </div>

      <div className="clients-bento">
        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">DOMESTIC NETWORK</span>
          </div>
          <h3 className="clients-card__title">RuPay &amp; National Rails</h3>
          <p className="clients-card__desc">
            Full clearing file generation, settlement reconciliation, and dispute lifecycle handling aligned with domestic network specifications.
          </p>
          <div className="clients-card__tags">
            <span>RuPay</span>
            <span>ATM &amp; POS</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">GLOBAL SCHEMES</span>
          </div>
          <h3 className="clients-card__title">Visa &amp; MasterCard</h3>
          <p className="clients-card__desc">
            Automated BASE II / IPM clearing file processing, interchange verification, chargeback workflows, and multi-currency settlement matching.
          </p>
          <div className="clients-card__tags">
            <span>Visa</span>
            <span>MasterCard</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">PREMIUM NETWORK</span>
          </div>
          <h3 className="clients-card__title">American Express</h3>
          <p className="clients-card__desc">
            Integrated Amex acquiring clearing, merchant fee billing, settlement verification, and automated statement generation inside MARS.
          </p>
          <div className="clients-card__tags">
            <span>Amex</span>
            <span>Direct Clearing</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">SECURITY STANDARD</span>
          </div>
          <h3 className="clients-card__title">PA-DSS Compliance</h3>
          <p className="clients-card__desc">
            Independently validated payment application security controls ensuring encrypted data handling, key management, and audit logging.
          </p>
          <div className="clients-card__tags">
            <span>PA-DSS Certified</span>
            <span>Zero Compromise</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const CareersCultureExtra: React.FC = () => (
  <section className="proof-section" data-theme-trigger="dark">
    <div className="container proof-section__inner">
      <div className="proof-center">
        <span className="pill-eyebrow">LIFE AT EMPAY · SMARTCITY KOCHI</span>
        <h2 className="editorial-h2" data-split="lines">
          <SplitText
            mode="lines"
            text="Work with payment veterans on systems"
            accentText="built to last."
          />
        </h2>
        <p className="clients-lead">
          Join our engineering, QA, and business analysis teams at Lulu IT Twin Tower, SmartCity (Kochi) SEZ. Work From Office (Mandatory) fosters direct mentorship and rapid technical growth.
        </p>
      </div>

      <div className="clients-bento">
        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">01 · CULTURE</span>
          </div>
          <h3 className="clients-card__title">Direct Domain Mentorship</h3>
          <p className="clients-card__desc">
            Collaborate face-to-face with architects who have built acquiring and reconciliation engines for major banks since 2008.
          </p>
          <div className="clients-card__tags">
            <span>SmartCity SEZ</span>
            <span>Mentorship</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">02 · IMPACT</span>
          </div>
          <h3 className="clients-card__title">Mission-Critical FinTech</h3>
          <p className="clients-card__desc">
            Your code powers real-world POS, IPG, ATM, and card settlement operations where precision, speed, and security matter every second.
          </p>
          <div className="clients-card__tags">
            <span>MARS</span>
            <span>ReconPlus</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">03 · HIRING PROCESS</span>
          </div>
          <h3 className="clients-card__title">Fast, Transparent Evaluation</h3>
          <p className="clients-card__desc">
            Send your resume to hr@empaysoft.com, followed by a technical/domain discussion and team fit conversation at our Kochi campus.
          </p>
          <div className="clients-card__tags">
            <span>hr@empaysoft.com</span>
            <span>Direct Review</span>
          </div>
        </div>

        <div className="clients-card" data-reveal-group>
          <div className="clients-card__header">
            <span className="clients-card__badge">04 · WORKPLACE</span>
          </div>
          <h3 className="clients-card__title">Lulu IT Twin Tower</h3>
          <p className="clients-card__desc">
            Modern SEZ campus in Kakkanad, Kochi with seamless connectivity, collaborative engineering pods, and a focused on-site culture.
          </p>
          <div className="clients-card__tags">
            <span>Kakkanad, Kochi</span>
            <span>On-Site Team</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

