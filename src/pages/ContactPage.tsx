import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "MARS & ReconPlus Suite",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us & Request Demo | Empay Software";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="dedicated-page contact-page">
      {/* Hero Section */}
      <section className="page-hero" data-theme-trigger="light">
        <div className="container">
          <div className="page-hero__badge">
            <span className="live-dot-pulse" aria-hidden="true" />
            <span>CONTACT &amp; ENQUIRIES</span>
            <span className="chip-sep">/</span>
            <span>GET IN TOUCH</span>
          </div>

          <h1 className="page-hero__title">
            Let's discuss your <br />
            <span className="text-accent">payment infrastructure</span> roadmap.
          </h1>

          <p className="page-hero__lead">
            Whether you want a live product walkthrough of MARS or ReconPlus, an architectural consulting review, 
            or have an enterprise inquiry, our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="page-section" data-theme-trigger="light">
        <div className="container">
          <div className="contact-main-grid">
            {/* Left: Office & Channels Info */}
            <div className="contact-info-col">
              <div className="office-card">
                <span className="pill-eyebrow">HEADQUARTERS</span>
                <h3>Empay Software Solutions Pvt. Ltd.</h3>
                <address className="office-address">
                  Lulu IT Twin Tower, SmartCity (Kochi) SEZ,<br />
                  Infopark Road, P.O, Kakkanad,<br />
                  Kochi, Kerala 682042, India
                </address>

                <div className="office-meta-list">
                  <div className="meta-row">
                    <span className="meta-icon">🏢</span>
                    <div>
                      <strong>Office Campus</strong>
                      <p>SmartCity Kochi Special Economic Zone (SEZ)</p>
                    </div>
                  </div>

                  <div className="meta-row">
                    <span className="meta-icon">🕒</span>
                    <div>
                      <strong>Business Hours</strong>
                      <p>Monday – Friday: 09:00 AM – 06:00 PM IST</p>
                    </div>
                  </div>

                  <div className="meta-row">
                    <span className="meta-icon">🛡️</span>
                    <div>
                      <strong>Security Standard</strong>
                      <p>PA-DSS Certified Engineering Facility</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Contact Channels */}
              <div className="channels-card">
                <h4>Department Channels</h4>

                <div className="dept-item">
                  <div className="dept-icon">💼</div>
                  <div className="dept-info">
                    <strong>Enterprise Sales &amp; Demos</strong>
                    <p>Enquire about MARS or ReconPlus deployments</p>
                    <a href="mailto:sales@empaysoftware.com" className="dept-email">
                      sales@empaysoftware.com ↗
                    </a>
                  </div>
                </div>

                <div className="dept-item">
                  <div className="dept-icon">👥</div>
                  <div className="dept-info">
                    <strong>Careers &amp; Talent Acquisition</strong>
                    <p>Submit resumes or check application status</p>
                    <a href="mailto:careers@empaysoftware.com" className="dept-email">
                      careers@empaysoftware.com ↗
                    </a>
                  </div>
                </div>

                <div className="dept-item">
                  <div className="dept-icon">⚙️</div>
                  <div className="dept-info">
                    <strong>Technical Operations &amp; Support</strong>
                    <p>For existing bank client SLA support</p>
                    <a href="mailto:support@empaysoftware.com" className="dept-email">
                      support@empaysoftware.com ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Demo & Inquiry Form */}
            <div className="contact-form-col">
              <div className="form-container-card">
                {submitted ? (
                  <div className="form-success-box">
                    <div className="success-icon">✓</div>
                    <h3>Thank you for reaching out, {formData.name}!</h3>
                    <p>
                      Your demonstration and inquiry request has been received. One of our senior payment system 
                      specialists will contact you at <strong>{formData.email}</strong> within 24 business hours.
                    </p>
                    <button
                      type="button"
                      className="pill-btn pill-btn--orange"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          product: "MARS & ReconPlus Suite",
                          message: "",
                        });
                      }}
                    >
                      <span>Send Another Request ↗</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-header">
                      <span className="pill-eyebrow">DEMO REQUEST</span>
                      <h2>Schedule a Technical Walkthrough</h2>
                      <p>Fill out the form below to connect directly with our FinTech solutions team.</p>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="contact-name">Full Name *</label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Rahul Menon"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="contact-email">Work Email *</label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          placeholder="name@bank.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="contact-phone">Phone Number</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="contact-company">Organization / Bank Name</label>
                        <input
                          id="contact-company"
                          type="text"
                          name="company"
                          placeholder="e.g. Federal Bank, Axis Bank, etc."
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="contact-product">Primary Interest</label>
                      <select
                        id="contact-product"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                      >
                        <option value="MARS & ReconPlus Suite">MARS &amp; ReconPlus Combined Suite</option>
                        <option value="MARS (Merchant Acquiring)">MARS (Merchant Acquiring &amp; Billing)</option>
                        <option value="ReconPlus (Reconciliation)">ReconPlus (Automated Transaction Reconciliation)</option>
                        <option value="Switching & Architecture Consulting">EFT Switching &amp; Architecture Consulting</option>
                        <option value="Scheme Clearing (Visa/MC/RuPay/Amex)">Scheme Clearing &amp; Settlement Solutions</option>
                        <option value="General Corporate Enquiry">General Corporate Enquiry</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="contact-message">Project Notes / Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about your transaction volume, channels (POS/IPG/ATM), or reconciliation requirements..."
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="pill-btn pill-btn--orange form-submit-btn">
                      <span>Submit Demonstration Request ↗</span>
                    </button>

                    <p className="form-disclaimer">
                      🔒 Your information is confidential and will strictly be used to coordinate your platform demo.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Strip */}
      <section className="page-cta-strip">
        <div className="container">
          <div className="cta-box">
            <div>
              <h2>Looking for careers or open roles?</h2>
              <p>Explore opportunities at our SmartCity Kochi SEZ campus and apply online.</p>
            </div>
            <div className="cta-actions">
              <Link to="/careers" className="pill-btn pill-btn--orange">
                <span>View Open Positions ↗</span>
              </Link>
              <Link to="/about" className="ghost-pill-btn">
                <span>About Empay →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

