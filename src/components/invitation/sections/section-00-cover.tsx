"use client";

import Image from "next/image";
import { Sparkles, Users } from "lucide-react";

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
    <section className="relative w-full max-w-[420px] mx-auto min-h-[720px] rounded-t-[140px] rounded-b-[36px] bg-gradient-to-b from-[#081729] via-[#0E2238] to-[#081729] p-6 sm:p-8 text-center shadow-2xl flex flex-col justify-between overflow-hidden border border-[#C8A569]/40">
      {/* Filete interior dorado en forma de arco */}
      <div className="absolute inset-[7px] rounded-t-[133px] rounded-b-[29px] border border-[#C8A569]/25 pointer-events-none" />

      {/* Ramillete floral esquinero fotorrealista (Superior Izquierda) */}
      <div className="absolute -top-3 -left-3 w-40 h-32 pointer-events-none select-none z-20">
        <Image
          src="/images/assets/floral-corner.png"
          alt="Flores y hojas doradas"
          width={360}
          height={255}
          className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
          priority
        />
      </div>

      {/* Ramillete floral inferior derecho */}
      <div className="absolute -bottom-4 -right-4 w-36 h-28 pointer-events-none select-none z-20 scale-x-[-1]">
        <Image
          src="/images/assets/floral-small.png"
          alt="Flores blancas"
          width={160}
          height={155}
          className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* Alianzas matrimoniales en la base */}
      <div className="absolute bottom-6 right-6 w-20 h-14 pointer-events-none select-none z-20">
        <Image
          src="/images/assets/wedding-rings.png"
          alt="Alianzas de oro"
          width={140}
          height={90}
          className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Cabecera con monograma en arco */}
      <div className="relative z-10 pt-8 space-y-1">
        {/* Monograma dentro de arco fino */}
        <div className="w-14 h-18 mx-auto border border-[#C8A569]/60 rounded-t-full flex items-center justify-center p-1 mb-2 bg-[#081729]/60 backdrop-blur-sm shadow-inner">
          <span className="font-serif italic font-bold text-lg tracking-wider text-[#E5C388]">
            {monogram}
          </span>
        </div>

        <p className="font-cinzel text-[11px] tracking-[0.25em] text-[#C8A569] uppercase font-semibold">
          NUESTRA BODA
        </p>

        <h1 className="font-script text-4xl sm:text-5xl text-white tracking-wide pt-1 leading-tight gold-text-glow">
          {groom} & {bride}
        </h1>
      </div>

      {/* Sobre de lujo fotorrealista con sello de cera orgánico */}
      <div className="relative z-10 my-4 flex flex-col items-center justify-center">
        <div className="relative w-[300px] sm:w-[320px] h-[190px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] flex items-center justify-center">
          {/* Imagen del sobre de papel azul noche texturizado */}
          <Image
            src="/images/assets/envelope-closed.png"
            alt="Sobre de boda azul oscuro"
            width={355}
            height={226}
            className="w-full h-full object-contain select-none"
            priority
          />

          {/* Sello de cera dorado con relieve 3D */}
          <div
            onClick={onOpen}
            className={`absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-500 z-30 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] ${
              isOpen ? "scale-110 opacity-70" : "scale-100 opacity-100 animate-pulse"
            }`}
            title="Haz clic para abrir la invitación"
          >
            <Image
              src="/images/assets/wax-seal.png"
              alt="Sello de cera dorado D&F"
              width={175}
              height={175}
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
        </div>

        {/* Dedicatoria personalizada integrada con elegancia editorial */}
        <div className="mt-4 space-y-1 text-center">
          <p className="font-serif italic text-xs text-neutral-400 font-light">
            Para:
          </p>
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#E5C388] tracking-wide">
            {recipientName}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#081729]/80 border border-[#C8A569]/30 text-[11px] text-[#C8A569] font-medium">
            <Users className="w-3 h-3 text-[#E5C388]" />
            <span>
              {authorizedCount} {authorizedCount === 1 ? "lugar reservado" : "lugares reservados"}
            </span>
          </div>
        </div>
      </div>

      {/* Botón Abrir Invitación satinado y fecha */}
      <div className="relative z-10 pb-4 space-y-3">
        <button
          type="button"
          onClick={onOpen}
          className="w-full max-w-[240px] mx-auto bg-gradient-to-r from-[#F0D5A5] via-[#C8A569] to-[#A37F41] hover:brightness-110 active:scale-95 text-[#10243B] font-bold py-3 px-6 rounded-full shadow-[0_4px_25px_rgba(200,165,105,0.45)] transition duration-200 text-xs sm:text-sm tracking-wider uppercase font-cinzel cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#10243B]" />
          Abrir Invitación &gt;
        </button>

        <p className="font-cinzel text-xs tracking-[0.25em] text-[#C8A569] pt-1">
          19 · 12 · 2026
        </p>
      </div>
    </section>
  );
}
