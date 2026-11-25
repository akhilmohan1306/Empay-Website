import React from "react";
import { Link } from "react-router-dom";
import { SplitText } from "../SplitText";

interface ClientsSectionProps {
  onNavigate?: (href: string) => void;
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ onNavigate }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <section className="proof-section" id="portfolio" data-theme-trigger="dark">
      <div className="container proof-section__inner">
        <div className="proof-center" id="proof-center">
          <span className="pill-eyebrow">OUR PRESTIGIOUS CLIENTS</span>
          <h2
            className="editorial-h2"
            data-split="lines"
            aria-label="Helping our clients become and stay industry pioneers."
          >
            <SplitText
              mode="lines"
              text="Helping our clients become and stay"
              accentText="industry pioneers."
            />
          </h2>
          <p className="clients-lead">
            Empay powers high-throughput transaction switching, card issuance, and multi-scheme reconciliation infrastructure for leading banks, payment networks, and fintech enterprises worldwide.
          </p>
          <div className="clients-cta">
            <Link
              to="/contact"
              className="pill-btn pill-btn--orange scribble-host"
              data-magnetic
              data-cursor="CONNECT"
              onClick={(e) => handleClick(e, "/contact")}
            >
              <span className="scribble-bg" aria-hidden="true">
                <svg viewBox="0 0 150 44" preserveAspectRatio="none">
                  <path pathLength={1} d="M-4,22 C18,6 32,38 56,18 C80,-2 96,40 124,18 C136,8 144,28 154,20" />
                </svg>
              </span>
              <span className="pill-btn__content">Business Enquiries ↗</span>
            </Link>
          </div>
        </div>

        {/* Bento Client Ecosystem Grid */}
        <div className="clients-bento">
          {/* Card 1: Banking */}
          <div className="clients-card">
            <div className="clients-card__header">
              <div className="clients-card__icon clients-card__icon--orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3l9 7H3l9-7z" />
                </svg>
              </div>
              <span className="clients-card__badge">FINANCIAL INSTITUTIONS</span>
            </div>
            <h3 className="clients-card__title">Issuer &amp; Acquirer Banks</h3>
            <p className="clients-card__desc">
              Complete lifecycle issuance, ATM/POS authorization switching, and multi-institution transaction routing with ISO 8583 standards.
            </p>
            <div className="clients-card__tags">
              <span>Issuer Banks</span>
              <span>Acquirer Banks</span>
              <span>Core Banking Switch</span>
            </div>
          </div>

          {/* Card 2: Schemes */}
          <div className="clients-card">
            <div className="clients-card__header">
              <div className="clients-card__icon clients-card__icon--blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <span className="clients-card__badge">PAYMENT NETWORKS</span>
            </div>
            <h3 className="clients-card__title">Card Networks &amp; Schemes</h3>
            <p className="clients-card__desc">
              Certified direct interfaces, automated interchange calculation, clearing file processing, and multi-scheme dispute resolution.
            </p>
            <div className="clients-card__tags">
              <span>RuPay</span>
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Amex</span>
            </div>
          </div>

          {/* Card 3: Acquiring & Gateways */}
          <div className="clients-card">
            <div className="clients-card__header">
              <div className="clients-card__icon clients-card__icon--cyan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="16" y1="14" x2="16" y2="18" />
                  <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
                </svg>
              </div>
              <span className="clients-card__badge">ACQUIRING CHANNELS</span>
            </div>
            <h3 className="clients-card__title">POS &amp; Payment Gateways</h3>
            <p className="clients-card__desc">
              High-throughput terminal fleet management, Internet Payment Gateways (IPG), merchant onboarding, and automated MDR billing.
            </p>
            <div className="clients-card__tags">
              <span>POS Terminals</span>
              <span>IPG Gateways</span>
              <span>Service Providers</span>
            </div>
          </div>

          {/* Card 4: Trust & Heritage */}
          <div className="clients-card">
            <div className="clients-card__header">
              <div className="clients-card__icon clients-card__icon--emerald">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <span className="clients-card__badge">CERTIFIED INTEGRITY</span>
            </div>
            <h3 className="clients-card__title">PA-DSS &amp; Proven Heritage</h3>
            <p className="clients-card__desc">
              Globally certified bank-grade data security compliance with an unbroken 16+ year operational track record across financial markets.
            </p>
            <div className="clients-card__tags">
              <span>PA-DSS Level 1</span>
              <span>Est. 2008</span>
              <span>99.999% SLA</span>
            </div>
          </div>
        </div>

        {/* Marquee Ticker Trust Bar */}
        <div className="clients-marquee" aria-hidden="true">
          <div className="clients-marquee__track">
            <span>ISSUER BANKS</span>
            <span className="clients-marquee__dot">✦</span>
            <span>RUPAY</span>
            <span className="clients-marquee__dot">✦</span>
            <span>VISA</span>
            <span className="clients-marquee__dot">✦</span>
            <span>MASTERCARD</span>
            <span className="clients-marquee__dot">✦</span>
            <span>AMERICAN EXPRESS</span>
            <span className="clients-marquee__dot">✦</span>
            <span>ACQUIRER BANKS</span>
            <span className="clients-marquee__dot">✦</span>
            <span>PA-DSS CERTIFIED</span>
            <span className="clients-marquee__dot">✦</span>
            <span>PAYMENT SERVICE PROVIDERS</span>
            <span className="clients-marquee__dot">✦</span>
            <span>POS &amp; IPG</span>
            <span className="clients-marquee__dot">✦</span>
            <span>EST. 2008</span>
            <span className="clients-marquee__dot">✦</span>
            {/* Repeat for seamless loop */}
            <span>ISSUER BANKS</span>
            <span className="clients-marquee__dot">✦</span>
            <span>RUPAY</span>
            <span className="clients-marquee__dot">✦</span>
            <span>VISA</span>
            <span className="clients-marquee__dot">✦</span>
            <span>MASTERCARD</span>
            <span className="clients-marquee__dot">✦</span>
            <span>AMERICAN EXPRESS</span>
            <span className="clients-marquee__dot">✦</span>
            <span>ACQUIRER BANKS</span>
            <span className="clients-marquee__dot">✦</span>
            <span>PA-DSS CERTIFIED</span>
            <span className="clients-marquee__dot">✦</span>
            <span>PAYMENT SERVICE PROVIDERS</span>
            <span className="clients-marquee__dot">✦</span>
            <span>POS &amp; IPG</span>
            <span className="clients-marquee__dot">✦</span>
            <span>EST. 2008</span>
            <span className="clients-marquee__dot">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};
