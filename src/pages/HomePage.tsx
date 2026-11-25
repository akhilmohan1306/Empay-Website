import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InteractiveDotGrid } from "../components/InteractiveDotGrid";
import { SplitText } from "../components/SplitText";
import {
  ARCH_NODES,
  CAREER_ROLES,
  CLIENT_LOGOS,
  CORE_PILLARS,
  PARTNER_LOGOS,
  WHAT_WE_OFFER,
} from "../data/empayData";

const ABOUT_STATEMENT =
  "Empay Software Solutions specializes in providing an array of cutting edge solutions and services for the financial services industry in the electronic and mobile payment verticals. Founded in 2008 by domain veterans.";

export function renderLogoMark(name: string, _type?: "client" | "partner") {
  if (name === "Logo 1") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="20 4 36 13 36 27 20 36 4 27 4 13" />
        <circle cx="20" cy="20" r="5" fill="currentColor" fillOpacity="0.25" />
        <line x1="20" y1="4" x2="20" y2="15" />
        <line x1="20" y1="25" x2="20" y2="36" />
      </svg>
    );
  }
  if (name === "Logo 2") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="16" cy="20" r="11" />
        <circle cx="24" cy="20" r="11" strokeDasharray="3 3" />
        <circle cx="20" cy="20" r="4" fill="currentColor" fillOpacity="0.3" />
      </svg>
    );
  }
  if (name === "Logo 3") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="20 3 37 20 20 37 3 20" />
        <polyline points="15 20 20 15 25 20" />
        <polyline points="15 25 20 20 25 25" />
      </svg>
    );
  }
  if (name === "Logo 4") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="7" width="30" height="26" rx="6" />
        <line x1="5" y1="16" x2="35" y2="16" />
        <circle cx="12" cy="25" r="2.5" fill="currentColor" />
        <line x1="18" y1="25" x2="28" y2="25" />
      </svg>
    );
  }
  if (name === "Logo 5") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4L34 9V20C34 28 28 34 20 37C12 34 6 28 6 20V9L20 4Z" />
        <polygon points="20 12 22 17 27 17 23 20 25 25 20 22 15 25 17 20 13 17 18 17" fill="currentColor" fillOpacity="0.25" />
      </svg>
    );
  }
  if (name === "RuPay") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="10 8 26 8 20 32 4 32" fill="currentColor" fillOpacity="0.15" />
        <polygon points="22 8 36 8 30 32 16 32" stroke="var(--orange)" />
      </svg>
    );
  }
  if (name === "Visa") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 12 L14 28 L20 12 H26 L18 30 H12 L4 12 Z" fill="currentColor" fillOpacity="0.2" />
        <line x1="28" y1="12" x2="34" y2="28" />
        <line x1="26" y1="22" x2="36" y2="22" />
      </svg>
    );
  }
  if (name === "Mastercard") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="15" cy="20" r="10" fill="currentColor" fillOpacity="0.25" />
        <circle cx="25" cy="20" r="10" stroke="var(--orange)" />
        <path d="M20 12 A10 10 0 0 0 20 28 A10 10 0 0 0 20 12" fill="var(--orange)" fillOpacity="0.4" />
      </svg>
    );
  }
  if (name === "American Express") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="32" height="24" rx="4" />
        <path d="M10 24 L14 16 L18 24 M12 21 H16" />
        <path d="M22 16 V24 L26 19 L30 24 V16" />
      </svg>
    );
  }
  if (name === "PA-DSS") {
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4 L34 9 V18 C34 27 28 33 20 36 C12 33 6 27 6 18 V9 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M14 19 L18 23 L26 15" stroke="var(--orange)" strokeWidth="2.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="14" />
      <text x="20" y="24" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" fontWeight="700">
        {name.slice(0, 2).toUpperCase()}
      </text>
    </svg>
  );
}

interface HomePageProps {
  scrollToSection?: (target: string | number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ scrollToSection: _scrollToSection }) => {
  const [activeArchNode, setActiveArchNode] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const selectArchNode = (idx: number) => {
    setActiveArchNode(idx);
    const viewport = document.getElementById("arch-detail-viewport");
    if (viewport) {
      viewport.scrollTo({
        left: idx * viewport.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleCareerToggle = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenFaqIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <>
      {/* =====================================================
          S0: PRODUCT-BASED SALES HERO (Primary InteractiveDotGrid)
          ===================================================== */}
      <section className="hero" id="hero" data-theme-trigger="light">
        <InteractiveDotGrid
          theme="light"
          spacing={22}
          radius={116}
          maxPush={36}
          baseDotRadius={1.25}
          maxDotRadius={2.2}
          intensity={1}
        />

        <div className="hero__rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="container hero__container">
          {/* Cinematic Centerpiece */}
          <div className="hero__centerpiece">
            <div className="hero__eyebrow-chip">
              <span className="live-dot-pulse" aria-hidden="true" />
              <span className="mono-label">EMPAY SOFTWARE SOLUTIONS // EST. 2008</span>
              <span className="chip-sep">/</span>
              <span className="chip-code">PA-DSS CERTIFIED</span>
            </div>

            <h1
              className="hero__cinematic-title"
              aria-label="Next-Gen Payments. Intelligent Reconciliation."
            >
              <span className="title-row">
                <span className="title-word">NEXT-GEN</span>
                <span className="title-word title-word--ghost">PAYMENTS.</span>
              </span>
              <span className="title-row title-row--shift">
                <span className="title-word title-word--accent">INTELLIGENT</span>
                <span className="title-word">RECONCILIATION.</span>
              </span>
            </h1>

            <div className="hero__editorial-sub">
              <p className="hero__pitch">
                Empowering banks, acquirers, and financial processors with mission-critical transaction switching, automated scheme clearing, and zero-discrepancy reconciliation.
              </p>

              <div className="hero__cta-cluster">
                <Link
                  to="/contact"
                  className="pill-btn pill-btn--orange scribble-host"
                  data-magnetic
                  data-cursor="DEMO"
                >
                  <span className="scribble-bg" aria-hidden="true">
                    <svg viewBox="0 0 170 44" preserveAspectRatio="none">
                      <path pathLength={1} d="M-4,22 C18,6 32,38 56,18 C80,-2 96,40 124,18 C142,6 156,28 174,20" />
                    </svg>
                  </span>
                  <span className="pill-btn__content">Request Live Demo ↗</span>
                </Link>

                <Link
                  to="/products"
                  className="ghost-pill-btn"
                  data-magnetic
                  data-cursor="PRODUCTS"
                >
                  <span>Explore Products ↓</span>
                </Link>
              </div>
            </div>

            {/* Floating Twin-Product Capsule Dock */}
            <div className="hero__product-capsule-dock" role="navigation" aria-label="Flagship Products">
              <Link
                to="/products?tab=mars"
                className="hero-capsule"
                data-magnetic
                data-cursor="MARS"
              >
                <div className="hero-capsule__meta">
                  <span className="hero-capsule__num">01</span>
                  <div className="hero-capsule__info">
                    <strong>MARS</strong>
                    <small>Merchant Acquiring &amp; Billing</small>
                  </div>
                </div>
                <div className="hero-capsule__tags">
                  <span>POS &amp; IPG</span>
                  <span>Multi-Scheme</span>
                </div>
                <span className="hero-capsule__arrow" aria-hidden="true">↗</span>
              </Link>

              <div className="hero-capsule-divider" aria-hidden="true" />

              <Link
                to="/products?tab=reconplus"
                className="hero-capsule"
                data-magnetic
                data-cursor="RECON+"
              >
                <div className="hero-capsule__meta">
                  <span className="hero-capsule__num">02</span>
                  <div className="hero-capsule__info">
                    <strong>ReconPlus</strong>
                    <small>Card Transaction Reconciliation</small>
                  </div>
                </div>
                <div className="hero-capsule__tags">
                  <span>Multi-Source</span>
                  <span>Auto GL</span>
                </div>
                <span className="hero-capsule__arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          S1: ABOUT EMPAY (Clean background, NO dot grid)
          ===================================================== */}
      <section className="about-scrub" id="about" data-theme-trigger="light">
        <div className="about-scrub__pin">
          <div className="container about-scrub__inner">
            <div className="about-scrub__eyebrow-row">
              <span className="pill-eyebrow">ABOUT EMPAY</span>
              <span className="eyebrow">EMPAY SOFTWARE SOLUTIONS PRIVATE LIMITED</span>
            </div>

            <div className="about-scrub__text-wrap">
              <p
                className="about-scrub__text"
                id="about-scrub-text"
                aria-label={ABOUT_STATEMENT}
              >
                <span className="scrub-segment" aria-hidden="true">
                  {(() => {
                    let globalCharCount = 0;
                    return ABOUT_STATEMENT.split(" ").map((word, wIdx, arr) => (
                      <span key={wIdx} className="scrub-word-wrapper">
                        <span className="scrub-word">
                          {word.split("").map((ch) => {
                            const cIdx = globalCharCount++;
                            return (
                              <span
                                className="scrub-c"
                                key={cIdx}
                                data-rnd={((cIdx % 5) - 2) * 0.45}
                              >
                                {ch}
                              </span>
                            );
                          })}
                        </span>
                        {wIdx < arr.length - 1 && " "}
                      </span>
                    ));
                  })()}
                </span>
              </p>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Link to="/about" className="pill-btn pill-btn--orange">
                <span>View Full About Story &amp; Milestones →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          S2: CORE PILLARS (Architecture, Services & Software)
          ===================================================== */}
      <section className="statement-section" id="technology" data-theme-trigger="light">
        <div className="container statement-section__inner">
          <span className="eyebrow">OUR MISSION</span>
          <h2
            className="editorial-h2"
            data-split="lines"
            data-scrub-lines
            aria-label="Our mission is to provide path breaking and effective solutions in transaction processing and payment services to enable our clients to become pioneers in the industry."
          >
            <SplitText
              mode="lines"
              text="Path-breaking transaction processing and payment solutions enabling our clients to become"
              accentText="industry pioneers."
            />
          </h2>
          <div className="statement-section__grid">
            {CORE_PILLARS.map((pillar) => (
              <div className="statement-metric" data-reveal-group key={pillar.title}>
                <span className="statement-metric__num">{pillar.title}</span>
                <strong style={{ fontSize: "1.02rem" }}>{pillar.subtitle}</strong>
                <span className="statement-metric__label">{pillar.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          S3: WHAT WE OFFER / SERVICES
          ===================================================== */}
      <section className="expertise-section" id="service" data-theme-trigger="dark">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="pill-eyebrow">WHAT WE OFFER</span>
              <h2
                className="section-h2"
                data-split="chars"
                aria-label="Comprehensive solutions across electronic & mobile payments"
              >
                <SplitText mode="chars" text="Comprehensive solutions across electronic & mobile payments" />
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p className="section-lead" data-reveal-group>
                Our team has extensive experience in business analysis, product development, application development and project management in the payment and financial services domains.
              </p>
              <div>
                <Link to="/services" className="pill-btn pill-btn--orange">
                  <span>View Dedicated Services Page →</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="expertise-groups">
            <article className="expertise-row" data-reveal-group>
              <div className="expertise-panel">
                <div className="expertise-panel__top">
                  <span className="expertise-panel__index">01</span>
                  <h3>Acquiring, Switching &amp; Card Systems</h3>
                </div>
                <svg className="expertise-sketch" viewBox="0 0 280 110" fill="none" aria-hidden="true">
                  <path
                    className="draw-path"
                    d="M12 85 C60 85, 78 26, 140 26 C202 26, 218 72, 268 30"
                    stroke="#0A1628"
                    strokeWidth="2.5"
                  />
                  <circle cx="140" cy="26" r="6" fill="#0A1628" />
                  <circle cx="268" cy="30" r="6" fill="#FFFFFF" />
                </svg>
                <Link to="/products?tab=mars" className="expertise-panel__link">
                  Explore MARS →
                </Link>
              </div>
              <div className="expertise-cards">
                {WHAT_WE_OFFER.slice(0, 5).map((srv) => (
                  <div className="cap-card" key={srv.name}>
                    <span className="cap-card__badge">→</span>
                    <h4>{srv.name}</h4>
                    <p>{srv.desc}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="expertise-row" data-reveal-group>
              <div className="expertise-panel">
                <div className="expertise-panel__top">
                  <span className="expertise-panel__index">02</span>
                  <h3>Reconciliation, Clearing &amp; Processing</h3>
                </div>
                <svg className="expertise-sketch" viewBox="0 0 280 110" fill="none" aria-hidden="true">
                  <rect className="draw-path" x="18" y="20" width="90" height="70" rx="10" stroke="#0A1628" strokeWidth="2.5" />
                  <rect className="draw-path" x="172" y="20" width="90" height="70" rx="10" stroke="#0A1628" strokeWidth="2.5" />
                  <path className="draw-path" d="M108 55 H172" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="5 5" />
                </svg>
                <Link to="/products?tab=reconplus" className="expertise-panel__link">
                  Explore ReconPlus →
                </Link>
              </div>
              <div className="expertise-cards">
                {WHAT_WE_OFFER.slice(5).map((srv) => (
                  <div className="cap-card" key={srv.name}>
                    <span className="cap-card__badge">→</span>
                    <h4>{srv.name}</h4>
                    <p>{srv.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          S4: PRODUCTS — "It's what we do."
          ===================================================== */}
      <section className="products-section" id="pricing" data-theme-trigger="dark">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="pill-eyebrow">IT&apos;S WHAT WE DO.</span>
            <h2
              className="section-h2 section-h2--lg"
              data-split="chars"
              aria-label="PA-DSS Certified Payment & Reconciliation Products"
            >
              <SplitText mode="chars" text="PA-DSS Certified Payment & Reconciliation Products" />
            </h2>
            <div style={{ marginTop: "1rem" }}>
              <Link to="/products" className="ghost-pill-btn">
                <span>View Full Product Portfolio →</span>
              </Link>
            </div>
          </div>

          {/* PRODUCT 01: MARS */}
          <article className="product-story product-story--mars" id="product-mars">
            <InteractiveDotGrid
              theme="dark"
              spacing={24}
              radius={112}
              maxPush={32}
              baseDotRadius={1.2}
              maxDotRadius={2.05}
              intensity={0.85}
            />

            <div className="product-story__copy">
              <div className="product-story__meta">
                <span className="eyebrow eyebrow--orange">PRODUCT 01 // MARS</span>
                <span className="product-tag">Merchant Acquiring &amp; Reconciliation System</span>
              </div>
              <h3
                className="product-story__title"
                data-split="lines"
                aria-label="MARS – Merchant Acquiring & Reconciliation System"
              >
                <SplitText
                  mode="lines"
                  text="MARS – Merchant Acquiring & Reconciliation System"
                />
              </h3>
              <p className="product-story__desc" data-reveal-group>
                MARS is a PA-DSS Certified complete solution for merchant on boarding and payment processing. This application processes POS and IPG transactions, calculate merchant discount, rentals, fees and charges and do merchant billing, generate clearing files to Visa, MasterCard, RuPay &amp; Amex.
              </p>

              <ul className="product-story__features" data-reveal-group>
                <li>
                  <span>01</span> POS &amp; IPG processing with MDR, rentals, fees &amp; merchant billing
                </li>
                <li>
                  <span>02</span> Clearing file generation for Visa, MasterCard, RuPay &amp; Amex
                </li>
                <li>
                  <span>03</span> Settlement reconciliation, merchant statements &amp; GL entries
                </li>
              </ul>

              <div className="product-story__cta" data-reveal-group>
                <Link
                  to="/products?tab=mars"
                  className="pill-btn pill-btn--orange scribble-host"
                  data-magnetic
                  data-cursor="MARS"
                >
                  <span className="scribble-bg" aria-hidden="true">
                    <svg viewBox="0 0 140 44" preserveAspectRatio="none">
                      <path pathLength={1} d="M-4,22 C18,6 32,38 56,18 C80,-2 92,40 116,18 C128,8 136,28 144,20" />
                    </svg>
                  </span>
                  <span className="pill-btn__content">MARS Full Deep Dive ↗</span>
                </Link>
              </div>
            </div>

            <div className="product-story__visual">
              <div className="mask-frame" data-mask-reveal>
                <div className="dashboard-mock dashboard-mock--mars">
                  <div className="dash-topbar">
                    <div className="dash-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="dash-title">MARS // PA-DSS CERTIFIED</span>
                    <span className="dash-badge dash-badge--live">● POS + IPG + GL</span>
                  </div>

                  <div className="dash-kpis">
                    <div className="dash-kpi" data-dash-el>
                      <span>Channels</span>
                      <strong>POS + IPG</strong>
                    </div>
                    <div className="dash-kpi" data-dash-el>
                      <span>Associations</span>
                      <strong>4 Rails</strong>
                    </div>
                    <div className="dash-kpi" data-dash-el>
                      <span>Accounting</span>
                      <strong>Auto GL</strong>
                    </div>
                  </div>

                  <div className="dash-flow" data-dash-el>
                    <div className="dash-flow__label">MERCHANT ACQUIRING &amp; CLEARING FLOW</div>
                    <svg viewBox="0 0 460 110" fill="none">
                      <path
                        className="flow-rail"
                        d="M36 55 H160 C190 55, 200 28, 230 28 H320 C350 28, 360 55, 390 55 H426"
                        stroke="rgba(255,255,255,0.16)"
                        strokeWidth="2"
                      />
                      <path
                        className="flow-rail flow-rail--active"
                        d="M36 55 H160 C190 55, 200 28, 230 28 H320 C350 28, 360 55, 390 55 H426"
                        stroke="#FF5500"
                        strokeWidth="2.5"
                      />
                      <path
                        className="flow-rail"
                        d="M160 55 C190 55, 200 82, 230 82 H320 C350 82, 360 55, 390 55"
                        stroke="rgba(255,255,255,0.16)"
                        strokeWidth="2"
                      />
                      <circle className="flow-pulse" cx="44" cy="55" r="4.5" fill="#FFFFFF" />
                      <g className="flow-node">
                        <rect x="12" y="38" width="64" height="34" rx="8" fill="#10203A" stroke="#FF5500" />
                        <text x="44" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
                          POS/IPG
                        </text>
                      </g>
                      <g className="flow-node">
                        <rect x="200" y="12" width="110" height="32" rx="8" fill="#10203A" stroke="rgba(255,255,255,0.3)" />
                        <text x="255" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
                          MDR + BILLING
                        </text>
                      </g>
                      <g className="flow-node">
                        <rect x="200" y="66" width="110" height="32" rx="8" fill="#10203A" stroke="rgba(255,255,255,0.3)" />
                        <text x="255" y="86" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
                          CLEARING FILES
                        </text>
                      </g>
                      <g className="flow-node">
                        <rect x="380" y="38" width="68" height="34" rx="8" fill="#FF5500" />
                        <text x="414" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
                          GL + STMT
                        </text>
                      </g>
                    </svg>
                  </div>

                  <div className="dash-table" data-dash-el>
                    <div className="dash-table__row">
                      <span>Visa / MasterCard Clearing</span>
                      <span className="pill-ok">RECONCILED</span>
                      <strong>GL POSTED</strong>
                    </div>
                    <div className="dash-table__row">
                      <span>RuPay / Amex Settlement</span>
                      <span className="pill-ok">VERIFIED</span>
                      <strong>STMT READY</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* PRODUCT 02: ReconPlus */}
          <article className="product-story product-story--recon product-story--reverse" id="product-reconplus">
            <InteractiveDotGrid
              theme="dark"
              spacing={24}
              radius={112}
              maxPush={32}
              baseDotRadius={1.2}
              maxDotRadius={2.05}
              intensity={0.8}
            />

            <div className="product-story__copy">
              <div className="product-story__meta">
                <span className="eyebrow eyebrow--orange">PRODUCT 02 // RECONPLUS</span>
                <span className="product-tag">Card Transaction Reconciliation System</span>
              </div>
              <h3
                className="product-story__title"
                data-split="lines"
                aria-label="ReconPlus – Card Transaction Reconciliation System"
              >
                <SplitText
                  mode="lines"
                  text="ReconPlus – Card Transaction Reconciliation System"
                />
              </h3>
              <p className="product-story__desc" data-reveal-group>
                ReconPlus is a PA-DSS Certified highly configurable application for reconciling various electronic payment transactions across multiple entities and sources. ReconPlus is a modular system that can be implemented by a Service Provider for multiple banks or as a stand-alone system.
              </p>

              <ul className="product-story__features" data-reveal-group>
                <li>
                  <span>01</span> PA-DSS Certified &amp; highly configurable reconciliation rules
                </li>
                <li>
                  <span>02</span> Multi-entity, multi-source electronic transaction matching
                </li>
                <li>
                  <span>03</span> Multi-bank Service Provider or stand-alone Issuer/Acquirer mode
                </li>
              </ul>

              <div className="product-story__cta" data-reveal-group>
                <Link
                  to="/products?tab=reconplus"
                  className="pill-btn pill-btn--orange scribble-host"
                  data-magnetic
                  data-cursor="RECON+"
                >
                  <span className="scribble-bg" aria-hidden="true">
                    <svg viewBox="0 0 150 44" preserveAspectRatio="none">
                      <path pathLength={1} d="M-4,22 C18,6 32,38 56,18 C80,-2 96,40 124,18 C136,8 144,28 154,20" />
                    </svg>
                  </span>
                  <span className="pill-btn__content">ReconPlus Architecture ↗</span>
                </Link>
              </div>
            </div>

            <div className="product-story__visual">
              <div className="mask-frame" data-mask-reveal>
                <div className="dashboard-mock dashboard-mock--recon">
                  <div className="dash-topbar">
                    <div className="dash-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="dash-title">RECONPLUS // PA-DSS CERTIFIED</span>
                    <span className="dash-badge dash-badge--green">MULTI-ENTITY ENGINE</span>
                  </div>

                  <div className="recon-streams">
                    <div className="recon-stream" data-dash-el>
                      <span className="recon-stream__tag">ATM &amp; SWITCH LOGS</span>
                      <strong>Multi-Source</strong>
                      <div className="recon-bar">
                        <span style={{ width: "100%" }} />
                      </div>
                    </div>
                    <div className="recon-stream" data-dash-el>
                      <span className="recon-stream__tag">ISSUER / ACQUIRER</span>
                      <strong>Stand-Alone</strong>
                      <div className="recon-bar">
                        <span style={{ width: "99%" }} />
                      </div>
                    </div>
                    <div className="recon-stream" data-dash-el>
                      <span className="recon-stream__tag">SERVICE PROVIDER</span>
                      <strong>Multi-Bank</strong>
                      <div className="recon-bar recon-bar--amber">
                        <span style={{ width: "96%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="recon-ledger" data-dash-el>
                    <div className="recon-ledger__head">
                      <span>SOURCE</span>
                      <span>SCOPE</span>
                      <span>MODE</span>
                      <span>STATUS</span>
                    </div>
                    <div className="recon-ledger__row">
                      <span>Electronic Cards</span>
                      <span>Issuer &amp; Acquirer</span>
                      <span>Modular</span>
                      <span className="pill-ok">MATCHED</span>
                    </div>
                    <div className="recon-ledger__row">
                      <span>ATM &amp; Debit Rails</span>
                      <span>Multi-Bank</span>
                      <span>Configurable</span>
                      <span className="pill-ok">PA-DSS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* =====================================================
          S5: END-TO-END PAYMENT LIFECYCLE (Horizontal Scroll)
          ===================================================== */}
      <section className="hscroll-section" id="business" data-theme-trigger="dark">
        <div className="hscroll-section__sticky">
          <div className="container hscroll-section__head">
            <div>
              <span className="pill-eyebrow">BUILT FOR FINANCIAL SERVICES</span>
              <h2
                className="section-h2"
                data-split="chars"
                aria-label="Streamlined, robust and low-cost payment systems"
              >
                <SplitText mode="chars" text="Streamlined, robust and low-cost payment systems" />
              </h2>
            </div>
            <div className="hscroll-progress-wrap">
              <div className="hscroll-progress">
                <span id="hscroll-progress-bar" />
              </div>
            </div>
          </div>

          <div className="hscroll-viewport">
            <div className="hscroll-track" id="hscroll-track">
              <article className="hcard">
                <span className="hcard__num">01</span>
                <h3>Architecture &amp; Consulting</h3>
                <p>Design mission-critical payment systems that are streamlined, efficient, robust, flexible, and low cost.</p>
                <span className="hcard__meta">PAYMENT ARCHITECTURE</span>
              </article>

              <span className="hcard-operator" aria-hidden="true">
                +
              </span>

              <article className="hcard">
                <span className="hcard__num">02</span>
                <h3>MARS Merchant Acquiring</h3>
                <p>PA-DSS Certified merchant onboarding, POS/IPG processing, MDR billing, association clearing files, and GL entries.</p>
                <span className="hcard__meta">MERCHANT LIFECYCLE</span>
              </article>

              <span className="hcard-operator" aria-hidden="true">
                +
              </span>

              <article className="hcard">
                <span className="hcard__num">03</span>
                <h3>ReconPlus Modularity</h3>
                <p>PA-DSS Certified reconciliation across multiple entities &amp; sources for Service Providers, Issuer and Acquirer Banks.</p>
                <span className="hcard__meta">MULTI-SOURCE RECON</span>
              </article>

              <span className="hcard-operator" aria-hidden="true">
                =
              </span>

              <article className="hcard hcard--accent">
                <span className="hcard__num">04</span>
                <h3>Clearing &amp; Settlement</h3>
                <p>Automate multi-scheme settlement verification, merchant statements, and compliant General Ledger posting.</p>
                <span className="hcard__meta">SETTLEMENT &amp; GL</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          S6: OUR PRESTIGIOUS CLIENTS & ECOSYSTEM
          ===================================================== */}
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
              <Link to="/clients" className="pill-btn pill-btn--orange">
                <span>View Dedicated Clients &amp; Partners Page ↗</span>
              </Link>
            </div>
          </div>

          {/* Bento Client Ecosystem Grid */}
          <div className="clients-bento">
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
        </div>
      </section>

      {/* =====================================================
          S6.5: PARTNERS & CLIENTS (Banner Layout)
          ===================================================== */}
      <section className="partners-section" id="partners" data-theme-trigger="dark">
        <div className="container partners-inner">
          <div className="client-banner-card">
            <div className="client-banner-card__left">
              <div className="client-banner-card__dash" aria-hidden="true" />
              <h2 className="client-banner-card__title">Our Clients</h2>
              <p className="client-banner-card__desc">
                We have worked with renowned names. From retail banking to nationwide payment networks, we serve financial leaders.
              </p>
              <div style={{ marginTop: "1.5rem" }}>
                <Link to="/clients" className="pill-btn pill-btn--orange">
                  <span>View All Clients &amp; Partners →</span>
                </Link>
              </div>
            </div>

            <div className="client-banner-card__right">
              <div className="client-banner-card__grid">
                {[...CLIENT_LOGOS, ...PARTNER_LOGOS].map((item) => (
                  <div className="client-brand-logo" key={item.id} title={`${item.name} – ${item.subtitle}`}>
                    <div className="client-brand-logo__icon" aria-hidden="true">
                      {renderLogoMark(item.name, item.type)}
                    </div>
                    <div className="client-brand-logo__text">
                      <span className="client-brand-logo__name">{item.name}</span>
                      <span className="client-brand-logo__sub">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          S7: UNIFIED ARCHITECTURE
          ===================================================== */}
      <section className="arch-section" id="architecture" data-theme-trigger="dark">
        <div className="arch-section__sticky">
          <div className="container arch-section__inner">
            <div className="arch-section__head">
              <div>
                <span className="pill-eyebrow">UNIFIED ARCHITECTURE</span>
                <h2
                  className="section-h2 arch-section__h2"
                  data-split="chars"
                  aria-label="One Transaction Lifecycle. Six Synchronized Nodes."
                >
                  <SplitText mode="chars" text="One Transaction Lifecycle." />
                  <br />
                  <SplitText mode="chars" text="Six Synchronized Nodes." />
                </h2>
              </div>
              <div className="hscroll-progress-wrap">
                <div className="hscroll-progress">
                  <span id="arch-progress-bar" />
                </div>
              </div>
            </div>

            <div className="arch-board">
              <div className="arch-graph" id="arch-graph">
                <svg className="arch-svg" viewBox="0 0 540 360" fill="none">
                  <path className={`arch-path ${activeArchNode === 0 ? "is-active" : ""}`} d="M270 180 Q 170 70 85 72" />
                  <path className={`arch-path ${activeArchNode === 1 ? "is-active" : ""}`} d="M270 180 Q 145 180 68 180" />
                  <path className={`arch-path ${activeArchNode === 2 ? "is-active" : ""}`} d="M270 180 Q 170 290 85 288" />
                  <path className={`arch-path ${activeArchNode === 3 ? "is-active" : ""}`} d="M270 180 Q 370 70 455 72" />
                  <path className={`arch-path ${activeArchNode === 4 ? "is-active" : ""}`} d="M270 180 Q 395 180 472 180" />
                  <path className={`arch-path ${activeArchNode === 5 ? "is-active" : ""}`} d="M270 180 Q 370 290 455 288" />

                  <g className="arch-hub">
                    <circle cx="270" cy="180" r="46" fill="#050912" stroke="#FF5500" strokeWidth="2" />
                    <text x="270" y="176" textAnchor="middle" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14">
                      EMPAY
                    </text>
                    <text x="270" y="193" textAnchor="middle" fill="#FF5500" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" fontSize="9">
                      CORE BUS
                    </text>
                  </g>
                </svg>

                {ARCH_NODES.map((node, idx) => (
                  <button
                    type="button"
                    key={node.label}
                    className={`arch-node ${activeArchNode === idx ? "is-active" : ""}`}
                    style={{ left: node.left, top: node.top }}
                    data-arch-node={idx}
                    onClick={() => selectArchNode(idx)}
                    onMouseEnter={() => selectArchNode(idx)}
                  >
                    <span>0{idx + 1}</span> {node.label}
                  </button>
                ))}
              </div>

              <div className="arch-detail-viewport" id="arch-detail-viewport">
                <div className="arch-detail-track" id="arch-detail-track">
                  {ARCH_NODES.map((node, idx) => (
                    <div className="arch-detail-slide" key={node.label} data-slide-index={idx}>
                      <div className="arch-detail__top">
                        <span className="eyebrow eyebrow--orange">
                          {node.tag}
                        </span>
                        <span className="arch-detail__step">
                          0{idx + 1} / 06
                        </span>
                      </div>
                      <h3>{node.title}</h3>
                      <p>{node.desc}</p>
                      <ul className="arch-detail__list">
                        {node.specs.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                      <div className="arch-detail__bars">
                        {ARCH_NODES.map((_, barIdx) => (
                          <span
                            key={barIdx}
                            className={idx === barIdx ? "is-active" : ""}
                            onClick={() => selectArchNode(barIdx)}
                            style={{ cursor: "pointer" }}
                            title={`Node 0${barIdx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          S8: CAREERS OVERVIEW
          ===================================================== */}
      <section className="metrics-faq-section" id="career" data-theme-trigger="dark">
        <div className="container faq-grid">
          <div className="faq-grid__left">
            <span className="pill-eyebrow">CAREERS AT EMPAY</span>
            <h2
              className="section-h2"
              data-split="chars"
              aria-label="Explore Amazing Career Possibilities with Empay"
            >
              <SplitText mode="chars" text="Explore Amazing Career Possibilities with Empay" />
            </h2>
            <p className="section-lead" style={{ marginTop: "1rem" }}>
              Location: Lulu IT Twin Tower, SmartCity, Kochi · Work Mode: Work From Office (Mandatory). Share your updated resume at{" "}
              <a href="mailto:careers@empaysoftware.com" style={{ color: "var(--orange)", fontWeight: 600 }}>
                careers@empaysoftware.com
              </a>
              .
            </p>
            <div style={{ marginTop: "1.75rem" }}>
              <Link to="/careers" className="pill-btn pill-btn--orange">
                <span>View All Open Positions &amp; Apply →</span>
              </Link>
            </div>
          </div>

          <div className="faq-list" id="career-list">
            {CAREER_ROLES.slice(0, 3).map((role, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div className="faq-item" key={role.id}>
                  <button
                    type="button"
                    className="faq-item__trigger"
                    aria-expanded={isOpen}
                    onClick={(e) => handleCareerToggle(idx, e)}
                  >
                    <span>{role.title}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div className="faq-item__panel" style={{ maxHeight: isOpen ? "2400px" : "0px" }}>
                    <div className="career-body">
                      <div className="career-meta">
                        <span>{role.experience}</span>
                        <span>{role.location}</span>
                        <span>{role.workMode}</span>
                      </div>
                      <p>{role.summary}</p>
                      <div className="career-apply">
                        <Link to="/careers" className="highlight-email">
                          View Full Job Spec &amp; Application Details ↗
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
