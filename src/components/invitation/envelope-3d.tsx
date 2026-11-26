"use client";

import { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  groom: string;
  bride: string;
  monogram: string;
}

export default function Envelope3D({
  isOpen,
  onOpen,
  groom,
  bride,
  monogram,
}: Props) {
  const [animating, setAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isOpen || animating) return;
    setAnimating(true);

    // Micro destello de confeti dorado en el punto del sello
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 55,
      origin: { x, y },
      colors: ["#C8A569", "#F0D5A5", "#FFFFFF", "#B8860B"],
      ticks: 120,
      gravity: 0.9,
      scalar: 0.8,
    });

    onOpen();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-[300px] sm:w-[330px] h-[195px] mx-auto select-none group cursor-pointer ${
        !isOpen ? "hover:scale-[1.02] active:scale-[0.98]" : ""
      } transition-transform duration-500`}
      style={{ perspective: "1000px" }}
    >
      {/* ============================================================================== */}
      {/* CAPA 1 (FONDO): Sobre abierto (fondo interior azul noche y solapa abierta)    */}
      {/* ============================================================================== */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-0 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/assets/templates/romantic-garden/envelope-open-full.webp"
          alt="Sobre abierto"
          fill
          sizes="(max-width: 640px) 300px, 330px"
          className="object-contain"
          priority
        />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 2 (INTERMEDIA): Tarjeta interior de algodón que emerge en 3D             */}
      {/* ============================================================================== */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-[240px] sm:w-[260px] h-[175px] sm:h-[190px] rounded-[14px] overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.6)] border border-[#C8A569]/60 bg-[#FBF9F5] text-neutral-900 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "-translate-y-24 sm:-translate-y-28 scale-[1.02] z-10"
            : "translate-y-2 scale-[0.94] z-0 opacity-0"
        }`}
        style={{
          boxShadow: isOpen ? "0 20px 45px rgba(0,0,0,0.7), 0 0 25px rgba(200,165,105,0.3)" : "none",
        }}
      >
        {/* Fondo de tarjeta interior de algodón fotorrealista */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/templates/romantic-garden/card-inner.webp"
            alt="Tarjeta interior de boda"
            fill
            sizes="260px"
            className="object-cover opacity-90"
          />
        </div>

        {/* Contenido elegante de la tarjeta que emerge */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-3 text-center space-y-1">
          <div className="w-7 h-7 rounded-full border border-[#C8A569]/60 flex items-center justify-center bg-[#FBF9F5]/80">
            <span className="font-serif italic font-bold text-xs text-[#99763D]">
              {monogram.replace("&", "y")}
            </span>
          </div>

          <p className="font-cinzel text-[7.5px] sm:text-[8px] tracking-[0.2em] text-[#99763D] uppercase font-semibold">
            NUESTRA BODA
          </p>

          <p className="font-serif italic font-normal text-lg sm:text-xl text-[#08192D] leading-tight">
            {groom} y {bride}
          </p>

          <p className="font-cinzel text-[7.5px] tracking-widest text-[#B8860B] font-semibold pt-0.5">
            19 · 12 · 2026
          </p>
        </div>
      </div>

      {/* ============================================================================== */}
      {/* CAPA 3 (FRONTAL): Bolsillo en V del sobre con filetes dorados                  */}
      {/* ============================================================================== */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-20 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/assets/templates/romantic-garden/envelope-pocket.webp"
          alt="Bolsillo frontal del sobre"
          fill
          sizes="(max-width: 640px) 300px, 330px"
          className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
          priority
        />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 4 (SOBRE CERRADO ESTÁTICO / INICIAL): Para visualización impecable        */}
      {/* ============================================================================== */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 z-30 pointer-events-none ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/assets/templates/romantic-garden/envelope-closed.webp"
          alt="Sobre azul marino de lujo"
          width={1536}
          height={1024}
          className="w-full h-full object-contain drop-shadow-[0_18px_35px_rgba(0,0,0,0.85)]"
          priority
        />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 5 (BOTÓN INTERACTIVO DEL SELLO D Y F): Sello único y nítido               */}
      {/* ============================================================================== */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isOpen}
        aria-label="Sello D y F - Toca para abrir la invitación"
        title="Toca el sello D y F para abrir la invitación"
        className={`absolute top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-[86px] h-20 sm:h-[86px] z-40 rounded-full cursor-pointer transition-transform ${
          isOpen
            ? "pointer-events-none"
            : "hover:scale-105 active:scale-95 group/seal"
        }`}
      >
        {/* Resplandor sutil interactivo que no altera ni desvanece el sello original */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border border-[#C8A569]/30 shadow-[0_0_15px_rgba(200,165,105,0.3)] transition-all group-hover/seal:border-[#E5C388] group-hover/seal:shadow-[0_0_25px_rgba(200,165,105,0.6)]" />
        )}
      </button>
    </div>
  );
}
