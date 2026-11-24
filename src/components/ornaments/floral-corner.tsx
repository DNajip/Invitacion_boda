import React from "react";

interface Props {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * Esquinas florales ornamentales con flores blancas de jazmín/gardenia,
 * centros dorados y follaje en verde salvia / ramas doradas.
 * Fiel a las referencias visuales del Jardín Romántico.
 */
export default function FloralCorner({ className = "", position = "top-left" }: Props) {
  let transform = "";
  if (position === "top-right") transform = "scale(-1, 1)";
  if (position === "bottom-left") transform = "scale(1, -1)";
  if (position === "bottom-right") transform = "scale(-1, -1)";

  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-28 sm:w-36 h-28 sm:h-36 pointer-events-none select-none ${className}`}
      style={{ transform }}
    >
      <defs>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E5C388" />
          <stop offset="100%" stopColor="#C8A569" />
        </radialGradient>
        <linearGradient id="sageLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8A9D8B" />
          <stop offset="100%" stopColor="#5E7260" />
        </linearGradient>
      </defs>

      {/* Ramitas y zarcillos dorados */}
      <path
        d="M 12 12 Q 55 25 80 75 Q 95 110 120 135"
        stroke="#C8A569"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M 12 12 Q 25 55 75 80 Q 110 95 135 120"
        stroke="#C8A569"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />

      {/* Hojas verde salvia suaves */}
      <path
        d="M 38 18 C 50 14 62 22 58 35 C 46 38 34 30 38 18 Z"
        fill="url(#sageLeaf)"
        opacity="0.9"
      />
      <path
        d="M 18 38 C 14 50 22 62 35 58 C 38 46 30 34 18 38 Z"
        fill="url(#sageLeaf)"
        opacity="0.9"
      />
      <path
        d="M 70 45 C 84 40 96 52 90 66 C 76 70 64 60 70 45 Z"
        fill="url(#sageLeaf)"
        opacity="0.85"
      />
      <path
        d="M 45 70 C 40 84 52 96 66 90 C 70 76 60 64 45 70 Z"
        fill="url(#sageLeaf)"
        opacity="0.85"
      />

      {/* Flor blanca 1 (esquina principal) */}
      <g transform="translate(32, 32)">
        {/* Pétalos blancos */}
        <circle cx="0" cy="-14" r="8" fill="#FFFFFF" opacity="0.95" />
        <circle cx="13" cy="-5" r="8" fill="#FFFFFF" opacity="0.95" />
        <circle cx="8" cy="11" r="8" fill="#FFFFFF" opacity="0.95" />
        <circle cx="-8" cy="11" r="8" fill="#FFFFFF" opacity="0.95" />
        <circle cx="-13" cy="-5" r="8" fill="#FFFFFF" opacity="0.95" />
        {/* Centro de pistilos dorados */}
        <circle cx="0" cy="0" r="4.5" fill="url(#goldGlow)" />
        <circle cx="0" cy="0" r="1.5" fill="#8C6D37" />
      </g>

      {/* Flor blanca 2 (lateral) */}
      <g transform="translate(68, 22) scale(0.75)">
        <circle cx="0" cy="-14" r="8" fill="#FFFFFF" opacity="0.92" />
        <circle cx="13" cy="-5" r="8" fill="#FFFFFF" opacity="0.92" />
        <circle cx="8" cy="11" r="8" fill="#FFFFFF" opacity="0.92" />
        <circle cx="-8" cy="11" r="8" fill="#FFFFFF" opacity="0.92" />
        <circle cx="-13" cy="-5" r="8" fill="#FFFFFF" opacity="0.92" />
        <circle cx="0" cy="0" r="4.5" fill="url(#goldGlow)" />
      </g>

      {/* Flor blanca 3 (inferior) */}
      <g transform="translate(22, 68) scale(0.75)">
        <circle cx="0" cy="-14" r="8" fill="#FFFFFF" opacity="0.92" />
        <circle cx="13" cy="-5" r="8" fill="#FFFFFF" opacity="0.92" />
        <circle cx="8" cy="11" r="8" fill="#FFFFFF" opacity="0.92" />
        <circle cx="-8" cy="11" r="8" fill="#FFFFFF" opacity="0.92" />
        <circle cx="-13" cy="-5" r="8" fill="#FFFFFF" opacity="0.92" />
        <circle cx="0" cy="0" r="4.5" fill="url(#goldGlow)" />
      </g>
    </svg>
  );
}
