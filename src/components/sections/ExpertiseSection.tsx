import React from "react";
import { Link } from "react-router-dom";
import { SplitText } from "../SplitText";
import { WHAT_WE_OFFER } from "../../data/empayData";

interface ExpertiseSectionProps {
  onNavigate?: (href: string) => void;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ onNavigate }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
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
          <p className="section-lead" data-reveal-group>
            Our team has extensive experience in business analysis, product development, application development and project management in the payment and financial services domains.
          </p>
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
              <Link
                to="/products"
                className="expertise-panel__link"
                onClick={(e) => handleClick(e, "/products")}
              >
                Explore Products →
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
              <Link
                to="/products"
                className="expertise-panel__link"
                onClick={(e) => handleClick(e, "/products")}
              >
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
  );
};
