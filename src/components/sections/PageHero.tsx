import React from "react";
import { Link } from "react-router-dom";
import { InteractiveDotGrid } from "../InteractiveDotGrid";

interface PageHeroProps {
  eyebrow: string;
  badge?: string;
  titleRow1: string;
  titleAccent?: string;
  titleRow2?: string;
  pitch: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  theme?: "light" | "dark";
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  badge = "PA-DSS CERTIFIED",
  titleRow1,
  titleAccent,
  titleRow2,
  pitch,
  ctaText,
  ctaHref,
  secondaryText,
  secondaryHref,
  theme = "dark",
}) => {
  return (
    <section className="page-hero" data-theme-trigger={theme}>
      <InteractiveDotGrid
        theme={theme}
        spacing={24}
        radius={116}
        maxPush={36}
        baseDotRadius={1.25}
        maxDotRadius={2.2}
        intensity={theme === "light" ? 1 : 0.85}
      />

      <div className="hero__rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="container page-hero__container">
        <div className="page-hero__centerpiece">
          <div className="hero__eyebrow-chip">
            <span className="live-dot-pulse" aria-hidden="true" />
            <span className="mono-label">{eyebrow}</span>
            {badge && (
              <>
                <span className="chip-sep">/</span>
                <span className="chip-code">{badge}</span>
              </>
            )}
          </div>

          <h1 className="hero__cinematic-title">
            <span className="title-row">
              <span className="title-word">{titleRow1}</span>
            </span>
            {(titleAccent || titleRow2) && (
              <span className="title-row title-row--shift">
                {titleAccent && (
                  <span className="title-word title-word--accent">{titleAccent} </span>
                )}
                {titleRow2 && <span className="title-word">{titleRow2}</span>}
              </span>
            )}
          </h1>

          <div className="hero__editorial-sub">
            <p className="hero__pitch">{pitch}</p>

            {(ctaText || secondaryText) && (
              <div className="page-hero__cta-cluster">
                {ctaText && ctaHref && (
                  <Link
                    to={ctaHref}
                    className="pill-btn pill-btn--orange scribble-host"
                    data-magnetic
                  >
                    <span className="scribble-bg" aria-hidden="true">
                      <svg viewBox="0 0 170 44" preserveAspectRatio="none">
                        <path
                          pathLength={1}
                          d="M-4,22 C18,6 32,38 56,18 C80,-2 96,40 124,18 C142,6 156,28 174,20"
                        />
                      </svg>
                    </span>
                    <span className="pill-btn__content">{ctaText}</span>
                  </Link>
                )}

                {secondaryText && secondaryHref && (
                  <Link to={secondaryHref} className="ghost-pill-btn" data-magnetic>
                    <span>{secondaryText}</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
