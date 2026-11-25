import React, { useState } from "react";
import { SplitText } from "../SplitText";
import { CAREER_ROLES } from "../../data/empayData";

export const CareersSection: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleCareerToggle = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const triggerBtn = e.currentTarget;
    const currentCard = triggerBtn.closest(".faq-item") as HTMLElement | null;
    const isCurrentlyOpen = openFaqIdx === idx;

    if (isCurrentlyOpen) {
      setOpenFaqIdx(null);
      return;
    }

    const prevOpenIdx = openFaqIdx;
    let heightAboveToRemove = 0;

    if (prevOpenIdx !== null && prevOpenIdx < idx && currentCard) {
      const listEl = currentCard.parentElement;
      if (listEl) {
        const allPanels = listEl.querySelectorAll<HTMLElement>(".faq-item__panel");
        const openPanel = allPanels[prevOpenIdx];
        if (openPanel) {
          heightAboveToRemove = openPanel.offsetHeight;
        }
      }
    }

    setOpenFaqIdx(idx);

    if (currentCard) {
      const rect = currentCard.getBoundingClientRect();
      const currentDocTop = rect.top + window.scrollY;
      const headerOffset = window.innerWidth <= 768 ? 75 : 95;
      const targetScrollY = Math.max(0, currentDocTop - heightAboveToRemove - headerOffset);

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="metrics-faq-section" id="career" data-theme-trigger="dark">
      <div className="metrics-marquee" aria-label="Empay key highlights">
        <div className="metrics-marquee__track">
          <div className="metric-chip">
            <strong>2008</strong>
            <span>Founded</span>
          </div>
          <div className="metric-chip">
            <strong>PA-DSS</strong>
            <span>Certified Suite</span>
          </div>
          <div className="metric-chip">
            <strong>10+</strong>
            <span>Payment Services</span>
          </div>
          <div className="metric-chip">
            <strong>3</strong>
            <span>Core Platforms</span>
          </div>
          <div className="metric-chip">
            <strong>KOCHI</strong>
            <span>SmartCity SEZ</span>
          </div>
          <div className="metric-chip">
            <strong>2008</strong>
            <span>Founded</span>
          </div>
          <div className="metric-chip">
            <strong>PA-DSS</strong>
            <span>Certified Suite</span>
          </div>
          <div className="metric-chip">
            <strong>10+</strong>
            <span>Payment Services</span>
          </div>
          <div className="metric-chip">
            <strong>3</strong>
            <span>Core Platforms</span>
          </div>
          <div className="metric-chip">
            <strong>KOCHI</strong>
            <span>SmartCity SEZ</span>
          </div>
        </div>
      </div>

      <div className="container faq-grid">
        <div className="faq-grid__left">
          <span className="pill-eyebrow">CAREERS</span>
          <h2
            className="section-h2"
            data-split="chars"
            aria-label="Explore Amazing Career Possibilities with Empay"
          >
            <SplitText mode="chars" text="Explore Amazing Career Possibilities with Empay" />
          </h2>
          <p className="section-lead" style={{ marginTop: "1rem" }}>
            Location: Lulu IT Twin Tower, SmartCity, Kochi · Work Mode: Work From Office (Mandatory). Share your updated resume at{" "}
            <a href="mailto:hr@empaysoft.com" style={{ color: "var(--orange)", fontWeight: 600 }}>
              hr@empaysoft.com
            </a>
            .
          </p>
        </div>

        <div className="faq-list" id="career-list">
          {CAREER_ROLES.map((role, idx) => {
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
                    <div>
                      <span className="career-subheading">Key Responsibilities</span>
                      <ul className="career-list">
                        {role.responsibilities.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="career-subheading">{role.skillsHeading}</span>
                      <ul className="career-list">
                        {role.skills.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    {role.qualification && (
                      <div>
                        <span className="career-subheading">Qualification &amp; Experience</span>
                        <ul className="career-list">
                          {role.qualification.map((q) => (
                            <li key={q}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="career-apply">
                      <span>If this opportunity aligns with your career goals, share your updated resume:</span>
                      <a href="mailto:hr@empaysoft.com">hr@empaysoft.com ↗</a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
