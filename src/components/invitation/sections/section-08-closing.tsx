"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";

interface Props {
  groom: string;
  bride: string;
  onScrollToTop: () => void;
}

export default function Section08Closing({ groom, bride, onScrollToTop }: Props) {
  return (
    <section className="relative w-full max-w-[440px] mx-auto rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#C8A569]/40 bg-[#081729] text-white">
      {/* Filetes interiores dorados dobles */}
      <div className="absolute inset-[8px] rounded-[24px] border border-[#C8A569]/30 pointer-events-none z-10" />
      <div className="absolute inset-[13px] rounded-[19px] border border-[#C8A569]/15 pointer-events-none z-10" />

      {/* Imagen monumental del Arco Floral con linternas y cartel Hasta Pronto */}
      <div className="relative w-full aspect-[1536/1024] min-h-[280px]">
        <Image
          src="/assets/templates/romantic-garden/floral-arch.webp"
          alt="Arco floral monumental de despedida"
          fill
          sizes="(max-width: 768px) 100vw, 440px"
          className="object-cover object-center select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081729] via-[#081729]/30 to-transparent" />
      </div>

      <div className="relative z-10 px-6 sm:px-8 pb-8 pt-2 text-center space-y-4">
        <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.28em] text-[#C8A569] uppercase font-semibold">
          NUESTRO PARA SIEMPRE COMIENZA AQUÍ
        </p>

        <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-white tracking-wide leading-tight drop-shadow-md">
          Gracias por ser parte de nuestra historia
        </h2>

        <div className="space-y-2.5 max-w-sm mx-auto font-serif italic text-[14px] sm:text-[15px] text-[#E1D3BF] leading-relaxed">
          <p>
            El amor se hace aún más especial cuando se comparte con las personas que forman parte de nuestra vida.
          </p>
          <p>
            Gracias por acompañarnos y bendecir este nuevo comienzo.
          </p>
        </div>

        {/* Separador rombo */}
        <div className="flex items-center justify-center gap-2 py-1">
          <div className="w-16 h-px bg-[#C8A569]/40" />
          <div className="w-2 h-2 rotate-45 border border-[#C8A569] bg-[#081729]" />
          <div className="w-16 h-px bg-[#C8A569]/40" />
        </div>

        <div className="space-y-1">
          <p className="font-serif italic text-xs text-neutral-400">
            Con todo nuestro amor,
          </p>
          <p className="font-serif italic font-medium text-3xl sm:text-4xl text-[#E5C388] tracking-wider">
            {groom} y {bride}
          </p>
          <p className="font-cinzel text-[13px] text-[#C8A569] tracking-[0.25em] pt-1 font-medium">
            19 · 12 · 2026
          </p>
        </div>

        {/* Botón Volver a la portada */}
        <div className="pt-4">
          <button
            type="button"
            onClick={onScrollToTop}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#FFF1D6] via-[#E5C388] to-[#C8A569] text-[#0A1726] text-xs font-cinzel font-bold tracking-wider hover:brightness-110 active:scale-95 transition shadow-[0_4px_16px_rgba(200,165,105,0.4)] cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            VOLVER A LA PORTADA
          </button>
        </div>
      </div>
    </section>
  );
}
