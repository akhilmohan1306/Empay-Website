import React from "react";
import { CLIENT_LOGOS, PARTNER_LOGOS } from "../../data/empayData";
import { renderLogoMark } from "../common/LogoMark";

export const PartnersSection: React.FC = () => {
  return (
    <section className="partners-section" id="partners" data-theme-trigger="dark">
      <div className="container partners-inner">
        <div className="client-banner-card">
          <div className="client-banner-card__left">
            <div className="client-banner-card__dash" aria-hidden="true" />
            <h2 className="client-banner-card__title">Our Clients</h2>
            <p className="client-banner-card__desc">
              We have worked with renowned names. From hotels, offices and homes, we have worked with clients from all backgrounds.
            </p>
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

        {/* Continuous Sliding Marquee Ticker */}
        <div className="partners-marquee-wrap" aria-hidden="true">
          <div className="partners-marquee">
            <div className="partners-marquee__track">
              {[...CLIENT_LOGOS, ...PARTNER_LOGOS, ...CLIENT_LOGOS, ...PARTNER_LOGOS].map((p, i) => (
                <div className="partners-marquee__chip" key={`pm-${p.id}-${i}`}>
                  <div className="partners-marquee__chip-icon">
                    {renderLogoMark(p.name, p.type)}
                  </div>
                  <span className="partners-marquee__chip-name">{p.name}</span>
                  <span className="partners-marquee__chip-dot">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
