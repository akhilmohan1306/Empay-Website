import React from "react";
import { Link } from "react-router-dom";
import { InteractiveDotGrid } from "../InteractiveDotGrid";
import { SplitText } from "../SplitText";

interface ProductsSectionProps {
  onNavigate?: (href: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onNavigate }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
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
        </div>

        {/* PRODUCT 01: MARS (Selected Highlight #1 with InteractiveDotGrid) */}
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
              MARS is a PA-DSS Certified complete solution for merchant on boarding and payment processing. This application processes POS and IPG transactions, calculate merchant discount, rentals, fees and charges and do merchant billing, generate clearing files to Visa, MasterCard, RuPay &amp; Amex. Settlement received from card associations are reconciled, Merchant statements and GL entries are generated.
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
                to="/contact"
                className="pill-btn pill-btn--orange scribble-host"
                data-magnetic
                data-cursor="MARS"
                onClick={(e) => handleClick(e, "/contact")}
              >
                <span className="scribble-bg" aria-hidden="true">
                  <svg viewBox="0 0 140 44" preserveAspectRatio="none">
                    <path pathLength={1} d="M-4,22 C18,6 32,38 56,18 C80,-2 92,40 116,18 C128,8 136,28 144,20" />
                  </svg>
                </span>
                <span className="pill-btn__content">Enquire About MARS ↗</span>
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

        {/* PRODUCT 02: ReconPlus (Selected Highlight #2 with InteractiveDotGrid) */}
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
              ReconPlus is a PA-DSS Certified highly configurable application for reconciling various electronic payment transactions across multiple entities and sources. ReconPlus is a modular system that can be implemented by a Service Provider for multiple banks or as a stand-alone system by an Issuer and/or Acquirer Bank.
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
                to="/contact"
                className="pill-btn pill-btn--orange scribble-host"
                data-magnetic
                data-cursor="RECON+"
                onClick={(e) => handleClick(e, "/contact")}
              >
                <span className="scribble-bg" aria-hidden="true">
                  <svg viewBox="0 0 150 44" preserveAspectRatio="none">
                    <path pathLength={1} d="M-4,22 C18,6 32,38 56,18 C80,-2 96,40 124,18 C136,8 144,28 154,20" />
                  </svg>
                </span>
                <span className="pill-btn__content">Enquire About ReconPlus ↗</span>
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
  );
};
