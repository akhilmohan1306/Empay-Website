import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "all";
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Products | MARS & ReconPlus | Empay Software";
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && (tab === "mars" || tab === "reconplus" || tab === "all")) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams(tab === "all" ? {} : { tab });
  };

  return (
    <div className="dedicated-page products-page">
      {/* Hero Section */}
      <section className="page-hero" data-theme-trigger="light">
        <div className="container">
          <div className="page-hero__badge">
            <span className="live-dot-pulse" aria-hidden="true" />
            <span>ENTERPRISE SUITE</span>
            <span className="chip-sep">/</span>
            <span>PA-DSS CERTIFIED</span>
          </div>

          <h1 className="page-hero__title">
            Enterprise platforms for <br />
            <span className="text-accent">merchant acquiring</span> and <span className="text-accent">automated reconciliation</span>.
          </h1>

          <p className="page-hero__lead">
            Empay provides two industry-leading flagship software platforms engineered specifically for banks, 
            third-party processors (TPPs), and acquiring institutions: <strong>MARS</strong> and <strong>ReconPlus</strong>.
          </p>

          {/* Product Selector Filter Tabs */}
          <div className="product-filter-tabs">
            <button
              type="button"
              className={`filter-tab ${activeTab === "all" ? "is-active" : ""}`}
              onClick={() => handleTabChange("all")}
            >
              All Platforms (2)
            </button>
            <button
              type="button"
              className={`filter-tab ${activeTab === "mars" ? "is-active" : ""}`}
              onClick={() => handleTabChange("mars")}
            >
              01 // MARS (Merchant Acquiring)
            </button>
            <button
              type="button"
              className={`filter-tab ${activeTab === "reconplus" ? "is-active" : ""}`}
              onClick={() => handleTabChange("reconplus")}
            >
              02 // ReconPlus (Reconciliation)
            </button>
          </div>
        </div>
      </section>

      {/* MARS Platform Section */}
      {(activeTab === "all" || activeTab === "mars") && (
        <section className="page-section product-deep-dive" id="mars" data-theme-trigger="light">
          <div className="container">
            <div className="product-header-block">
              <div className="product-meta-chip">
                <span className="prod-badge">FLAGSHIP PLATFORM 01</span>
                <span className="security-tag">PA-DSS CERTIFIED</span>
              </div>
              <h2 className="product-title">MARS — Merchant Acquiring &amp; Reconciliation System</h2>
              <p className="product-summary">
                A high-performance acquiring powerhouse that automates merchant onboarding, POS terminal deployment, 
                e-commerce payment gateway processing, dynamic MDR/rental billing, and association clearing.
              </p>
            </div>

            {/* MARS Capabilities Grid */}
            <div className="product-feature-grid">
              <div className="feature-card">
                <div className="feature-icon">🏪</div>
                <h3>Merchant Lifecycle &amp; KYC</h3>
                <p>
                  Instant digital onboarding with document management, multi-level hierarchy (Aggregator, Merchant, Sub-merchant, Store, Terminal), and automated risk evaluation.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">💳</div>
                <h3>Omnichannel Transaction Processing</h3>
                <p>
                  Full support for Point-of-Sale (POS) terminals, Internet Payment Gateways (IPG), BharatQR/UPI, mobile mPOS, and self-service unattended kiosks.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Dynamic MDR &amp; Rental Billing</h3>
                <p>
                  Configurable commission rules: fixed fees, percentage MDR, tiered volume slabs, interchange-plus pricing, POS device rental deduction, and tax splits.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🌐</div>
                <h3>Multi-Scheme Clearing Generation</h3>
                <p>
                  Automated generation of standardized incoming/outgoing clearing files for Visa (BASE II), Mastercard (IPM), RuPay (SMS/DMS), and American Express.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📑</div>
                <h3>Automated Merchant Statements</h3>
                <p>
                  Comprehensive daily/monthly billing statements, transaction payout summaries, chargeback notices, and scheduled email dispatch for merchant transparency.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚖️</div>
                <h3>Dispute &amp; Chargeback Management</h3>
                <p>
                  End-to-end chargeback lifecycle: retrieval requests, first chargebacks, representments, pre-arbitration, and association compliance case tracking.
                </p>
              </div>
            </div>

            {/* MARS Specifications Table */}
            <div className="spec-table-box">
              <h3>MARS Technical Architecture &amp; Specifications</h3>
              <div className="spec-grid">
                <div className="spec-item">
                  <span className="spec-label">Security Standards</span>
                  <span className="spec-value">PA-DSS Certified, TLS 1.3, AES-256 field-level encryption</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Deployment Models</span>
                  <span className="spec-value">On-Premises Bare-Metal, Private Cloud, Hybrid Cloud (AWS/Azure)</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Database Engines</span>
                  <span className="spec-value">Oracle Enterprise, Microsoft SQL Server, PostgreSQL</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Throughput Capacity</span>
                  <span className="spec-value">Horizontal scale capable of 2,500+ TPS per cluster node</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Supported Schemes</span>
                  <span className="spec-value">RuPay, Visa, Mastercard, American Express, Domestic Switches</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Integration Interfaces</span>
                  <span className="spec-value">ISO 8583 (1987/1993/2003), ISO 20022, RESTful JSON APIs</span>
                </div>
              </div>
              <div className="spec-actions">
                <Link to="/contact" className="pill-btn pill-btn--orange">
                  <span>Schedule MARS Technical Demo ↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ReconPlus Platform Section */}
      {(activeTab === "all" || activeTab === "reconplus") && (
        <section className="page-section product-deep-dive bg-dark-theme" id="reconplus" data-theme-trigger="dark">
          <div className="container">
            <div className="product-header-block">
              <div className="product-meta-chip">
                <span className="prod-badge prod-badge--orange">FLAGSHIP PLATFORM 02</span>
                <span className="security-tag">100% AUDIT ACCURACY</span>
              </div>
              <h2 className="product-title text-light">ReconPlus — Automated Transaction Reconciliation</h2>
              <p className="product-summary text-muted">
                A rule-based automated multi-source reconciliation engine that eliminates discrepancy, verifies scheme settlements, 
                and compiles General Ledger (GL) financial entries with total mathematical accuracy.
              </p>
            </div>

            {/* ReconPlus Capabilities Grid */}
            <div className="product-feature-grid dark-grid">
              <div className="feature-card feature-card--dark">
                <div className="feature-icon">🔍</div>
                <h3>Multi-Source File Ingestion</h3>
                <p>
                  High-speed ingestion and normalization of EFT Switch logs, ATM Electronic Journal (EJ) files, Core Banking System (CBS) extracts, and network clearing files.
                </p>
              </div>

              <div className="feature-card feature-card--dark">
                <div className="feature-icon">⚙️</div>
                <h3>Intelligent Rule-Based Matching</h3>
                <p>
                  Configurable 2-way, 3-way, and 4-way matching algorithms that automatically pair transactions by RRN, PAN mask, terminal ID, amount, and timestamp tolerance.
                </p>
              </div>

              <div className="feature-card feature-card--dark">
                <div className="feature-icon">🚨</div>
                <h3>Automated Exception &amp; Discrepancy Workflows</h3>
                <p>
                  Isolates unmatched records, late settlements, switch timeouts, and customer chargebacks into prioritized investigation queues with automated audit logging.
                </p>
              </div>

              <div className="feature-card feature-card--dark">
                <div className="feature-icon">🏦</div>
                <h3>Atm &amp; Cash Reconciliation</h3>
                <p>
                  Automates cash dispense verification, switch ledger reconciliation, cassette balancing, and third-party cash replenishment agency (CRA) reconciliation.
                </p>
              </div>

              <div className="feature-card feature-card--dark">
                <div className="feature-icon">📑</div>
                <h3>Automated GL Accounting Entries</h3>
                <p>
                  Produces pre-formatted General Ledger journal entries with balanced debits and credits, ready for automated upload into Finacle, Flexcube, or SAP CBS.
                </p>
              </div>

              <div className="feature-card feature-card--dark">
                <div className="feature-icon">🌐</div>
                <h3>Multi-Entity &amp; Service Provider Mode</h3>
                <p>
                  Capable of running as a multi-tenant shared reconciliation utility for Third-Party Processors servicing hundreds of banks simultaneously.
                </p>
              </div>
            </div>

            {/* ReconPlus Deployment Models */}
            <div className="spec-table-box spec-table-box--dark">
              <h3>ReconPlus Flexible Deployment Modes</h3>
              <div className="deployment-models-grid">
                <div className="model-card">
                  <div className="model-tag">MODE 01</div>
                  <h4>Service Provider Mode</h4>
                  <p>
                    Engineered for payment processors, aggregators, and switch networks that manage reconciliation on behalf of multiple member banks in an isolated, multi-tenant container.
                  </p>
                </div>
                <div className="model-card">
                  <div className="model-tag">MODE 02</div>
                  <h4>Issuer Bank Mode</h4>
                  <p>
                    Engineered for card-issuing financial institutions to balance customer accounts against ATM switch activity, interchange debit settlements, and dispute reimbursements.
                  </p>
                </div>
                <div className="model-card">
                  <div className="model-tag">MODE 03</div>
                  <h4>Acquirer Bank Mode</h4>
                  <p>
                    Engineered for merchant acquiring banks to reconcile merchant terminal batches against switch logs, network interchange fees, and net settlement remittances.
                  </p>
                </div>
              </div>
              <div className="spec-actions">
                <Link to="/contact" className="pill-btn pill-btn--orange">
                  <span>Schedule ReconPlus Live Demo ↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Integration Synergy Strip */}
      <section className="page-section bg-alt" data-theme-trigger="light">
        <div className="container">
          <div className="synergy-box">
            <span className="pill-eyebrow">UNIFIED PAYMENT ARCHITECTURE</span>
            <h2>Better together: The MARS + ReconPlus ecosystem.</h2>
            <p>
              When deployed together, MARS and ReconPlus form an end-to-end payment loop: from terminal transaction authorization and fee deduction to scheme clearing and final general ledger reconciliation. No data silos, no manual spreadsheets, zero financial leakage.
            </p>
            <div className="synergy-flow">
              <div className="flow-step">
                <span className="flow-num">01</span>
                <strong>Transaction Intake</strong>
                <small>POS, IPG, ATM, Kiosks</small>
              </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <span className="flow-num">02</span>
                <strong>MARS Engine</strong>
                <small>Billing, MDR &amp; Clearing</small>
              </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <span className="flow-num">03</span>
                <strong>ReconPlus Engine</strong>
                <small>4-Way Matching &amp; Exceptions</small>
              </div>
              <span className="flow-arrow">→</span>
              <div className="flow-step">
                <span className="flow-num">04</span>
                <strong>Auto GL Settlement</strong>
                <small>Zero Discrepancy Books</small>
              </div>
            </div>
            <div className="synergy-actions">
              <Link to="/contact" className="pill-btn pill-btn--orange">
                <span>Book a Unified Platform Walkthrough ↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
