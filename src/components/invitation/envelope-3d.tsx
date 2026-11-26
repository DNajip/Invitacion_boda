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
      className={`relative w-[300px] sm:w-[330px] h-[200px] mx-auto select-none group cursor-pointer ${
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
      {/* CAPA 2 (INTERMEDIA): Tarjeta interior de algodón marfil que emerge en 3D       */}
      {/* ============================================================================== */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-[240px] sm:w-[260px] h-[190px] sm:h-[210px] rounded-[14px] overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.6)] border border-[#C8A569]/70 bg-[#FAF7F0] text-neutral-900 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "-translate-y-28 sm:-translate-y-32 scale-[1.03] z-10"
            : "translate-y-2 scale-[0.94] z-0 opacity-0"
        }`}
        style={{
          boxShadow: isOpen ? "0 22px 50px rgba(0,0,0,0.7), 0 0 25px rgba(200,165,105,0.3)" : "none",
        }}
      >
        {/* Fondo de tarjeta interior con textura de papel marfil fino */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/wedding/redesign/backgrounds/paper-ivory.webp"
            alt="Textura de papel marfil fino"
            fill
            sizes="260px"
            className="object-cover opacity-95"
          />
        </div>

        {/* Doble filete ornamental en la tarjeta interior */}
        <div className="absolute inset-[5px] rounded-[10px] border border-[#C8A569]/40 pointer-events-none z-10" />
        <div className="absolute inset-[8px] rounded-[7px] border border-[#C8A569]/20 pointer-events-none z-10" />

        {/* Acento floral en esquina superior izquierda de la tarjeta interior */}
        <div className="absolute -top-1 -left-1 w-14 h-14 pointer-events-none z-20">
          <Image
            src="/images/wedding/redesign/floral/floral-small-blue.webp"
            alt="Decoración floral tarjeta interior"
            width={1536}
            height={1024}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Acento floral en esquina inferior derecha de la tarjeta interior */}
        <div className="absolute -bottom-2 -right-1 w-12 h-12 pointer-events-none z-20 scale-x-[-1]">
          <Image
            src="/images/wedding/redesign/ornaments/branch-gold-single.webp"
            alt="Rama dorada tarjeta interior"
            width={1536}
            height={1024}
            className="w-full h-full object-contain opacity-80"
          />
        </div>

        {/* Contenido elegante de la tarjeta que emerge */}
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-3 px-3 text-center">
          {/* Monograma en arco con laureles */}
          <div className="flex flex-col items-center pt-1">
            <div className="flex items-center gap-1">
              <span className="w-5 h-2.5 relative opacity-70">
                <Image
                  src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                  alt="Laurel izquierdo"
                  fill
                  className="object-contain"
                />
              </span>
              <div className="w-8 h-8 rounded-full border border-[#C8A569]/70 flex items-center justify-center bg-[#FAF7F0]/90 shadow-sm">
                <span className="font-serif italic font-bold text-xs text-[#99763D]">
                  {monogram.replace("&", " y ")}
                </span>
              </div>
              <span className="w-5 h-2.5 relative opacity-70 scale-x-[-1]">
                <Image
                  src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                  alt="Laurel derecho"
                  fill
                  className="object-contain"
                />
              </span>
            </div>

            <p className="font-cinzel text-[7px] sm:text-[7.5px] tracking-[0.25em] text-[#99763D] uppercase font-bold pt-1">
              NUESTRA BODA
            </p>
          </div>

          {/* Nombres de los novios */}
          <div className="space-y-0.5">
            <p className="font-serif italic font-normal text-xl sm:text-2xl text-[#0E1A29] leading-none drop-shadow-sm">
              {groom} y {bride}
            </p>
            <div className="w-8 h-1 mx-auto relative opacity-60">
              <Image
                src="/images/wedding/redesign/ornaments/separator-gold-diamond.webp"
                alt="Separador"
                fill
                className="object-contain"
              />
            </div>
            <p className="font-cinzel text-[8px] tracking-[0.2em] text-[#99763D] font-bold">
              19 · 12 · 2026
            </p>
          </div>

          {/* Alianzas matrimoniales fotorrealistas en la base de la tarjeta */}
          <div className="w-10 h-7 relative pb-1">
            <Image
              src="/assets/templates/romantic-garden/wedding-rings.webp"
              alt="Alianzas de oro"
              fill
              className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            />
          </div>
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
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border border-[#C8A569]/30 shadow-[0_0_15px_rgba(200,165,105,0.3)] transition-all group-hover/seal:border-[#E5C388] group-hover/seal:shadow-[0_0_25px_rgba(200,165,105,0.6)]" />
        )}
      </button>
    </div>
  );
}
