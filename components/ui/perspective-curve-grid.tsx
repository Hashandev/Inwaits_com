"use client";

// components/ui/perspective-curve-grid.tsx
// Exact matching 3D perspective curved grid as shown in the screenshot:
// - Swooping U-shaped curved grid plane that rises on the left and right sides
// - Descends in the center under the headline and buttons
// - Interactive mouse hover: grid vertices deflect and squares zoom in/illuminate

import { useEffect, useRef } from "react";

const ROWS = 18;
const COLS = 42;
const DISPLACE_RADIUS = 190;
const DISPLACE_FORCE = 22;
const ZOOM_FACTOR = 1.5;

export function PerspectiveCurveGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      strength: 0,
      targetStrength: 0,
    };

    let width = 0;
    let height = 0;
    let animId: number | null = null;
    let time = 0;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function getCurvedPoint(colFrac: number, rowFrac: number) {
      // Perspective depth foreshortening
      const rowPow = Math.pow(rowFrac, 1.45);

      // Horizontal span: fans out wider toward the foreground
      const xSpread = 0.05 + 0.9 * colFrac;
      const xNearSpread = -0.15 + 1.3 * colFrac;
      const px = (xSpread + (xNearSpread - xSpread) * rowPow) * width;

      // The signature U-shaped curve from screenshot:
      // Center (colFrac ≈ 0.5) sags down, while left (0) and right (1) arch upwards
      const uCurve = Math.pow(Math.abs(colFrac - 0.5) * 2, 2.2);

      // Vertical position:
      // Horizon (far) starts around 38% height
      // Base (near) reaches around 88% height in center
      const farY = (0.32 - uCurve * 0.12) * height;
      const nearY = (0.86 - uCurve * 0.16) * height;

      // Gentle ambient floating wave
      const floatWave = Math.sin(time + colFrac * 3.5 + rowFrac * 2) * 6;

      const py = farY + (nearY - farY) * rowPow + floatWave;

      // Alpha mask: vibrant in center-bottom, fading gracefully at the far horizon and outer edges
      const edgeFade = Math.sin(Math.PI * colFrac);
      const alpha = Math.max(0, Math.min(1, Math.pow(edgeFade, 0.6) * (0.15 + 0.85 * rowFrac)));

      return { x: px, y: py, alpha };
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.16;
      mouse.y += (mouse.targetY - mouse.y) * 0.16;
      mouse.strength += (mouse.targetStrength - mouse.strength) * 0.1;

      // Calculate deformed grid points
      const grid: { x: number; y: number; alpha: number; hoverZoom: number }[][] = [];

      for (let r = 0; r < ROWS; r++) {
        const rowFrac = r / (ROWS - 1);
        grid[r] = [];

        for (let c = 0; c < COLS; c++) {
          const colFrac = c / (COLS - 1);
          const pt = getCurvedPoint(colFrac, rowFrac);

          let px = pt.x;
          let py = pt.y;
          let palpha = pt.alpha;
          let hoverZoom = 1;

          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.hypot(dx, dy);

          // Interactive mouse hover zoom & deflection
          if (mouse.strength > 0 && dist < DISPLACE_RADIUS) {
            const factor = mouse.strength * Math.pow(1 - dist / DISPLACE_RADIUS, 1.8);
            if (dist > 0) {
              px += (dx / dist) * DISPLACE_FORCE * factor;
              py += (dy / dist) * DISPLACE_FORCE * factor;
            }
            hoverZoom = 1 + ZOOM_FACTOR * factor;
            palpha += (1 - palpha) * factor;
          }

          grid[r][c] = { x: px, y: py, alpha: palpha, hoverZoom };
        }
      }

      // Render perspective curved quads/squares
      for (let r = 0; r < ROWS - 1; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const p1 = grid[r][c];
          const p2 = grid[r][c + 1];
          const p3 = grid[r + 1][c + 1];
          const p4 = grid[r + 1][c];

          const avgAlpha = (p1.alpha + p2.alpha + p3.alpha + p4.alpha) / 4;
          const maxZoom = Math.max(p1.hoverZoom, p2.hoverZoom, p3.hoverZoom, p4.hoverZoom);

          if (avgAlpha < 0.02) continue;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();

          // Clean white highlight under cursor (no blue color)
          if (maxZoom > 1.06) {
            const strokeAlpha = Math.min(0.95, avgAlpha * (1.2 + (maxZoom - 1) * 2.2));
            ctx.strokeStyle = `rgba(255, 255, 255, ${strokeAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.4;
          } else {
            // Resting clean white grid lines
            const strokeAlpha = Math.max(0.04, Math.min(0.35, avgAlpha * 0.38));
            ctx.strokeStyle = `rgba(255, 255, 255, ${strokeAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.9;
          }

          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    animId = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const heroSection = canvas.closest("section") || canvas.parentElement;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.targetStrength = 1;
    };

    const onPointerLeave = () => {
      mouse.targetStrength = 0;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    if (heroSection) {
      heroSection.addEventListener("pointermove", onPointerMove as EventListener);
      heroSection.addEventListener("pointerleave", onPointerLeave as EventListener);
      window.addEventListener("scroll", onPointerLeave, { passive: true });
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      if (heroSection) {
        heroSection.removeEventListener("pointermove", onPointerMove as EventListener);
        heroSection.removeEventListener("pointerleave", onPointerLeave as EventListener);
        window.removeEventListener("scroll", onPointerLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
    />
  );
}
