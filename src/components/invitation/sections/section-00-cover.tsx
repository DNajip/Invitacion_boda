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
    <section className="relative w-full max-w-[420px] mx-auto min-h-[min(720px,94dvh)] sm:min-h-[740px] rounded-t-[140px] rounded-b-[36px] overflow-hidden shadow-2xl border border-[#C8A569]/50 flex flex-col justify-between p-5 sm:p-8 text-center select-none bg-[#08192D]">
      {/* CAPA 1: Fondo de Jardín Nocturno Fotorrealista */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/templates/romantic-garden/night-garden-bg.webp"
          alt="Fondo de jardín nocturno"
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover object-center opacity-40 mix-blend-luminosity scale-105"
          priority
        />
        {/* Degradado profundo azul noche y viñeta ambiental */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08192D]/90 via-[#0A1D33]/70 to-[#08192D]/95" />
      </div>

      {/* CAPA 2 & 3: Marco Ornamental en Arco Dorado Doble */}
      <div className="absolute inset-[8px] rounded-t-[132px] rounded-b-[28px] border border-[#C8A569]/35 pointer-events-none z-10" />
      <div className="absolute inset-[13px] rounded-t-[127px] rounded-b-[23px] border border-[#C8A569]/15 pointer-events-none z-10" />

      {/* CAPA 4: Composiciones Florales Blancas y Hojas de Oro Fotorrealistas (Esquina Superior Izquierda) */}
      <div className="absolute -top-6 -left-8 w-48 sm:w-56 h-36 sm:h-44 pointer-events-none z-20">
        <Image
          src="/assets/templates/romantic-garden/floral-composition.webp"
          alt="Flores blancas y hojas doradas"
          width={1774}
          height={887}
          className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]"
          priority
        />
      </div>

      {/* Ramillete Floral Inferior Derecho */}
      <div className="absolute -bottom-8 -right-8 w-44 sm:w-52 h-32 sm:h-40 pointer-events-none z-20 scale-x-[-1]">
        <Image
          src="/assets/templates/romantic-garden/floral-composition.webp"
          alt="Flores blancas y hojas doradas"
          width={1774}
          height={887}
          className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* CAPA 8: Alianzas Matrimoniales de Oro en la Base Derecha */}
      <div className="absolute bottom-6 right-6 w-18 sm:w-20 h-12 sm:h-14 pointer-events-none z-30">
        <Image
          src="/assets/templates/romantic-garden/wedding-rings.webp"
          alt="Alianzas de matrimonio doradas"
          width={1536}
          height={1024}
          className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* CAPA 6: Cabecera con Monograma en Arco y Nombres de los Novios */}
      <div className="relative z-20 pt-7 space-y-1">
        {/* Monograma D y F dentro de arco fino dorado (botón interactivo para abrir) */}
        <button
          type="button"
          onClick={!isOpen ? onOpen : undefined}
          disabled={isOpen}
          aria-label="Botón D y F - Toca para abrir la invitación"
          title="Toca para abrir la invitación"
          className={`w-14 h-16 mx-auto border border-[#C8A569]/70 rounded-t-full flex items-center justify-center p-1 mb-2 bg-[#08192D]/70 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all ${
            !isOpen ? "hover:scale-105 active:scale-95 cursor-pointer hover:border-[#E5C388] animate-pulse" : "cursor-default"
          }`}
        >
          <span className="font-serif italic font-bold text-base tracking-widest text-[#E5C388] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {monogram.replace("&", " y ")}
          </span>
        </button>

        <p className="font-cinzel text-[10.5px] sm:text-[11px] tracking-[0.28em] text-[#C8A569] uppercase font-semibold">
          NUESTRA BODA
        </p>

        <h1 className="font-serif italic font-normal text-4xl sm:text-5xl text-white tracking-wide pt-1 leading-tight drop-shadow-[0_2px_12px_rgba(200,165,105,0.4)]">
          {groom} y {bride}
        </h1>
      </div>

      {/* CAPA 5: Sobre Multicapa Fotorrealista en 3D Interactivo */}
      <div className="relative z-20 my-2 flex flex-col items-center justify-center">
        <Envelope3D
          isOpen={isOpen}
          onOpen={onOpen}
          groom={groom}
          bride={bride}
          monogram={monogram}
        />

        {/* Dedicatoria Nupcial Integrada */}
        <div className="mt-3.5 space-y-1 text-center">
          <p className="font-serif italic text-xs text-neutral-300/80 font-light tracking-wide">
            Para:
          </p>
          <p className="font-serif text-2xl sm:text-[26px] font-bold text-[#E5C388] tracking-wide leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {recipientName}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#08192D]/70 border border-[#C8A569]/30 text-[11px] text-[#C8A569] font-medium backdrop-blur-sm">
            <Users className="w-3 h-3 text-[#E5C388]" />
            <span>
              {authorizedCount} {authorizedCount === 1 ? "lugar reservado" : "lugares reservados"}
            </span>
          </div>
        </div>
      </div>

      {/* CAPA 7: Botón "Abrir Invitación >" Satinado y Fecha */}
      <div className="relative z-20 pb-8 sm:pb-12 space-y-2 -translate-y-1">
        <button
          type="button"
          onClick={onOpen}
          disabled={isOpen}
          aria-label="Abrir Invitación"
          className={`w-full max-w-[245px] mx-auto py-3 px-6 rounded-full font-bold transition-all duration-300 text-xs sm:text-[13px] tracking-wider uppercase font-cinzel flex items-center justify-center gap-2 ${
            isOpen
              ? "bg-[#0A1D33] border border-[#C8A569]/60 text-[#E5C388] shadow-[0_2px_15px_rgba(200,165,105,0.2)] cursor-default"
              : "bg-gradient-to-r from-[#F0D5A5] via-[#C8A569] to-[#99763D] hover:brightness-110 active:scale-95 text-[#08192D] shadow-[0_4px_25px_rgba(200,165,105,0.45)] cursor-pointer"
          }`}
        >
          <Sparkles className={`w-4 h-4 ${isOpen ? "text-[#E5C388]" : "text-[#08192D]"}`} />
          {isOpen ? "Invitación Abierta" : "Abrir Invitación >"}
        </button>

        <p className="font-cinzel text-xs tracking-[0.28em] text-[#C8A569] pt-1">
          19 · 12 · 2026
        </p>
      </div>
    </section>
  );
}
