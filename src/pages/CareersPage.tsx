import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CAREER_ROLES } from "../data/empayData";

export const CareersPage: React.FC = () => {
  const [openJobId, setOpenJobId] = useState<string | null>(CAREER_ROLES[0]?.id || null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [applyModalRole, setApplyModalRole] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Careers | Build FinTech at Empay Software | Kochi";
  }, []);

  const toggleJob = (id: string) => {
    setOpenJobId((prev) => (prev === id ? null : id));
  };

  const perks = [
    {
      icon: "🏢",
      title: "SmartCity SEZ Campus",
      desc: "Work in a world-class IT infrastructure at Lulu IT Twin Tower, SmartCity Kochi, with high-speed fiber, green surroundings, and modern amenities.",
    },
    {
      icon: "⚡",
      title: "Mission-Critical FinTech",
      desc: "Build payment switches and reconciliation engines that power tier-1 banks, handling millions of daily real-time financial transactions.",
    },
    {
      icon: "📈",
      title: "Career Growth & Mentorship",
      desc: "Work directly alongside senior architects and technical leaders with decades of global FinTech and electronic payments expertise.",
    },
    {
      icon: "🛡️",
      title: "Competitive Compensation & Health",
      desc: "Industry-leading remuneration packages, comprehensive medical insurance coverage for employees and families, and annual performance rewards.",
    },
    {
      icon: "💻",
      title: "Top-Tier Workstations",
      desc: "Equipped with high-performance hardware, multi-monitor setups, and modern engineering tools (IntelliJ IDEA, Docker, Git, cloud environments).",
    },
    {
      icon: "🤝",
      title: "Collaborative Culture",
      desc: "A transparent, ego-free engineering environment focused on clean code, SOLID design principles, peer code reviews, and technical excellence.",
    },
  ];

  const filteredRoles = CAREER_ROLES.filter((role) => {
    if (categoryFilter === "all") return true;
    if (categoryFilter === "leadership") return role.title.toLowerCase().includes("lead") || role.title.toLowerCase().includes("manager");
    if (categoryFilter === "engineering") return role.title.toLowerCase().includes("developer") || role.title.toLowerCase().includes("java") || role.title.toLowerCase().includes("react");
    if (categoryFilter === "qa") return role.title.toLowerCase().includes("qa");
    if (categoryFilter === "analyst") return role.title.toLowerCase().includes("analyst");
    return true;
  });

  return (
    <div className="dedicated-page careers-page">
      {/* Hero Section */}
      <section className="page-hero" data-theme-trigger="light">
        <div className="container">
          <div className="page-hero__badge">
            <span className="live-dot-pulse" aria-hidden="true" />
            <span>WE ARE HIRING</span>
            <span className="chip-sep">/</span>
            <span>SMARTCITY, KOCHI</span>
          </div>

          <h1 className="page-hero__title">
            Build the next generation of <br />
            <span className="text-accent">FinTech engineering</span> with us.
          </h1>

          <p className="page-hero__lead">
            Join our high-caliber technology team at Lulu IT Twin Tower, SmartCity Kochi. 
            We are looking for exceptional engineers, technical leads, QA specialists, and business analysts 
            passionate about building ultra-reliable payment systems.
          </p>

          <div className="page-hero__stats">
            <div className="stat-card">
              <span className="stat-card__num">{CAREER_ROLES.length}</span>
              <span className="stat-card__label">Active Openings</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">SmartCity</span>
              <span className="stat-card__label">SEZ Campus, Kochi</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">WFO</span>
              <span className="stat-card__label">Mandatory Work Mode</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num">Immediate</span>
              <span className="stat-card__label">Hiring Priority</span>
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Perks Section */}
      <section className="page-section bg-alt" data-theme-trigger="light">
        <div className="container">
          <div className="section-head text-center">
            <span className="pill-eyebrow">LIFE AT EMPAY</span>
            <h2>Why engineers thrive at Empay.</h2>
            <p className="section-sub">Where deep technical craft meets real-world financial scale and impact.</p>
          </div>

          <div className="perks-grid">
            {perks.map((perk, idx) => (
              <div key={idx} className="perk-card">
                <div className="perk-card__icon">{perk.icon}</div>
                <h3>{perk.title}</h3>
                <p>{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="page-section" id="openings" data-theme-trigger="light">
        <div className="container">
          <div className="section-head">
            <span className="pill-eyebrow">CURRENT OPENINGS</span>
            <h2>Explore open career opportunities.</h2>
            <p className="section-sub">
              All roles are based at our Lulu IT Twin Tower, SmartCity (Kochi) SEZ facility. Work From Office is mandatory.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="career-filter-tabs">
            <button
              type="button"
              className={`filter-tab ${categoryFilter === "all" ? "is-active" : ""}`}
              onClick={() => setCategoryFilter("all")}
            >
              All Roles ({CAREER_ROLES.length})
            </button>
            <button
              type="button"
              className={`filter-tab ${categoryFilter === "engineering" ? "is-active" : ""}`}
              onClick={() => setCategoryFilter("engineering")}
            >
              Software Engineering
            </button>
            <button
              type="button"
              className={`filter-tab ${categoryFilter === "leadership" ? "is-active" : ""}`}
              onClick={() => setCategoryFilter("leadership")}
            >
              Technical Leadership
            </button>
            <button
              type="button"
              className={`filter-tab ${categoryFilter === "qa" ? "is-active" : ""}`}
              onClick={() => setCategoryFilter("qa")}
            >
              Quality Assurance
            </button>
            <button
              type="button"
              className={`filter-tab ${categoryFilter === "analyst" ? "is-active" : ""}`}
              onClick={() => setCategoryFilter("analyst")}
            >
              Business Analysis
            </button>
          </div>

          {/* Job Listings Accordion */}
          <div className="careers-accordion-list">
            {filteredRoles.map((role) => {
              const isOpen = openJobId === role.id;
              return (
                <div key={role.id} className={`career-job-card ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="career-job-header"
                    onClick={() => toggleJob(role.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="career-job-meta">
                      <div className="career-badges">
                        <span className="career-badge career-badge--exp">{role.experience}</span>
                        <span className="career-badge career-badge--loc">{role.location}</span>
                        <span className="career-badge career-badge--mode">{role.workMode}</span>
                      </div>
                      <h3 className="career-job-title">{role.title}</h3>
                    </div>
                    <span className="career-accordion-arrow">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="career-job-body">
                      <div className="job-overview-box">
                        <h4>Role Summary</h4>
                        <p>{role.summary}</p>
                      </div>

                      <div className="job-details-grid">
                        <div className="job-col">
                          <h4>Key Responsibilities</h4>
                          <ul className="job-bullet-list">
                            {role.responsibilities.map((resp, rIdx) => (
                              <li key={rIdx}>{resp}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="job-col">
                          <h4>{role.skillsHeading}</h4>
                          <ul className="job-bullet-list">
                            {role.skills.map((skill, sIdx) => (
                              <li key={sIdx}>{skill}</li>
                            ))}
                          </ul>

                          {role.qualification && role.qualification.length > 0 && (
                            <div className="job-sub-block">
                              <h4>Qualifications &amp; Experience</h4>
                              <ul className="job-bullet-list">
                                {role.qualification.map((q, qIdx) => (
                                  <li key={qIdx}>{q}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="job-apply-footer">
                        <div className="job-apply-note">
                          <span>📧 Send your updated resume directly to: </span>
                          <a href="mailto:careers@empaysoftware.com?subject=Job Application: " className="highlight-email">
                            careers@empaysoftware.com
                          </a>
                        </div>
                        <button
                          type="button"
                          className="pill-btn pill-btn--orange"
                          onClick={() => setApplyModalRole(role.title)}
                        >
                          <span>Apply for this Role ↗</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Candidate FAQ */}
      <section className="page-section bg-alt" data-theme-trigger="light">
        <div className="container">
          <div className="section-head text-center">
            <span className="pill-eyebrow">CANDIDATE FAQ</span>
            <h2>Frequently asked questions.</h2>
          </div>

          <div className="career-faq-grid">
            <div className="faq-card">
              <h4>What is the interview process like?</h4>
              <p>
                Our process typically consists of an initial recruiter discussion, a technical screening interview, a deep architectural and hands-on coding discussion with our senior leads, and a final leadership alignment conversation.
              </p>
            </div>
            <div className="faq-card">
              <h4>Is Work From Office mandatory?</h4>
              <p>
                Yes. Due to the high-security requirements of bank payment systems and PA-DSS compliance guidelines, all engineering roles operate full-time on-site from our secure SmartCity Kochi SEZ facility.
              </p>
            </div>
            <div className="faq-card">
              <h4>What should I prepare for a technical interview?</h4>
              <p>
                Focus on Core Java concepts, Object-Oriented Design, SOLID principles, Spring Boot internals, relational SQL query design, REST APIs, and system design for distributed high-throughput applications.
              </p>
            </div>
            <div className="faq-card">
              <h4>How soon can I expect feedback?</h4>
              <p>
                Our talent acquisition team typically reviews all resumes within 48-72 business hours and contacts shortlisted candidates immediately for screening rounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {applyModalRole && (
        <div className="career-modal-backdrop" onClick={() => setApplyModalRole(null)}>
          <div className="career-modal" onClick={(e) => e.stopPropagation()}>
            <div className="career-modal__header">
              <div>
                <span className="pill-eyebrow">APPLICATION INSTRUCTIONS</span>
                <h3>{applyModalRole}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setApplyModalRole(null)}
              >
                ✕
              </button>
            </div>
            <div className="career-modal__body">
              <p>
                To apply for this position, please email your updated CV/Resume along with the following information:
              </p>
              <ul className="modal-checklist">
                <li>Your current CTC &amp; expected CTC</li>
                <li>Your official notice period / earliest joining date</li>
                <li>Summary of your relevant years of experience</li>
                <li>Confirmation of availability to work full-time from our SmartCity Kochi SEZ office</li>
              </ul>
              <div className="modal-email-box">
                <span>Direct Application Email:</span>
                <a
                  href={`mailto:careers@empaysoftware.com?subject=${encodeURIComponent(
                    `Application for: ${applyModalRole}`
                  )}&body=${encodeURIComponent(
                    `Hi Empay Careers Team,\n\nPlease find attached my resume for the position of ${applyModalRole}.\n\nCurrent CTC:\nExpected CTC:\nNotice Period:\nCurrent Location:\n`
                  )}`}
                  className="pill-btn pill-btn--orange"
                >
                  <span>Open Email Client (careers@empaysoftware.com) ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="page-cta-strip">
        <div className="container">
          <div className="cta-box">
            <div>
              <h2>Don't see an exact match?</h2>
              <p>We are always eager to meet talented FinTech engineers. Send your resume to our talent network.</p>
            </div>
            <div className="cta-actions">
              <a
                href="mailto:careers@empaysoftware.com?subject=General Application / Talent Network"
                className="pill-btn pill-btn--orange"
              >
                <span>Send Open Application ↗</span>
              </a>
              <Link to="/about" className="ghost-pill-btn">
                <span>Learn More About Us →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
