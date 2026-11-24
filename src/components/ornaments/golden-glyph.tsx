import React from "react";

export default function GoldenGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-10 h-5 mx-auto select-none ${className}`}
    >
      <path
        d="M 30 5 C 24 10 18 18 10 15 C 2 12 6 25 15 22 C 22 19 26 12 30 18 C 34 12 38 19 45 22 C 54 25 58 12 50 15 C 42 18 36 10 30 5 Z"
        fill="#C8A569"
        opacity="0.9"
      />
      <circle cx="30" cy="8" r="2.5" fill="#E5C388" />
    </svg>
  );
}
