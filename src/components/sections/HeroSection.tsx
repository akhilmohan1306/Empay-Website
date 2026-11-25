import React from "react";
import { Link } from "react-router-dom";
import { InteractiveDotGrid } from "../InteractiveDotGrid";

interface HeroSectionProps {
  onNavigate?: (href: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
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
                onClick={(e) => handleClick(e, "/contact")}
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
                onClick={(e) => handleClick(e, "/products")}
              >
                <span>Explore Products ↓</span>
              </Link>
            </div>
          </div>

          {/* Floating Twin-Product Capsule Dock */}
          <div className="hero__product-capsule-dock" role="navigation" aria-label="Flagship Products">
            <Link
              to="/products"
              className="hero-capsule"
              data-magnetic
              data-cursor="MARS"
              onClick={(e) => handleClick(e, "/products")}
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
              to="/products"
              className="hero-capsule"
              data-magnetic
              data-cursor="RECON+"
              onClick={(e) => handleClick(e, "/products")}
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
  );
};
