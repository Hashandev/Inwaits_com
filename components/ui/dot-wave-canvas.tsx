"use client";

// components/ui/dot-wave-canvas.tsx
// Interactive mathematical wave of dotted particles with mouse hover deflection & glow
// Inspired by etechamila.lk, rendered on 2D canvas with optimal performance.

import { useEffect, useRef } from "react";

type WaveConfig = {
  rows: number;
  columns: number;
  far: (t: number) => { x: number; y: number };
  near: (t: number) => { x: number; y: number };
  ripple: number;
};

const WAVE_CONFIGS: WaveConfig[] = [
  {
    rows: 24,
    columns: 80,
    far: (e) => ({ x: 0.02 + 0.58 * e, y: 0.48 + 0.07 * Math.sin(Math.PI * 1.3 * e) }),
    near: (e) => ({ x: -0.25 + 0.95 * e, y: 1.05 - 0.05 * e }),
    ripple: 0.05,
  },
];

function generatePoints(
  width: number,
  height: number,
  { rows, columns, far, near, ripple }: WaveConfig
) {
  const points: { x: number; y: number; radius: number; alpha: number }[] = [];

  for (let r = 0; r < rows; r++) {
    const rowFrac = r / (rows - 1);
    const rowPow = Math.pow(rowFrac, 1.7);

    for (let c = 0; c < columns; c++) {
      const colFrac = c / (columns - 1);
      const farPoint = far(colFrac);
      const nearPoint = near(colFrac);

      const waveOffset =
        0.04 * Math.sin(Math.PI * 1.5 * colFrac + rowFrac * 2) * (1 - rowFrac * 0.3);

      const px = farPoint.x + (nearPoint.x - farPoint.x) * rowPow;
      const py =
        farPoint.y +
        (nearPoint.y - farPoint.y) * rowPow +
        waveOffset +
        ripple * Math.sin(colFrac * 7 + rowFrac * 3.5) * rowPow;

      const alpha =
        0.95 *
        (Math.pow(Math.sin(Math.PI * colFrac), 0.8) *
          Math.pow(Math.sin(Math.PI * Math.min(1, rowFrac * 1.15)), 0.5)) *
        (0.2 + 0.8 * rowFrac);

      if (alpha > 0.02) {
        points.push({
          x: px * width,
          y: py * height,
          radius: 0.7 + 2.2 * rowFrac,
          alpha,
        });
      }
    }
  }

  return points;
}

export function DotWaveCanvas({
  rgbColor = "67, 89, 255", // Inwaits brand blue (#4359ff)
}: {
  rgbColor?: string;
}) {
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

    let points: { x: number; y: number; radius: number; alpha: number }[] = [];
    let width = 0;
    let height = 0;
    let needsResize = true;
    let animId: number | null = null;

    const MAX_DPR = 2;
    const DISPLACE_RADIUS = 160;
    const DISPLACE_FORCE = 20;
    const GROW_FACTOR = 1.6;
    const LERP_POS = 0.2;
    const LERP_STRENGTH = 0.1;
    const QUANTIZE_LEVELS = 32;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      points = WAVE_CONFIGS.flatMap((cfg) => generatePoints(width, height, cfg));
    }

    function updateMouse() {
      mouse.x += (mouse.targetX - mouse.x) * LERP_POS;
      mouse.y += (mouse.targetY - mouse.y) * LERP_POS;
      mouse.strength += (mouse.targetStrength - mouse.strength) * LERP_STRENGTH;

      const isSettled =
        Math.hypot(mouse.targetX - mouse.x, mouse.targetY - mouse.y) < 0.3 &&
        Math.abs(mouse.targetStrength - mouse.strength) < 0.004;

      if (isSettled) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
        mouse.strength = mouse.targetStrength;
      }

      return !isSettled;
    }

    function draw() {
      if (!ctx) return;

      const paths = Array.from({ length: QUANTIZE_LEVELS + 1 }, () => new Path2D());

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        let px = pt.x;
        let py = pt.y;
        let pradius = pt.radius;
        let palpha = pt.alpha;

        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (mouse.strength > 0 && dist < DISPLACE_RADIUS) {
          const factor = mouse.strength * Math.pow(1 - dist / DISPLACE_RADIUS, 2);
          if (dist > 0) {
            px += (dx / dist) * DISPLACE_FORCE * factor;
            py += (dy / dist) * DISPLACE_FORCE * factor;
          }
          pradius *= 1 + GROW_FACTOR * factor;
          palpha += (1 - palpha) * factor;
        }

        const level = Math.min(QUANTIZE_LEVELS, Math.round(palpha * QUANTIZE_LEVELS));
        const path = paths[level];
        path.moveTo(px + pradius, py);
        path.arc(px, py, pradius, 0, Math.PI * 2);
      }

      ctx.clearRect(0, 0, width, height);

      for (let lvl = 1; lvl <= QUANTIZE_LEVELS; lvl++) {
        ctx.fillStyle = `rgba(${rgbColor}, ${(lvl / QUANTIZE_LEVELS).toFixed(3)})`;
        ctx.fill(paths[lvl]);
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

    // Track mouse interactions across hero section
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
  }, [rgbColor]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full"
      style={{ opacity: 0.95 }}
    />
  );
}
