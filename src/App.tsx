import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
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

function ScrollToTop({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    if (pathname !== "/") {
      document.documentElement.setAttribute("data-theme", "light");
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);
    return () => clearTimeout(timer);
  }, [pathname, lenisRef]);

  return null;
}

export function App() {
  const location = useLocation();

  // One-time preloader state
  const [preDone, setPreDone] = useState(false);
  const [prePct, setPrePct] = useState(0);
  const [preLeaving, setPreLeaving] = useState(false);

  const [selectedPills, setSelectedPills] = useState<string[]>(["MARS"]);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  const prefersReducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // 1. Initial One-Time Preloader + Persistent Lenis Smooth Scroll
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

    // 800ms editorial preloader on initial visit
    let preRafId: number | null = null;
    let leaveTimerId: number | null = null;
    let removeTimerId: number | null = null;

    if (prefersReducedMotion) {
      document.documentElement.classList.remove("is-preloading");
      setPreDone(true);
    } else {
      const start = performance.now();
      const duration = 800;
      const tick = (now: number) => {
        const progress = Math.max(0, Math.min(1, (now - start) / duration));
        const eased = 1 - Math.pow(1 - progress, 3);
        setPrePct(Math.round(eased * 100));
        if (progress < 1) {
          preRafId = requestAnimationFrame(tick);
        } else {
          setPreLeaving(true);
          document.documentElement.classList.remove("is-preloading");
          leaveTimerId = window.setTimeout(animateHeroEntrance, 150);
          removeTimerId = window.setTimeout(() => {
            setPreDone(true);
            ScrollTrigger.refresh();
          }, 600);
        }
      };
      preRafId = requestAnimationFrame(tick);
    }

    // Header scroll position watcher
    const siteHeader = document.getElementById("site-header");
    const progressBar = document.getElementById("scroll-progress-bar");
    const floatTop = document.getElementById("float-top");
    const floatArc = document.getElementById("float-top-arc");
    let lastScrollY = window.scrollY;

    const onScrollGlobal = () => {
      const currY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, currY / docHeight)) : 0;

      if (progressBar) progressBar.style.transform = `scaleX(${p})`;
      if (floatArc) floatArc.style.strokeDashoffset = String(131.95 * (1 - p));
      if (floatTop) floatTop.classList.toggle("is-visible", currY > 400);

      if (siteHeader) {
        siteHeader.classList.toggle("is-scrolled", currY > 40);
        if (currY > 200 && currY > lastScrollY + 6) {
          siteHeader.classList.add("is-hidden");
        } else if (currY < lastScrollY - 4 || currY <= 200) {
          siteHeader.classList.remove("is-hidden");
        }
        lastScrollY = currY;
      }
    };

    window.addEventListener("scroll", onScrollGlobal, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollGlobal);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      lenisRef.current = null;
      if (preRafId !== null) cancelAnimationFrame(preRafId);
      if (leaveTimerId !== null) clearTimeout(leaveTimerId);
      if (removeTimerId !== null) clearTimeout(removeTimerId);
    };
  }, [prefersReducedMotion]);

  // 2. Route-specific ScrollTrigger Choreography (Only runs when on "/")
  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Theme triggers
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

      // About section text scrub
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
    };
  }, [location.pathname, prefersReducedMotion]);

  const scrollToTopAction = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
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

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Products", path: "/products" },
    { label: "Services", path: "/services" },
    { label: "Clients & Partners", path: "/clients" },
    { label: "Careers", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ];

  const isLinkActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/clients") return location.pathname === "/clients" || location.pathname === "/partners";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <ScrollToTop lenisRef={lenisRef} />

      {/* TOP PROGRESS BAR */}
      <div className="scroll-progress" id="scroll-progress" aria-hidden="true">
        <span id="scroll-progress-bar" />
      </div>

      {/* INITIAL ONE-TIME PRELOADER */}
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

      {/* FIXED CLEAN HEADER WITHOUT BURGER MENU */}
      <header className="site-header" id="site-header">
        <div className="site-header__inner">
          <Link
            to="/"
            className="brand-logo"
            aria-label="emPay Software Home"
            data-magnetic
            data-cursor="HOME"
          >
            <img src={empayLogo} alt="emPay Software" className="brand-logo__img" />
          </Link>

          {/* Full Direct Navigation Links Bar */}
          <nav className="site-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`site-nav__link ${isLinkActive(link.path) ? "is-active" : ""}`}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link
              to="/contact"
              className="pill-btn pill-btn--orange scribble-host"
              data-magnetic
              data-cursor="DEMO"
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
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT SHELL */}
      <div className="page-shell" id="page-shell">
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage scrollToSection={scrollToTopAction} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/partners" element={<ClientsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage scrollToSection={scrollToTopAction} />} />
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
                onClick={scrollToTopAction}
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
        onClick={scrollToTopAction}
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

      {/* Bottom-Right Chat Bot */}
      <ChatBot onNavigate={(href) => {
        if (href.startsWith("#")) {
          const map: Record<string, string> = {
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
          window.location.hash = map[href] || "/";
        } else {
          window.location.hash = href;
        }
      }} />
    </>
  );
}

export default App;
