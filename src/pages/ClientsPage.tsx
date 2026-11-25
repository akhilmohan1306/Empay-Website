import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CLIENT_LOGOS, PARTNER_LOGOS } from "../data/empayData";

export const ClientsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Clients & Partners | Empay Software";
  }, []);

  const clientSegments = [
    {
      segment: "Commercial & Private Banks",
      desc: "Providing high-throughput transaction routing switches, multi-entity acquiring platforms, and automated scheme net clearing engines.",
      icon: "🏛️",
    },
    {
      segment: "Retail & Regional Banks",
      desc: "Delivering automated ATM journal reconciliation, debit card lifecycle management, and zero-discrepancy core ledger posting.",
      icon: "💳",
    },
    {
      segment: "Switch Networks & Processors",
      desc: "Powering third-party processors (TPPs) and national EFT switches with high-availability ISO 8583 message conversion and settlement.",
      icon: "🔀",
    },
    {
      segment: "Payment Aggregators & Acquirers",
      desc: "Managing thousands of onboarded merchants, point-of-sale terminal estates, dynamic MDR billing splits, and merchant statements.",
      icon: "🏪",
    },
  ];

  return (
    <div className="dedicated-page clients-page">
      {/* Hero Section */}
      <section className="page-hero" data-theme-trigger="light">
        <div className="container">
          <div className="page-hero__badge">
            <span className="live-dot-pulse" aria-hidden="true" />
            <span>ECOSYSTEM &amp; CLIENTELE</span>
            <span className="chip-sep">/</span>
            <span>PROVEN AT SCALE</span>
          </div>

          <h1 className="page-hero__title">
            Helping our clients <br />
            become and stay <span className="text-accent">industry pioneers</span>.
          </h1>

          <p className="page-hero__lead">
            Empay provides mission-critical payment infrastructure to leading commercial banks, card issuers, 
            merchant acquiring institutions, and national payment switch operators.
          </p>

          <div className="page-hero__stats">
            <div className="stat-card">
              <span className="stat-card__num">10M+</span>
              <span className="stat-card__label">Daily Records Balanced</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">4+</span>
              <span className="stat-card__label">Card Schemes Certified</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">0</span>
              <span className="stat-card__label">Discrepancy Tolerance</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">16+</span>
              <span className="stat-card__label">Years Proven Trust</span>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="page-section" data-theme-trigger="light">
        <div className="container">
          <div className="section-head text-center">
            <span className="pill-eyebrow">OUR ESTEEMED CLIENTS</span>
            <h2>Trusted by financial institutions across verticals.</h2>
            <p className="section-sub">From retail banking institutions to nationwide payment aggregators.</p>
          </div>

          <div className="clients-logo-grid">
            {CLIENT_LOGOS.map((client) => (
              <div key={client.id} className="client-brand-card">
                <div className="brand-logo-visual">
                  <span className="dummy-logo-mark">{client.name}</span>
                </div>
                <div className="brand-info">
                  <span className="brand-category">{client.category}</span>
                  <h4>{client.subtitle}</h4>
                  <span className="brand-badge">{client.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segments We Serve */}
      <section className="page-section bg-alt" data-theme-trigger="light">
        <div className="container">
          <div className="section-head text-center">
            <span className="pill-eyebrow">INDUSTRY SEGMENTS</span>
            <h2>Specialized solutions for every banking segment.</h2>
          </div>

          <div className="segments-grid">
            {clientSegments.map((seg, idx) => (
              <div key={idx} className="segment-card">
                <div className="segment-icon">{seg.icon}</div>
                <h3>{seg.segment}</h3>
                <p>{seg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certified Partners & Schemes */}
      <section className="page-section bg-dark-theme" data-theme-trigger="dark">
        <div className="container">
          <div className="section-head text-center">
            <span className="pill-eyebrow pill-eyebrow--orange">CERTIFIED NETWORKS</span>
            <h2 className="text-light">Certified payment networks and security standards.</h2>
            <p className="section-sub text-muted">
              Built in rigorous accordance with international payment scheme specifications and data security mandates.
            </p>
          </div>

          <div className="partners-logo-grid">
            {PARTNER_LOGOS.map((partner) => (
              <div key={partner.id} className="partner-brand-card">
                <div className="partner-logo-mark">
                  <span>{partner.name}</span>
                </div>
                <div className="partner-info">
                  <span className="partner-category">{partner.category}</span>
                  <h4>{partner.subtitle}</h4>
                  <span className="partner-badge">{partner.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="page-cta-strip">
        <div className="container">
          <div className="cta-box">
            <div>
              <h2>Partner with Empay for your institution's payments.</h2>
              <p>Schedule a confidential architectural discussion with our enterprise payments team.</p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="pill-btn pill-btn--orange">
                <span>Start Business Enquiry ↗</span>
              </Link>
              <Link to="/products" className="ghost-pill-btn">
                <span>View Products →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
