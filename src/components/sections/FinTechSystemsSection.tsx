import React from "react";
import { SplitText } from "../SplitText";

export const FinTechSystemsSection: React.FC = () => {
  return (
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
  );
};
