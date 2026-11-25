import React, { useState } from "react";
import gsap from "gsap";
import { SplitText } from "../SplitText";
import { ARCH_NODES } from "../../data/empayData";

export const ArchitectureSection: React.FC = () => {
  const [activeArchNode, setActiveArchNode] = useState(0);

  const selectArchNode = (idx: number) => {
    setActiveArchNode(idx);
    const track = document.getElementById("arch-detail-track");
    const archBar = document.getElementById("arch-progress-bar");
    if (track) {
      const slidePct = (idx / (ARCH_NODES.length - 1)) * 100;
      track.style.transform = `translateX(-${slidePct}%)`;
    }
    if (archBar) {
      const targetScale = idx / (ARCH_NODES.length - 1);
      gsap.to(archBar, {
        scaleX: targetScale,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
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
                      <span className="eyebrow eyebrow--orange">{node.tag}</span>
                      <span className="arch-detail__step">0{idx + 1} / 06</span>
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
  );
};
