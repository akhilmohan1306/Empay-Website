import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { WHAT_WE_OFFER, CORE_PILLARS } from "../data/empayData";

export const ServicesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Services & Solutions | Empay Software";
  }, []);

  const serviceIcons: Record<string, string> = {
    "Acquiring Solutions": "💳",
    "ATM Reconciliation": "🏧",
    "Card Management Systems": "🗂️",
    "Chargeback Management": "⚖️",
    "Clearing and Settlement Solutions": "🌐",
    "Debit Card Reconciliation": "📊",
    "Merchant Management Systems": "🏪",
    "Transaction Processing Systems": "⚡",
    "Pre-paid Card Management": "🎫",
    "Switching Applications": "🔀",
  };

  const consultingPoints = [
    {
      title: "Payment Architecture Assessment",
      desc: "Comprehensive evaluation of existing EFT switches, transaction routing tables, latency bottlenecks, and high-availability failover topology.",
    },
    {
      title: "Scheme Compliance & PA-DSS Readiness",
      desc: "Guiding banks and processors through PCI-DSS and PA-DSS compliance, scheme mandate readiness (Visa, Mastercard, RuPay, Amex), and cryptographic key management.",
    },
    {
      title: "Migration & Modernization Strategies",
      desc: "De-risking legacy core banking migrations, ISO 8583 to ISO 20022 message transformation, and transitioning monolithic transaction switches to microservices.",
    },
    {
      title: "High-Throughput Optimization",
      desc: "Database query tuning, distributed caching, memory footprint reduction, and throughput benchmarking to withstand peak festive transaction spikes.",
    },
  ];

  return (
    <div className="dedicated-page services-page">
      {/* Hero Section */}
      <section className="page-hero" data-theme-trigger="light">
        <div className="container">
          <div className="page-hero__badge">
            <span className="live-dot-pulse" aria-hidden="true" />
            <span>PAYMENT SYSTEM SPECIALISTS</span>
            <span className="chip-sep">/</span>
            <span>END-TO-END CAPABILITIES</span>
          </div>

          <h1 className="page-hero__title">
            Comprehensive <span className="text-accent">FinTech services</span> <br />
            engineered for scale, security, and precision.
          </h1>

          <p className="page-hero__lead">
            With over 16 years of hands-on expertise in electronic funds transfer (EFT), transaction switching, 
            and banking reconciliation, Empay delivers specialized professional services across the entire payment lifecycle.
          </p>

          <div className="page-hero__stats">
            <div className="stat-card">
              <span className="stat-card__num">10+</span>
              <span className="stat-card__label">Specialized Services</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">24/7</span>
              <span className="stat-card__label">Mission-Critical Support</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">100%</span>
              <span className="stat-card__label">Scheme Compliance</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">99.998%</span>
              <span className="stat-card__label">Guaranteed Availability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Overview */}
      <section className="page-section bg-alt" data-theme-trigger="light">
        <div className="container">
          <div className="section-head text-center">
            <span className="pill-eyebrow">WHAT SETS US APART</span>
            <h2>Deep domain specialization in banking payments.</h2>
            <p className="section-sub">We combine technical architecture with deep regulatory and scheme knowledge.</p>
          </div>

          <div className="pillars-grid">
            {CORE_PILLARS.map((pillar, idx) => (
              <div key={idx} className="pillar-card">
                <span className="pillar-card__num">0{idx + 1}</span>
                <h3>{pillar.title}</h3>
                <h4>{pillar.subtitle}</h4>
                <p>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Core Services Grid */}
      <section className="page-section" data-theme-trigger="light">
        <div className="container">
          <div className="section-head text-center">
            <span className="pill-eyebrow">OUR SPECIALIZED CAPABILITIES</span>
            <h2>Ten core FinTech engineering domains.</h2>
            <p className="section-sub">Modular, bank-grade solutions tailored to your operational requirements.</p>
          </div>

          <div className="services-grid-10">
            {WHAT_WE_OFFER.map((svc, idx) => (
              <div key={idx} className="service-card">
                <div className="service-card__top">
                  <span className="service-card__icon">{serviceIcons[svc.name] || "⚡"}</span>
                  <span className="service-card__num">0{idx + 1}</span>
                </div>
                <h3>{svc.name}</h3>
                <p>{svc.desc}</p>
                <div className="service-card__meta">
                  <span>ENTERPRISE GRADE</span>
                  <span className="meta-arrow">↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting & Advisory */}
      <section className="page-section bg-dark-theme" data-theme-trigger="dark">
        <div className="container">
          <div className="section-head text-center">
            <span className="pill-eyebrow pill-eyebrow--orange">ARCHITECTURE &amp; ADVISORY</span>
            <h2 className="text-light">Payment system consulting &amp; enhancement.</h2>
            <p className="section-sub text-muted">
              Leverage our decades of domain knowledge to de-risk your payments roadmap and upgrade transaction infrastructure.
            </p>
          </div>

          <div className="consulting-grid">
            {consultingPoints.map((point, idx) => (
              <div key={idx} className="consulting-card">
                <span className="consulting-num">0{idx + 1}</span>
                <h3>{point.title}</h3>
                <p>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Process Strip */}
      <section className="page-section" data-theme-trigger="light">
        <div className="container">
          <div className="section-head text-center">
            <span className="pill-eyebrow">OUR DELIVERY MODEL</span>
            <h2>Proven engagement methodology.</h2>
            <p className="section-sub">A disciplined software engineering lifecycle tailored for regulated banking environments.</p>
          </div>

          <div className="process-steps-row">
            <div className="process-step">
              <span className="process-step__idx">1</span>
              <h4>Requirements &amp; Gap Analysis</h4>
              <p>In-depth study of switch protocols, transaction flows, and scheme settlement specs.</p>
            </div>
            <div className="process-step">
              <span className="process-step__idx">2</span>
              <h4>Architecture Blueprint</h4>
              <p>Design of high-availability failover topology, database schema, and security boundaries.</p>
            </div>
            <div className="process-step">
              <span className="process-step__idx">3</span>
              <h4>Iterative Engineering</h4>
              <p>Spring Boot / Java microservices, ISO 8583 parsers, and automated test fixtures.</p>
            </div>
            <div className="process-step">
              <span className="process-step__idx">4</span>
              <h4>Scheme Certification &amp; UAT</h4>
              <p>Rigorous multi-rail test scripts with Visa, Mastercard, RuPay, and bank core systems.</p>
            </div>
            <div className="process-step">
              <span className="process-step__idx">5</span>
              <h4>24/7 SLA Operations</h4>
              <p>Production cutover, live monitoring, performance telemetry, and round-the-clock support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="page-cta-strip">
        <div className="container">
          <div className="cta-box">
            <div>
              <h2>Discuss your custom payment engineering requirements.</h2>
              <p>Our solutions team is available for architectural consultations, RFPs, and pilot proofs-of-concept.</p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="pill-btn pill-btn--orange">
                <span>Contact Solutions Team ↗</span>
              </Link>
              <Link to="/products" className="ghost-pill-btn">
                <span>Explore Flagship Products →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
