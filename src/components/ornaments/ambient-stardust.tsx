"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  speedY: number;
  speedX: number;
  pulseSpeed: number;
  pulseStep: number;
}

export default function AmbientStardust() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvas = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setupCanvas();

    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener("resize", handleResize);

    // Cantidad de partículas adaptada a pantallas móviles vs desktop
    const count = width < 640 ? 25 : 40;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const maxAlpha = 0.2 + Math.random() * 0.55;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 2.2,
        alpha: Math.random() * maxAlpha,
        maxAlpha,
        speedY: 0.2 + Math.random() * 0.45,
        speedX: (Math.random() - 0.5) * 0.3,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        pulseStep: Math.random() * Math.PI * 2,
      });
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Movimiento vertical y horizontal suave
        p.y -= p.speedY;
        p.x += Math.sin(p.pulseStep) * p.speedX;
        p.pulseStep += p.pulseSpeed;

        // Brillo y destello respirable
        p.alpha = 0.15 + (Math.sin(p.pulseStep) + 1) * 0.5 * (p.maxAlpha - 0.15);

        // Reubicar cuando sale por la parte superior
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Dibujo de la partícula de oro cálido con aura difusa
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        gradient.addColorStop(0, `rgba(240, 213, 165, ${p.alpha})`);
        gradient.addColorStop(0.4, `rgba(200, 165, 105, ${p.alpha * 0.7})`);
        gradient.addColorStop(1, `rgba(200, 165, 105, 0)`);

        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ willChange: "transform" }}
    />
  );
}
