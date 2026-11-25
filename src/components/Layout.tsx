import React, { useState, useEffect, useRef, useMemo, FormEvent } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import empayLogo from "../assets/empay-logo.png";
import { WHAT_WE_OFFER } from "../data/empayData";
import { ChatBot } from "./ChatBot";

gsap.registerPlugin(ScrollTrigger);

export const Layout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuDepth, setMenuDepth] = useState<0 | 1>(0);
  const [selectedPills, setSelectedPills] = useState<string[]>(["MARS"]);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Initialize Lenis + ScrollTrigger sync
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.8,
        wheelMultiplier: 0.95,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    // Scroll progress & header hide/show listener
    let lastScrollY = window.scrollY;
    const siteHeader = document.getElementById("site-header");
    const floatTop = document.getElementById("float-top");
    const floatTopArc = document.getElementById("float-top-arc");

    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      if (floatTopArc) {
        floatTopArc.style.strokeDashoffset = String(131.95 * (1 - progress));
      }
      if (floatTop) {
        floatTop.classList.toggle("is-visible", scrollY > 420);
      }
      if (siteHeader) {
        siteHeader.classList.toggle("is-scrolled", scrollY > 40);
        if (scrollY > 200 && scrollY > lastScrollY + 6) {
          siteHeader.classList.add("is-hidden");
        } else if (scrollY < lastScrollY - 4 || scrollY <= 200) {
          siteHeader.classList.remove("is-hidden");
        }
        lastScrollY = scrollY;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  // Handle route change: scroll to top & close menu & refresh triggers
  useEffect(() => {
    setMenuOpen(false);
    setMenuDepth(0);
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
    setTimeout(() => setMenuDepth(0), 400);
  };

  const handleNavigate = (target: string | number) => {
    closeMenu();

    if (typeof target === "number") {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { duration: 1.2 });
      } else {
        window.scrollTo({ top: target, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
      return;
    }

    // Hash navigation (e.g. #pricing, #service, #footer)
    if (target.startsWith("#")) {
      const el = document.querySelector(target);
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target, { duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
        }
        return;
      }

      // Map hash to dedicated route if not on homepage
      const hashMap: Record<string, string> = {
        "#about": "/about",
        "#service": "/services",
        "#pricing": "/products",
        "#product-mars": "/products",
        "#product-reconplus": "/products",
        "#portfolio": "/clients",
        "#partners": "/partners",
        "#career": "/careers",
        "#footer": "/contact",
      };
      if (hashMap[target]) {
        navigate(hashMap[target]);
        return;
      }
    }

    // Direct path navigation (/about, /careers, etc.)
    if (target.startsWith("/")) {
      if (location.pathname === target) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(target);
      }
    }
  };

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
    <>
      {/* FIXED HEADER */}
      <header className="site-header" id="site-header">
        <div className="site-header__inner">
          <Link
            to="/"
            className="brand-logo"
            aria-label="emPay Software Home"
            data-magnetic
            data-cursor="HOME"
            onClick={() => handleNavigate("/")}
          >
            <img src={empayLogo} alt="emPay Software" className="brand-logo__img" />
          </Link>

          <nav className="header-actions" aria-label="Primary actions">
            <Link
              to="/contact"
              className="pill-btn pill-btn--orange scribble-host"
              data-magnetic
              data-cursor="CONTACT"
              onClick={() => handleNavigate("/contact")}
            >
              <span className="scribble-bg" aria-hidden="true">
                <svg viewBox="0 0 120 44" preserveAspectRatio="none">
                  <path pathLength={1} d="M-4,22 C14,6 24,38 44,18 C64,-2 72,42 92,20 C106,4 114,32 126,20" />
                </svg>
              </span>
              <span className="pill-btn__content">
                <span className="text-slide" data-text="Request Demo">
                  <span>Request Demo</span>
                </span>
                <span className="pill-btn__arrow" aria-hidden="true">
                  ↗
                </span>
              </span>
            </Link>

            <button
              type="button"
              className="pill-btn pill-btn--navy scribble-host"
              id="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="stacked-menu"
              data-magnetic
              data-cursor="MENU"
              onClick={() => setMenuOpen(true)}
            >
              <span className="scribble-bg" aria-hidden="true">
                <svg viewBox="0 0 120 44" preserveAspectRatio="none">
                  <path pathLength={1} d="M-4,24 C16,8 28,38 50,18 C72,0 82,40 104,18 C114,8 120,26 126,20" />
                </svg>
              </span>
              <span className="pill-btn__content">
                <span className="burger-lines" aria-hidden="true">
                  <span />
                  <span />
                </span>
                <span>Menu</span>
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* Click-outside backdrop for menu */}
      <div
        className={`menu-backdrop ${menuOpen ? "is-active" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* STACKED MULTI-COLUMN MENU DRAWER */}
      <aside
        className="stacked-menu"
        id="stacked-menu"
        data-depth={menuDepth}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Site Navigation"
      >
        <div className="stacked-menu__topbar">
          <div className="stacked-menu__nav-left">
            <button
              type="button"
              className="menu-pill menu-pill--back"
              id="menu-back"
              data-magnetic
              onClick={() => setMenuDepth(0)}
            >
              <span aria-hidden="true">←</span> Back
            </button>
            <div className="stacked-menu__crumbs" id="menu-crumbs">
              <span className="is-active">
                {menuDepth === 0 ? "Overview" : "Overview / Products"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="menu-pill menu-pill--close"
            id="menu-close"
            data-magnetic
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <span>Close</span>
            <span className="menu-pill__x" aria-hidden="true">
              ×
            </span>
          </button>
        </div>

        <div className="stacked-menu__stage">
          <div className="stacked-menu__track">
            <div className="stacked-menu__col stacked-menu__col--root" aria-hidden={menuDepth !== 0}>
              <span className="eyebrow eyebrow--orange">NAVIGATION</span>
              <ul className="stacked-menu__list">
                <li>
                  <Link
                    to="/"
                    className="stacked-menu__link"
                    onClick={() => handleNavigate("/")}
                  >
                    <span className="stacked-menu__title">Home</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="stacked-menu__link"
                    onClick={() => handleNavigate("/about")}
                  >
                    <span className="stacked-menu__title">About</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="stacked-menu__link"
                    onClick={() => handleNavigate("/services")}
                  >
                    <span className="stacked-menu__title">Services</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="stacked-menu__link stacked-menu__link--sub"
                    id="open-products-sub"
                    onClick={() => setMenuDepth(1)}
                  >
                    <span className="stacked-menu__title">Products</span>
                    <span className="stacked-menu__badge stacked-menu__badge--outline">→</span>
                  </button>
                </li>
                <li>
                  <Link
                    to="/clients"
                    className="stacked-menu__link"
                    onClick={() => handleNavigate("/clients")}
                  >
                    <span className="stacked-menu__title">Clients</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partners"
                    className="stacked-menu__link"
                    onClick={() => handleNavigate("/partners")}
                  >
                    <span className="stacked-menu__title">Partners</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="stacked-menu__link"
                    onClick={() => handleNavigate("/careers")}
                  >
                    <span className="stacked-menu__title">Careers</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="stacked-menu__link"
                    onClick={() => handleNavigate("/contact")}
                  >
                    <span className="stacked-menu__title">Contact</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
              </ul>

              <div className="stacked-menu__card">
                <div className="stacked-menu__card-meta">
                  <span className="status-dot" />
                  <span>SmartCity, Kochi · Est. 2008</span>
                </div>
                <p>Connect with Empay Software Solutions Private Limited at solutions@empaysoft.com or 0484 486 5189.</p>
                <Link
                  to="/contact"
                  className="pill-btn pill-btn--orange pill-btn--sm"
                  onClick={() => handleNavigate("/contact")}
                >
                  <span className="pill-btn__content">Contact Us ↗</span>
                </Link>
              </div>
            </div>

            <div className="stacked-menu__col stacked-menu__col--sub" aria-hidden={menuDepth === 0}>
              <span className="eyebrow eyebrow--orange">IT&apos;S WHAT WE DO</span>
              <ul className="stacked-menu__list">
                <li>
                  <Link
                    to="/products"
                    className="stacked-menu__link"
                    onClick={() => handleNavigate("/products")}
                  >
                    <div>
                      <span className="stacked-menu__title">MARS</span>
                      <small>Merchant Acquiring &amp; Reconciliation System</small>
                    </div>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="stacked-menu__link"
                    onClick={() => handleNavigate("/products")}
                  >
                    <div>
                      <span className="stacked-menu__title">ReconPlus</span>
                      <small>Card Transaction Reconciliation System</small>
                    </div>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
              </ul>

              <div className="stacked-menu__wireframe" aria-hidden="true">
                <svg viewBox="0 0 360 130" fill="none">
                  <rect x="1" y="1" width="358" height="128" rx="14" stroke="rgba(255,85,0,0.35)" strokeDasharray="4 4" />
                  <path d="M24 92 C84 92, 92 38, 160 38 C228 38, 240 82, 332 42" stroke="#FF5500" strokeWidth="2" />
                  <circle cx="160" cy="38" r="5" fill="#FF5500" />
                  <circle cx="332" cy="42" r="5" fill="#FFFFFF" />
                  <text x="24" y="28" fill="#FF5500" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" fontSize="11">
                    EMPAY_UNIFIED_RAIL // 99.998% SLA
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT SHELL */}
      <div className="page-shell" id="page-shell">
        <main id="main-content">
          <Outlet context={{ onNavigate: handleNavigate }} />
        </main>

        {/* =====================================================
            FOOTER BENTO (Connect, Quick Links & Services)
            ===================================================== */}
        <footer className="site-footer" id="footer" data-theme-trigger="dark">
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
                      id="demo-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Your Name"
                      aria-label="Full Name"
                    />
                    <input
                      id="demo-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Work Email (you@company.com)"
                      aria-label="Work email address"
                    />
                    <input
                      id="demo-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="Mobile / Contact Number"
                      aria-label="Mobile Number"
                    />
                  </div>
                  <button type="submit" className="pill-btn pill-btn--navy footer-form__submit" data-magnetic>
                    <span className="pill-btn__content" id="demo-submit-label">
                      {demoSubmitted ? "Enquiry Sent ✓" : "Send Enquiry ↗"}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="footer-links">
                <div>
                  <span className="eyebrow">QUICK LINKS</span>
                  {[
                    { label: "Home", href: "/" },
                    { label: "About", href: "/about" },
                    { label: "Services", href: "/services" },
                    { label: "Products", href: "/products" },
                    { label: "Clients", href: "/clients" },
                    { label: "Partners", href: "/partners" },
                    { label: "Careers", href: "/careers" },
                    { label: "Contact", href: "/contact" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="text-slide"
                      data-text={item.label}
                      onClick={() => handleNavigate(item.href)}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
                <div>
                  <span className="eyebrow">SERVICES</span>
                  <div className="footer-services-grid">
                    {WHAT_WE_OFFER.map((srv) => (
                      <Link
                        key={srv.name}
                        to="/services"
                        className="text-slide"
                        data-text={srv.name}
                        onClick={() => handleNavigate("/services")}
                      >
                        <span>{srv.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="footer-brand-badge">
                <img src={empayLogo} alt="emPay Software" className="footer-logo-img" />
              </div>
            </div>

            <div className="footer-legal">
              <span>2025 © Empay Software Solutions. All Rights Reserved.</span>
              <button
                type="button"
                className="back-top-link"
                id="footer-top-btn"
                onClick={() => handleNavigate(0)}
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Persistent Circular Scroll-Progress Back-to-Top Button */}
      <button
        type="button"
        className="float-top"
        id="float-top"
        aria-label="Scroll back to top"
        data-magnetic
        onClick={() => handleNavigate(0)}
      >
        <svg viewBox="0 0 48 48" className="float-top__ring" aria-hidden="true">
          <circle cx="24" cy="24" r="21" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" fill="none" />
          <circle
            id="float-top-arc"
            cx="24"
            cy="24"
            r="21"
            stroke="#FF5500"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="131.95"
            strokeDashoffset="131.95"
            transform="rotate(-90 24 24)"
          />
        </svg>
        <span aria-hidden="true">↑</span>
      </button>

      {/* Predefined Interactive Bottom-Right Chat Bot */}
      <ChatBot onNavigate={(href) => handleNavigate(href)} />
    </>
  );
};
