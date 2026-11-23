import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import empayLogo from "./assets/empay-logo.png";
import { InteractiveDotGrid } from "./components/InteractiveDotGrid";
import { SplitText } from "./components/SplitText";
import { ChatBot } from "./components/ChatBot";
import {
  ARCH_NODES,
  CAREER_ROLES,
  CORE_PILLARS,
  WHAT_WE_OFFER,
} from "./data/empayData";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

const ABOUT_STATEMENT =
  "Empay Software Solutions specializes in providing an array of cutting edge solutions and services for the financial services industry in the electronic and mobile payment verticals. Founded in 2008 by domain veterans.";

export function App() {
  const [preDone, setPreDone] = useState(false);
  const [preLeaving, setPreLeaving] = useState(false);
  const [prePct, setPrePct] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuDepth, setMenuDepth] = useState<0 | 1>(0);
  const [activeArchNode, setActiveArchNode] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [selectedPills, setSelectedPills] = useState<string[]>(["MARS"]);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [utcClock, setUtcClock] = useState("00:00 UTC");

  const lenisRef = useRef<Lenis | null>(null);

  const prefersReducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Live UTC clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hh = String(now.getUTCHours()).padStart(2, "0");
      const mm = String(now.getUTCMinutes()).padStart(2, "0");
      setUtcClock(`${hh}:${mm} UTC`);
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Preloader sequence + Lenis smooth scroll + GSAP ScrollTrigger choreography
  useEffect(() => {
    document.documentElement.classList.add("is-preloading");

    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

    // Simple 900ms editorial preloader
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

    // GSAP ScrollTrigger animations inside gsap.context for clean unmount cleanup
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
          start: sec.id === "portfolio" ? "top 20%" : "top 45%",
          end: "bottom 45%",
          onEnter: () => document.documentElement.setAttribute("data-theme", theme),
          onEnterBack: () => document.documentElement.setAttribute("data-theme", theme),
          onLeaveBack: () => {
            if (sec.id === "portfolio") {
              document.documentElement.setAttribute("data-theme", "dark");
            } else if (sec.id === "service") {
              document.documentElement.setAttribute("data-theme", "light");
            }
          },
        });
      });

      const scrubSection = document.getElementById("about");
      const scrubChars = Array.from(document.querySelectorAll<HTMLElement>(".scrub-c"));
      if (scrubSection && scrubChars.length) {
        ScrollTrigger.create({
          trigger: scrubSection,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            const head = p * (scrubChars.length + 12);
            scrubChars.forEach((ch, idx) => {
              const dist = head - idx;
              if (dist < 0) {
                ch.classList.remove("is-active", "is-done");
                ch.style.transform = "";
              } else if (dist <= 12) {
                ch.classList.add("is-active");
                ch.classList.remove("is-done");
                const wave = Math.sin((dist / 12) * Math.PI);
                const rnd = Number(ch.dataset.rnd || 0);
                ch.style.transform = `translateY(${(-0.07 * wave).toFixed(3)}em) rotate(${(rnd * 3.4 * wave).toFixed(2)}deg) scale(${(1 + 0.08 * wave).toFixed(3)})`;
              } else {
                ch.classList.remove("is-active");
                ch.classList.add("is-done");
                ch.style.transform = "";
              }
            });
          },
        });
      }

      document.querySelectorAll<HTMLElement>('[data-split="chars"]').forEach((heading) => {
        gsap.fromTo(
          heading.querySelectorAll(".split-inner"),
          { yPercent: 112, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.82,
            stagger: 0.016,
            ease: "power4.out",
            scrollTrigger: { trigger: heading, start: "top 85%", once: true },
          }
        );
      });

      document.querySelectorAll<HTMLElement>('[data-split="lines"]').forEach((heading) => {
        const isScrub = heading.hasAttribute("data-scrub-lines");
        gsap.fromTo(
          heading.querySelectorAll(".split-inner"),
          { yPercent: 112, opacity: isScrub ? 0.25 : 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.025,
            ease: "power4.out",
            scrollTrigger: isScrub
              ? { trigger: heading, start: "top 86%", end: "top 34%", scrub: 0.7 }
              : { trigger: heading, start: "top 84%", once: true },
          }
        );
      });

      document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.fromTo(
          group,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          }
        );
      });

      document.querySelectorAll<SVGGeometryElement>(".draw-path").forEach((path) => {
        const len = path.getTotalLength ? path.getTotalLength() : 280;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: path, start: "top 85%", once: true },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-mask-reveal]").forEach((frame) => {
        const dashEls = frame.querySelectorAll("[data-dash-el]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: frame, start: "top 92%", once: true },
        });
        tl.to(frame, {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          duration: 1.05,
          ease: "power4.inOut",
        }).fromTo(
          dashEls,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "power3.out" },
          "-=0.55"
        );
      });

      const flowPulse = document.querySelector(".flow-pulse");
      if (flowPulse) {
        gsap.to(flowPulse, {
          keyframes: [
            { attr: { cx: 44, cy: 55 }, duration: 0 },
            { attr: { cx: 160, cy: 55 }, duration: 0.8 },
            { attr: { cx: 230, cy: 28 }, duration: 0.6 },
            { attr: { cx: 320, cy: 28 }, duration: 0.7 },
            { attr: { cx: 414, cy: 55 }, duration: 0.7 },
          ],
          repeat: -1,
          ease: "power1.inOut",
        });
      }

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
              const p = self.progress;
              if (archBar) archBar.style.transform = `scaleX(${p})`;
              const idx = Math.min(5, Math.floor(p * 5.999));
              if (activeArchNodeRef.current !== idx) {
                activeArchNodeRef.current = idx;
                setActiveArchNode(idx);
                gsap.to(archTrack, {
                  xPercent: -idx * 100,
                  duration: 0.35,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }
            },
          });
        }
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((col) => {
        const offset = Number(col.dataset.parallax || 40);
        gsap.fromTo(
          col,
          { y: -offset },
          {
            y: offset,
            ease: "none",
            scrollTrigger: {
              trigger: "#portfolio",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => {
      if (preRafId !== null) cancelAnimationFrame(preRafId);
      if (leaveTimerId !== null) window.clearTimeout(leaveTimerId);
      if (removeTimerId !== null) window.clearTimeout(removeTimerId);
      ctx.revert();
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("is-preloading");
    };
  }, [prefersReducedMotion]);

  // Desktop magnetic buttons & custom orb cursor
  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine || prefersReducedMotion) return;

    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = Math.max(-10, Math.min(10, (e.clientX - (r.left + r.width / 2)) * 0.2));
        const dy = Math.max(-7, Math.min(7, (e.clientY - (r.top + r.height / 2)) * 0.24));
        el.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });

    const orb = document.getElementById("cursor-orb");
    const label = document.getElementById("cursor-label");
    let rafId: number | null = null;
    if (orb && label) {
      let cx = -100,
        cy = -100,
        tx = -100,
        ty = -100,
        hasMoved = false,
        lastCursorTime = performance.now();

      const isOrangeColor = (str: string): boolean => {
        if (!str || str === "transparent" || str === "rgba(0, 0, 0, 0)") return false;
        const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return false;
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        return r >= 180 && g >= 35 && g <= 170 && b <= 90 && r > g + 35;
      };

      const checkOrangeHover = (el: Element | null): boolean => {
        let curr = el;
        let depth = 0;
        while (curr && curr !== document.body && depth < 6) {
          if (curr instanceof HTMLElement || curr instanceof SVGElement) {
            if (
              curr.classList.contains("pill-btn--orange") ||
              curr.classList.contains("float-top") ||
              curr.classList.contains("pill-eyebrow") ||
              curr.classList.contains("hero__eyebrow-chip") ||
              curr.classList.contains("hcard--accent") ||
              curr.classList.contains("arch-node") ||
              curr.classList.contains("eyebrow--orange") ||
              curr.classList.contains("dash-badge--live") ||
              curr.classList.contains("arch-path")
            ) {
              return true;
            }
            const comp = window.getComputedStyle(curr);
            if (
              isOrangeColor(comp.backgroundColor) ||
              isOrangeColor(comp.color) ||
              isOrangeColor(comp.fill) ||
              isOrangeColor(comp.stroke)
            ) {
              return true;
            }
          }
          curr = curr.parentElement;
          depth++;
        }
        return false;
      };

      const onWinMove = (e: PointerEvent) => {
        tx = e.clientX;
        ty = e.clientY;
        if (!hasMoved) {
          cx = tx;
          cy = ty;
          hasMoved = true;
        }
        const isOrange = checkOrangeHover(e.target as Element);
        orb.classList.toggle("is-white", isOrange);
      };
      window.addEventListener("pointermove", onWinMove, { passive: true });
      const render = (now: number) => {
        const dt = Math.min(0.05, Math.max(0.001, (now - lastCursorTime) / 1000));
        lastCursorTime = now;
        const follow = 1 - Math.exp(-5.2 * dt);
        cx += (tx - cx) * follow;
        cy += (ty - cy) * follow;
        orb.style.left = `${cx}px`;
        orb.style.top = `${cy}px`;
        rafId = requestAnimationFrame(render);
      };
      rafId = requestAnimationFrame(render);
      cleanups.push(() => window.removeEventListener("pointermove", onWinMove));

      document.querySelectorAll<HTMLElement>("[data-cursor]").forEach((target) => {
        const onEnter = () => {
          label.textContent = target.dataset.cursor || "";
          orb.classList.add("is-expanded");
        };
        const onLeave = () => {
          orb.classList.remove("is-expanded");
        };
        target.addEventListener("mouseenter", onEnter);
        target.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          target.removeEventListener("mouseenter", onEnter);
          target.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      cleanups.forEach((fn) => fn());
    };
  }, [prefersReducedMotion]);

  // Menu drawer close handler with deferred depth reset
  const closeMenu = () => {
    setMenuOpen(false);
    window.setTimeout(() => {
      setMenuDepth(0);
    }, 450);
  };

  // Menu drawer class sync + Escape handling
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    if (menuOpen) {
      lenisRef.current?.stop();
    } else if (preDone) {
      lenisRef.current?.start();
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, preDone]);

  const activeArchNodeRef = useRef(0);

  const selectArchNode = (idx: number) => {
    activeArchNodeRef.current = idx;
    setActiveArchNode(idx);
    const archTrack = document.getElementById("arch-detail-track");
    if (archTrack) {
      if (prefersReducedMotion) {
        gsap.set(archTrack, { xPercent: -idx * 100 });
      } else {
        gsap.to(archTrack, {
          xPercent: -idx * 100,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    }
    const archBar = document.getElementById("arch-progress-bar");
    if (archBar) {
      const targetScale = idx / (ARCH_NODES.length - 1);
      if (prefersReducedMotion) {
        archBar.style.transform = `scaleX(${targetScale})`;
      } else {
        gsap.to(archBar, {
          scaleX: targetScale,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    }
  };

  const scrollToSection = (target: string | number) => {
    const run = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { duration: 1.2 });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: prefersReducedMotion ? "auto" : "smooth" });
      } else {
        document
          .querySelector(target)
          ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    };

    if (menuOpen) {
      closeMenu();
      window.setTimeout(run, 380);
    } else {
      run();
    }
  };

  const handleCareerToggle = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const triggerBtn = e.currentTarget;
    const currentCard = triggerBtn.closest(".faq-item") as HTMLElement | null;
    const isCurrentlyOpen = openFaqIdx === idx;

    if (isCurrentlyOpen) {
      setOpenFaqIdx(null);
      window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 520);
      return;
    }

    // Determine if an open accordion card is currently located ABOVE the clicked card
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

      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetScrollY, {
          duration: prefersReducedMotion ? 0 : 0.65,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({
          top: targetScrollY,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    }

    window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 520);
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
    window.setTimeout(() => setDemoSubmitted(false), 4000);
  };

  return (
    <>
      {!preDone && (
        <div className={`empay-pre ${preLeaving ? "is-leaving" : ""}`} id="empay-pre" aria-hidden="true">
          <div className="empay-pre__inner">
            <div className="empay-pre__brand-lockup">
              <img src={empayLogo} alt="emPay Software" className="empay-pre__logo-img" />
            </div>
            <div className="empay-pre__meter">
              <div className="empay-pre__bar">
                <span id="pre-bar-fill" style={{ transform: `scaleX(${prePct / 100})` }} />
              </div>
              <span className="empay-pre__pct" id="pre-pct">
                {String(prePct).padStart(2, "0")}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Top Scroll Progress Bar */}
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress__bar" id="scroll-progress-bar" />
      </div>

      {/* Custom Desktop Cursor */}
      <div className="cursor" id="custom-cursor" aria-hidden="true">
        <div className="cursor__orb" id="cursor-orb">
          <span className="cursor__label" id="cursor-label" />
        </div>
      </div>

      {/* FIXED HEADER */}
      <header className="site-header" id="site-header">
        <div className="site-header__inner">
          <a
            href="#hero"
            className="brand-logo"
            aria-label="emPay Software Home"
            data-magnetic
            data-cursor="HOME"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
          >
            <img src={empayLogo} alt="emPay Software" className="brand-logo__img" />
          </a>

          <nav className="header-actions" aria-label="Primary actions">
            <a
              href="#footer"
              className="pill-btn pill-btn--orange scribble-host"
              data-magnetic
              data-cursor="CONTACT"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#footer");
              }}
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
            </a>

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
                  <a
                    href="#hero"
                    className="stacked-menu__link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#hero");
                    }}
                  >
                    <span className="stacked-menu__title">Home</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="stacked-menu__link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#about");
                    }}
                  >
                    <span className="stacked-menu__title">About</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#service"
                    className="stacked-menu__link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#service");
                    }}
                  >
                    <span className="stacked-menu__title">Services</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </a>
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
                  <a
                    href="#portfolio"
                    className="stacked-menu__link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#portfolio");
                    }}
                  >
                    <span className="stacked-menu__title">Clients</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#career"
                    className="stacked-menu__link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#career");
                    }}
                  >
                    <span className="stacked-menu__title">Careers</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#footer"
                    className="stacked-menu__link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#footer");
                    }}
                  >
                    <span className="stacked-menu__title">Contact</span>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </a>
                </li>
              </ul>

              <div className="stacked-menu__card">
                <div className="stacked-menu__card-meta">
                  <span className="status-dot" />
                  <span>SmartCity, Kochi · Est. 2008</span>
                </div>
                <p>Connect with Empay Software Solutions Private Limited at solutions@empaysoft.com or 0484 486 5189.</p>
                <a
                  href="#footer"
                  className="pill-btn pill-btn--orange pill-btn--sm"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#footer");
                  }}
                >
                  <span className="pill-btn__content">Contact Us ↗</span>
                </a>
              </div>
            </div>

            <div className="stacked-menu__col stacked-menu__col--sub" aria-hidden={menuDepth === 0}>
              <span className="eyebrow eyebrow--orange">IT&apos;S WHAT WE DO</span>
              <ul className="stacked-menu__list">
                <li>
                  <a
                    href="#product-mars"
                    className="stacked-menu__link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#product-mars");
                    }}
                  >
                    <div>
                      <span className="stacked-menu__title">MARS</span>
                      <small>Merchant Acquiring &amp; Reconciliation System</small>
                    </div>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#product-reconplus"
                    className="stacked-menu__link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#product-reconplus");
                    }}
                  >
                    <div>
                      <span className="stacked-menu__title">ReconPlus</span>
                      <small>Card Transaction Reconciliation System</small>
                    </div>
                    <span className="stacked-menu__badge stacked-menu__badge--solid">↗</span>
                  </a>
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
          {/* =====================================================
              S0: PRODUCT-BASED SALES HERO (Primary InteractiveDotGrid)
              ===================================================== */}
          <section className="hero" id="hero" data-theme-trigger="light">
            <InteractiveDotGrid
              theme="light"
              spacing={22}
              radius={116}
              maxPush={36}
              baseDotRadius={1.25}
              maxDotRadius={2.2}
              intensity={1}
            />

            <div className="hero__rings" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="container hero__container">
              {/* Cinematic Centerpiece */}
              <div className="hero__centerpiece">
                <div className="hero__eyebrow-chip">
                  <span className="live-dot-pulse" aria-hidden="true" />
                  <span className="mono-label">EMPAY SOFTWARE SOLUTIONS // EST. 2008</span>
                  <span className="chip-sep">/</span>
                  <span className="chip-code">PA-DSS CERTIFIED</span>
                </div>

                <h1
                  className="hero__cinematic-title"
                  aria-label="Next-Gen Payments. Intelligent Reconciliation."
                >
                  <span className="title-row">
                    <span className="title-word">NEXT-GEN</span>
                    <span className="title-word title-word--ghost">PAYMENTS.</span>
                  </span>
                  <span className="title-row title-row--shift">
                    <span className="title-word title-word--accent">INTELLIGENT</span>
                    <span className="title-word">RECONCILIATION.</span>
                  </span>
                </h1>

                <div className="hero__editorial-sub">
                  <p className="hero__pitch">
                    Empowering banks, acquirers, and financial processors with mission-critical transaction switching, automated scheme clearing, and zero-discrepancy reconciliation.
                  </p>

                  <div className="hero__cta-cluster">
                    <a
                      href="#footer"
                      className="pill-btn pill-btn--orange scribble-host"
                      data-magnetic
                      data-cursor="DEMO"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#footer");
                      }}
                    >
                      <span className="scribble-bg" aria-hidden="true">
                        <svg viewBox="0 0 170 44" preserveAspectRatio="none">
                          <path pathLength={1} d="M-4,22 C18,6 32,38 56,18 C80,-2 96,40 124,18 C142,6 156,28 174,20" />
                        </svg>
                      </span>
                      <span className="pill-btn__content">Request Live Demo ↗</span>
                    </a>

                    <a
                      href="#pricing"
                      className="ghost-pill-btn"
                      data-magnetic
                      data-cursor="PRODUCTS"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#pricing");
                      }}
                    >
                      <span>Explore Products ↓</span>
                    </a>
                  </div>
                </div>

                {/* Floating Twin-Product Capsule Dock */}
                <div className="hero__product-capsule-dock" role="navigation" aria-label="Flagship Products">
                  <a
                    href="#product-mars"
                    className="hero-capsule"
                    data-magnetic
                    data-cursor="MARS"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#product-mars");
                    }}
                  >
                    <div className="hero-capsule__meta">
                      <span className="hero-capsule__num">01</span>
                      <div className="hero-capsule__info">
                        <strong>MARS</strong>
                        <small>Merchant Acquiring &amp; Billing</small>
                      </div>
                    </div>
                    <div className="hero-capsule__tags">
                      <span>POS &amp; IPG</span>
                      <span>Multi-Scheme</span>
                    </div>
                    <span className="hero-capsule__arrow" aria-hidden="true">↗</span>
                  </a>

                  <div className="hero-capsule-divider" aria-hidden="true" />

                  <a
                    href="#product-reconplus"
                    className="hero-capsule"
                    data-magnetic
                    data-cursor="RECON+"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#product-reconplus");
                    }}
                  >
                    <div className="hero-capsule__meta">
                      <span className="hero-capsule__num">02</span>
                      <div className="hero-capsule__info">
                        <strong>ReconPlus</strong>
                        <small>Card Transaction Reconciliation</small>
                      </div>
                    </div>
                    <div className="hero-capsule__tags">
                      <span>Multi-Source</span>
                      <span>Auto GL</span>
                    </div>
                    <span className="hero-capsule__arrow" aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>

              {/* Bottom Editorial Meta Rail */}
              <div className="hero__footer-bar">
                <div className="hero__meta-item">
                  <span className="hero__live-dot" />
                  <span>
                    FINTECH INFRASTRUCTURE · <time id="hero-clock">{utcClock}</time>
                  </span>
                </div>
                <div className="hero__meta-nav">
                  <span className="hero-loc-pill">SmartCity, Kochi · Founded 2008</span>
                </div>
                <div className="hero__scroll-hint">
                  <span>Scroll to explore</span>
                  <span className="hero__scroll-line">
                    <span />
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              S1: ABOUT EMPAY (Clean background, NO dot grid)
              ===================================================== */}
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

          {/* =====================================================
              S2: CORE PILLARS (Architecture, Services & Software)
              ===================================================== */}
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

          {/* =====================================================
              S3: WHAT WE OFFER / SERVICES
              ===================================================== */}
          <section className="expertise-section" id="service" data-theme-trigger="dark">
            <div className="container">
              <div className="section-head">
                <div>
                  <span className="pill-eyebrow">WHAT WE OFFER</span>
                  <h2
                    className="section-h2"
                    data-split="chars"
                    aria-label="Comprehensive solutions across electronic & mobile payments"
                  >
                    <SplitText mode="chars" text="Comprehensive solutions across electronic & mobile payments" />
                  </h2>
                </div>
                <p className="section-lead" data-reveal-group>
                  Our team has extensive experience in business analysis, product development, application development and project management in the payment and financial services domains.
                </p>
              </div>

              <div className="expertise-groups">
                <article className="expertise-row" data-reveal-group>
                  <div className="expertise-panel">
                    <div className="expertise-panel__top">
                      <span className="expertise-panel__index">01</span>
                      <h3>Acquiring, Switching &amp; Card Systems</h3>
                    </div>
                    <svg className="expertise-sketch" viewBox="0 0 280 110" fill="none" aria-hidden="true">
                      <path
                        className="draw-path"
                        d="M12 85 C60 85, 78 26, 140 26 C202 26, 218 72, 268 30"
                        stroke="#0A1628"
                        strokeWidth="2.5"
                      />
                      <circle cx="140" cy="26" r="6" fill="#0A1628" />
                      <circle cx="268" cy="30" r="6" fill="#FFFFFF" />
                    </svg>
                    <a
                      href="#pricing"
                      className="expertise-panel__link"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#pricing");
                      }}
                    >
                      Explore Products →
                    </a>
                  </div>
                  <div className="expertise-cards">
                    {WHAT_WE_OFFER.slice(0, 5).map((srv) => (
                      <div className="cap-card" key={srv.name}>
                        <span className="cap-card__badge">→</span>
                        <h4>{srv.name}</h4>
                        <p>{srv.desc}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="expertise-row" data-reveal-group>
                  <div className="expertise-panel">
                    <div className="expertise-panel__top">
                      <span className="expertise-panel__index">02</span>
                      <h3>Reconciliation, Clearing &amp; Processing</h3>
                    </div>
                    <svg className="expertise-sketch" viewBox="0 0 280 110" fill="none" aria-hidden="true">
                      <rect className="draw-path" x="18" y="20" width="90" height="70" rx="10" stroke="#0A1628" strokeWidth="2.5" />
                      <rect className="draw-path" x="172" y="20" width="90" height="70" rx="10" stroke="#0A1628" strokeWidth="2.5" />
                      <path className="draw-path" d="M108 55 H172" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="5 5" />
                    </svg>
                    <a
                      href="#product-reconplus"
                      className="expertise-panel__link"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#product-reconplus");
                      }}
                    >
                      Explore ReconPlus →
                    </a>
                  </div>
                  <div className="expertise-cards">
                    {WHAT_WE_OFFER.slice(5).map((srv) => (
                      <div className="cap-card" key={srv.name}>
                        <span className="cap-card__badge">→</span>
                        <h4>{srv.name}</h4>
                        <p>{srv.desc}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* =====================================================
              S4: PRODUCTS — "It's what we do."
              ===================================================== */}
          <section className="products-section" id="pricing" data-theme-trigger="dark">
            <div className="container">
              <div className="section-head section-head--center">
                <span className="pill-eyebrow">IT&apos;S WHAT WE DO.</span>
                <h2
                  className="section-h2 section-h2--lg"
                  data-split="chars"
                  aria-label="PA-DSS Certified Payment & Reconciliation Products"
                >
                  <SplitText mode="chars" text="PA-DSS Certified Payment & Reconciliation Products" />
                </h2>
              </div>

              {/* PRODUCT 01: MARS (Selected Highlight #1 with InteractiveDotGrid) */}
              <article className="product-story product-story--mars" id="product-mars">
                <InteractiveDotGrid
                  theme="dark"
                  spacing={24}
                  radius={112}
                  maxPush={32}
                  baseDotRadius={1.2}
                  maxDotRadius={2.05}
                  intensity={0.85}
                />

                <div className="product-story__copy">
                  <div className="product-story__meta">
                    <span className="eyebrow eyebrow--orange">PRODUCT 01 // MARS</span>
                    <span className="product-tag">Merchant Acquiring &amp; Reconciliation System</span>
                  </div>
                  <h3
                    className="product-story__title"
                    data-split="lines"
                    aria-label="MARS – Merchant Acquiring & Reconciliation System"
                  >
                    <SplitText
                      mode="lines"
                      text="MARS – Merchant Acquiring & Reconciliation System"
                    />
                  </h3>
                  <p className="product-story__desc" data-reveal-group>
                    MARS is a PA-DSS Certified complete solution for merchant on boarding and payment processing. This application processes POS and IPG transactions, calculate merchant discount, rentals, fees and charges and do merchant billing, generate clearing files to Visa, MasterCard, RuPay &amp; Amex. Settlement received from card associations are reconciled, Merchant statements and GL entries are generated.
                  </p>

                  <ul className="product-story__features" data-reveal-group>
                    <li>
                      <span>01</span> POS &amp; IPG processing with MDR, rentals, fees &amp; merchant billing
                    </li>
                    <li>
                      <span>02</span> Clearing file generation for Visa, MasterCard, RuPay &amp; Amex
                    </li>
                    <li>
                      <span>03</span> Settlement reconciliation, merchant statements &amp; GL entries
                    </li>
                  </ul>

                  <div className="product-story__cta" data-reveal-group>
                    <a
                      href="#footer"
                      className="pill-btn pill-btn--orange scribble-host"
                      data-magnetic
                      data-cursor="MARS"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#footer");
                      }}
                    >
                      <span className="scribble-bg" aria-hidden="true">
                        <svg viewBox="0 0 140 44" preserveAspectRatio="none">
                          <path pathLength={1} d="M-4,22 C18,6 32,38 56,18 C80,-2 92,40 116,18 C128,8 136,28 144,20" />
                        </svg>
                      </span>
                      <span className="pill-btn__content">Enquire About MARS ↗</span>
                    </a>
                  </div>
                </div>

                <div className="product-story__visual">
                  <div className="mask-frame" data-mask-reveal>
                    <div className="dashboard-mock dashboard-mock--mars">
                      <div className="dash-topbar">
                        <div className="dash-dots">
                          <span />
                          <span />
                          <span />
                        </div>
                        <span className="dash-title">MARS // PA-DSS CERTIFIED</span>
                        <span className="dash-badge dash-badge--live">● POS + IPG + GL</span>
                      </div>

                      <div className="dash-kpis">
                        <div className="dash-kpi" data-dash-el>
                          <span>Channels</span>
                          <strong>POS + IPG</strong>
                        </div>
                        <div className="dash-kpi" data-dash-el>
                          <span>Associations</span>
                          <strong>4 Rails</strong>
                        </div>
                        <div className="dash-kpi" data-dash-el>
                          <span>Accounting</span>
                          <strong>Auto GL</strong>
                        </div>
                      </div>

                      <div className="dash-flow" data-dash-el>
                        <div className="dash-flow__label">MERCHANT ACQUIRING &amp; CLEARING FLOW</div>
                        <svg viewBox="0 0 460 110" fill="none">
                          <path
                            className="flow-rail"
                            d="M36 55 H160 C190 55, 200 28, 230 28 H320 C350 28, 360 55, 390 55 H426"
                            stroke="rgba(255,255,255,0.16)"
                            strokeWidth="2"
                          />
                          <path
                            className="flow-rail flow-rail--active"
                            d="M36 55 H160 C190 55, 200 28, 230 28 H320 C350 28, 360 55, 390 55 H426"
                            stroke="#FF5500"
                            strokeWidth="2.5"
                          />
                          <path
                            className="flow-rail"
                            d="M160 55 C190 55, 200 82, 230 82 H320 C350 82, 360 55, 390 55"
                            stroke="rgba(255,255,255,0.16)"
                            strokeWidth="2"
                          />
                          <circle className="flow-pulse" cx="44" cy="55" r="4.5" fill="#FFFFFF" />
                          <g className="flow-node">
                            <rect x="12" y="38" width="64" height="34" rx="8" fill="#10203A" stroke="#FF5500" />
                            <text x="44" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
                              POS/IPG
                            </text>
                          </g>
                          <g className="flow-node">
                            <rect x="200" y="12" width="110" height="32" rx="8" fill="#10203A" stroke="rgba(255,255,255,0.3)" />
                            <text x="255" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
                              MDR + BILLING
                            </text>
                          </g>
                          <g className="flow-node">
                            <rect x="200" y="66" width="110" height="32" rx="8" fill="#10203A" stroke="rgba(255,255,255,0.3)" />
                            <text x="255" y="86" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
                              CLEARING FILES
                            </text>
                          </g>
                          <g className="flow-node">
                            <rect x="380" y="38" width="68" height="34" rx="8" fill="#FF5500" />
                            <text x="414" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
                              GL + STMT
                            </text>
                          </g>
                        </svg>
                      </div>

                      <div className="dash-table" data-dash-el>
                        <div className="dash-table__row">
                          <span>Visa / MasterCard Clearing</span>
                          <span className="pill-ok">RECONCILED</span>
                          <strong>GL POSTED</strong>
                        </div>
                        <div className="dash-table__row">
                          <span>RuPay / Amex Settlement</span>
                          <span className="pill-ok">VERIFIED</span>
                          <strong>STMT READY</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* PRODUCT 02: ReconPlus (Selected Highlight #2 with InteractiveDotGrid) */}
              <article className="product-story product-story--recon product-story--reverse" id="product-reconplus">
                <InteractiveDotGrid
                  theme="dark"
                  spacing={24}
                  radius={112}
                  maxPush={32}
                  baseDotRadius={1.2}
                  maxDotRadius={2.05}
                  intensity={0.8}
                />

                <div className="product-story__copy">
                  <div className="product-story__meta">
                    <span className="eyebrow eyebrow--orange">PRODUCT 02 // RECONPLUS</span>
                    <span className="product-tag">Card Transaction Reconciliation System</span>
                  </div>
                  <h3
                    className="product-story__title"
                    data-split="lines"
                    aria-label="ReconPlus – Card Transaction Reconciliation System"
                  >
                    <SplitText
                      mode="lines"
                      text="ReconPlus – Card Transaction Reconciliation System"
                    />
                  </h3>
                  <p className="product-story__desc" data-reveal-group>
                    ReconPlus is a PA-DSS Certified highly configurable application for reconciling various electronic payment transactions across multiple entities and sources. ReconPlus is a modular system that can be implemented by a Service Provider for multiple banks or as a stand-alone system by an Issuer and/or Acquirer Bank.
                  </p>

                  <ul className="product-story__features" data-reveal-group>
                    <li>
                      <span>01</span> PA-DSS Certified &amp; highly configurable reconciliation rules
                    </li>
                    <li>
                      <span>02</span> Multi-entity, multi-source electronic transaction matching
                    </li>
                    <li>
                      <span>03</span> Multi-bank Service Provider or stand-alone Issuer/Acquirer mode
                    </li>
                  </ul>

                  <div className="product-story__cta" data-reveal-group>
                    <a
                      href="#footer"
                      className="pill-btn pill-btn--orange scribble-host"
                      data-magnetic
                      data-cursor="RECON+"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#footer");
                      }}
                    >
                      <span className="scribble-bg" aria-hidden="true">
                        <svg viewBox="0 0 150 44" preserveAspectRatio="none">
                          <path pathLength={1} d="M-4,22 C18,6 32,38 56,18 C80,-2 96,40 124,18 C136,8 144,28 154,20" />
                        </svg>
                      </span>
                      <span className="pill-btn__content">Enquire About ReconPlus ↗</span>
                    </a>
                  </div>
                </div>

                <div className="product-story__visual">
                  <div className="mask-frame" data-mask-reveal>
                    <div className="dashboard-mock dashboard-mock--recon">
                      <div className="dash-topbar">
                        <div className="dash-dots">
                          <span />
                          <span />
                          <span />
                        </div>
                        <span className="dash-title">RECONPLUS // PA-DSS CERTIFIED</span>
                        <span className="dash-badge dash-badge--green">MULTI-ENTITY ENGINE</span>
                      </div>

                      <div className="recon-streams">
                        <div className="recon-stream" data-dash-el>
                          <span className="recon-stream__tag">ATM &amp; SWITCH LOGS</span>
                          <strong>Multi-Source</strong>
                          <div className="recon-bar">
                            <span style={{ width: "100%" }} />
                          </div>
                        </div>
                        <div className="recon-stream" data-dash-el>
                          <span className="recon-stream__tag">ISSUER / ACQUIRER</span>
                          <strong>Stand-Alone</strong>
                          <div className="recon-bar">
                            <span style={{ width: "99%" }} />
                          </div>
                        </div>
                        <div className="recon-stream" data-dash-el>
                          <span className="recon-stream__tag">SERVICE PROVIDER</span>
                          <strong>Multi-Bank</strong>
                          <div className="recon-bar recon-bar--amber">
                            <span style={{ width: "96%" }} />
                          </div>
                        </div>
                      </div>

                      <div className="recon-ledger" data-dash-el>
                        <div className="recon-ledger__head">
                          <span>SOURCE</span>
                          <span>SCOPE</span>
                          <span>MODE</span>
                          <span>STATUS</span>
                        </div>
                        <div className="recon-ledger__row">
                          <span>Electronic Cards</span>
                          <span>Issuer &amp; Acquirer</span>
                          <span>Modular</span>
                          <span className="pill-ok">MATCHED</span>
                        </div>
                        <div className="recon-ledger__row">
                          <span>ATM &amp; Debit Rails</span>
                          <span>Multi-Bank</span>
                          <span>Configurable</span>
                          <span className="pill-ok">PA-DSS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* =====================================================
              S5: END-TO-END PAYMENT LIFECYCLE (Clean background, NO dot grid)
              ===================================================== */}
          <section className="hscroll-section" id="business" data-theme-trigger="dark">
            <div className="hscroll-section__sticky">
              <div className="container hscroll-section__head">
                <div>
                  <span className="pill-eyebrow">BUILT FOR FINANCIAL SERVICES</span>
                  <h2
                    className="section-h2"
                    data-split="chars"
                    aria-label="Streamlined, robust and low-cost payment systems"
                  >
                    <SplitText mode="chars" text="Streamlined, robust and low-cost payment systems" />
                  </h2>
                </div>
                <div className="hscroll-progress-wrap">
                  <span className="eyebrow">SCROLL TO TRAVERSE</span>
                  <div className="hscroll-progress">
                    <span id="hscroll-progress-bar" />
                  </div>
                </div>
              </div>

              <div className="hscroll-viewport">
                <div className="hscroll-track" id="hscroll-track">
                  <article className="hcard">
                    <span className="hcard__num">01</span>
                    <h3>Architecture &amp; Consulting</h3>
                    <p>Design mission-critical payment systems that are streamlined, efficient, robust, flexible, and low cost.</p>
                    <span className="hcard__meta">PAYMENT ARCHITECTURE</span>
                  </article>

                  <span className="hcard-operator" aria-hidden="true">
                    +
                  </span>

                  <article className="hcard">
                    <span className="hcard__num">02</span>
                    <h3>MARS Merchant Acquiring</h3>
                    <p>PA-DSS Certified merchant onboarding, POS/IPG processing, MDR billing, association clearing files, and GL entries.</p>
                    <span className="hcard__meta">MERCHANT LIFECYCLE</span>
                  </article>

                  <span className="hcard-operator" aria-hidden="true">
                    +
                  </span>

                  <article className="hcard">
                    <span className="hcard__num">03</span>
                    <h3>ReconPlus Modularity</h3>
                    <p>PA-DSS Certified reconciliation across multiple entities &amp; sources for Service Providers, Issuer and Acquirer Banks.</p>
                    <span className="hcard__meta">MULTI-SOURCE RECON</span>
                  </article>

                  <span className="hcard-operator" aria-hidden="true">
                    =
                  </span>

                  <article className="hcard hcard--accent">
                    <span className="hcard__num">04</span>
                    <h3>Clearing &amp; Settlement</h3>
                    <p>Automate multi-scheme settlement verification, merchant statements, and compliant General Ledger posting.</p>
                    <span className="hcard__meta">SETTLEMENT &amp; GL</span>
                  </article>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              S6: OUR PRESTIGIOUS CLIENTS (Clean background, NO dot grid)
              ===================================================== */}
          <section className="proof-section" id="portfolio" data-theme-trigger="light">
            <div className="container proof-section__inner">
              <div className="proof-center" id="proof-center">
                <span className="pill-eyebrow proof-tilt">OUR PRESTIGIOUS CLIENTS</span>
                <h2
                  className="editorial-h2"
                  data-split="lines"
                  aria-label="Helping our clients become and stay pioneers in the payments industry."
                >
                  <SplitText
                    mode="lines"
                    text="Helping our clients become and stay"
                    accentText="industry pioneers."
                  />
                </h2>
                <a
                  href="#footer"
                  className="pill-btn pill-btn--navy scribble-host"
                  data-magnetic
                  data-cursor="CONNECT"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#footer");
                  }}
                >
                  <span className="scribble-bg" aria-hidden="true">
                    <svg viewBox="0 0 150 44" preserveAspectRatio="none">
                      <path pathLength={1} d="M-4,22 C18,6 32,38 56,18 C80,-2 96,40 124,18 C136,8 144,28 154,20" />
                    </svg>
                  </span>
                  <span className="pill-btn__content">Business Enquiries ↗</span>
                </a>
              </div>

              <div className="proof-shapes" aria-hidden="true">
                <div className="proof-col" data-parallax="-70">
                  <div className="geo-badge geo-badge--circle">
                    <span>ISSUER BANKS</span>
                  </div>
                  <div className="geo-badge geo-badge--hex">
                    <span>ACQUIRER BANKS</span>
                  </div>
                </div>
                <div className="proof-col" data-parallax="50">
                  <div className="geo-badge geo-badge--diamond">
                    <span>PA-DSS</span>
                  </div>
                  <div className="geo-badge geo-badge--square">
                    <span>VISA / MC</span>
                  </div>
                </div>
                <div className="proof-col proof-col--spacer" />
                <div className="proof-col" data-parallax="-55">
                  <div className="geo-badge geo-badge--square">
                    <span>RUPAY / AMEX</span>
                  </div>
                  <div className="geo-badge geo-badge--circle">
                    <span>SERVICE PROVIDERS</span>
                  </div>
                </div>
                <div className="proof-col" data-parallax="75">
                  <div className="geo-badge geo-badge--hex">
                    <span>POS &amp; IPG</span>
                  </div>
                  <div className="geo-badge geo-badge--diamond">
                    <span>EST. 2008</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              S7: UNIFIED ARCHITECTURE (Clean background, NO dot grid)
              ===================================================== */}
          <section className="arch-section" id="architecture" data-theme-trigger="dark">
            <div className="arch-section__sticky">
              <div className="container arch-section__inner">
                <div className="arch-section__head">
                  <div>
                    <span className="pill-eyebrow">UNIFIED ARCHITECTURE</span>
                    <h2
                      className="section-h2 arch-section__h2"
                      data-split="chars"
                      aria-label="One Transaction Lifecycle. Six Synchronized Nodes."
                    >
                      <SplitText mode="chars" text="One Transaction Lifecycle." />
                      <br />
                      <SplitText mode="chars" text="Six Synchronized Nodes." />
                    </h2>
                  </div>
                  <div className="hscroll-progress-wrap">
                    <span className="eyebrow">SCROLL TO TRAVERSE</span>
                    <div className="hscroll-progress">
                      <span id="arch-progress-bar" />
                    </div>
                  </div>
                </div>

                <div className="arch-board">
                  <div className="arch-graph" id="arch-graph">
                    <svg className="arch-svg" viewBox="0 0 540 360" fill="none">
                      <path className={`arch-path ${activeArchNode === 0 ? "is-active" : ""}`} d="M270 180 Q 170 70 85 72" />
                      <path className={`arch-path ${activeArchNode === 1 ? "is-active" : ""}`} d="M270 180 Q 145 180 68 180" />
                      <path className={`arch-path ${activeArchNode === 2 ? "is-active" : ""}`} d="M270 180 Q 170 290 85 288" />
                      <path className={`arch-path ${activeArchNode === 3 ? "is-active" : ""}`} d="M270 180 Q 370 70 455 72" />
                      <path className={`arch-path ${activeArchNode === 4 ? "is-active" : ""}`} d="M270 180 Q 395 180 472 180" />
                      <path className={`arch-path ${activeArchNode === 5 ? "is-active" : ""}`} d="M270 180 Q 370 290 455 288" />

                      <g className="arch-hub">
                        <circle cx="270" cy="180" r="46" fill="#050912" stroke="#FF5500" strokeWidth="2" />
                        <text x="270" y="176" textAnchor="middle" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14">
                          EMPAY
                        </text>
                        <text x="270" y="193" textAnchor="middle" fill="#FF5500" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" fontSize="9">
                          CORE BUS
                        </text>
                      </g>
                    </svg>

                    {ARCH_NODES.map((node, idx) => (
                      <button
                        type="button"
                        key={node.label}
                        className={`arch-node ${activeArchNode === idx ? "is-active" : ""}`}
                        style={{ left: node.left, top: node.top }}
                        data-arch-node={idx}
                        onClick={() => selectArchNode(idx)}
                        onMouseEnter={() => selectArchNode(idx)}
                      >
                        <span>0{idx + 1}</span> {node.label}
                      </button>
                    ))}
                  </div>

                  <div className="arch-detail-viewport" id="arch-detail-viewport">
                    <div className="arch-detail-track" id="arch-detail-track">
                      {ARCH_NODES.map((node, idx) => (
                        <div className="arch-detail-slide" key={node.label} data-slide-index={idx}>
                          <div className="arch-detail__top">
                            <span className="eyebrow eyebrow--orange">
                              {node.tag}
                            </span>
                            <span className="arch-detail__step">
                              0{idx + 1} / 06
                            </span>
                          </div>
                          <h3>{node.title}</h3>
                          <p>{node.desc}</p>
                          <ul className="arch-detail__list">
                            {node.specs.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                          <div className="arch-detail__bars">
                            {ARCH_NODES.map((_, barIdx) => (
                              <span
                                key={barIdx}
                                className={idx === barIdx ? "is-active" : ""}
                                onClick={() => selectArchNode(barIdx)}
                                style={{ cursor: "pointer" }}
                                title={`Node 0${barIdx + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              S8: METRICS MARQUEE & CAREERS ACCORDION (Clean, NO dot grid)
              ===================================================== */}
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
        </main>

        {/* =====================================================
            S9: FOOTER BENTO (Connect, Quick Links & Services)
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
                    { label: "Home", href: "#hero" },
                    { label: "About", href: "#about" },
                    { label: "Services", href: "#service" },
                    { label: "Products", href: "#pricing" },
                    { label: "Clients", href: "#portfolio" },
                    { label: "Careers", href: "#career" },
                    { label: "Contact", href: "#footer" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-slide"
                      data-text={item.label}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                    >
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
                <div>
                  <span className="eyebrow">SERVICES</span>
                  <div className="footer-services-grid">
                    {WHAT_WE_OFFER.map((srv) => (
                      <a
                        key={srv.name}
                        href="#service"
                        className="text-slide"
                        data-text={srv.name}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("#service");
                        }}
                      >
                        <span>{srv.name}</span>
                      </a>
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
                onClick={() => scrollToSection(0)}
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
        onClick={() => scrollToSection(0)}
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
      <ChatBot onNavigate={(href) => scrollToSection(href)} />
    </>
  );
}
export default App;
