"use client";

// components/ui/perspective-grid-wave.tsx
// Exact physics from etechamila.lk applied to square mesh cells:
// - Perspective 3D wave plane (far-to-near mathematical sine sweep)
// - True physics displacement on mouse hover (squares deflect away from cursor)
// - Zoom in effect: squares and their vertices expand (scale up) under the mouse
// - Alpha / luminance amplification under cursor with brand blue illumination

import { useEffect, useRef } from "react";

// Exact parameters calibrated from etechamila's physics engine:
const ROWS = 22;
const COLS = 50;
const DISPLACE_RADIUS = 180; // hover influence zone (B=150 in etechamila)
const DISPLACE_FORCE = 24;  // push displacement amount (V=16 in etechamila)
const ZOOM_FACTOR = 1.6;    // expansion zoom factor under cursor (te=1.4 in etechamila)
const LERP_SPEED = 0.2;     // smooth mouse easing (ne=0.2 in etechamila)
const STRENGTH_LERP = 0.1;  // smooth activation easing (re=0.1 in etechamila)

// Perspective math from etechamila:
function getBasePoint(colFrac: number, rowFrac: number, width: number, height: number) {
  // rowPow creates camera perspective foreshortening
  const rowPow = Math.pow(rowFrac, 1.6);

  // Far curve (horizon)
  const farX = (0.02 + 0.96 * colFrac) * width;
  const farY = (0.35 + 0.08 * Math.sin(Math.PI * 1.3 * colFrac)) * height;

  // Near curve (foreground camera base)
  const nearX = (-0.15 + 1.3 * colFrac) * width;
  const nearY = (1.05 - 0.04 * colFrac) * height;

  // Sine ripple across rows and columns
  const waveOffset =
    0.035 * Math.sin(Math.PI * 1.5 * colFrac + rowFrac * 2) * (1 - rowFrac * 0.3) * height;
  const ripple = 0.04 * Math.sin(colFrac * 7 + rowFrac * 3.5) * rowPow * height;

  const x = farX + (nearX - farX) * rowPow;
  const y = farY + (nearY - farY) * rowPow + waveOffset + ripple;

  // Natural edge alpha falloff so the grid dissolves smoothly on left/right/top
  const alpha =
    0.95 *
    Math.pow(Math.sin(Math.PI * colFrac), 0.75) *
    Math.pow(Math.sin(Math.PI * Math.min(1, rowFrac * 1.15)), 0.5) *
    (0.25 + 0.75 * rowFrac);

  return { x, y, alpha };
}

export function PerspectiveGridWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = {
      x: 0,
      y: 0,
      strength: 0,
      targetX: 0,
      targetY: 0,
      targetStrength: 0,
    };

    let width = 0;
    let height = 0;
    let animId: number | null = null;
    let needsResize = true;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function updateMouse() {
      mouse.x += (mouse.targetX - mouse.x) * LERP_SPEED;
      mouse.y += (mouse.targetY - mouse.y) * LERP_SPEED;
      mouse.strength += (mouse.targetStrength - mouse.strength) * STRENGTH_LERP;

      const settled =
        Math.hypot(mouse.targetX - mouse.x, mouse.targetY - mouse.y) < 0.3 &&
        Math.abs(mouse.targetStrength - mouse.strength) < 0.004;

      if (settled) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
        mouse.strength = mouse.targetStrength;
      }
      return !settled;
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Compute deformed vertices
      const grid: { x: number; y: number; alpha: number; zoomFactor: number }[][] = [];

      for (let r = 0; r < ROWS; r++) {
        const rowFrac = r / (ROWS - 1);
        grid[r] = [];

        for (let c = 0; c < COLS; c++) {
          const colFrac = c / (COLS - 1);
          const base = getBasePoint(colFrac, rowFrac, width, height);

          let px = base.x;
          let py = base.y;
          let palpha = base.alpha;
          let zoomFactor = 1;

          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.hypot(dx, dy);

          // Etechamila hover deflection & zoom
          if (mouse.strength > 0 && dist < DISPLACE_RADIUS) {
            const factor = mouse.strength * Math.pow(1 - dist / DISPLACE_RADIUS, 2);
            if (dist > 0) {
              px += (dx / dist) * DISPLACE_FORCE * factor;
              py += (dy / dist) * DISPLACE_FORCE * factor;
            }
            zoomFactor = 1 + ZOOM_FACTOR * factor;
            palpha += (1 - palpha) * factor;
          }

          grid[r][c] = { x: px, y: py, alpha: palpha, zoomFactor };
        }
      }

      // Render Squares / Quads across the perspective wave
      for (let r = 0; r < ROWS - 1; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const p1 = grid[r][c];
          const p2 = grid[r][c + 1];
          const p3 = grid[r + 1][c + 1];
          const p4 = grid[r + 1][c];

          const avgAlpha = (p1.alpha + p2.alpha + p3.alpha + p4.alpha) / 4;
          const maxZoom = Math.max(p1.zoomFactor, p2.zoomFactor, p3.zoomFactor, p4.zoomFactor);

          if (avgAlpha < 0.02) continue;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();

          // Under cursor: fill square with glowing brand blue + scale
          if (maxZoom > 1.08) {
            const fillIntensity = Math.min(0.28, (maxZoom - 1) * 0.25);
            ctx.fillStyle = `rgba(35, 75, 255, ${fillIntensity.toFixed(3)})`;
            ctx.fill();

            // Highlighted border with bright blue hairline
            const strokeAlpha = Math.min(0.9, avgAlpha * (1 + (maxZoom - 1) * 1.5));
            ctx.strokeStyle = `rgba(110, 145, 255, ${strokeAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.3;
          } else {
            // Resting delicate grid square border
            const strokeAlpha = Math.max(0.04, Math.min(0.28, avgAlpha * 0.32));
            ctx.strokeStyle = `rgba(255, 255, 255, ${strokeAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.85;
          }

          ctx.stroke();
        }
      }
    }

    function loop() {
      animId = null;
      if (needsResize) {
        needsResize = false;
        resize();
      }
      const isMoving = updateMouse();
      draw();
      if (isMoving) {
        animId = requestAnimationFrame(loop);
      }
    }

    const schedule = () => {
      if (animId === null) {
        animId = requestAnimationFrame(loop);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      needsResize = true;
      schedule();
    });
    resizeObserver.observe(canvas);

    const heroSection = canvas.closest("section") || canvas.parentElement;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.targetStrength = 1;

      if (mouse.strength < 0.01) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      }
      schedule();
    };

    const onPointerLeave = () => {
      if (mouse.targetStrength !== 0) {
        mouse.targetStrength = 0;
        schedule();
      }
    };

    if (heroSection) {
      heroSection.addEventListener("pointermove", onPointerMove as EventListener);
      heroSection.addEventListener("pointerleave", onPointerLeave as EventListener);
      window.addEventListener("scroll", onPointerLeave, { passive: true });
    }

    schedule();

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
      className="pointer-events-none absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
    />
  );
}
