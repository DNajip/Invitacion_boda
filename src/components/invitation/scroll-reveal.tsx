"use client";

import { useEffect, useRef, useState, useSyncExternalStore, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ScrollReveal({ children, className = "", delayMs = 0 }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              setTimeout(() => setIsVisible(true), delayMs);
            } else {
              setIsVisible(true);
            }
            // Una vez revelado, dejar de observar para liberar recursos
            if (elementRef.current) {
              observer.unobserve(elementRef.current);
            }
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [delayMs, prefersReducedMotion]);

  const isShown = prefersReducedMotion || isVisible;

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isShown ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"
      } ${className}`}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </div>
  );
}
