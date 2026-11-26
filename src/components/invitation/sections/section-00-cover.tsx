"use client";

import Image from "next/image";
import { Sparkles, Users } from "lucide-react";
import Envelope3D from "@/components/invitation/envelope-3d";

interface Props {
  groom: string;
  bride: string;
  monogram: string;
  recipientName: string;
  authorizedCount: number;
  onOpen: () => void;
  isOpen: boolean;
}

export default function Section00Cover({
  groom,
  bride,
  monogram,
  recipientName,
  authorizedCount,
  onOpen,
  isOpen,
}: Props) {
  return (
    <section className="relative w-full max-w-[430px] mx-auto min-h-[min(740px,96dvh)] sm:min-h-[760px] rounded-t-[140px] rounded-b-[36px] overflow-hidden shadow-2xl flex flex-col justify-between p-4 sm:p-7 text-center select-none bg-[#08192D] isolate">
      {/* ============================================================================== */}
      {/* CAPA 1: Fondo de Papel Azul Noche Texturizado Premium                          */}
      {/* ============================================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/wedding/redesign/backgrounds/paper-dark-blue.webp"
          alt="Textura papel azul noche"
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover object-center opacity-95"
          priority
        />
        {/* Sutil profundidad de jardín nocturno */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08192D]/70 via-transparent to-[#08192D]/90" />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 2: Marco Ornamental Dorado en Arco con Flores Nupciales                    */}
      {/* ============================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-10 p-2 sm:p-2.5">
        <div className="relative w-full h-full">
          <Image
            src="/images/wedding/redesign/frames/frame-arch-gold.webp"
            alt="Marco dorado ornamental con flores"
            fill
            className="object-fill"
            priority
          />
        </div>
      </div>

      {/* ============================================================================== */}
      {/* CAPA 3: Destello de Luz Dorada y Elementos Ambientales                          */}
      {/* ============================================================================== */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-12 pointer-events-none z-15 opacity-60">
        <Image
          src="/images/wedding/redesign/effects/sparkle-gold-soft.webp"
          alt="Destello dorado"
          fill
          className="object-contain"
        />
      </div>

      {/* Alianzas de oro superpuestas en esquina inferior derecha sobre las flores del marco */}
      <div className="absolute bottom-6 right-6 w-16 sm:w-20 h-12 sm:h-14 pointer-events-none z-25">
        <Image
          src="/assets/templates/romantic-garden/wedding-rings.webp"
          alt="Alianzas de oro"
          fill
          className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* ============================================================================== */}
      {/* CAPA 4: Contenido y Botones Interactivos                                       */}
      {/* ============================================================================== */}
      <div className="relative z-30 pt-8 sm:pt-10 space-y-1">
        {/* Monograma DyF dentro de arco dorado con corazón */}
        <button
          type="button"
          onClick={!isOpen ? onOpen : undefined}
          disabled={isOpen}
          aria-label="Botón DyF - Toca para abrir la invitación"
          title="Toca para abrir la invitación"
          className={`w-14 h-16 mx-auto border-2 border-[#C8A569]/80 rounded-t-full flex flex-col items-center justify-center p-1 mb-1.5 bg-[#08192D]/80 backdrop-blur-sm shadow-[0_4px_15px_rgba(0,0,0,0.6)] transition-all ${
            !isOpen
              ? "hover:scale-105 active:scale-95 cursor-pointer hover:border-[#E5C388] animate-pulse"
              : "cursor-default border-[#C8A569]/50"
          }`}
        >
          <span className="font-serif italic font-bold text-base tracking-widest text-[#E5C388] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {monogram.replace("&", " y ")}
          </span>
          <span className="text-[10px] text-[#C8A569] leading-none -mt-0.5">♡</span>
        </button>

        {/* Separador ornamental superior */}
        <div className="w-20 h-1 mx-auto relative opacity-70">
          <Image
            src="/images/wedding/redesign/ornaments/separator-gold-diamond.webp"
            alt="Separador ornamental"
            fill
            className="object-contain"
          />
        </div>

        <p className="font-cinzel text-[9.5px] sm:text-[10px] tracking-[0.24em] text-[#E5C388] uppercase font-semibold drop-shadow-sm">
          N U E S T R A &nbsp; B O D A
        </p>
      </div>

      {/* Sobre Multicapa 3D Interactivo */}
      <div className="relative z-30 my-1 flex flex-col items-center justify-center">
        <Envelope3D
          isOpen={isOpen}
          onOpen={onOpen}
          groom={groom}
          bride={bride}
          monogram={monogram}
        />

        {/* Dedicatoria Nupcial para el Invitado */}
        <div className="mt-3 space-y-1 text-center max-w-[320px] mx-auto">
          <p className="font-serif italic text-xs text-[#E5C388]/90 font-light tracking-wide">
            Para:
          </p>

          {/* Nombre del invitado flanqueado por delicadas ramas doradas */}
          <div className="flex items-center justify-center gap-1.5 px-2">
            <span className="w-6 h-3 relative opacity-80">
              <Image
                src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                alt="Laurel izquierdo"
                fill
                className="object-contain"
              />
            </span>
            <p className="font-serif italic text-2xl sm:text-[25px] font-normal text-white tracking-wide leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              {recipientName}
            </p>
            <span className="w-6 h-3 relative opacity-80 scale-x-[-1]">
              <Image
                src="/images/wedding/redesign/ornaments/branches-gold-symmetric.webp"
                alt="Laurel derecho"
                fill
                className="object-contain"
              />
            </span>
          </div>

          {/* Píldora de lugares autorizados con borde dorado */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-[#08192D]/85 border border-[#C8A569]/50 text-[11px] text-[#E5C388] font-medium backdrop-blur-md shadow-inner mt-0.5">
            <Users className="w-3 h-3 text-[#E5C388]" />
            <span>
              {authorizedCount} {authorizedCount === 1 ? "lugar reservado" : "lugares reservados"}
            </span>
          </div>
        </div>
      </div>

      {/* Fecha y Botón Satinado "INVITACIÓN ABIERTA / ABRIR INVITACIÓN" */}
      <div className="relative z-30 pb-12 sm:pb-14 space-y-2.5">
        {/* Separador y Fecha */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-5 h-0.5 bg-[#C8A569]/40" />
          <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.28em] text-[#E5C388] font-semibold">
            19 · 12 · 2026
          </p>
          <span className="w-5 h-0.5 bg-[#C8A569]/40" />
        </div>

        <button
          type="button"
          onClick={onOpen}
          disabled={isOpen}
          aria-label="Abrir Invitación"
          className={`w-full max-w-[265px] mx-auto py-3 px-6 rounded-full font-bold transition-all duration-300 text-xs sm:text-[12.5px] tracking-wider uppercase font-cinzel flex items-center justify-center gap-2 border-2 ${
            isOpen
              ? "bg-[#0A1D33] border-[#C8A569] text-[#E5C388] shadow-[0_2px_15px_rgba(200,165,105,0.3)] cursor-default"
              : "bg-gradient-to-r from-[#F0D5A5] via-[#C8A569] to-[#99763D] border-[#F0D5A5] hover:brightness-110 active:scale-95 text-[#08192D] shadow-[0_4px_25px_rgba(200,165,105,0.5)] cursor-pointer"
          }`}
        >
          <Sparkles className={`w-4 h-4 ${isOpen ? "text-[#E5C388]" : "text-[#08192D]"}`} />
          {isOpen ? "INVITACIÓN ABIERTA" : "ABRIR INVITACIÓN >"}
        </button>
      </div>
    </section>
  );
}
