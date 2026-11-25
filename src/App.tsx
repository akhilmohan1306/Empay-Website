import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import empayLogo from "./assets/empay-logo.png";
import { ChatBot } from "./components/ChatBot";
import { WHAT_WE_OFFER } from "./data/empayData";

// Pages
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ServicesPage } from "./pages/ServicesPage";
import { CareersPage } from "./pages/CareersPage";
import { ClientsPage } from "./pages/ClientsPage";
import { ContactPage } from "./pages/ContactPage";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove("menu-open");
    if (pathname !== "/") {
      document.documentElement.setAttribute("data-theme", "light");
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [preDone, setPreDone] = useState(false);
  const [prePct, setPrePct] = useState(0);
  const [preLeaving, setPreLeaving] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuDepth, setMenuDepth] = useState<0 | 1>(0);
  const [selectedPills, setSelectedPills] = useState<string[]>(["MARS"]);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  const prefersReducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Preloader sequence + Lenis smooth scroll + GSAP ScrollTrigger choreography
  useEffect(() => {
    document.documentElement.classList.add("is-preloading");

    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
    }

    const animateHeroEntrance = () => {
      if (prefersReducedMotion) return;
      gsap.fromTo(
        ".hero__eyebrow-chip",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        ".title-word",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.06, ease: "power4.out", delay: 0.08 }
      );
      gsap.fromTo(
        ".hero__editorial-sub, .hero__product-capsule-dock",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, delay: 0.25, ease: "power3.out" }
      );
    };

    // 900ms editorial preloader
    let preRafId: number | null = null;
    let leaveTimerId: number | null = null;
    let removeTimerId: number | null = null;

    if (prefersReducedMotion) {
      document.documentElement.classList.remove("is-preloading");
      setPreDone(true);
      lenis?.start();
    } else {
      const start = performance.now();
      const duration = 900;
      const tick = (now: number) => {
        const progress = Math.max(0, Math.min(1, (now - start) / duration));
        const eased = 1 - Math.pow(1 - progress, 3);
        setPrePct(Math.round(eased * 100));
        if (progress < 1) {
          preRafId = requestAnimationFrame(tick);
        } else {
          setPreLeaving(true);
          document.documentElement.classList.remove("is-preloading");
          lenis?.start();
          leaveTimerId = window.setTimeout(animateHeroEntrance, 180);
          removeTimerId = window.setTimeout(() => {
            setPreDone(true);
            ScrollTrigger.refresh();
          }, 760);
        }
      };
      preRafId = requestAnimationFrame(tick);
    }

    // GSAP ScrollTrigger animations
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        document.querySelectorAll<HTMLElement>(".mask-frame").forEach((m) => {
          m.style.clipPath = "inset(0% 0% 0% 0% round 24px)";
        });
        document.querySelectorAll(".scrub-c").forEach((c) => c.classList.add("is-done"));
        return;
      }

      const progressBar = document.getElementById("scroll-progress-bar");
      const floatTop = document.getElementById("float-top");
      const floatArc = document.getElementById("float-top-arc");
      const siteHeader = document.getElementById("site-header");
      let lastScrollY = window.scrollY;

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const p = self.progress;
          if (progressBar) progressBar.style.transform = `scaleX(${p})`;
          if (floatArc) floatArc.style.strokeDashoffset = String(131.95 * (1 - p));
          if (floatTop) floatTop.classList.toggle("is-visible", window.scrollY > 420);

          if (siteHeader) {
            const currY = window.scrollY;
            siteHeader.classList.toggle("is-scrolled", currY > 40);
            if (currY > 200 && currY > lastScrollY + 6) {
              siteHeader.classList.add("is-hidden");
            } else if (currY < lastScrollY - 4 || currY <= 200) {
              siteHeader.classList.remove("is-hidden");
            }
            lastScrollY = currY;
          }
        },
      });

      document.querySelectorAll<HTMLElement>("[data-theme-trigger]").forEach((sec) => {
        const theme = sec.getAttribute("data-theme-trigger") || "light";
        ScrollTrigger.create({
          trigger: sec,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => document.documentElement.setAttribute("data-theme", theme),
          onEnterBack: () => document.documentElement.setAttribute("data-theme", theme),
        });
      });

      // Section 1: About text reveal
      const aboutSec = document.getElementById("about");
      if (aboutSec) {
        const chars = document.querySelectorAll(".scrub-c");
        if (chars.length) {
          gsap.to(chars, {
            scrollTrigger: {
              trigger: aboutSec,
              start: "top top",
              end: "+=120%",
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
            },
            opacity: 1,
            stagger: 0.015,
            ease: "none",
          });
        }
      }

      // Horizontal Scroll Section S5
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        const hSec = document.getElementById("business");
        const hTrack = document.getElementById("hscroll-track");
        const hBar = document.getElementById("hscroll-progress-bar");
        if (hSec && hTrack) {
          gsap.to(hTrack, {
            x: () => -(hTrack.scrollWidth - window.innerWidth + 140),
            ease: "none",
            scrollTrigger: {
              trigger: hSec,
              pin: true,
              start: "top top",
              end: () => `+=${Math.max(1400, hTrack.scrollWidth - window.innerWidth + 300)}`,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onEnter: () => document.documentElement.setAttribute("data-theme", "dark"),
              onEnterBack: () => document.documentElement.setAttribute("data-theme", "dark"),
              onUpdate: (self) => {
                if (hBar) hBar.style.transform = `scaleX(${self.progress})`;
              },
            },
          });
        }

        const archSec = document.getElementById("architecture");
        const archTrack = document.getElementById("arch-detail-track");
        const archBar = document.getElementById("arch-progress-bar");
        if (archSec && archTrack) {
          ScrollTrigger.create({
            trigger: archSec,
            pin: true,
            start: "top top",
            end: "+=1800",
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => document.documentElement.setAttribute("data-theme", "dark"),
            onEnterBack: () => document.documentElement.setAttribute("data-theme", "dark"),
            onUpdate: (self) => {
              const nodeIdx = Math.min(5, Math.floor(self.progress * 6));
              const nodeBtn = document.querySelector<HTMLButtonElement>(`[data-arch-node="${nodeIdx}"]`);
              if (nodeBtn) nodeBtn.click();
              if (archBar) archBar.style.transform = `scaleX(${self.progress})`;
            },
          });
        }
      });
    });

    return () => {
      ctx.revert();
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      lenisRef.current = null;
      if (preRafId !== null) cancelAnimationFrame(preRafId);
      if (leaveTimerId !== null) clearTimeout(leaveTimerId);
      if (removeTimerId !== null) clearTimeout(removeTimerId);
    };
  }, [prefersReducedMotion, location.pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
    document.documentElement.classList.remove("menu-open");
    setTimeout(() => setMenuDepth(0), 400);
  };

  const handleNavigation = (target: string | number) => {
    closeMenu();
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
      if (lenisRef.current) lenisRef.current.scrollTo(target);
      return;
    }

    if (target.startsWith("/")) {
      navigate(target);
      window.scrollTo(0, 0);
      if (lenisRef.current) lenisRef.current.scrollTo(0);
      return;
    }

    if (target.startsWith("#")) {
      const anchorMap: Record<string, string> = {
        "#about": "/about",
        "#pricing": "/products",
        "#product-mars": "/products?tab=mars",
        "#product-reconplus": "/products?tab=reconplus",
        "#service": "/services",
        "#career": "/careers",
        "#portfolio": "/clients",
        "#partners": "/clients",
        "#footer": "/contact",
      };

      if (location.pathname !== "/") {
        const dest = anchorMap[target] || "/";
        navigate(dest);
        window.scrollTo(0, 0);
        return;
      }

      const el = document.querySelector(target);
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el as HTMLElement, { offset: -60, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const togglePill = (pill: string) => {
    setSelectedPills((prev) =>
      prev.includes(pill) ? prev.filter((p) => p !== pill) : [...prev, pill]
    );
  };

  const handleDemoSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => setDemoSubmitted(false), 5000);
  };

  return (
    <>
      <ScrollToTop />

      {/* TOP PROGRESS BAR */}
      <div className="scroll-progress" id="scroll-progress" aria-hidden="true">
        <span id="scroll-progress-bar" />
      </div>

      {/* PRELOADER */}
      {!preDone && (
        <div
          className={`preloader ${preLeaving ? "is-leaving" : ""}`}
          id="preloader"
          aria-hidden="true"
        >
          <div className="preloader__inner">
            <div className="preloader__badge">
              <span className="live-dot-pulse" />
              <span>EMPAY SOFTWARE // INITIALIZING</span>
            </div>
            <div className="preloader__logo">
              <span className="preloader__text">EMPAY</span>
              <span className="preloader__sub">PAYMENT PLATFORMS</span>
            </div>
            <div className="preloader__meter">
              <div
                className="preloader__meter-fill"
                style={{ width: `${prePct}%` }}
              />
            </div>
            <div className="preloader__counter">
              <span>SYSTEM BOOT</span>
              <span>{prePct}%</span>
            </div>
          </div>
        </div>
      )}

      {/* FIXED HEADER */}
      <header className="site-header" id="site-header">
        <div className="site-header__inner">
          <Link
            to="/"
            className="brand-logo"
            aria-label="emPay Software Home"
            data-magnetic
            data-cursor="HOME"
            onClick={() => closeMenu()}
          >
            <img src={empayLogo} alt="emPay Software" className="brand-logo__img" />
          </Link>

          {/* Dedicated Page Desktop Nav Bar */}
          <nav className="header-nav-links" aria-label="Main Navigation">
            <Link to="/about" className="header-nav-link">About</Link>
            <Link to="/products" className="header-nav-link">Products</Link>
            <Link to="/services" className="header-nav-link">Services</Link>
            <Link to="/clients" className="header-nav-link">Clients</Link>
            <Link to="/careers" className="header-nav-link">Careers</Link>
            <Link to="/contact" className="header-nav-link">Contact</Link>
          </nav>

          <nav className="header-actions" aria-label="Primary actions">
            <Link
              to="/contact"
              className="pill-btn pill-btn--orange scribble-host"
              data-magnetic
              data-cursor="CONTACT"
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
              onClick={() => {
                setMenuOpen(true);
                document.documentElement.classList.add("menu-open");
              }}
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
              <span className="eyebrow eyebrow--orange">PAGES &amp; NAVIGATION</span>
              <ul className="stacked-menu__list">
                <li>
                  <Link
                    to="/"
                    className="stacked-menu__link"
                    onClick={() => handleNavigation("/")}
                  >
                    <span className="stacked-menu__title">Home</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="stacked-menu__link"
                    onClick={() => handleNavigation("/about")}
                  >
                    <span className="stacked-menu__title">About Us</span>
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
                    to="/services"
                    className="stacked-menu__link"
                    onClick={() => handleNavigation("/services")}
                  >
                    <span className="stacked-menu__title">Services &amp; Consulting</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/clients"
                    className="stacked-menu__link"
                    onClick={() => handleNavigation("/clients")}
                  >
                    <span className="stacked-menu__title">Clients &amp; Partners</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="stacked-menu__link"
                    onClick={() => handleNavigation("/careers")}
                  >
                    <span className="stacked-menu__title">Careers</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="stacked-menu__link"
                    onClick={() => handleNavigation("/contact")}
                  >
                    <span className="stacked-menu__title">Contact &amp; Demo</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
              </ul>

              <div className="stacked-menu__card">
                <div className="stacked-menu__card-meta">
                  <span className="status-dot" />
                  <span>SmartCity, Kochi · Est. 2008</span>
                </div>
                <p>
                  Specializing in electronic payments, EFT transaction switching, and automated multi-source reconciliation.
                </p>
                <div className="stacked-menu__compliance">
                  <span>PA-DSS CERTIFIED</span>
                  <span>99.998% SLA</span>
                </div>
              </div>
            </div>

            <div className="stacked-menu__col stacked-menu__col--sub" aria-hidden={menuDepth === 0}>
              <span className="eyebrow eyebrow--orange">PRODUCTS SUITE</span>
              <ul className="stacked-menu__list">
                <li>
                  <Link
                    to="/products"
                    className="stacked-menu__link"
                    onClick={() => handleNavigation("/products")}
                  >
                    <div>
                      <span className="stacked-menu__title">All Products</span>
                      <small>Full Platform Overview</small>
                    </div>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?tab=mars"
                    className="stacked-menu__link"
                    onClick={() => handleNavigation("/products?tab=mars")}
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
                    to="/products?tab=reconplus"
                    className="stacked-menu__link"
                    onClick={() => handleNavigation("/products?tab=reconplus")}
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
          <Routes>
            <Route path="/" element={<HomePage scrollToSection={handleNavigation} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/partners" element={<ClientsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage scrollToSection={handleNavigation} />} />
          </Routes>
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
                  <span className="eyebrow">DEDICATED PAGES</span>
                  {[
                    { label: "Home", href: "/" },
                    { label: "About Us", href: "/about" },
                    { label: "Products", href: "/products" },
                    { label: "Services", href: "/services" },
                    { label: "Clients & Partners", href: "/clients" },
                    { label: "Careers", href: "/careers" },
                    { label: "Contact Us", href: "/contact" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="text-slide"
                      data-text={item.label}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
                <div>
                  <span className="eyebrow">SPECIALIZED SERVICES</span>
                  <div className="footer-services-grid">
                    {WHAT_WE_OFFER.map((srv) => (
                      <Link
                        key={srv.name}
                        to="/services"
                        className="text-slide"
                        data-text={srv.name}
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
                onClick={() => handleNavigation(0)}
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
        onClick={() => handleNavigation(0)}
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
      <ChatBot onNavigate={(href) => handleNavigation(href)} />
    </>
  );
}

export default App;
