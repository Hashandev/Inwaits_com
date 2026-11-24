"use client";

// components/ui/perspective-curve-grid.tsx
// Full-screen dot-field covering the entire hero background.
// - Dots fill the whole area in a uniform grid
// - Near (bottom) dots are bright & big, far (top) dots are dim & tiny
// - Mouse hover: dots ripple outward, enlarge, and glow
// - Ambient floating wave animation

import { useEffect, useRef } from "react";

/* ───── tunables ───── */
const SPACING = 28;          // px between dots
const HOVER_RADIUS = 200;
const RIPPLE_FORCE = 30;
const MAX_DOT_SCALE = 3.5;

// Dot sizing
const DOT_MIN = 0.4;
const DOT_MAX = 3.8;

// Brand blue
const BR = 21;
const BG = 48;
const BB = 255;

export function PerspectiveCurveGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;
    let cols = 0;
    let rows = 0;

    const mouse = {
      x: -9999, y: -9999,
      tx: -9999, ty: -9999,
      str: 0, tStr: 0,
    };

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / SPACING) + 2;
      rows = Math.ceil(height / SPACING) + 2;
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      // Smooth mouse follow
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      mouse.str += (mouse.tStr - mouse.str) * 0.08;

      const offsetX = (width - (cols - 1) * SPACING) * 0.5;
      const offsetY = (height - (rows - 1) * SPACING) * 0.5;

      for (let r = 0; r < rows; r++) {
        const fy = r / (rows - 1); // 0=top (far), 1=bottom (near)

        for (let c = 0; c < cols; c++) {
          const fx = c / (cols - 1); // 0=left, 1=right

          // Base position: uniform grid
          let px = offsetX + c * SPACING;
          let py = offsetY + r * SPACING;

          // Ambient wave
          const wave =
            Math.sin(time + fx * 6 + fy * 4) * 2.5 +
            Math.cos(time * 0.6 + fx * 3 - fy * 5) * 1.5;
          px += wave * 0.6;
          py += wave;

          // Depth: top=far(dim), bottom=near(bright)
          const depthAlpha = Math.pow(fy, 2.2);
          // Edge fade (soft at left/right edges)
          const edgeFade = Math.pow(Math.sin(Math.PI * fx), 0.4);
          let dotAlpha = edgeFade * (0.02 + 0.98 * depthAlpha);

          // Dot size: tiny at top, big at bottom
          let dotRadius = DOT_MIN + (DOT_MAX - DOT_MIN) * Math.pow(fy, 2.5);

          // ── Mouse interaction ──
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.hypot(dx, dy);
          let hoverIntensity = 0;

          if (mouse.str > 0 && dist < HOVER_RADIUS) {
            const t = 1 - dist / HOVER_RADIUS;
            const factor = mouse.str * Math.pow(t, 1.5);
            hoverIntensity = factor;

            // Push dots outward
            if (dist > 1) {
              px += (dx / dist) * RIPPLE_FORCE * factor;
              py += (dy / dist) * RIPPLE_FORCE * factor;
            }

            // Scale up
            dotRadius *= 1 + (MAX_DOT_SCALE - 1) * factor;

            // Brighten
            dotAlpha = dotAlpha + (1 - dotAlpha) * factor * 0.9;
          }

          if (dotAlpha < 0.015) continue;

          // ── Glow halo ──
          if (hoverIntensity > 0.05) {
            const glowR = dotRadius * (2.5 + hoverIntensity * 2);
            const glowAlpha = dotAlpha * (0.06 + hoverIntensity * 0.2);
            const grd = ctx.createRadialGradient(px, py, 0, px, py, glowR);
            grd.addColorStop(0, `rgba(${BR}, ${BG}, ${BB}, ${glowAlpha.toFixed(3)})`);
            grd.addColorStop(1, `rgba(${BR}, ${BG}, ${BB}, 0)`);
            ctx.fillStyle = grd;
            ctx.fillRect(px - glowR, py - glowR, glowR * 2, glowR * 2);
          }

          // ── Core dot ──
          ctx.beginPath();
          ctx.arc(px, py, dotRadius, 0, Math.PI * 2);

          // Color: brand blue → white-blue on hover
          const wb = hoverIntensity * 0.55;
          const cr = Math.round(BR + (255 - BR) * wb);
          const cg = Math.round(BG + (255 - BG) * wb);
          const cb = Math.round(BB + (255 - BB) * wb);

          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${dotAlpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      // ── Hover spotlight ──
      if (mouse.str > 0.02) {
        const spotR = HOVER_RADIUS * 1.5;
        const spotAlpha = mouse.str * 0.08;
        const spot = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, spotR);
        spot.addColorStop(0, `rgba(${BR}, ${BG}, ${BB}, ${spotAlpha.toFixed(3)})`);
        spot.addColorStop(0.5, `rgba(${BR}, ${BG}, ${BB}, ${(spotAlpha * 0.3).toFixed(3)})`);
        spot.addColorStop(1, "transparent");
        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, width, height);
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);

    const obs = new ResizeObserver(resize);
    obs.observe(canvas);

    const heroEl = canvas.closest("section") || canvas.parentElement;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      mouse.tStr = 1;
    };

    const onLeave = () => {
      mouse.tStr = 0;
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    if (heroEl) {
      heroEl.addEventListener("pointermove", onMove as EventListener);
      heroEl.addEventListener("pointerleave", onLeave as EventListener);
      window.addEventListener("scroll", onLeave, { passive: true });
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      obs.disconnect();
      if (heroEl) {
        heroEl.removeEventListener("pointermove", onMove as EventListener);
        heroEl.removeEventListener("pointerleave", onLeave as EventListener);
        window.removeEventListener("scroll", onLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
