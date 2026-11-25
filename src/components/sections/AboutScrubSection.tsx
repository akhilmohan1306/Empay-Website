import React from "react";

export const ABOUT_STATEMENT =
  "Empay Software Solutions specializes in providing an array of cutting edge solutions and services for the financial services industry in the electronic and mobile payment verticals. Founded in 2008 by domain veterans.";

export const AboutScrubSection: React.FC = () => {
  return (
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
        </div>
      </div>
    </section>
  );
};
