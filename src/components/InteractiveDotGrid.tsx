import { useEffect, useRef } from "react";

export type DotGridTheme = "light" | "dark";

export interface InteractiveDotGridProps {
  /** Spacing between grid dots in CSS pixels */
  spacing?: number;
  /** Repulsion radius in CSS pixels (~110-120px = ~3 cm) */
  radius?: number;
  /** Maximum radial displacement near cursor center (kept < ~0.32 * radius to prevent overlap) */
  maxPush?: number;
  /** Resting dot radius in CSS pixels */
  baseDotRadius?: number;
  /** Slight dot radius boost for displaced dots */
  maxDotRadius?: number;
  /** Surface theme for appropriate contrast */
  theme?: DotGridTheme;
  /** Highlight prominence multiplier (0..1) */
  intensity?: number;
  /** Optional custom CSS class */
  className?: string;
}

type RGB = readonly [number, number, number];

const LIGHT_BASE_RGB: RGB = [0, 71, 187]; // Subtle cobalt sampled from emPay logo
const DARK_BASE_RGB: RGB = [195, 214, 248]; // Subtle cool blue-white on deep navy
const BLUE_MID_RGB: RGB = [0, 92, 230]; // Refined Empay royal blue
const ORANGE_FOCUS_RGB: RGB = [255, 85, 0]; // Empay orange accent

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function interpolateTriplet(c1: RGB, c2: RGB, t: number): [number, number, number] {
  const clamped = Math.max(0, Math.min(1, t));
  return [
    Math.round(lerp(c1[0], c2[0], clamped)),
    Math.round(lerp(c1[1], c2[1], clamped)),
    Math.round(lerp(c1[2], c2[2], clamped)),
  ];
}

/**
 * Reusable section-scoped interactive dot-grid Canvas with spring-physics
 * cursor repulsion. Dots physically move outward away from the cursor within
 * a ~3 cm radius and spring smoothly back to their home grid positions.
 */
export function InteractiveDotGrid({
  spacing = 24,
  radius = 115,
  maxPush = 34,
  baseDotRadius = 1.25,
  maxDotRadius = 2.1,
  theme = "light",
  intensity = 1,
  className = "",
}: InteractiveDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const safeMaxPush = Math.min(maxPush, radius * 0.34); // Guarantee monotonic spacing (no dot inversion/overlap)
    const radiusSq = radius * radius;

    let width = 0;
    let height = 0;
    let count = 0;

    // Flat typed buffers for zero-GC 60fps spring physics: [ox, oy, dx, dy, vx, vy]
    let oxBuf = new Float32Array(0);
    let oyBuf = new Float32Array(0);
    let dxBuf = new Float32Array(0);
    let dyBuf = new Float32Array(0);
    let vxBuf = new Float32Array(0);
    let vyBuf = new Float32Array(0);

    let targetX = -9999;
    let targetY = -9999;
    let curX = -9999;
    let curY = -9999;
    let pointerInside = false;
    let hoverMix = 0;
    let isVisible = true;
    let rafId: number | null = null;
    let lastTime = performance.now();

    const baseRgb = theme === "dark" ? DARK_BASE_RGB : LIGHT_BASE_RGB;
    const baseAlpha = 0; // Invisible by default; revealed smoothly only on hover
    const maxAlpha = theme === "dark" ? 0.88 : 0.84;

    const rebuildGrid = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.floor(width / spacing) + 1;
      const rows = Math.floor(height / spacing) + 1;
      const offsetX = (width - (cols - 1) * spacing) * 0.5;
      const offsetY = (height - (rows - 1) * spacing) * 0.5;

      count = cols * rows;
      oxBuf = new Float32Array(count);
      oyBuf = new Float32Array(count);
      dxBuf = new Float32Array(count);
      dyBuf = new Float32Array(count);
      vxBuf = new Float32Array(count);
      vyBuf = new Float32Array(count);

      let idx = 0;
      for (let r = 0; r < rows; r++) {
        const y = offsetY + r * spacing;
        for (let c = 0; c < cols; c++) {
          oxBuf[idx] = offsetX + c * spacing;
          oyBuf[idx] = y;
          idx++;
        }
      }

      lastTime = performance.now();
      scheduleDraw();
    };

    const drawFrame = (now: number) => {
      rafId = null;
      if (!isVisible) return;

      const dtMs = Math.min(34, Math.max(4, now - lastTime));
      lastTime = now;
      const dtSec = dtMs / 1000;
      const step = dtMs / 16.6667;

      // Slow, silky frame-rate-independent cursor tracking & fade
      if (pointerInside) {
        const curFollow = 1 - Math.exp(-5.5 * dtSec);
        curX += (targetX - curX) * curFollow;
        curY += (targetY - curY) * curFollow;
      }
      const fadeFollow = 1 - Math.exp(-3.8 * dtSec);
      hoverMix += ((pointerInside ? 1 : 0) - hoverMix) * fadeFollow;

      ctx.clearRect(0, 0, width, height);

      const springK = 0.055;
      const damping = Math.pow(0.84, step);
      const canDisplace = !prefersReducedMotion && isFinePointer;

      let anyMoving = false;
      const activeIndices: number[] = [];
      const activeWeights: number[] = [];

      // Update spring physics only when active or still recovering
      if (canDisplace && (pointerInside || hoverMix > 0.005)) {
        for (let i = 0; i < count; i++) {
          const ox = oxBuf[i];
          const oy = oyBuf[i];
          let dx = dxBuf[i];
          let dy = dyBuf[i];
          let vx = vxBuf[i];
          let vy = vyBuf[i];

          let targetDx = 0;
          let targetDy = 0;
          let proximity = 0;

          if (pointerInside) {
            const rx = ox - curX;
            const ry = oy - curY;
            const distSq = rx * rx + ry * ry;

            if (distSq < radiusSq) {
              const dist = Math.sqrt(distSq);
              const t = 1 - dist / radius;
              const push = safeMaxPush * Math.pow(t, 1.55);
              proximity = t * t * (3 - 2 * t);

              if (dist > 0.001) {
                targetDx = (rx / dist) * push;
                targetDy = (ry / dist) * push;
              } else {
                targetDx = push;
                targetDy = 0;
              }
            }
          }

          const ax = (targetDx - dx) * springK;
          const ay = (targetDy - dy) * springK;
          vx = (vx + ax * step) * damping;
          vy = (vy + ay * step) * damping;
          dx += vx * step;
          dy += vy * step;

          if (
            Math.abs(dx) > 0.03 ||
            Math.abs(dy) > 0.03 ||
            Math.abs(vx) > 0.03 ||
            Math.abs(vy) > 0.03
          ) {
            anyMoving = true;
          } else {
            dx = 0;
            dy = 0;
            vx = 0;
            vy = 0;
          }

          dxBuf[i] = dx;
          dyBuf[i] = dy;
          vxBuf[i] = vx;
          vyBuf[i] = vy;

          const dispMag = Math.hypot(dx, dy);
          const dispRatio = Math.min(1, dispMag / Math.max(1, safeMaxPush));
          const highlight = Math.max(proximity, dispRatio) * hoverMix * intensity;

          if (highlight > 0.015) {
            activeIndices.push(i);
            activeWeights.push(highlight);
          }
        }
      } else if (!pointerInside && hoverMix <= 0.005) {
        hoverMix = 0;
        dxBuf.fill(0);
        dyBuf.fill(0);
        vxBuf.fill(0);
        vyBuf.fill(0);
      }

      // Draw only displaced/hovered dots (resting grid remains invisible)
      for (let k = 0; k < activeIndices.length; k++) {
        const idx = activeIndices[k];
        const w = activeWeights[k];
        const x = oxBuf[idx] + dxBuf[idx];
        const y = oyBuf[idx] + dyBuf[idx];

        const [cr, cg, cb] =
          w < 0.5
            ? interpolateTriplet(baseRgb, BLUE_MID_RGB, w / 0.5)
            : interpolateTriplet(BLUE_MID_RGB, ORANGE_FOCUS_RGB, (w - 0.5) / 0.5);

        const dotR = lerp(baseDotRadius, maxDotRadius, w);
        const alpha = lerp(baseAlpha, maxAlpha, w);

        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, dotR, 0, Math.PI * 2);
        ctx.fill();
      }

      const cursorSettling =
        pointerInside &&
        (Math.abs(targetX - curX) > 0.25 || Math.abs(targetY - curY) > 0.25);
      const hoverFading =
        (pointerInside && hoverMix < 0.995) || (!pointerInside && hoverMix > 0.005);

      if (canDisplace && (anyMoving || cursorSettling || hoverFading)) {
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    const scheduleDraw = () => {
      if (isVisible && rafId === null) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) return;
      const rect = host.getBoundingClientRect();
      const insideHost =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (insideHost) {
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        if (!pointerInside) {
          curX = localX;
          curY = localY;
        }
        targetX = localX;
        targetY = localY;
        pointerInside = true;
        scheduleDraw();
      } else if (pointerInside) {
        pointerInside = false;
        scheduleDraw();
      }
    };

    const handlePointerLeave = () => {
      if (pointerInside) {
        pointerInside = false;
        scheduleDraw();
      }
    };

    const resizeObserver = new ResizeObserver(rebuildGrid);
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible) {
          scheduleDraw();
        } else {
          pointerInside = false;
          hoverMix = 0;
          if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          ctx.clearRect(0, 0, width, height);
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(host);

    if (!prefersReducedMotion && isFinePointer) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("mouseleave", handlePointerLeave);
      window.addEventListener("blur", handlePointerLeave);
    }

    rebuildGrid();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (!prefersReducedMotion && isFinePointer) {
        window.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("mouseleave", handlePointerLeave);
        window.removeEventListener("blur", handlePointerLeave);
      }
    };
  }, [spacing, radius, maxPush, baseDotRadius, maxDotRadius, theme, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`interactive-dot-grid ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
