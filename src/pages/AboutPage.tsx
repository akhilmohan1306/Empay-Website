import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CORE_PILLARS } from "../data/empayData";

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us | Empay Software Solutions";
  }, []);

  const milestones = [
    {
      year: "2008",
      title: "Company Founded",
      desc: "Established in Kochi, Kerala, with a core mission to engineer robust, high-availability electronic payment and transaction switching applications for financial institutions.",
    },
    {
      year: "2012",
      title: "Enterprise Switch Deployments",
      desc: "Delivered large-scale transaction switching and multi-rail authorization engines for regional commercial banks and payment processors.",
    },
    {
      year: "2016",
      title: "PA-DSS Security Certification",
      desc: "Achieved Payment Application Data Security Standard (PA-DSS) certification, validating our enterprise-grade security, data protection, and cryptographic controls.",
    },
    {
      year: "2019",
      title: "MARS Flagship Rollout",
      desc: "Launched MARS (Merchant Acquiring & Reconciliation System) delivering end-to-end merchant onboarding, POS/IPG terminal billing, and scheme settlement automation.",
    },
    {
      year: "2022",
      title: "Next-Gen ReconPlus Engine",
      desc: "Architected ReconPlus with modular multi-source reconciliation, automated GL entry generation, and intelligent dispute management across ATM and card channels.",
    },
    {
      year: "Today",
      title: "Pan-Network Multi-Rail Leadership",
      desc: "Processing and reconciling millions of transactions daily across RuPay, Visa, Mastercard, and Amex from our state-of-the-art facility at SmartCity Kochi SEZ.",
    },
  ];

  const values = [
    {
      icon: "⚡",
      title: "Mission-Critical SLA",
      desc: "We engineer systems with 99.998% availability guarantees, ensuring banking operations run without disruption 24 hours a day, 365 days a year.",
    },
    {
      icon: "🛡️",
      title: "PA-DSS Certified Security",
      desc: "Every line of code complies with rigorous international payment security standards to protect cardholder data and maintain full audit compliance.",
    },
    {
      icon: "🎯",
      title: "Zero-Discrepancy Accuracy",
      desc: "Our automated reconciliation algorithms verify every ledger entry, fee split, and settlement file to eliminate financial leakage completely.",
    },
    {
      icon: "🔄",
      title: "Agile & Future-Ready",
      desc: "Modular microservices architecture designed to scale seamlessly with new payment schemes, digital wallets, QR rails, and central bank directives.",
    },
  ];

  return (
    <div className="dedicated-page about-page">
      {/* Hero Section */}
      <section className="page-hero" data-theme-trigger="light">
        <div className="container">
          <div className="page-hero__badge">
            <span className="live-dot-pulse" aria-hidden="true" />
            <span>ABOUT EMPAY SOFTWARE SOLUTIONS</span>
            <span className="chip-sep">/</span>
            <span>EST. 2008</span>
          </div>

          <h1 className="page-hero__title">
            Engineering next-generation <br />
            <span className="text-accent">FinTech infrastructure</span> for world-class financial institutions.
          </h1>

          <p className="page-hero__lead">
            Headquartered at Lulu IT Twin Tower, SmartCity Kochi, Empay Software Solutions is a specialized 
            financial technology leader. For over 16 years, we have empowered banks, payment service providers, 
            and merchant acquirers with mission-critical transaction switching, scheme clearing, and automated reconciliation.
          </p>

          <div className="page-hero__stats">
            <div className="stat-card">
              <span className="stat-card__num">2008</span>
              <span className="stat-card__label">Year Founded</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">PA-DSS</span>
              <span className="stat-card__label">Security Certified</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">99.998%</span>
              <span className="stat-card__label">Platform SLA</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">Millions</span>
              <span className="stat-card__label">Daily Transactions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="page-section bg-alt" data-theme-trigger="light">
        <div className="container">
          <div className="about-grid-2">
            <div className="content-card">
              <span className="pill-eyebrow">OUR MISSION</span>
              <h2>Delivering zero-discrepancy payment infrastructure.</h2>
              <p>
                Our mission is to eliminate transaction friction, settlement delays, and manual reconciliation overhead for the global financial ecosystem. We build resilient, high-throughput software systems that allow financial institutions to scale their acquiring and processing volumes with total operational confidence.
              </p>
            </div>
            <div className="content-card">
              <span className="pill-eyebrow">OUR VISION</span>
              <h2>The backbone of modern transactional trust.</h2>
              <p>
                We envision a unified financial network where multi-scheme card transactions, instant digital payments, and ledger settlements synchronize in real time without human intervention, fortified by bank-grade security and automated compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="page-section" data-theme-trigger="light">
        <div className="container">
          <div className="section-head text-center">
            <span className="pill-eyebrow">OUR JOURNEY</span>
            <h2>Sixteen years of FinTech excellence.</h2>
            <p className="section-sub">A continuous track record of innovation and rock-solid platform delivery.</p>
          </div>

          <div className="timeline-grid">
            {milestones.map((m, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-content">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Engineering Pillars */}
      <section className="page-section bg-dark-theme" data-theme-trigger="dark">
        <div className="container">
          <div className="section-head text-center">
            <span className="pill-eyebrow pill-eyebrow--orange">CORE PILLARS</span>
            <h2>Architected for mission-critical reliability.</h2>
            <p className="section-sub">Payment systems require unmatched precision, fault tolerance, and security.</p>
          </div>

          <div className="pillars-grid">
            {CORE_PILLARS.map((p, idx) => (
              <div key={idx} className="pillar-card">
                <span className="pillar-card__num">0{idx + 1}</span>
                <h3>{p.title}</h3>
                <h4>{p.subtitle}</h4>
                <p>{p.body}</p>
              </div>
            ))}
          </div>

          <div className="values-grid">
            {values.map((v, idx) => (
              <div key={idx} className="value-card">
                <div className="value-card__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="page-cta-strip">
        <div className="container">
          <div className="cta-box">
            <div>
              <h2>Ready to modernize your payment infrastructure?</h2>
              <p>Connect with our senior payment system architects for an in-depth platform consultation.</p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="pill-btn pill-btn--orange">
                <span>Request Live Demo ↗</span>
              </Link>
              <Link to="/products" className="ghost-pill-btn">
                <span>Explore Products →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
