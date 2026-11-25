import React, { useState, FormEvent } from "react";

export const ContactSection: React.FC = () => {
  const [selectedPills, setSelectedPills] = useState<string[]>(["MARS"]);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const togglePill = (name: string) => {
    setSelectedPills((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const handleDemoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    console.log("Business Enquiry Submitted:", {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      solutions: selectedPills,
    });
    setDemoSubmitted(true);
    form.reset();
  };

  return (
    <section className="contact-section" id="contact" style={{ padding: "clamp(3rem, 6vw, 6rem) 0" }} data-theme-trigger="dark">
      <div className="container">
        <div className="footer-bento">
          <div className="footer-card footer-card--status">
            <div className="footer-status-pill">
              <span className="status-dot" />
              <span>Empay Software Solutions Private Limited</span>
            </div>
            <h3>Cutting-edge solutions for electronic &amp; mobile payments.</h3>
            <p>
              Our goal is to help our clients become and stay industry leaders by offering ground-breaking and practical solutions in the transaction processing and payment services sectors.
            </p>
            <div className="footer-compliance">
              <span>EST. 2008</span>
              <span>PA-DSS CERTIFIED</span>
              <span>KOCHI SEZ</span>
            </div>
          </div>

          <div className="footer-card footer-card--channels">
            <a href="tel:04844865189" className="channel-row">
              <div>
                <span className="eyebrow">CONTACT NO · MOBILE: 9037756027</span>
                <strong>0484 486 5189</strong>
              </div>
              <span className="channel-row__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href="mailto:solutions@empaysoft.com" className="channel-row">
              <div>
                <span className="eyebrow">BUSINESS ENQUIRIES</span>
                <strong>solutions@empaysoft.com</strong>
              </div>
              <span className="channel-row__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href="mailto:hr@empaysoft.com" className="channel-row">
              <div>
                <span className="eyebrow">HR ENQUIRIES</span>
                <strong>hr@empaysoft.com</strong>
              </div>
              <span className="channel-row__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <div className="channel-row">
              <div>
                <span className="eyebrow">LOCATION</span>
                <strong style={{ fontSize: "0.92rem", lineHeight: 1.35 }}>
                  Lulu IT Twin Tower SmartCity (Kochi) SEZ, Infopark Rd, P.O, Kakkanad, Kochi, Kerala 682042
                </strong>
              </div>
            </div>
          </div>

          <div className="footer-card footer-card--cta">
            <span className="eyebrow eyebrow--dark">BUSINESS ENQUIRY</span>
            <h3>Select a solution</h3>
            <div className="footer-pills" id="footer-pills">
              {["MARS", "ReconPlus", "Consulting", "Support"].map((pill) => (
                <button
                  type="button"
                  key={pill}
                  className={`select-pill ${selectedPills.includes(pill) ? "is-selected" : ""}`}
                  onClick={() => togglePill(pill)}
                >
                  {pill}
                </button>
              ))}
            </div>
            <form className="footer-form" id="demo-form" onSubmit={handleDemoSubmit}>
              <div className="footer-form__fields">
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your Name"
                  aria-label="Full Name"
                />
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Work Email (you@company.com)"
                  aria-label="Work email address"
                />
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="Mobile / Contact Number"
                  aria-label="Mobile Number"
                />
              </div>
              <button type="submit" className="pill-btn pill-btn--navy footer-form__submit" data-magnetic>
                <span className="pill-btn__content">
                  {demoSubmitted ? "Enquiry Sent ✓" : "Send Enquiry ↗"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
