"use client";

// components/ui/interactive-grid.tsx
// Interactive Grid Squares with mouse hover wave, light-up glow, and physics ripple.

import { useEffect, useRef } from "react";

export function InteractiveGrid() {
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
      active: false,
    };

    let width = 0;
    let height = 0;
    let animId: number | null = null;
    let time = 0;

    const GRID_SIZE = 38; // exact compact square size from your screenshot
    const HOVER_RADIUS = 260; // wider, softer mouse influence radius

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.16;
      mouse.y += (mouse.targetY - mouse.y) * 0.16;

      const cols = Math.ceil(width / GRID_SIZE) + 1;
      const rows = Math.ceil(height / GRID_SIZE) + 1;

      // Draw squares with enhanced subtle glow & wave
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GRID_SIZE;
          const y = r * GRID_SIZE;
          const centerX = x + GRID_SIZE / 2;
          const centerY = y + GRID_SIZE / 2;

          const dx = centerX - mouse.x;
          const dy = centerY - mouse.y;
          const dist = Math.hypot(dx, dy);

          // Calculate hover reaction & wave
          let hoverStrength = 0;
          if (mouse.active && dist < HOVER_RADIUS) {
            hoverStrength = Math.pow(1 - dist / HOVER_RADIUS, 1.6);
          }

          // Subtle ambient wave ripple across squares
          const ambientWave = Math.sin(time + c * 0.16 + r * 0.16) * 0.025;

          // Crisp clean hairline border alpha
          const borderAlpha = Math.max(0.045, Math.min(0.85, 0.06 + ambientWave + hoverStrength * 0.55));

          // Soft brand-blue fill when hovered
          const fillAlpha = hoverStrength * 0.18;

          // Fill highlighted square
          if (fillAlpha > 0.008) {
            ctx.fillStyle = `rgba(35, 75, 255, ${fillAlpha.toFixed(3)})`;
            ctx.fillRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2);
          }

          // Draw square border with hairline crispness
          ctx.strokeStyle = hoverStrength > 0.06
            ? `rgba(100, 140, 255, ${borderAlpha.toFixed(3)})`
            : `rgba(255, 255, 255, ${borderAlpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, GRID_SIZE, GRID_SIZE);
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
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
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
      className="pointer-events-none absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,black_50%,rgba(0,0,0,0.5)_65%,transparent_85%)]"
    />
  );
}
