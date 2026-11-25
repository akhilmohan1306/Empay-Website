import React from "react";
import { SplitText } from "../SplitText";
import { CORE_PILLARS } from "../../data/empayData";

export const StatementSection: React.FC = () => {
  return (
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
  );
};
